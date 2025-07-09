"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Search,
  Filter,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye,
  MapPin,
  Calendar,
  User,
  Camera,
  FileText,
} from "lucide-react"
import Image from "next/image"
import { supabase } from "@/lib/supabaseClient"

  interface Report {
  id: string
  title: string
  report_type: string
  description: string
  reporter_name: string
  location: string
  project_name?: string
  update_description?: string
  status: string
  priority: string
  created_at: string
  assigned_to?: string
  category?: string
  images: string[]
 
}


export default function ReportsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedReport, setSelectedReport] = useState<(typeof reports)[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
const [reports, setReports] = useState<Report[]>([])
const [stats, setStats] = useState([
  { title: "Total Reports", value: "1,456", change: "+23 this week", color: "text-blue-600" },
  { title: "Under Investigation", value: "45", change: "+5 this week", color: "text-yellow-600" },
  { title: "Resolved", value: "1,398", change: "+18 this week", color: "text-green-600" },
  { title: "High Priority", value: "13", change: "-2 this week", color: "text-red-600" },
])



useEffect (() => {
  const fetchData = async () => {
    try {
      const { data: reportData, error: reportError } = await supabase
      .from ("reports")
      .select ("*")
      .order ("created_at", {ascending: false})
      if (reportError) {
       console.error(" Reports error:", reportError);
      }else {
        setReports(reportData as Report[])

        const total = reportData.length
        const under_investigation = reportData.filter(r => r.status === "underInvestigation").length
        const resolved = reportData.filter(r =>r.status === "resolved").length
        const high_priority = reportData.filter(r => r.priority ==="high").length

        setStats([
      { title: "Total REports", value: total.toString(), change:"", color:"text-blue-600"},
      { title: " Under Investigation ", value: under_investigation.toString(), change:"",color: "text-yellow-600"},
      {title: "Resolved", value: resolved.toString(), change:"", color:"text-green-600"},
      {title: "High Priority", value: high_priority.toString(), change:"", color: "text-red-600"},
   ])

      }
    }catch (err){
      console.error("Error Fetching Reports", err);
    }
  }
  fetchData();
}, [])

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reporter_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter
    const matchesTab = activeTab === "all" || report.status === activeTab

    return matchesSearch && matchesStatus && matchesPriority && matchesTab
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
      case "closed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "under_investigation":
        return "bg-yellow-100 text-yellow-800"
      case "acknowledged":
        return "bg-purple-100 text-purple-800"
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
      case "resolved":
      case "closed":
        return <CheckCircle className="w-4 h-4" />
      case "in_progress":
        return <Clock className="w-4 h-4" />
      case "under_investigation":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <MessageSquare className="w-4 h-4" />
    }
  }

  const openDetails = (report: (typeof reports)[0]) => {
    setSelectedReport(report)
    setDetailsOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Citizen Reports</h1>
          <p className="text-gray-600 mt-1">Off-chain citizen feedback and reports on project milestones</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <FileText className="w-4 h-4 mr-2" />
          Export Reports
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
                <MessageSquare className={`w-8 h-8 ${stat.color}`} />
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
            Filter Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="under_investigation">Under Investigation</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="acknowledged">Acknowledged</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
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
            <Button variant="outline">Reset Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="under_investigation">Investigating</TabsTrigger>
          <TabsTrigger value="in_progress">In Progress</TabsTrigger>
          <TabsTrigger value="resolved">Resolved</TabsTrigger>
          <TabsTrigger value="closed">Closed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{report.title}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                   <Badge className={getPriorityColor(report.priority)}>
                      {report.priority ? report.priority.toUpperCase() : "UNKNOWN"}
                    </Badge>

                    <Badge className={getStatusColor(report.status)}>
                      {getStatusIcon(report.status)}
                      <span className="ml-1 capitalize">{(report.status ?? "unknown").replace("_", " ")}</span>
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{report.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-gray-500">Reported by:</span>
                      <div className="font-medium">{report.reporter_name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <div>{report.created_at}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <div>{report.location}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Assigned to:</span>
                    <div className="font-medium">{report.assigned_to}</div>
                  </div>
                </div>

               {report.images?.length > 0 && (
  <div className="flex items-center gap-2 text-sm text-blue-600">
    <Camera className="w-4 h-4" />
    <span>{report.images.length} image(s) attached</span>
  </div>
)}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-sm text-gray-500">Category: {report.category}</div>
                  <Button variant="outline" size="sm" onClick={() => openDetails(report)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {/* Report Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>Detailed view of citizen report and investigation status</DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">

                <div className="text-right">
                  <Badge className={`${getStatusColor(selectedReport.status)} mb-2`}>
                    {getStatusIcon(selectedReport.status)}
                    <span className="ml-1 capitalize">{(selectedReport.status ?? "unknown").replace("_", " ")}</span>
                  </Badge>
                  <br />
                  <Badge className={getPriorityColor(selectedReport.priority)}>
                    {selectedReport.priority.toUpperCase()} PRIORITY
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Report Description</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">Report Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Reported by:</span>
                      <span>{selectedReport.reporter_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date & Time:</span>
                      <span>{selectedReport.created_at}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span>{selectedReport.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span>{selectedReport.report_type}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Investigation Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Assigned to:</span>
                      <span>{selectedReport.assigned_to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span>{selectedReport.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Priority:</span>
                      <span className="capitalize">{selectedReport.priority}</span>
                    </div>
                  </div>
                </div>
              </div>

              {selectedReport.images.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Attached Images</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedReport.images.map((image, index) => (
                      <Image
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Report evidence ${index + 1}`}
                        width={300}
                        height={200}
                        className="rounded-lg border"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t">
                <Button className="bg-blue-600 hover:bg-blue-700">Update Status</Button>
                <Button variant="outline">Add Comment</Button>
                <Button variant="outline">Assign to Team</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {filteredReports.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">No reports found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setPriorityFilter("all")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
