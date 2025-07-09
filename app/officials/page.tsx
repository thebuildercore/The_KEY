"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { supabase } from "@/lib/supabase"
import {
  FolderOpen,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  FileText,
  Calendar,
  IndianRupee,
} from "lucide-react"
import { ProjectUpdateModal } from "@/components/project-update-modal"

// Mock data for current official (would come from authentication)
const currentOfficial = {
  id: 1,
  name: "Rajesh Kumar",
  walletAddress: "0x1234...ABCD",
  role: "Project Manager",
  department: "Infrastructure",
}

const myProjects = [
  {
    id: 1,
    name: "Smart City Development Phase 2",
    status: "Active",
    budget: "₹500 Cr",
    progress: 65,
    location: "Mumbai, Maharashtra",
    role: "Lead Manager",
    lastUpdated: "2024-01-20",
    nextMilestone: "Phase 2 Infrastructure Setup",
    pendingUpdates: 2,
    totalUpdates: 15,
  },
  {
    id: 2,
    name: "Metro Rail Extension",
    status: "Active",
    budget: "₹1200 Cr",
    progress: 30,
    location: "Delhi",
    role: "Project Coordinator",
    lastUpdated: "2024-01-18",
    nextMilestone: "Land Acquisition Completion",
    pendingUpdates: 1,
    totalUpdates: 8,
  },
  {
    id: 3,
    name: "Digital Infrastructure Upgrade",
    status: "Completed",
    budget: "₹200 Cr",
    progress: 100,
    location: "Bangalore, Karnataka",
    role: "Technical Lead",
    lastUpdated: "2024-01-15",
    nextMilestone: "Project Closure",
    pendingUpdates: 0,
    totalUpdates: 22,
  },
]

const recentUpdates = [
  {
    id: 1,
    projectName: "Smart City Development Phase 2",
    updateType: "Progress Report",
    description: "Completed installation of 50 smart sensors in Phase 1 area",
    submittedAt: "2024-01-22 10:30",
    status: "pending_verification",
    amount: null,
  },
  {
    id: 2,
    projectName: "Metro Rail Extension",
    updateType: "Milestone Completion",
    description: "Land acquisition for Station Block A completed",
    submittedAt: "2024-01-21 15:45",
    status: "verified",
    amount: "₹25 Cr",
  },
  {
    id: 3,
    projectName: "Smart City Development Phase 2",
    updateType: "Issue Report",
    description: "Delay in sensor calibration due to weather conditions",
    submittedAt: "2024-01-20 09:15",
    status: "under_review",
    amount: null,
  },
]

const stats = [
  {
    title: "My Projects",
    value: myProjects.length.toString(),
    change: "3 Active",
    color: "text-blue-600",
    bgColor: "from-blue-50 to-indigo-50",
  },
  {
    title: "Pending Updates",
    value: myProjects.reduce((sum, p) => sum + p.pendingUpdates, 0).toString(),
    change: "Need verification",
    color: "text-amber-600",
    bgColor: "from-amber-50 to-orange-50",
  },
  {
    title: "Total Updates",
    value: myProjects.reduce((sum, p) => sum + p.totalUpdates, 0).toString(),
    change: "All time",
    color: "text-emerald-600",
    bgColor: "from-emerald-50 to-teal-50",
  },
  {
    title: "Avg Progress",
    value: Math.round(myProjects.reduce((sum, p) => sum + p.progress, 0) / myProjects.length) + "%",
    change: "Across projects",
    color: "text-purple-600",
    bgColor: "from-purple-50 to-pink-50",
  },
]

export default function OfficialsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [updateModalOpen, setUpdateModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<(typeof myProjects)[0] | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      case "On Hold":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUpdateStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending_verification":
        return "bg-yellow-100 text-yellow-800"
      case "under_review":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getUpdateStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />
      case "pending_verification":
        return <Clock className="w-4 h-4" />
      case "under_review":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleUpdateSubmit = (updateData: any) => {
    // Here you would typically submit to your backend/blockchain
    console.log("Update submitted:", updateData)

    // Update the project progress locally (in real app, this would come from backend)
    const updatedProjects = myProjects.map((project) =>
      project.id === updateData.projectId
        ? { ...project, progress: updateData.progressPercentage, lastUpdated: new Date().toISOString().split("T")[0] }
        : project,
    )
    // In real app, you'd update state or refetch data
  }

  const openUpdateModal = (project: (typeof myProjects)[0]) => {
    setSelectedProject(project)
    setUpdateModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="p-6 space-y-8 relative z-10">
        <div
          className={`flex items-center justify-between transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-indigo-700 bg-clip-text text-transparent">
              Officials Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Welcome back, {currentOfficial.name} - {currentOfficial.role}
            </p>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <Plus className="w-4 h-4 mr-2" />
            Submit Update
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={stat.title}
              className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br ${stat.bgColor} border-0 shadow-md overflow-hidden relative ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{stat.title}</p>
                    <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
                    <p className="text-xs text-gray-600">{stat.change}</p>
                  </div>
                  <FolderOpen
                    className={`w-8 h-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  />
                </div>
              </CardContent>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs
          defaultValue="projects"
          className={`space-y-6 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg">
            <TabsTrigger
              value="projects"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-100 data-[state=active]:to-indigo-100"
            >
              My Projects
            </TabsTrigger>
            <TabsTrigger
              value="updates"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-100 data-[state=active]:to-teal-100"
            >
              Recent Updates
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-100 data-[state=active]:to-pink-100"
            >
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* My Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {myProjects.map((project, index) => (
                <Card
                  key={project.id}
                  className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                          {project.name}
                        </CardTitle>
                        <CardDescription className="mt-1 text-gray-600">{project.location}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Budget:</span>
                        <div className="font-semibold text-emerald-700">{project.budget}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">My Role:</span>
                        <div className="font-medium text-gray-700">{project.role}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Next Milestone:</span>
                        <div className="font-medium text-gray-700 text-xs">{project.nextMilestone}</div>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Updated:</span>
                        <div className="text-gray-700 text-xs">{project.lastUpdated}</div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progress</span>
                        <span className="text-sm text-gray-600">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>{project.totalUpdates} total updates</span>
                        {project.pendingUpdates > 0 && (
                          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                            {project.pendingUpdates} pending
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openUpdateModal(project)}
                          className="border-blue-200 hover:bg-blue-100 text-blue-700 hover:text-blue-800 transition-colors duration-300 bg-transparent"
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Update
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-slate-200 hover:bg-slate-100 transition-colors duration-300 bg-transparent"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Recent Updates Tab */}
          <TabsContent value="updates" className="space-y-4">
            {recentUpdates.map((update, index) => (
              <Card
                key={update.id}
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg overflow-hidden ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg text-gray-900">{update.projectName}</CardTitle>
                      <CardDescription className="mt-1 text-gray-600">{update.updateType}</CardDescription>
                    </div>
                    <Badge className={getUpdateStatusColor(update.status)}>
                      {getUpdateStatusIcon(update.status)}
                      <span className="ml-1 capitalize">{update.status.replace("_", " ")}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">{update.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <div>
                        <span className="text-gray-500">Submitted:</span>
                        <div className="text-gray-700">{update.submittedAt}</div>
                      </div>
                    </div>
                    {update.amount && (
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-emerald-600" />
                        <div>
                          <span className="text-gray-500">Amount:</span>
                          <div className="font-semibold text-emerald-700">{update.amount}</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {update.status === "pending_verification" && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-amber-800 text-sm">
                        <Clock className="w-4 h-4 inline mr-2" />
                        This update is pending admin verification. You will be notified once it's reviewed.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Project Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {myProjects.map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{project.name}</span>
                          <span className="text-gray-600">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    Update Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Updates Submitted</span>
                      <span className="text-2xl font-bold text-emerald-600">
                        {myProjects.reduce((sum, p) => sum + p.totalUpdates, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pending Verification</span>
                      <span className="text-2xl font-bold text-amber-600">
                        {myProjects.reduce((sum, p) => sum + p.pendingUpdates, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Response Time</span>
                      <span className="text-lg font-semibold text-blue-600">2.3 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        {/* Project Update Modal */}
        {selectedProject && (
          <ProjectUpdateModal
            open={updateModalOpen}
            onOpenChange={setUpdateModalOpen}
            project={selectedProject}
            onSubmit={handleUpdateSubmit}
          />
        )}
      </div>
    </div>
  )
}
