// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Badge } from "@/components/ui/badge"
// import { Plus, Upload, MapPin, IndianRupee, Calendar, Building2, FileText, Coins, AlertCircle } from "lucide-react"
// import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract"
// import { ethers } from "ethers"
// import { keccak256, toUtf8Bytes } from "ethers"

// const handleSubmit = async () => {
// try {

//   const projectId = Date.now();

//   // Hash essential project data
//   const shortData = '${projectData.name}-${projectData.budget}-${projectData.state}-${projectData.contractor}';
//   const hash = keccak256(toUtf8Bytes(shortData));

//   // Get wallet contract
//   const provider = new ethers.BrowserProvider(window.ethereum);
//   const signer = await provider.getSigner();
//   const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

//   // Mint project on blockchain
//   const tx = await contract.mintProject(Date.now(), hash);
//   await tx.wait();

//   // Upload full data to supabase
//   const { error } = await supabase.from("projects").insert([
//     {
      
//       name: projectData.name,
//       description: projectData.description,
//       category: projectData.category,
//       location: projectData.location,
//       state: projectData.state,
//       budget: projectData.budget,
//       contractor: projectData.contractor,
//       start_Date: projectData.startDate,
//       end_Date: projectData.endDate,
//       milestones: projectData.milestones,
//       hash,
//     },  
//   ]);
//   if (error) throw error;
//   alert("✅ Project minted on-chain and saved to Supabase!");
// } catch (error) {
//   console.error("Error submitting project:", error);
//   alert("❌ Failed to mint project. Check console for details.");
// }

// export default function NewProjectPage() {
//   const [projectData, setProjectData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     location: "",
//     state: "",
//     budget: "",
//     contractor: "",
//     startDate: "",
//     endDate: "",
//     milestones: [] as string[],
//   })

//   const [newMilestone, setNewMilestone] = useState("")

//   const addMilestone = () => {
//     if (newMilestone.trim()) {
//       setProjectData({
//         ...projectData,
//         milestones: [...projectData.milestones, newMilestone.trim()],
//       })
//       setNewMilestone("")
//     }
//   }

//   const removeMilestone = (index: number) => {
//     setProjectData({
//       ...projectData,
//       milestones: projectData.milestones.filter((_, i) => i !== index),
//     })
//   }

//   const handleSubmit = () => {
//     // Here you would typically submit to blockchain
//     console.log("Project data:", projectData)
//     alert("Project created successfully! Transaction hash: 0xabc123...")
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Add New Project</h1>
//           <p className="text-gray-600 mt-1">Create a new government project and mint it to the blockchain</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <Button variant="outline">Save as Draft</Button>
//           <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
//             <Coins className="w-4 h-4 mr-2" />
//             Mint to Blockchain
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         {/* Main Form */}
//         <div className="lg:col-span-2 space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <FileText className="w-5 h-5" />
//                 Project Information
//               </CardTitle>
//               <CardDescription>Basic information about the government project</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Project Name *</Label>
//                 <Input
//                   id="name"
//                   placeholder="e.g., Smart City Development Phase 2"
//                   value={projectData.name}
//                   onChange={(e) => setProjectData({ ...projectData, name: e.target.value })}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="description">Project Description *</Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Detailed description of the project objectives and scope..."
//                   rows={4}
//                   value={projectData.description}
//                   onChange={(e) => setProjectData({ ...projectData, description: e.target.value })}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label>Project Category *</Label>
//                   <Select
//                     value={projectData.category}
//                     onValueChange={(value) => setProjectData({ ...projectData, category: value })}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select category" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="infrastructure">Infrastructure</SelectItem>
//                       <SelectItem value="road">Road Construction</SelectItem>
//                       <SelectItem value="bridge">Bridge Construction</SelectItem>
//                       <SelectItem value="education">Education</SelectItem>
//                       <SelectItem value="healthcare">Healthcare</SelectItem>
//                       <SelectItem value="transport">Transport</SelectItem>
//                       <SelectItem value="energy">Energy</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>

//                 <div className="space-y-2">
//                   <Label>State *</Label>
//                   <Select
//                     value={projectData.state}
//                     onValueChange={(value) => setProjectData({ ...projectData, state: value })}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select state" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="maharashtra">Maharashtra</SelectItem>
//                       <SelectItem value="karnataka">Karnataka</SelectItem>
//                       <SelectItem value="delhi">Delhi</SelectItem>
//                       <SelectItem value="rajasthan">Rajasthan</SelectItem>
//                       <SelectItem value="kerala">Kerala</SelectItem>
//                       <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
//                       <SelectItem value="gujarat">Gujarat</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="location">Specific Location *</Label>
//                 <Input
//                   id="location"
//                   placeholder="e.g., Sector 15, Mumbai, Maharashtra"
//                   value={projectData.location}
//                   onChange={(e) => setProjectData({ ...projectData, location: e.target.value })}
//                 />
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Building2 className="w-5 h-5" />
//                 Project Details
//               </CardTitle>
//               <CardDescription>Financial and timeline information</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="budget">Total Budget *</Label>
//                 <div className="relative">
//                   <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     id="budget"
//                     placeholder="e.g., 500 Cr"
//                     className="pl-10"
//                     value={projectData.budget}
//                     onChange={(e) => setProjectData({ ...projectData, budget: e.target.value })}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="contractor">Primary Contractor</Label>
//                 <Input
//                   id="contractor"
//                   placeholder="e.g., L&T Construction Ltd."
//                   value={projectData.contractor}
//                   onChange={(e) => setProjectData({ ...projectData, contractor: e.target.value })}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="start-date">Start Date *</Label>
//                   <Input
//                     id="start-date"
//                     type="date"
//                     value={projectData.startDate}
//                     onChange={(e) => setProjectData({ ...projectData, startDate: e.target.value })}
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="end-date">Expected End Date *</Label>
//                   <Input
//                     id="end-date"
//                     type="date"
//                     value={projectData.endDate}
//                     onChange={(e) => setProjectData({ ...projectData, endDate: e.target.value })}
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="w-5 h-5" />
//                 Project Milestones
//               </CardTitle>
//               <CardDescription>Define key milestones for project tracking</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex gap-2">
//                 <Input
//                   placeholder="Enter milestone description..."
//                   value={newMilestone}
//                   onChange={(e) => setNewMilestone(e.target.value)}
//                   onKeyPress={(e) => e.key === "Enter" && addMilestone()}
//                 />
//                 <Button onClick={addMilestone}>
//                   <Plus className="w-4 h-4" />
//                 </Button>
//               </div>

//               {projectData.milestones.length > 0 && (
//                 <div className="space-y-2">
//                   <Label>Defined Milestones:</Label>
//                   <div className="space-y-2">
//                     {projectData.milestones.map((milestone, index) => (
//                       <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
//                         <span>{milestone}</span>
//                         <Button variant="outline" size="sm" onClick={() => removeMilestone(index)}>
//                           Remove
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </div>

//         {/* Sidebar */}
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Project Preview</CardTitle>
//               <CardDescription>Preview how your project will appear</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div>
//                 <h3 className="font-semibold text-lg">{projectData.name || "Project Name"}</h3>
//                 <p className="text-gray-600 text-sm mt-1">
//                   {projectData.description || "Project description will appear here..."}
//                 </p>
//               </div>

//               {projectData.category && <Badge variant="secondary">{projectData.category}</Badge>}

//               <div className="space-y-2 text-sm">
//                 {projectData.location && (
//                   <div className="flex items-center gap-2">
//                     <MapPin className="w-4 h-4 text-gray-500" />
//                     <span>{projectData.location}</span>
//                   </div>
//                 )}
//                 {projectData.budget && (
//                   <div className="flex items-center gap-2">
//                     <IndianRupee className="w-4 h-4 text-green-600" />
//                     <span className="text-green-600 font-semibold">{projectData.budget}</span>
//                   </div>
//                 )}
//                 {projectData.contractor && (
//                   <div className="flex items-center gap-2">
//                     <Building2 className="w-4 h-4 text-gray-500" />
//                     <span>{projectData.contractor}</span>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Upload className="w-5 h-5" />
//                 Documents
//               </CardTitle>
//               <CardDescription>Upload project documents and attachments</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
//                 <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
//                 <p className="text-sm text-gray-600 mb-2">Drag and drop files here</p>
//                 <Button variant="outline" size="sm">
//                   Choose Files
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <AlertCircle className="w-5 h-5 text-yellow-600" />
//                 Blockchain Info
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-2 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Network:</span>
//                 <span>Ethereum Mainnet</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Estimated Gas:</span>
//                 <span>0.025 ETH</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-500">Contract:</span>
//                 <span className="font-mono text-xs">0x742d35...</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }




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

      const tx = await contract.mintProject(projectId, hash)
      const receipt = await tx.wait()

      setTxHash(receipt?.hash)

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
