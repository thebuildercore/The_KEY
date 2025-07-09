"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  X,
  Eye,
  FileText,
  Calendar,
  User,
  IndianRupee,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { CONTRACT_ABI, CONTRACT_ADDRESS} from "@/lib/contract"
import { ethers } from "ethers"

import { keccak256, toUtf8Bytes } from "ethers"
import { error } from "console"

import { supabase } from "@/lib/supabaseClient"

export default function VerifyUpdatesPage() {
  const [updates, setUpdates] = useState<any[]>([])
  const [verifiedUpdates, setVerifiedUpdates] = useState<any[]>([])
  const [rejectedUpdates, setRejectedUpdates] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [selectedUpdate, setSelectedUpdate] = useState<any>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [verificationNotes, setVerificationNotes] = useState("")
  const [verificationAction, setVerificationAction] = useState<"approve" | "reject" | null>(null)
  const [detailedViewOpen, setDetailedViewOpen] = useState(false)
  const [selectedUpdateForView, setSelectedUpdateForView] = useState<any>(null)
 const stats = [
  {title:"Pending verification", 
    value: updates.length.toString(),
    change: "Latest from Contract",
    color: "text-amber-600",

  },
  {
    title: "Verified",
    value: verifiedUpdates.length.toString(),
    change: "From Supabase",
    color: "text-green-600",
  },
  {
    title: "Rejected",
    value: rejectedUpdates.length.toString(),
    change: "From Supabase",
    color: "text-red-600",
  },
  {
    title: "High Priority",
    value: updates.filter(update => update.priority === "high").length.toString(),
    change: "From Contract",
    color: "text-purple-600",
  },
 ]
  useEffect(() => {
    fetchUpdates()
    fetchRejected()
  }, [])

  const fetchUpdates = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      const unverified: any[] = []
      const verified: any[] = []

      for (let pid = 0; pid < 20; pid++) {
        try {
          const project = await contract.project(pid)
          if (project.timestamp === 0) continue
          let i = 0
          while (true) {
            try {
              const upd = await contract.projectUpdates(pid, i)
              const data = {
                projectId: pid,
                index: i,
                updateHash: upd.updateHash,
                uploadBy: upd.uploadedBy,
                timestamp: upd.timestamp,
                verified: upd.verified,
                // Optionally, fetch more info from Supabase here if needed
              }
              upd.verified ? verified.push(data) : unverified.push(data)
              i++
            } catch {
              break
            }
          }
        } catch {
          continue
        }
      }
      setUpdates(unverified)
      setVerifiedUpdates(verified)
    } catch (err) {
      console.log("Error fetching updates:", err)
    }
  }

  const fetchRejected = async () => {
    const { data } = await supabase
      .from("project_updates")
      .select("*")
      .eq("status", "rejected")
      .order("timestamp", { ascending: false })

    if (data) setRejectedUpdates(data)
  }

  const verify = async (projectId: number, index: number) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      const tx = await contract.verifyUpdate(projectId, index)
      await tx.wait()
      await supabase.from("project_updates")
        .update({ status: "verified" })
        .eq("project_id", projectId)
        .eq("index", index)
      fetchUpdates()
    } catch (error) {
      console.error("Failed to verify update:", error)
      alert("❌ Verification failed.")
    }
  }

  const reject = async () => {
    if (!selectedUpdate) return
    await supabase.from("project_updates").update({
      status: "rejected",
      rejected_reason: verificationNotes,
      rejected_at: new Date().toISOString()
    }).eq("project_id", selectedUpdate.projectId).eq("index", selectedUpdate.index)
    setDetailsOpen(false)
    fetchUpdates()
    fetchRejected()
  }

  const filteredUpdates = updates.filter(update => {
    const matchesSearch = update.updateHash?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = priorityFilter === "all" || update.priority === priorityFilter
    const matchesType = typeFilter === "all" || update.updateType?.toLowerCase().includes(typeFilter.toLowerCase())
    return matchesSearch && matchesPriority && matchesType
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending_verification":
        return "bg-yellow-100 text-yellow-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />
      case "pending_verification":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <X className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const openDetails = (update: any) => {
    setSelectedUpdate(update)
    setDetailsOpen(true)
  }

  const openDetailedView = (update: any) => {
    setSelectedUpdateForView(update)
    setDetailedViewOpen(true)
  }

  const handleVerification = (action: "approve" | "reject") => {
    if (!selectedUpdate) return
    if (action === "approve") {
      verify(selectedUpdate.projectId, selectedUpdate.index)
      setDetailsOpen(false)
      setVerificationAction(null)
      setVerificationNotes("")
      setSelectedUpdate(null)
    } else if (action === "reject") {
      reject()
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Verify Updates</h1>
          <p className="text-gray-600 mt-1">Review and verify project updates submitted by officials</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <Clock className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Updates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search updates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="progress">Progress Report</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
                <SelectItem value="payment">Payment Request</SelectItem>
                <SelectItem value="issue">Issue Report</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Reset Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending Verification</TabsTrigger>
          <TabsTrigger value="verified">Recently Verified</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {filteredUpdates.map((update) => (
            <Card key={update.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{update.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {update.projectName} • {update.updateType}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(update.priority)}>{update.priority.toUpperCase()}</Badge>
                    <Badge className={getStatusColor(update.status)}>
                      {getStatusIcon(update.status)}
                      <span className="ml-1 capitalize">{update.status.replace("_", " ")}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{update.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-gray-500">Official:</span>
                      <div className="font-medium">{update.officialName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-gray-500">Submitted:</span>
                      <div>{update.submittedAt}</div>
                    </div>
                  </div>
                  {update.amountInvolved && (
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="text-gray-500">Amount:</span>
                        <div className="font-semibold text-emerald-700">{update.amountInvolved}</div>
                      </div>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Progress:</span>
                    <div className="font-medium">{update.progressPercentage}%</div>
                  </div>
                </div>

                {update.documentsAttached > 0 && (
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <FileText className="w-4 h-4" />
                    <span>{update.documentsAttached} document(s) attached</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">Wallet: {update.officialWallet}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openDetailedView(update)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setSelectedUpdate(update)
                        setVerificationAction("approve")
                        handleVerification("approve")
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => {
                        setSelectedUpdate(update)
                        setVerificationAction("reject")
                        setDetailsOpen(true)
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="verified" className="space-y-4">
          {verifiedUpdates.map((update) => (
            <Card key={update.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{update.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {update.projectName} • {update.updateType}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(update.status)}>
                    {getStatusIcon(update.status)}
                    <span className="ml-1 capitalize">{update.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{update.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Official:</span>
                    <div className="font-medium">{update.officialName}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Verified:</span>
                    <div>{update.verifiedAt}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Verified by:</span>
                    <div className="font-medium">{update.verifiedBy}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="rejected">
          <Card>
            <CardContent className="text-center py-12">
              <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500 text-lg">No rejected updates to display</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Detailed Update View Dialog */}
      <Dialog open={detailedViewOpen} onOpenChange={setDetailedViewOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Update Details - {selectedUpdateForView?.title}
            </DialogTitle>
            <DialogDescription>Complete information about this project update submission</DialogDescription>
          </DialogHeader>
          {selectedUpdateForView && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Update Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-lg mb-3">{selectedUpdateForView.title}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-500">Type:</span>
                      <div className="font-medium">{selectedUpdateForView.updateType}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Priority:</span>
                      <Badge className={getPriorityColor(selectedUpdateForView.priority)}>
                        {selectedUpdateForView.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <span className="text-gray-500">Submitted:</span>
                      <div>{selectedUpdateForView.submittedAt}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Progress Update:</span>
                      <div className="font-medium">{selectedUpdateForView.progressPercentage}%</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Description:</span>
                    <p className="text-gray-700 mt-1 leading-relaxed">{selectedUpdateForView.description}</p>
                  </div>
                </div>

                {/* Progress Comparison */}
                {selectedUpdateForView.previousProgress !== undefined && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-3">Progress Comparison</h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Previous Progress:</span>
                          <span className="font-medium">{selectedUpdateForView.previousProgress}%</span>
                        </div>
                        <Progress value={selectedUpdateForView.previousProgress} className="h-2 bg-gray-200" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Updated Progress:</span>
                          <span className="font-medium">{selectedUpdateForView.progressPercentage}%</span>
                        </div>
                        <Progress value={selectedUpdateForView.progressPercentage} className="h-2" />
                      </div>
                      {selectedUpdateForView.progressPercentage !== selectedUpdateForView.previousProgress && (
                        <div
                          className={`text-sm font-medium ${
                            selectedUpdateForView.progressPercentage > selectedUpdateForView.previousProgress
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          Change:{" "}
                          {selectedUpdateForView.progressPercentage > selectedUpdateForView.previousProgress ? "+" : ""}
                          {selectedUpdateForView.progressPercentage - selectedUpdateForView.previousProgress}%
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Progress Visualization */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-3">Progress Update</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Updated Progress:</span>
                      <span className="font-medium">{selectedUpdateForView.progressPercentage}%</span>
                    </div>
                    <Progress value={selectedUpdateForView.progressPercentage} className="h-3" />
                  </div>
                </div>

                {/* Milestone Information */}
                {selectedUpdateForView.milestoneCompleted && (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Milestone Completed</h4>
                    <p className="text-green-700">{selectedUpdateForView.milestoneCompleted}</p>
                  </div>
                )}

                {/* Financial Information */}
                {selectedUpdateForView.amountInvolved && (
                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                    <h4 className="font-semibold text-emerald-800 mb-2">Financial Information</h4>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                      <span className="text-xl font-bold text-emerald-700">{selectedUpdateForView.amountInvolved}</span>
                    </div>
                  </div>
                )}

                {/* Issues Encountered */}
                {selectedUpdateForView.issuesEncountered && (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">Issues Encountered</h4>
                    <p className="text-red-700">{selectedUpdateForView.issuesEncountered}</p>
                  </div>
                )}

                {/* Next Steps */}
                {selectedUpdateForView.nextSteps && (
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">Next Steps</h4>
                    <p className="text-purple-700">{selectedUpdateForView.nextSteps}</p>
                  </div>
                )}

                {/* Expected Completion */}
                {selectedUpdateForView.expectedCompletionDate && (
                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                    <h4 className="font-semibold text-amber-800 mb-2">Expected Completion</h4>
                    <p className="text-amber-700">{selectedUpdateForView.expectedCompletionDate}</p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Project Information */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <h4 className="font-semibold mb-3">Project Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">Project:</span>
                      <div className="font-medium">{selectedUpdateForView.projectName}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Official:</span>
                      <div className="font-medium">{selectedUpdateForView.officialName}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Wallet:</span>
                      <div className="font-mono text-xs">{selectedUpdateForView.officialWallet}</div>
                    </div>
                  </div>
                </div>

                {/* Documents */}
                {selectedUpdateForView.documentsAttached > 0 && (
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <h4 className="font-semibold mb-3">Attached Documents</h4>
                    <div className="flex items-center gap-2 text-blue-600">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm">{selectedUpdateForView.documentsAttached} files attached</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent">
                      View Documents
                    </Button>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="bg-white p-4 rounded-lg border shadow-sm">
                  <h4 className="font-semibold mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setSelectedUpdate(selectedUpdateForView)
                        setDetailedViewOpen(false)
                        handleVerification("approve")
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Update
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-600 hover:text-red-700 bg-transparent"
                      onClick={() => {
                        setSelectedUpdate(selectedUpdateForView)
                        setVerificationAction("reject")
                        setDetailedViewOpen(false)
                        setDetailsOpen(true)
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject Update
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() => {
                        setSelectedUpdate(selectedUpdateForView)
                        setDetailedViewOpen(false)
                        setDetailsOpen(true)
                      }}
                    >
                      Open Full Review
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Update Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Update Details & Verification</DialogTitle>
            <DialogDescription>Review the complete update information and verify or reject</DialogDescription>
          </DialogHeader>
          {selectedUpdate && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedUpdate.title}</h3>
                  <p className="text-gray-600">{selectedUpdate.projectName}</p>
                </div>
                <div className="text-right">
                  <Badge className={`${getStatusColor(selectedUpdate.status)} mb-2`}>
                    {getStatusIcon(selectedUpdate.status)}
                    <span className="ml-1 capitalize">{selectedUpdate.status.replace("_", " ")}</span>
                  </Badge>
                  <br />
                  <Badge className={getPriorityColor(selectedUpdate.priority)}>
                    {selectedUpdate.priority.toUpperCase()} PRIORITY
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedUpdate.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Update Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span>{selectedUpdate.updateType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Progress:</span>
                      <span>{selectedUpdate.progressPercentage}%</span>
                    </div>
                    {selectedUpdate.amountInvolved && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Amount:</span>
                        <span className="font-semibold text-emerald-700">{selectedUpdate.amountInvolved}</span>
                      </div>
                    )}
                    {selectedUpdate.milestoneCompleted && (
                      <div className="flex justify-between">
                        <span className="text-gray-500">Milestone:</span>
                        <span>{selectedUpdate.milestoneCompleted}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Official Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span>{selectedUpdate.officialName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Wallet:</span>
                      <span className="font-mono">{selectedUpdate.officialWallet}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Submitted:</span>
                      <span>{selectedUpdate.submittedAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedUpdate.issuesEncountered && (
                <div>
                  <h4 className="font-semibold mb-2">Issues Encountered</h4>
                  <p className="text-gray-700 bg-red-50 p-4 rounded-lg border border-red-200">
                    {selectedUpdate.issuesEncountered}
                  </p>
                </div>
              )}

              {selectedUpdate.nextSteps && (
                <div>
                  <h4 className="font-semibold mb-2">Next Steps</h4>
                  <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    {selectedUpdate.nextSteps}
                  </p>
                </div>
              )}

              {verificationAction === "reject" && (
                <div className="space-y-4 bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-800">Rejection Reason</h4>
                  <div className="space-y-2">
                    <Label htmlFor="rejection-notes">Please provide a reason for rejection:</Label>
                    <Textarea
                      id="rejection-notes"
                      placeholder="Explain why this update is being rejected..."
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                {verificationAction === "reject" ? (
                  <>
                    <Button
                      onClick={() => handleVerification("reject")}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={!verificationNotes.trim()}
                    >
                      Confirm Rejection
                    </Button>
                    <Button variant="outline" onClick={() => setVerificationAction(null)}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleVerification("approve")} className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve Update
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setVerificationAction("reject")}
                      className="text-red-600 hover:text-red-700 bg-transparent"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject Update
                    </Button>
                    <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                      Close
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
