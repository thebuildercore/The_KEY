"use client"

import { useState, useRef, useCallback } from "react"
import Link from "next/link"
import { ethers, BrowserProvider, keccak256, toUtf8Bytes } from "ethers"
import { supabase } from "@/lib/supabaseClient"
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract"

// UI Components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  FileText,
  Upload,
  IndianRupee,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Send,
} from "lucide-react"


const projectData = {
  id: 1,
  name: "Smart City Development Phase 2",
  status: "Active",
  budget: "₹500 Cr",
  progress: 65,
  location: "Mumbai, Maharashtra",
  role: "Lead Manager",
  lastUpdated: "2024-01-20",
  nextMilestone: "Phase 2 Infrastructure Setup",
}

export default function ProjectUpdatePage({ params }: { params: { id: string } }) {
  const [updateData, setUpdateData] = useState({
    updateType: "",
    title: "",
    description: "",
    progressPercentage: projectData.progress,
    amountInvolved: "",
    milestoneCompleted: "",
    issuesEncountered: "",
    nextSteps: "",
    expectedCompletionDate: "",
    documentsUploaded: [] as string[],
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Enhanced file upload handler (supports drag & drop)
  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return
    setUploading(true)
    const uploadedUrls: string[] = []

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        alert(`${file.name} exceeds 10MB limit.`)
        continue
      }
      const filePath = `updates/${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage
        .from("project-updates")
        .upload(filePath, file)
      if (error) {
        console.error("Upload error:", error)
        continue
      }
      const publicUrl = supabase.storage
        .from("project-updates")
        .getPublicUrl(data.path).data.publicUrl
      uploadedUrls.push(publicUrl)
    }

    setUpdateData((prev) => ({
      ...prev,
      documentsUploaded: [...prev.documentsUploaded, ...uploadedUrls],
    }))
    setUploading(false)
  }

  // Drag & drop handler
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileUpload(e.dataTransfer.files)
      }
    },
    []
  )

  // Remove file handler
  const removeFile = (url: string) => {
    setUpdateData((prev) => ({
      ...prev,
      documentsUploaded: prev.documentsUploaded.filter((u) => u !== url),
    }))
  }

  const handleSubmit = async () => {
    if (!updateData.updateType || !updateData.title || !updateData.description) {
      alert("Please fill in all required fields")
      return
    }
    setIsSubmitting(true)

    try {
      const criticalString = `${projectData.id}-${updateData.title}-${updateData.description}`
      const updateHash = keccak256(toUtf8Bytes(criticalString))
  
      console.log("Attempting to insert update with hash")
      console.log(" Documents uploaded:", updateData.documentsUploaded);

const { data, error } = await supabase
  .from('project_updates')
  .insert([ {
      project_id: projectData.id,
      update_type: updateData.updateType,
      title: updateData.title,
      description: updateData.description,
      progress_percentage: updateData.progressPercentage,
      amount_involved: updateData.amountInvolved,
      milestone_completed: updateData.milestoneCompleted,
      issues_encountered: updateData.issuesEncountered,
      next_steps: updateData.nextSteps,
      // files: updateData.documentsUploaded, // <-- uploaded file URLs
      submitted_by: "0x", // Replace with real wallet if needed
      expected_completion: updateData.expectedCompletionDate,
      update_hash: updateHash,
      timestamp: new Date().toISOString(),
      synced_on_chain: false,

     files: JSON.stringify(updateData.documentsUploaded),}
  ]);
          
      console.log("Supabase insert response:", { data, error });
if (error) {
  console.error("Insert failed:", error);
  alert("Insert failed: " + error.message);
} else {
  console.log("✅ Inserted row:", data);
  alert("Update submitted!");
}
  //     if (error) {
  //       console.error("Supabase insert error:", error)
  // alert("Supabase error: " + error.message)
  // throw error}
      

      const provider = new BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)
      await contract.logUpdate(projectData.id, updateHash)

      alert("Update submitted and logged on chain!")
    } catch (err) {
      console.error(err)
      alert("Error submitting update.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-stone-50">
      <div className="p-6 space-y-6">
        {/* HEADER */}
        <div className="flex items-center gap-4">
          <Link href="/officials">
            <Button variant="outline" size="sm" className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Submit Project Update</h1>
            <p className="text-gray-600 mt-1">Update progress and details for your assigned project</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Update Type and Basic Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Update Information
                </CardTitle>
                <CardDescription>Provide basic information about this project update</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Update Type *</Label>
                  <Select
                    value={updateData.updateType}
                    onValueChange={(value) => setUpdateData({ ...updateData, updateType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select update type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="progress-report">Progress Report</SelectItem>
                      <SelectItem value="milestone-completion">Milestone Completion</SelectItem>
                      <SelectItem value="payment-request">Payment Request</SelectItem>
                      <SelectItem value="issue-report">Issue Report</SelectItem>
                      <SelectItem value="status-change">Status Change</SelectItem>
                      <SelectItem value="resource-request">Resource Request</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Update Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Phase 1 Infrastructure Setup Completed"
                    value={updateData.title}
                    onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide comprehensive details about this update..."
                    rows={4}
                    value={updateData.description}
                    onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Progress and Financial Details */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5" />
                  Progress & Financial Details
                </CardTitle>
                <CardDescription>Update project progress and any financial information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="progress">Current Progress Percentage</Label>
                  <div className="space-y-2">
                    <Input
                      id="progress"
                      type="number"
                      min="0"
                      max="100"
                      value={updateData.progressPercentage}
                      onChange={(e) =>
                        setUpdateData({ ...updateData, progressPercentage: Number.parseInt(e.target.value) || 0 })
                      }
                    />
                    <Progress value={updateData.progressPercentage} className="h-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount Involved (if applicable)</Label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="amount"
                      placeholder="e.g., 25 Cr"
                      className="pl-10"
                      value={updateData.amountInvolved}
                      onChange={(e) => setUpdateData({ ...updateData, amountInvolved: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="milestone">Milestone Completed (if applicable)</Label>
                  <Input
                    id="milestone"
                    placeholder="e.g., Phase 1 Infrastructure Setup"
                    value={updateData.milestoneCompleted}
                    onChange={(e) => setUpdateData({ ...updateData, milestoneCompleted: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="completion-date">Expected Completion Date</Label>
                  <Input
                    id="completion-date"
                    type="date"
                    value={updateData.expectedCompletionDate}
                    onChange={(e) => setUpdateData({ ...updateData, expectedCompletionDate: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Issues and Next Steps */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Issues & Next Steps
                </CardTitle>
                <CardDescription>Document any challenges and outline future actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="issues">Issues Encountered</Label>
                  <Textarea
                    id="issues"
                    placeholder="Describe any challenges, delays, or problems encountered..."
                    rows={3}
                    value={updateData.issuesEncountered}
                    onChange={(e) => setUpdateData({ ...updateData, issuesEncountered: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="next-steps">Next Steps</Label>
                  <Textarea
                    id="next-steps"
                    placeholder="Outline the planned actions for the next phase..."
                    rows={3}
                    value={updateData.nextSteps}
                    onChange={(e) => setUpdateData({ ...updateData, nextSteps: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Supporting Documents
                </CardTitle>
                <CardDescription>Upload relevant documents, photos, or reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center relative"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                  >
                    {uploading ? "Uploading..." : "Choose Files"}
                  </Button>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    accept="application/pdf,image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileUpload(e.target.files)}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Supports PDF, DOC, JPG, PNG files up to 10MB each
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded files preview with remove option and image preview */}
            {updateData.documentsUploaded.length > 0 && (
              <div className="mt-4">
                <Label>Uploaded Files</Label>
                <ul className="list-disc pl-6 text-sm text-gray-700 mt-2 space-y-2">
                  {updateData.documentsUploaded.map((url, index) => (
                    <li key={index} className="flex items-center gap-2">
                      {url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                        <img src={url} alt="preview" className="w-10 h-10 object-cover rounded" />
                      ) : (
                        <FileText className="w-5 h-5 text-gray-400" />
                      )}
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                        {url.split("/").pop()}
                      </a>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500"
                        onClick={() => removeFile(url)}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {/* ... Project Summary Card, Guidelines, and Submit Button */}
            <Button
  onClick={handleSubmit}
  disabled={isSubmitting}
  className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg hover:brightness-110 transition-all duration-300"
>
  {isSubmitting ? (
    <>
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      Submitting...
    </>
  ) : (
    <>
      <Send className="w-4 h-4 mr-2" />
      Submit Update
    </>
  )}
</Button>

          </div>
        </div>
      </div>
    </div>
  )
}
