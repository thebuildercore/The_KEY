"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "../lib/supabaseClient"
import { ethers } from "ethers"
import {
  Building2,
  RouteIcon as Road,
  GraduationCap,
  BracketsIcon as Bridge,
  Hospital,
  Zap,
  ChevronRight,
  MapPin,
  IndianRupee,
  Sparkles,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type Project = {
  id: string
  title: string
  description: string
  budget: string
  location: string
  status: string
  image?: string
}


const schemes = [
  {
    id: 1,
    title: "Smart City Development",
    description: "Digital infrastructure and smart governance solutions",
    budget: "₹500 Cr",
    location: "Mumbai, Maharashtra",
    status: "Active",
    image: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1200&q=80", // New working city image
  },
  {
    id: 2,
    title: "Rural Road Connectivity",
    description: "Connecting remote villages with paved roads",
    budget: "₹250 Cr",
    location: "Rajasthan",
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Digital Education Initiative",
    description: "Providing tablets and internet connectivity to schools",
    budget: "₹150 Cr",
    location: "Kerala",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
  },
]

const categories = [
  {
    id: "road",
    name: "Road Construction",
    icon: Road,
    count: 45,
    color: "bg-blue-500",
  },
  {
    id: "bridge",
    name: "Bridge Construction",
    icon: Bridge,
    count: 12,
    color: "bg-green-500",
  },
  {
    id: "school",
    name: "School Construction",
    icon: GraduationCap,
    count: 28,
    color: "bg-purple-500",
  },
  {
    id: "hospital",
    name: "Hospital Construction",
    icon: Hospital,
    count: 15,
    color: "bg-red-500",
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    icon: Building2,
    count: 33,
    color: "bg-orange-500",
  },
  {
    id: "energy",
    name: "Energy Projects",
    icon: Zap,
    count: 19,
    color: "bg-yellow-500",
  },
]

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  //  const [achievements, setAchievements] = useState<any[]>([])
  const [walletAddress, setWalletAddress] = useState("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])
  

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
          setWalletAddress(accounts[0]);
          console.log("Connected Wallet:", accounts[0]);
        } catch (error) {
          console.error("Error connecting wallet:", error);
        }
      } else {
        alert("Please install a web3 wallet like MetaMask to connect.");
      }
    };
 useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: projectData, error: projectError } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (projectError) {
          console.error("Projects error:", projectError);
        } else {
          setProjects(projectData as Project[]);
        }
      } catch (err) {
        console.log("Unexpected error during fetch", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-navy-800 text-white">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-emerald-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
       {/* Hero Carousel Section */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className={`text-center mb-12 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-700 mb-6 animate-bounce">
              <Sparkles className="w-4 h-4" />
              Blockchain-Powered Transparency
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
              The Key
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Unlock transparency in government projects through{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">
                blockchain technology
              </span>
              . Monitor progress, verify updates, and ensure accountability.
            </p>
          </div>

          {/* Enhanced Carousel */}
          <div
            className={`relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 z-10"></div>
            <div
              className="flex transition-all duration-700 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {schemes.map((scheme, index) => (
                <div key={scheme.id} className="w-full flex-shrink-0 relative group">
                  <Image
                    src={scheme.image || "/placeholder.svg"}
                    alt={scheme.title}
                    width={1200}
                    height={400}
                    className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end z-20">
                    <div className="p-8 text-white transform transition-all duration-500 group-hover:translate-y-0 translate-y-2">
                      <h3 className="text-4xl font-bold mb-2 drop-shadow-lg">{scheme.title}</h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Carousel Controls */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
              {schemes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? "bg-white scale-125 shadow-lg"
                      : "bg-white/60 hover:bg-white/80 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Government Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.id} href={`/project/${project.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="p-0">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge
                        variant={project.status === "Completed" ? "default" : "secondary"}
                        className={
                          project.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : project.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <CardDescription className="mb-4">{project.description}</CardDescription>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {project.budget}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {project.location}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4`}
                    >
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{category.name}</h3>
                    <p className="text-xs text-gray-600">{category.count} Projects</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    
   
         

      {/* CTA Section */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Unlock Transparent Governance</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every project update is recorded on the blockchain, ensuring complete transparency and accountability in
            government spending.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/projects">
              <Button size="lg"
               className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group" 
               variant="secondary">
                View All Projects
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white hover:text-slate-900 px-8 py-4 rounded-xl font-semibold backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-transparent"
              onClick={connectWallet}
            >
              
              {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect wallet"}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

