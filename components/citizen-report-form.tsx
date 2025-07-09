
"use client"

import { useState } from "react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MessageSquare, Camera } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

export interface CitizenReportFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  projectName?: string
  updateDescription?: string
}

interface CitizenReport {
  title: string
  report_type: string
  description: string
  reporter_name: string
  location: string
  project_name?: string
  update_description?: string
}

export function CitizenReportForm({
  open,
  onOpenChange,
  projectName,
  updateDescription,
}: CitizenReportFormProps) {
  const [report, setReport] = useState<CitizenReport>({
    title: "",
    report_type: "",
    description: "",
    reporter_name: "",
    location: "",
    project_name: projectName,
    update_description: updateDescription,
  })

  const handleSubmit = async () => {
    if (!report.report_type || !report.description) {
      alert("Please fill in the required fields")
      return
    }

    const { error } = await supabase.from("reports").insert([
      {
        title: report.title || null,
        report_type: report.report_type,
        description: report.description,
        reporter_name: report.reporter_name || null,
        location: report.location || null,
        project_name: report.project_name || null,
        update_description: report.update_description || null,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("❌ Supabase insert error:", error)
      alert("There was an error submitting your report.")
      return
    }

    alert("Report submitted successfully!")
    onOpenChange(false)

    setReport({
      title: "",
      report_type: "",
      description: "",
      reporter_name: "",
      location: "",
      project_name: projectName,
      update_description: updateDescription,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-slate-600" />
            Submit Citizen Report
          </DialogTitle>
          <DialogDescription>
            Report an issue or provide feedback about this project update. Your input helps ensure transparency and
            accountability.
          </DialogDescription>
        </DialogHeader>

        {report.project_name && (
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <h4 className="font-semibold text-slate-800 mb-1">Project: {report.project_name}</h4>
            {report.update_description && (
              <p className="text-sm text-slate-600">Update: {report.update_description}</p>
            )}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="e.g., Poor Construction Quality"
            value={report.title}
            onChange={(e) => setReport({ ...report, title: e.target.value })}
            className="border-slate-200 focus:border-slate-400 transition-colors duration-300"
          />
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reporter-name">Your Name</Label>
            <Input
              id="reporter-name"
              placeholder="Enter your name (optional - you can report anonymously)"
              value={report.reporter_name}
              onChange={(e) => setReport({ ...report, reporter_name: e.target.value })}
              className="border-slate-200 focus:border-slate-400 transition-colors duration-300"
            />
            <p className="text-xs text-gray-500">Leave blank to submit anonymously</p>
          </div>

          <div className="space-y-2">
            <Label>Report Type *</Label>
            <Select
              value={report.report_type}
              onValueChange={(value) => setReport({ ...report, report_type: value })}
            >
              <SelectTrigger className="border-slate-200 focus:border-slate-400 transition-colors duration-300">
                <SelectValue placeholder="Select the type of report" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="quality-issue">Quality Issue</SelectItem>
                <SelectItem value="progress-verification">Progress Verification</SelectItem>
                <SelectItem value="delivery-issue">Delivery Issue</SelectItem>
                <SelectItem value="safety-concern">Safety Concern</SelectItem>
                <SelectItem value="positive-feedback">Positive Feedback</SelectItem>
                <SelectItem value="corruption-concern">Corruption Concern</SelectItem>
                <SelectItem value="environmental-impact">Environmental Impact</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Specific Location</Label>
            <Input
              id="location"
              placeholder="e.g., Near Main Gate, Block A, Sector 15"
              value={report.location}
              onChange={(e) => setReport({ ...report, location: e.target.value })}
              className="border-slate-200 focus:border-slate-400 transition-colors duration-300"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Please provide detailed information about your observation, concern, or feedback..."
              value={report.description}
              onChange={(e) => setReport({ ...report, description: e.target.value })}
              rows={4}
              className="border-slate-200 focus:border-slate-400 transition-colors duration-300"
            />
            <p className="text-xs text-gray-500">Be as specific as possible to help us address your concern</p>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-lg p-6 text-center hover:border-slate-300 transition-colors duration-300">
            <Camera className="w-8 h-8 mx-auto mb-2 text-slate-400" />
            <p className="text-sm text-slate-600 mb-2">Upload Photo Evidence (Optional)</p>
            <Button variant="outline" size="sm" className="bg-transparent border-slate-200 hover:bg-slate-50">
              Choose Files
            </Button>
            <p className="text-xs text-gray-500 mt-2">Supports JPG, PNG files up to 5MB each</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-800 mb-2">Important Notice</h4>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Your report will be reviewed by relevant authorities</li>
              <li>• False reports may result in legal consequences</li>
              <li>• You may be contacted for additional information</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-gradient-to-r from-slate-600 to-gray-700 hover:from-slate-700 hover:to-gray-800 text-white transition-all duration-300 hover:-translate-y-1"
            >
              Submit Report
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 bg-transparent border-slate-200 hover:bg-slate-50 transition-colors duration-300"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
