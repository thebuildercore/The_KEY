"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, TrendingUp, Users, FileText, ExternalLink, Activity } from "lucide-react"

const stats = [
  {
    title: "Active Projects",
    value: "24",
    change: "+2 this month",
    icon: Clock,
    color: "text-blue-600",
  },
  {
    title: "Completed Projects",
    value: "156",
    change: "+12 this month",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Updates Logged",
    value: "1,247",
    change: "+89 this week",
    icon: FileText,
    color: "text-purple-600",
  },
  {
    title: "Public Reports",
    value: "43",
    change: "+5 pending review",
    icon: Users,
    color: "text-orange-600",
  },
]

const recentActivity = [
  {
    id: 1,
    project: "Smart City Phase 2",
    action: "Milestone completed",
    wallet: "0x1234...ABCD",
    time: "2 hours ago",
    txHash: "0xa3f...9c1",
    status: "verified",
  },
  {
    id: 2,
    project: "Rural Road Network",
    action: "Budget allocation updated",
    wallet: "0x5678...EFGH",
    time: "4 hours ago",
    txHash: "0xb7d...2e4",
    status: "pending",
  },
  {
    id: 3,
    project: "Digital Education Hub",
    action: "Contractor payment released",
    wallet: "0x9ABC...IJKL",
    time: "6 hours ago",
    txHash: "0xc8e...5f7",
    status: "verified",
  },
  {
    id: 4,
    project: "Healthcare Infrastructure",
    action: "Progress report submitted",
    wallet: "0xDEF0...MNOP",
    time: "8 hours ago",
    txHash: "0xd9f...8a0",
    status: "verified",
  },
]

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of government projects and blockchain activity</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Activity className="w-4 h-4 mr-2" />
          View Analytics
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-5 h-5" />
              Verified Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-900">1,203</div>
            <p className="text-green-700 text-sm">All blockchain verified</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Clock className="w-5 h-5" />
              In-Progress Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">24</div>
            <p className="text-blue-700 text-sm">Across 12 states</p>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800">
              <TrendingUp className="w-5 h-5" />
              Completed Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-900">156</div>
            <p className="text-purple-700 text-sm">₹2,450 Cr total value</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Blockchain Activity</CardTitle>
          <CardDescription>Latest project updates and transactions recorded on the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{activity.project}</h4>
                    <Badge
                      variant={activity.status === "verified" ? "default" : "secondary"}
                      className={
                        activity.status === "verified" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{activity.action}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>Updated by {activity.wallet}</span>
                    <span>{activity.time}</span>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs">
                      Txn: {activity.txHash}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
