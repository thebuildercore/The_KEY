// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
// import { Search, Filter, MapPin, ExternalLink, Eye, CheckCircle, Clock, AlertTriangle, IndianRupee } from "lucide-react"
// import Link from "next/link"

// const projects = [
//   {
//     id: 1,
//     name: "Smart City Development Phase 2",
//     location: "Mumbai, Maharashtra",
//     budget: "₹500 Cr",
//     contractor: "L&T Construction Ltd.",
//     status: "Active",
//     lastUpdated: "2024-01-20",
//     updatedBy: "0x1234...ABCD",
//     txHash: "0xa3f...9c1",
//     progress: 65,
//     category: "Infrastructure",
//   },
//   {
//     id: 2,
//     name: "Rural Road Connectivity",
//     location: "Rajasthan",
//     budget: "₹250 Cr",
//     contractor: "Hindustan Construction Co.",
//     status: "Active",
//     lastUpdated: "2024-01-18",
//     updatedBy: "0x5678...EFGH",
//     txHash: "0xb7d...2e4",
//     progress: 45,
//     category: "Road",
//   },
//   {
//     id: 3,
//     name: "Digital Education Initiative",
//     location: "Kerala",
//     budget: "₹150 Cr",
//     contractor: "Tech Mahindra Ltd.",
//     status: "Completed",
//     lastUpdated: "2024-01-15",
//     updatedBy: "0x9ABC...IJKL",
//     txHash: "0xc8e...5f7",
//     progress: 100,
//     category: "Education",
//   },
//   {
//     id: 4,
//     name: "Metro Rail Extension",
//     location: "Delhi",
//     budget: "₹1200 Cr",
//     contractor: "Tata Projects Ltd.",
//     status: "Active",
//     lastUpdated: "2024-01-22",
//     updatedBy: "0xDEF0...MNOP",
//     txHash: "0xd9f...8a0",
//     progress: 30,
//     category: "Transport",
//   },
//   {
//     id: 5,
//     name: "Hospital Modernization",
//     location: "Tamil Nadu",
//     budget: "₹80 Cr",
//     contractor: "Apollo Infrastructure",
//     status: "Failed",
//     lastUpdated: "2024-01-10",
//     updatedBy: "0xABC1...2345",
//     txHash: "0xe1a...3b5",
//     progress: 20,
//     category: "Healthcare",
//   },
// ]

// export default function ProjectsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [viewMode, setViewMode] = useState<"table" | "grid">("table")

//   const filteredProjects = projects.filter((project) => {
//     const matchesSearch =
//       project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       project.contractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       project.location.toLowerCase().includes(searchTerm.toLowerCase())
//     const matchesStatus = statusFilter === "all" || project.status.toLowerCase() === statusFilter.toLowerCase()
//     const matchesCategory = categoryFilter === "all" || project.category.toLowerCase() === categoryFilter.toLowerCase()

//     return matchesSearch && matchesStatus && matchesCategory
//   })

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "active":
//         return "bg-green-100 text-green-800"
//       case "completed":
//         return "bg-blue-100 text-blue-800"
//       case "failed":
//         return "bg-red-100 text-red-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const getStatusIcon = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "active":
//         return <Clock className="w-4 h-4" />
//       case "completed":
//         return <CheckCircle className="w-4 h-4" />
//       case "failed":
//         return <AlertTriangle className="w-4 h-4" />
//       default:
//         return <Clock className="w-4 h-4" />
//     }
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">All Projects</h1>
//           <p className="text-gray-600 mt-1">Monitor and track all government projects across the platform</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant={viewMode === "table" ? "default" : "outline"} size="sm" onClick={() => setViewMode("table")}>
//             Table View
//           </Button>
//           <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
//             Grid View
//           </Button>
//         </div>
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Filter className="w-5 h-5" />
//             Filter Projects
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <Input
//                 placeholder="Search projects..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="active">Active</SelectItem>
//                 <SelectItem value="completed">Completed</SelectItem>
//                 <SelectItem value="failed">Failed</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Categories</SelectItem>
//                 <SelectItem value="infrastructure">Infrastructure</SelectItem>
//                 <SelectItem value="road">Road</SelectItem>
//                 <SelectItem value="education">Education</SelectItem>
//                 <SelectItem value="transport">Transport</SelectItem>
//                 <SelectItem value="healthcare">Healthcare</SelectItem>
//               </SelectContent>
//             </Select>
//             <Button variant="outline">Reset Filters</Button>
//             <Badge variant="secondary" className="flex items-center justify-center">
//               {filteredProjects.length} Projects
//             </Badge>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Table View */}
//       {viewMode === "table" && (
//         <Card>
//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Project Name</TableHead>
//                   <TableHead>Location</TableHead>
//                   <TableHead>Budget</TableHead>
//                   <TableHead>Contractor</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Progress</TableHead>
//                   <TableHead>Last Updated</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredProjects.map((project) => (
//                   <TableRow key={project.id}>
//                     <TableCell className="font-medium">{project.name}</TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-1">
//                         <MapPin className="w-4 h-4 text-gray-500" />
//                         {project.location}
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-1 text-green-600 font-semibold">
//                         <IndianRupee className="w-4 h-4" />
//                         {project.budget.replace("₹", "")}
//                       </div>
//                     </TableCell>
//                     <TableCell>{project.contractor}</TableCell>
//                     <TableCell>
//                       <Badge className={getStatusColor(project.status)}>
//                         {getStatusIcon(project.status)}
//                         <span className="ml-1">{project.status}</span>
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <div className="w-16 bg-gray-200 rounded-full h-2">
//                           <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
//                         </div>
//                         <span className="text-sm text-gray-600">{project.progress}%</span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="text-sm">
//                         <div>{project.lastUpdated}</div>
//                         <div className="text-gray-500 font-mono text-xs">{project.updatedBy}</div>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Link href={`/tender/${project.id}`}>
//                           <Button variant="outline" size="sm">
//                             <Eye className="w-4 h-4 mr-1" />
//                             View
//                           </Button>
//                         </Link>
//                         <Button variant="link" size="sm" className="p-0">
//                           <ExternalLink className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//       )}

//       {/* Grid View */}
//       {viewMode === "grid" && (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredProjects.map((project) => (
//             <Card key={project.id} className="hover:shadow-lg transition-shadow">
//               <CardHeader>
//                 <div className="flex items-start justify-between">
//                   <CardTitle className="text-lg leading-tight">{project.name}</CardTitle>
//                   <Badge className={getStatusColor(project.status)}>
//                     {getStatusIcon(project.status)}
//                     <span className="ml-1">{project.status}</span>
//                   </Badge>
//                 </div>
//                 <CardDescription className="flex items-center gap-1">
//                   <MapPin className="w-4 h-4" />
//                   {project.location}
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4 text-sm">
//                   <div>
//                     <span className="text-gray-500">Budget:</span>
//                     <div className="font-semibold text-green-600">{project.budget}</div>
//                   </div>
//                   <div>
//                     <span className="text-gray-500">Progress:</span>
//                     <div className="font-semibold">{project.progress}%</div>
//                   </div>
//                 </div>

//                 <div>
//                   <span className="text-gray-500 text-sm">Contractor:</span>
//                   <div className="font-medium">{project.contractor}</div>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t">
//                   <div className="text-xs text-gray-500">Updated: {project.lastUpdated}</div>
//                   <Link href={`/tender/${project.id}`}>
//                     <Button variant="outline" size="sm">
//                       <Eye className="w-4 h-4 mr-1" />
//                       View Details
//                     </Button>
//                   </Link>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}

//       {filteredProjects.length === 0 && (
//         <Card>
//           <CardContent className="text-center py-12">
//             <p className="text-gray-500 text-lg">No projects found matching your criteria</p>
//             <Button
//               variant="outline"
//               className="mt-4 bg-transparent"
//               onClick={() => {
//                 setSearchTerm("")
//                 setStatusFilter("all")
//                 setCategoryFilter("all")
//               }}
//             >
//               Clear Filters
//             </Button>
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, IndianRupee, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import Image from "next/image"

export default function ProjectDetailPage() {
  const params = useParams()
  const projectId = params?.id as string
  const [project, setProject] = useState<any>(null)

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", projectId).single()
      if (error) {
        console.error("Error fetching project:", error)
      } else {
        setProject(data)
      }
    }
    if (projectId) fetchProject()
  }, [projectId])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "failed":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  if (!project) return <p className="p-6 text-center text-gray-500">Loading project details...</p>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={800}
            height={400}
            className="rounded-lg w-full object-cover h-64"
          />
          <CardTitle className="text-2xl mt-4">{project.title}</CardTitle>
          <CardDescription className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            {project.location}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-800 text-lg">{project.description}</p>

          <div className="flex items-center gap-4">
            <Badge className={getStatusColor(project.status)}>
              {getStatusIcon(project.status)}
              <span className="ml-1">{project.status}</span>
            </Badge>
            <div className="flex items-center text-green-700 font-semibold">
              <IndianRupee className="w-4 h-4 mr-1" />
              {project.budget}
            </div>
          </div>

          {project.contractor && (
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Contractor:</span> {project.contractor}
            </p>
          )}

          {project.lastUpdated && (
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Last Updated:</span> {project.lastUpdated}
            </p>
          )}

          {project.updatedBy && (
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Updated By:</span> {project.updatedBy}
            </p>
          )}

          {project.txHash && (
            <p className="text-sm text-gray-500">
              <span className="font-semibold">Transaction Hash:</span> {project.txHash}
            </p>
          )}

          {typeof project.progress === "number" && (
            <div className="pt-4">
              <span className="text-sm text-gray-500 font-semibold">Progress:</span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${project.progress}%` }}></div>
                </div>
                <span className="text-sm text-gray-600">{project.progress}%</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
