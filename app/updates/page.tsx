"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertTriangle,
  ExternalLink,
  FileText,
  Calendar,
  User,
  TrendingUp,
} from "lucide-react"
import { CitizenReportForm } from "@/components/citizen-report-form"

const updates = [
  {
    id: 1,
    projectName: "Smart City Development Phase 2",
    updateType: "Milestone Completion",
    description: "Phase 1 infrastructure setup completed with all smart sensors installed",
    submittedBy: "0x1234...ABCD",
    submittedAt: "2024-01-22 14:30",
    status: "verified",
    txHash: "0xa3f...9c1",
    amount: "₹45 Cr",
    verifiedBy: "0x5678...EFGH",
    category: "Infrastructure",
  },
  {
    id: 2,
    projectName: "Rural Road Connectivity",
    updateType: "Progress Report",
    description: "Completed 25km of road construction in Phase 1 area",
    submittedBy: "0x9ABC...IJKL",
    submittedAt: "2024-01-21 10:15",
    status: "pending",
    txHash: "0xb7d...2e4",
    amount: "₹12 Cr",
    verifiedBy: null,
    category: "Road",
  },
  {
    id: 3,
    projectName: "Digital Education Initiative",
    updateType: "Payment Release",
    description: "Payment released to contractor for tablet procurement and distribution",
    submittedBy: "0xDEF0...MNOP",
    submittedAt: "2024-01-20 16:45",
    status: "verified",
    txHash: "0xc8e...5f7",
    amount: "₹8 Cr",
    verifiedBy: "0x1234...ABCD",
    category: "Education",
  },
  {
    id: 4,
    projectName: "Metro Rail Extension",
    updateType: "Issue Report",
    description: "Delay in land acquisition process due to legal complications",
    submittedBy: "0xABC1...2345",
    submittedAt: "2024-01-19 09:20",
    status: "under_review",
    txHash: "0xd9f...8a0",
    amount: null,
    verifiedBy: null,
    category: "Transport",
  },
  {
    id: 5,
    projectName: "Hospital Modernization",
    updateType: "Milestone Completion",
    description: "Medical equipment installation completed in Block A",
    submittedBy: "0x6789...CDEF",
    submittedAt: "2024-01-18 11:30",
    status: "verified",
    txHash: "0xe1a...3b5",
    amount: "₹15 Cr",
    verifiedBy: "0x9ABC...IJKL",
    category: "Healthcare",
  },
]

const stats = [
  { title: "Total Updates", value: "1,247", change: "+89 this week", color: "text-blue-600" },
  { title: "Verified Updates", value: "1,203", change: "+85 this week", color: "text-green-600" },
  { title: "Pending Review", value: "44", change: "+4 this week", color: "text-yellow-600" },
  { title: "Under Investigation", value: "12", change: "-2 this week", color: "text-red-600" },
]

export default function UpdatesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUpdateId, setSelectedUpdateId] = useState<number | null>(null)

  const filteredUpdates = updates.filter((update) => {
    const matchesSearch =
      update.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      update.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || update.status === statusFilter
    const matchesType = typeFilter === "all" || update.updateType.toLowerCase().includes(typeFilter.toLowerCase())
    const matchesTab = activeTab === "all" || update.status === activeTab

    return matchesSearch && matchesStatus && matchesType && matchesTab
  })
const selectedUpdate = updates.find((u) => u.id === selectedUpdateId)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "under_review":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }
//updated by copilot
  function handleCitizenRReport(id: number): void {
    // For now, just show an alert. In a real app, this could open a modal or navigate to a report form.
    const update = updates.find((u) => u.id === id)
    alert(
      `Citizen report for update:\n\nProject: ${update?.projectName}\nType: ${update?.updateType}\nDescription: ${update?.description}`
    )
  }
 

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Project Updates</h1>
          <p className="text-gray-600 mt-1">Track all project updates and their verification status</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <TrendingUp className="w-4 h-4 mr-2" />
          Analytics
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
                <FileText className={`w-8 h-8 ${stat.color}`} />
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="milestone">Milestone</SelectItem>
                <SelectItem value="progress">Progress Report</SelectItem>
                <SelectItem value="payment">Payment</SelectItem>
                <SelectItem value="issue">Issue Report</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Reset Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Updates</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="verified">Verified</TabsTrigger>
          <TabsTrigger value="under_review">Under Review</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredUpdates.map((update) => (
            <Card key={update.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{update.projectName}</CardTitle>
                    <CardDescription className="mt-1">{update.updateType}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(update.status)}>
                    {getStatusIcon(update.status)}
                    <span className="ml-1 capitalize">{update.status.replace("_", " ")}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{update.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-gray-500">Submitted by:</span>
                      <div className="font-mono">{update.submittedBy}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <div>{update.submittedAt}</div>
                    </div>
                  </div>
                  {update.amount && (
                    <div>
                      <span className="text-gray-500">Amount:</span>
                      <div className="font-semibold text-green-600">{update.amount}</div>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-500">Transaction:</span>
                    <Button variant="link" size="sm" className="p-0 h-auto text-sm">
                      {update.txHash}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>

                {update.verifiedBy && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified by: {update.verifiedBy}</span>
                    </div>
                  </div>
                )}
                {update.status === "pending" && (
                  <div className="flex gap-2 pt-4 border-t">
                    {/* <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Verify Update
                    </Button> */}
                    <Button
                      size="sm"
                      variant="outline"
                      className="mt-2 text-gray-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        setIsModalOpen(true)
                        setSelectedUpdateId(update.id)
                      }}
                    >
                      Citizen report
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        
        </TabsContent>
        {/* to connect to a defined modal page */}
       {selectedUpdate && (
  <CitizenReportForm
    open={isModalOpen}
    onOpenChange={setIsModalOpen}
    projectName={selectedUpdate.projectName}
    updateDescription={selectedUpdate.description}
  />
       )}

      </Tabs>

      {filteredUpdates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">No updates found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setTypeFilter("all")
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
