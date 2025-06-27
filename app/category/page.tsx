"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Calendar, IndianRupee, Building2, Search, Filter, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"

const tenders = [
  {
    id: 1,
    title: "NH-44 Highway Expansion Project",
    state: "Karnataka",
    company: "L&T Construction Ltd.",
    government: "Ministry of Road Transport",
    issueDate: "2024-01-15",
    deadline: "2024-02-15",
    tenderPrice: "₹450 Cr",
    status: "Active",
    description: "Expansion of National Highway 44 from Bangalore to Mysore",
  },
  {
    id: 2,
    title: "Rural Road Connectivity - Phase 3",
    state: "Rajasthan",
    company: "Hindustan Construction Co.",
    government: "State PWD Department",
    issueDate: "2024-01-10",
    deadline: "2024-02-10",
    tenderPrice: "₹280 Cr",
    status: "Under Review",
    description: "Connecting 150 villages with all-weather roads",
  },
  {
    id: 3,
    title: "Metro Rail Extension Project",
    state: "Maharashtra",
    company: "Tata Projects Ltd.",
    government: "Mumbai Metro Rail Corporation",
    issueDate: "2024-01-05",
    deadline: "2024-02-05",
    tenderPrice: "₹1,200 Cr",
    status: "Awarded",
    description: "Extension of Metro Line 3 from Colaba to SEEPZ",
  },
  {
    id: 4,
    title: "Coastal Road Development",
    state: "Kerala",
    company: "Larsen & Toubro",
    government: "Kerala State PWD",
    issueDate: "2023-12-20",
    deadline: "2024-01-20",
    tenderPrice: "₹320 Cr",
    status: "Completed",
    description: "Development of coastal road from Kochi to Alappuzha",
  },
]

export default function CategoryPage({ params }: { params: { id: string } }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")

  const categoryNames: { [key: string]: string } = {
    road: "Road Construction",
    bridge: "Bridge Construction",
    school: "School Construction",
    hospital: "Hospital Construction",
    infrastructure: "Infrastructure",
    energy: "Energy Projects",
  }

  const filteredTenders = tenders.filter((tender) => {
    const matchesSearch =
      tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tender.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || tender.status.toLowerCase().includes(statusFilter.toLowerCase())
    const matchesState = stateFilter === "all" || tender.state === stateFilter

    return matchesSearch && matchesStatus && matchesState
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800"
      case "under review":
        return "bg-yellow-100 text-yellow-800"
      case "awarded":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Clock className="w-4 h-4" />
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{categoryNames[params.id] || "Government Tenders"}</h1>
          <p className="text-gray-600 mt-1">Browse and track government tenders in this category</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {filteredTenders.length} Tenders
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter Tenders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search tenders..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="under review">Under Review</SelectItem>
                <SelectItem value="awarded">Awarded</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={stateFilter} onValueChange={setStateFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="Karnataka">Karnataka</SelectItem>
                <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                <SelectItem value="Kerala">Kerala</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">Reset Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tenders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenders.map((tender) => (
          <Link key={tender.id} href={`/tender/${tender.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg leading-tight">{tender.title}</CardTitle>
                  <Badge className={getStatusColor(tender.status)}>
                    {getStatusIcon(tender.status)}
                    <span className="ml-1">{tender.status}</span>
                  </Badge>
                </div>
                <CardDescription>{tender.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{tender.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-gray-500" />
                    <span className="truncate">{tender.company}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Issued: {tender.issueDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span>Deadline: {tender.deadline}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <IndianRupee className="w-5 h-5 text-green-600" />
                    <span className="text-lg font-semibold text-green-600">{tender.tenderPrice}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>

                <div className="text-xs text-gray-500">
                  <span className="font-medium">Government:</span> {tender.government}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredTenders.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500 text-lg">No tenders found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setStateFilter("all")
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
