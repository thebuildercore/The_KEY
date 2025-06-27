"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Filter,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  RefreshCw,
  ExternalLink,
} from "lucide-react"

const systemLogs = [
  {
    id: 1,
    timestamp: "2024-01-22 14:30:25",
    level: "info",
    category: "blockchain",
    action: "Project Created",
    details: "New project 'Smart City Phase 2' minted to blockchain",
    user: "0x1234...ABCD",
    txHash: "0xa3f...9c1",
    gasUsed: "0.025 ETH",
  },
  {
    id: 2,
    timestamp: "2024-01-22 14:25:10",
    level: "warning",
    category: "system",
    action: "High Memory Usage",
    details: "System memory usage exceeded 85% threshold",
    user: "system",
    txHash: null,
    gasUsed: null,
  },
  {
    id: 3,
    timestamp: "2024-01-22 14:20:15",
    level: "error",
    category: "blockchain",
    action: "Transaction Failed",
    details: "Failed to verify project update due to insufficient gas",
    user: "0x5678...EFGH",
    txHash: "0xb7d...2e4",
    gasUsed: "0.001 ETH",
  },
  {
    id: 4,
    timestamp: "2024-01-22 14:15:30",
    level: "info",
    category: "auth",
    action: "User Login",
    details: "Administrator logged in successfully",
    user: "0x9ABC...IJKL",
    txHash: null,
    gasUsed: null,
  },
  {
    id: 5,
    timestamp: "2024-01-22 14:10:45",
    level: "info",
    category: "blockchain",
    action: "Payment Released",
    details: "Payment of ₹45 Cr released to contractor",
    user: "0xDEF0...MNOP",
    txHash: "0xc8e...5f7",
    gasUsed: "0.018 ETH",
  },
]

const auditLogs = [
  {
    id: 1,
    timestamp: "2024-01-22 14:30:00",
    action: "Project Verification",
    details: "Project milestone verified by auditor",
    auditor: "Rajesh Kumar",
    projectId: "PRJ-001",
    status: "approved",
    notes: "All documentation verified and approved",
  },
  {
    id: 2,
    timestamp: "2024-01-22 14:25:00",
    action: "Payment Audit",
    details: "Payment transaction audited for compliance",
    auditor: "Priya Sharma",
    projectId: "PRJ-002",
    status: "flagged",
    notes: "Requires additional documentation",
  },
  {
    id: 3,
    timestamp: "2024-01-22 14:20:00",
    action: "Citizen Report Review",
    details: "Citizen complaint investigated and resolved",
    auditor: "Amit Patel",
    projectId: "PRJ-003",
    status: "resolved",
    notes: "Issue was minor and has been addressed",
  },
]

const stats = [
  { title: "Total Logs", value: "15,247", change: "+234 today", color: "text-blue-600" },
  { title: "Errors", value: "23", change: "+2 today", color: "text-red-600" },
  { title: "Warnings", value: "156", change: "+12 today", color: "text-yellow-600" },
  { title: "Blockchain Txns", value: "1,203", change: "+45 today", color: "text-green-600" },
]

export default function SystemLogsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("system")

  const filteredSystemLogs = systemLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "all" || log.level === levelFilter
    const matchesCategory = categoryFilter === "all" || log.category === categoryFilter

    return matchesSearch && matchesLevel && matchesCategory
  })

  const filteredAuditLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.auditor.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesSearch
  })

  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "resolved":
        return "bg-green-100 text-green-800"
      case "flagged":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertTriangle className="w-4 h-4" />
      case "warning":
        return <Clock className="w-4 h-4" />
      case "info":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
          <p className="text-gray-600 mt-1">Monitor system activity, blockchain transactions, and audit trails</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
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
                <Activity className={`w-8 h-8 ${stat.color}`} />
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
            Filter Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="error">Error</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="info">Info</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="blockchain">Blockchain</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="auth">Authentication</SelectItem>
                <SelectItem value="api">API</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Reset Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="system">System Logs</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
        </TabsList>

        <TabsContent value="system" className="space-y-4 mt-6">
          {filteredSystemLogs.map((log) => (
            <Card key={log.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getLevelColor(log.level)}>
                        {getLevelIcon(log.level)}
                        <span className="ml-1 uppercase">{log.level}</span>
                      </Badge>
                      <Badge variant="outline">{log.category}</Badge>
                      <span className="text-sm text-gray-500">{log.timestamp}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{log.action}</h3>
                    <p className="text-gray-700 mb-3">{log.details}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">User:</span>
                        <div className="font-mono">{log.user}</div>
                      </div>
                      {log.txHash && (
                        <div>
                          <span className="text-gray-500">Transaction:</span>
                          <Button variant="link" size="sm" className="p-0 h-auto text-sm">
                            {log.txHash}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      )}
                      {log.gasUsed && (
                        <div>
                          <span className="text-gray-500">Gas Used:</span>
                          <div className="font-semibold text-green-600">{log.gasUsed}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="audit" className="space-y-4 mt-6">
          {filteredAuditLogs.map((log) => (
            <Card key={log.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getStatusColor(log.status)}>
                        <span className="capitalize">{log.status}</span>
                      </Badge>
                      <span className="text-sm text-gray-500">{log.timestamp}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{log.action}</h3>
                    <p className="text-gray-700 mb-3">{log.details}</p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Auditor:</span>
                        <div className="font-medium">{log.auditor}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Project ID:</span>
                        <div className="font-mono">{log.projectId}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Notes:</span>
                        <div>{log.notes}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      {((activeTab === "system" && filteredSystemLogs.length === 0) ||
        (activeTab === "audit" && filteredAuditLogs.length === 0)) && (
        <Card>
          <CardContent className="text-center py-12">
            <Activity className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">No logs found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setLevelFilter("all")
                setCategoryFilter("all")
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

