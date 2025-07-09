"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FileText, Upload, IndianRupee, Send, AlertTriangle, CheckCircle } from "lucide-react"

interface ProjectUpdateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    id: number
    name: string
    status: string
    budget: string
    progress: number
    location: string
    role: string
    lastUpdated: string
    nextMilestone: string
  }
  onSubmit: (updateData: any) => void
}

export function ProjectUpdateModal({ open, onOpenChange, project, onSubmit }: ProjectUpdateModalProps) {
  const [updateData, setUpdateData] = useState({
    updateType: "",
    title: "",
    description: "",
    progressPercentage: project.progress,
    amountInvolved: "",
    milestoneCompleted: "",
    issuesEncountered: "",
    nextSteps: "",
    expectedCompletionDate: "",
    priority: "medium",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!updateData.updateType || !updateData.title || !updateData.description) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      onSubmit({
        ...updateData,
        projectId: project.id,
        projectName: project.name,
        submittedAt: new Date().toLocaleString(),
        status: "pending_verification",
      })

      alert("Update submitted successfully! It will be reviewed by the admin team.")
      setIsSubmitting(false)
      onOpenChange(false)

      // Reset form
      setUpdateData({
        updateType: "",
        title: "",
        description: "",
        progressPercentage: project.progress,
        amountInvolved: "",
        milestoneCompleted: "",
        issuesEncountered: "",
        nextSteps: "",
        expectedCompletionDate: "",
        priority: "medium",
      })
    }, 2000)
  }

  const progressDifference = updateData.progressPercentage - project.progress

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Submit Project Update
          </DialogTitle>
          <DialogDescription>Update progress and details for: {project.name}</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Update Type and Basic Info */}
            <div className="space-y-4">
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
            </div>

            <Separator />

            {/* Progress and Financial Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Progress & Financial Details</h3>

              <div className="space-y-2">
                <Label htmlFor="progress">Update Progress Percentage</Label>
                <div className="space-y-3">
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
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current: {project.progress}%</span>
                      <span>New: {updateData.progressPercentage}%</span>
                      {progressDifference !== 0 && (
                        <span className={progressDifference > 0 ? "text-green-600" : "text-red-600"}>
                          {progressDifference > 0 ? "+" : ""}
                          {progressDifference}%
                        </span>
                      )}
                    </div>
                    <Progress value={updateData.progressPercentage} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount Involved</Label>
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
                  <Label>Priority Level</Label>
                  <Select
                    value={updateData.priority}
                    onValueChange={(value) => setUpdateData({ ...updateData, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
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
            </div>

            <Separator />

            {/* Issues and Next Steps */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Issues & Next Steps</h3>

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
            </div>

            <Separator />

            {/* Document Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Supporting Documents</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                <Button variant="outline" size="sm">
                  Choose Files
                </Button>
                <p className="text-xs text-gray-500 mt-2">Supports PDF, DOC, JPG, PNG files up to 10MB each</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Summary */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-semibold text-lg text-gray-900 mb-3">{project.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Location:</span>
                  <span className="font-medium">{project.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Budget:</span>
                  <span className="font-semibold text-emerald-700">{project.budget}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">My Role:</span>
                  <span className="font-medium">{project.role}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status:</span>
                  <Badge className="bg-green-100 text-green-800">{project.status}</Badge>
                </div>
              </div>

              <Separator className="my-3" />

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Current Progress</span>
                  <span className="text-sm text-gray-600">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>
            </div>

            {/* Submission Guidelines */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h4 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Submission Guidelines
              </h4>
              <ul className="space-y-1 text-sm text-amber-700">
                <li>• Provide accurate and detailed information</li>
                <li>• Include supporting documents when possible</li>
                <li>• Updates will be verified by admin team</li>
                <li>• You'll be notified of verification status</li>
                <li>• False information may result in penalties</li>
              </ul>
            </div>

            {/* Progress Change Alert */}
            {progressDifference !== 0 && (
              <div
                className={`p-4 rounded-lg border ${
                  progressDifference > 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}
              >
                <h4
                  className={`font-semibold mb-2 flex items-center gap-2 ${
                    progressDifference > 0 ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {progressDifference > 0 ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                  Progress Change
                </h4>
                <p className={`text-sm ${progressDifference > 0 ? "text-green-700" : "text-red-700"}`}>
                  {progressDifference > 0
                    ? `Progress will increase by ${progressDifference}%`
                    : `Progress will decrease by ${Math.abs(progressDifference)}%`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white"
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
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting} className="flex-1">
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
