"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Plus, Search, Edit, Trash2, CheckCircle, Clock, AlertTriangle } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract"
import { ethers } from "ethers"
import { keccak256, toUtf8Bytes } from "ethers"

type Official = {
  id: number
  name: string
  walletAddress: string
  role: string
  department: string
  status: string
  addedDate: string
  lastActive: string
  projectsAssigned: number
}

export default function ManageOfficialsPage() {
  const [officials, setOfficials] = useState<Official[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [newOfficial, setNewOfficial] = useState({
    name: "",
    walletAddress: "",
    role: "",
    department: "",
  })
  const [addDialogOpen, setAddDialogOpen] = useState(false)
const [selectedOfficial, setSelectedOfficial] = useState<(typeof officials)[0] | null>(null)
  const [projectsDialogOpen, setProjectsDialogOpen] = useState(false)

  // Fetch officials from Supabase
  useEffect(() => {
    const fetchOfficials = async () => {
      const { data, error } = await supabase.from("officials").select("*")
      if (error) {
        console.error("Error fetching officials:", error)
        setOfficials([])
      } else {
        // Map DB fields to UI fields if needed
        setOfficials(
          (data || []).map((o: any) => ({
            id: o.id,
            name: o.name,
            walletAddress: o.wallet_address,
            role: o.role,
            department: o.department,
            status: o.status,
            addedDate: o.added_date,
            lastActive: o.last_active,
            projectsAssigned: o.projects_assigned,
          }))
        )
      }
    }
    fetchOfficials()
  }, [addDialogOpen]) // refetch after adding

  const filteredOfficials = officials.filter((official) => {
    const matchesSearch =
      (official.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (official.walletAddress?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (official.role?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || official.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "suspended":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
const getProjectStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "suspended":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleAddOfficial = async () => {
    try {
      if (!window.ethereum) throw new Error("Wallet not found")
      const { name, walletAddress, role, department } = newOfficial
      if (!name || !walletAddress || !role || !department) {
        alert("Please fill in all fields")
        return
      }

      const hash = keccak256(toUtf8Bytes(`${name}-${walletAddress}`))
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

      // to call smart contract
      const tx = await contract.addOfficial(walletAddress)
      await tx.wait()

      // add metadata to Supabase
      const { error } = await supabase.from("officials").insert([
        {
          name,
          wallet_address: walletAddress,
          role,
          department,
          status: "pending",
          added_date: new Date().toISOString(),
          last_active: new Date().toISOString(),
          projects_assigned: 0,
          hash,
        },
      ])
      if (error) throw error
      setAddDialogOpen(false)
      setNewOfficial({ name: "", walletAddress: "", role: "", department: "" })
      alert("Official added successfully! Transaction hash: " + tx.hash)
    } catch (error) {
      console.error("Error adding official:", error)
      alert("Failed to add official. Please check console for details.")
    }
  }

  function openProjectsDialog(official: Official): void {
    setSelectedOfficial(official)
    setProjectsDialogOpen(true)
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Officials</h1>
          <p className="text-gray-600 mt-1">Add and manage government officials with blockchain access</p>
        </div>
        <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Official
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Official</DialogTitle>
              <DialogDescription>Add a new government official and grant blockchain access</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="official-name">Full Name</Label>
                <Input
                  id="official-name"
                  placeholder="Enter official's full name"
                  value={newOfficial.name}
                  onChange={(e) => setNewOfficial({ ...newOfficial, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wallet-address">Wallet Address</Label>
                <Input
                  id="wallet-address"
                  placeholder="0x..."
                  value={newOfficial.walletAddress}
                  onChange={(e) => setNewOfficial({ ...newOfficial, walletAddress: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select
                  value={newOfficial.role}
                  onValueChange={(value) => setNewOfficial({ ...newOfficial, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project-manager">Project Manager</SelectItem>
                    <SelectItem value="financial-officer">Financial Officer</SelectItem>
                    <SelectItem value="auditor">Auditor</SelectItem>
                    <SelectItem value="district-coordinator">District Coordinator</SelectItem>
                    <SelectItem value="safety-inspector">Safety Inspector</SelectItem>
                    <SelectItem value="admin">Administrator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="e.g., Infrastructure, Finance"
                  value={newOfficial.department}
                  onChange={(e) => setNewOfficial({ ...newOfficial, department: e.target.value })}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddOfficial} className="flex-1">
                  Add Official
                </Button>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Officials</p>
                <p className="text-2xl font-bold text-blue-600">{officials.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Officials</p>
                <p className="text-2xl font-bold text-green-600">
                  {officials.filter((o) => o.status === "active").length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {officials.filter((o) => o.status === "pending").length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Suspended</p>
                <p className="text-2xl font-bold text-red-600">
                  {officials.filter((o) => o.status === "suspended").length}
                </p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Officials</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search officials..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => { setSearchTerm(""); setStatusFilter("all"); }}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Officials Table */}
      <Card>
        <CardHeader>
          <CardTitle>Government Officials</CardTitle>
          <CardDescription>Manage blockchain access and permissions for government officials</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Projects</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOfficials.map((official) => (
                <TableRow key={official.id}>
                  <TableCell className="font-medium">{official.name}</TableCell>
                  <TableCell className="font-mono text-sm">{official.walletAddress}</TableCell>
                  <TableCell>{official.role}</TableCell>
                  <TableCell>{official.department}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(official.status)}>
                      {getStatusIcon(official.status)}
                      <span className="ml-1 capitalize">{official.status}</span>
                    </Badge>
                  </TableCell>
                  <TableCell>{official.projectsAssigned}</TableCell>
                  <TableCell className="text-sm text-gray-600">{official.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{official.projectsAssigned}</span>
                      {official.projectsAssigned > 0 && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => openProjectsDialog(official)}
                            className="text-xs">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredOfficials.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500 text-lg">No officials found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
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
