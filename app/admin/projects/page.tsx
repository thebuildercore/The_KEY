
"use client"

import {useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  IndianRupee,
  Building2,
  FileText,
  Coins,
  Calendar,
  Upload,
  AlertCircle,
} from "lucide-react"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract"
import { ethers } from "ethers"
import { keccak256, toUtf8Bytes } from "ethers"
import { supabase } from "@/lib/supabaseClient"
import { logEvent } from "@/utils/logEvent"


export default function AllProjectsPage() {
  const [projectData, setProjectData] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    state: "",
    budget: "",
    contractor: "",
    startDate: "",
    endDate: "",
    milestones: [] as string[],
  })

  const [newMilestone, setNewMilestone] = useState("")
  const [txHash, setTxHash] = useState("")
  const [projectHash, setProjectHash] = useState("")

  const addMilestone = () => {
    if (newMilestone.trim()) {
      setProjectData({
        ...projectData,
        milestones: [...projectData.milestones, newMilestone.trim()],
      })
      setNewMilestone("")
    }
  }

  const removeMilestone = (index: number) => {
    setProjectData({
      ...projectData,
      milestones: projectData.milestones.filter((_, i) => i !== index),
    })
  }

  const handleSubmit = async () => {
    try {
      const projectId = Date.now()
      const shortData = `${projectData.name}-${projectData.budget}-${projectData.state}-${projectData.contractor}`
      const hash = keccak256(toUtf8Bytes(shortData))
      console.log("Project Hash:", hash)
      setProjectHash(hash)

      if (!window.ethereum) throw new Error("Wallet not found")

      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
//contract call
      const tx = await contract.mintProject(projectId, hash)
      const receipt = await tx.wait()

      setTxHash(receipt?.hash)
// supabase call
      const { error } = await supabase.from("projects").insert([
        {
          id: projectId,
          title: projectData.name,
          description: projectData.description,
          department: projectData.category,
          budget: projectData.budget,
          start_date: projectData.startDate,
          end_date: projectData.endDate,
          status: "ongoing",
          created_at: new Date().toISOString(),
        },
      ])

      if (error) throw error
      // add ;og event here 
       await logEvent({
      level: "info",
      category: "blockchain",
      action: "Project Created",
      details: `Project '${projectId}' minted`,
      user: signer.address,
      txHash: tx.hash,
      gasUsed: "0.025 ETH", // or get from tx.receipt if needed
    })

      alert("✅ Project created and minted successfully!")
    } catch (err) {
      console.error("❌ Error minting project:", err)
      alert("❌ Failed to create project.")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Project</h1>
          <p className="text-gray-600 mt-1">Create a new government project and mint it to the blockchain</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
            <Coins className="w-4 h-4 mr-2" />
            Mint to Blockchain
          </Button>
        </div>
      </div>
      {txHash && (
        <p className="text-sm text-green-600">
          ✅ <strong>Tx:</strong>{" "}
          <a href={`https://amoy.polygonscan.com/tx/${txHash}`} target="_blank" className="underline">
            {txHash.slice(0, 10)}...
          </a>
        </p>
      )}
      {projectHash && (
        <p className="text-sm text-gray-600">
          <strong>Project Hash:</strong> {projectHash.slice(0, 20)}...
        </p>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" /> Project Information
          </CardTitle>
          <CardDescription>Fill out the details of the project</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Project Name *</Label>
            <Input
              placeholder="e.g., Smart City Development"
              value={projectData.name}
              onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Description *</Label>
            <Textarea
              placeholder="Brief project description..."
              value={projectData.description}
              onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Category *</Label>
            <Select
              value={projectData.category}
              onValueChange={(val) => setProjectData({ ...projectData, category: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="healthcare">Healthcare</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Location *</Label>
            <Input
              placeholder="e.g., Sector 21, Delhi"
              value={projectData.location}
              onChange={(e) => setProjectData({ ...projectData, location: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>State *</Label>
            <Input
              placeholder="e.g., Delhi"
              value={projectData.state}
              onChange={(e) => setProjectData({ ...projectData, state: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Budget *</Label>
            <Input
              placeholder="e.g., 500 Cr"
              value={projectData.budget}
              onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Contractor</Label>
            <Input
              placeholder="e.g., L&T Construction"
              value={projectData.contractor}
              onChange={(e) => setProjectData({ ...projectData, contractor: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Start Date *</Label>
            <Input
              type="date"
              value={projectData.startDate}
              onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>End Date *</Label>
            <Input
              type="date"
              value={projectData.endDate}
              onChange={(e) => setProjectData({ ...projectData, endDate: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
