"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertTriangle,
  Users,
  FileText,
  Camera,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import Image from "next/image"

const tenderDetails = {
  id: 1,
  title: "NH-44 Highway Expansion Project",
  state: "Karnataka",
  company: "L&T Construction Ltd.",
  government: "Ministry of Road Transport",
  issueDate: "2024-01-15",
  deadline: "2024-02-15",
  tenderPrice: "₹450 Cr",
  status: "In Progress",
  description:
    "Expansion of National Highway 44 from Bangalore to Mysore covering 120 km stretch with 4-lane configuration",
  progress: 65,
  image: "/placeholder.svg?height=300&width=600",
}

const milestones = [
  {
    id: 1,
    title: "Land Acquisition Completed",
    description: "All required land parcels acquired from farmers with proper compensation",
    date: "2024-01-20",
    time: "10:30 AM",
    wallet: "0x1234...ABCD",
    status: "verified",
    txHash: "0xa3f...9c1",
    amount: "₹45 Cr",
    confirmations: 23,
    reports: 2,
  },
  {
    id: 2,
    title: "Environmental Clearance Obtained",
    description: "Environmental impact assessment completed and clearance received",
    date: "2024-02-05",
    time: "2:15 PM",
    wallet: "0x5678...EFGH",
    status: "verified",
    txHash: "0xb7d...2e4",
    amount: "₹2 Cr",
    confirmations: 18,
    reports: 0,
  },
  {
    id: 3,
    title: "Construction Phase 1 - Foundation Work",
    description: "Foundation and earthwork for first 40km stretch completed",
    date: "2024-02-20",
    time: "4:45 PM",
    wallet: "0x9ABC...IJKL",
    status: "pending",
    txHash: "0xc8e...5f7",
    amount: "₹120 Cr",
    confirmations: 5,
    reports: 1,
  },
]

const paymentHistory = [
  {
    id: 1,
    recipient: "L&T Construction Ltd.",
    amount: "₹45 Cr",
    purpose: "Land Acquisition",
    date: "2024-01-20",
    txHash: "0xa3f...9c1",
    status: "Completed",
  },
  {
    id: 2,
    recipient: "Environmental Consultants Pvt Ltd",
    amount: "₹2 Cr",
    purpose: "Environmental Assessment",
    date: "2024-02-05",
    txHash: "0xb7d...2e4",
    status: "Completed",
  },
  {
    id: 3,
    recipient: "L&T Construction Ltd.",
    amount: "₹120 Cr",
    purpose: "Phase 1 Construction",
    date: "2024-02-20",
    txHash: "0xc8e...5f7",
    status: "Processing",
  },
]

export default function TenderDetailsPage({ params }: { params: { id: string } }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false)
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null)
  const [feedback, setFeedback] = useState("")
  const [feedbackType, setFeedbackType] = useState<"yes" | "no" | null>(null)

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "verified":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "failed":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const openFeedback = (milestoneId: number) => {
    setSelectedMilestone(milestoneId)
    setFeedbackOpen(true)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header with Image */}
      <Card>
        <CardContent className="p-0">
          <div className="relative">
            <Image
              src={tenderDetails.image || "/placeholder.svg"}
              alt={tenderDetails.title}
              width={600}
              height={300}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg">
              <h1 className="text-xl font-bold">{tenderDetails.title}</h1>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Badge className={getStatusColor(tenderDetails.status)} className="text-lg px-4 py-2">
                {getStatusIcon(tenderDetails.status)}
                <span className="ml-2">{tenderDetails.status}</span>
              </Badge>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">{tenderDetails.tenderPrice}</div>
                <div className="text-sm text-gray-500">Total Budget</div>
              </div>
            </div>

            <p className="text-gray-700 mb-6">{tenderDetails.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{tenderDetails.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-gray-500" />
                <span>{tenderDetails.company}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Started: {tenderDetails.issueDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-red-500" />
                <span>Deadline: {tenderDetails.deadline}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Project Progress</span>
                <span className="text-sm text-gray-500">{tenderDetails.progress}%</span>
              </div>
              <Progress value={tenderDetails.progress} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for different sections */}
      <Tabs defaultValue="milestones" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="payments">Payment History</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones" className="space-y-4">
          {milestones.map((milestone) => (
            <Card key={milestone.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{milestone.title}</CardTitle>
                    <CardDescription className="mt-2">{milestone.description}</CardDescription>
                  </div>
                  <Badge className={getStatusColor(milestone.status)}>
                    {getStatusIcon(milestone.status)}
                    <span className="ml-1 capitalize">{milestone.status}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Date & Time:</span>
                    <div className="font-medium">
                      {milestone.date} at {milestone.time}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Updated by:</span>
                    <div className="font-mono">{milestone.wallet}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Amount:</span>
                    <div className="font-semibold text-green-600">{milestone.amount}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Transaction:</span>
                    <Button variant="link" size="sm" className="p-0 h-auto text-sm">
                      {milestone.txHash}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm">{milestone.confirmations} Confirmations</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="text-sm">{milestone.reports} Reports</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => openFeedback(milestone.id)}>
                    <Users className="w-4 h-4 mr-2" />
                    Citizen Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          {paymentHistory.map((payment) => (
            <Card key={payment.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{payment.recipient}</h3>
                    <p className="text-gray-600">{payment.purpose}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span>{payment.date}</span>
                      <Button variant="link" size="sm" className="p-0 h-auto text-sm">
                        {payment.txHash}
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{payment.amount}</div>
                    <Badge
                      variant={payment.status === "Completed" ? "default" : "secondary"}
                      className={
                        payment.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Project Documents
              </CardTitle>
              <CardDescription>Official documents and reports related to this project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Document management system coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Citizen Feedback Dialog */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Citizen Feedback</DialogTitle>
            <DialogDescription>
              Was this milestone completed as described? Your feedback helps ensure transparency.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <Button
                variant={feedbackType === "yes" ? "default" : "outline"}
                onClick={() => setFeedbackType("yes")}
                className="flex-1"
              >
                <ThumbsUp className="w-4 h-4 mr-2" />
                Yes, Completed
              </Button>
              <Button
                variant={feedbackType === "no" ? "destructive" : "outline"}
                onClick={() => setFeedbackType("no")}
                className="flex-1"
              >
                <ThumbsDown className="w-4 h-4 mr-2" />
                No, Report Issue
              </Button>
            </div>

            {feedbackType === "no" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="feedback">Describe the issue</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Please describe what issues you observed..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Camera className="w-4 h-4 mr-2" />
                  Upload Photo Evidence
                </Button>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={() => setFeedbackOpen(false)} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1">Submit Feedback</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
