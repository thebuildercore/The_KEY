"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabaseClient"
import { ethers } from "ethers"
import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  Menu,
  X,
  Play,
  ArrowRight,
  Building2,
  FileText,
  DollarSign,
  Search,
  Users,
  Clock,
  CheckCircle,
  Github,
  Twitter,
  Mail,
  TrendingUp,
  Shield,
  Code,
  Eye,
  Vote,
  Newspaper,
  UserCheck,
  BarChart3,
  Globe,
} from "lucide-react"
import Link from 'next/link';
import Image from 'next/image';
import { IndianRupee, MapPin } from "lucide-react";

type Project = {
   id: string
   title: string
   description: string
   budget: string
   location: string
   status: string
   image?: string
 }
export default function FeaturedProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  // const [currentSlide, setCurrentSlide] = useState(0)
  //  const [achievements, setAchievements] = useState<any[]>([])
  const [walletAddress, setWalletAddress] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeFeature, setActiveFeature] = useState<number | null>(null)
  const [scrollY, setScrollY] = useState(0)

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
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });
        
          
         if (error) {
          console.error("Error fetching projects:", error)
        } else {
          setProjects(data || [])
        }
      } catch (err) {
        console.error("Unexpected error:", err)
      }
    }

    fetchData()
  }, [])
   
// export default function FeaturedProjects({ projects }) {
//   return (
// Animated Counter Component
function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
}: {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

// Parallax Component
function ParallaxElement({
  children,
  speed = 0.5,
  className = "",
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const [offsetY, setOffsetY] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect()
        const scrolled = window.pageYOffset
        const rate = scrolled * speed
        setOffsetY(rate)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed])

  return (
    <div ref={elementRef} className={className} style={{ transform: `translateY(${offsetY}px)` }}>
      {children}
    </div>
  )
}

// Scroll Animation Hook
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return { elementRef, isVisible }
}


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const stats = [
    { icon: Building2, label: "Total Projects Tracked", value: 8450, prefix: "+", color: "text-blue-600" },
    {
      icon: FileText,
      label: "Blockchain Records",
      value: 12.7,
      suffix: "M txns",
      prefix: "+",
      color: "text-green-600",
    },
    {
      icon: DollarSign,
      label: "Funds Under Transparency",
      value: 1204,
      prefix: "₹",
      suffix: " Cr",
      color: "text-purple-600",
    },
    { icon: UserCheck, label: "Officials Logged", value: 14832, color: "text-orange-600" },
    { icon: Users, label: "Citizen Reports", value: 23942, color: "text-red-600" },
    { icon: Clock, label: "Avg Execution Delay", value: -37, suffix: "% vs previous", color: "text-emerald-600" },
  ]

  const features = [
    {
      icon: FileText,
      title: "Tender Lifecycle",
      description: "From issuance to approval, visible to all",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: CheckCircle,
      title: "Execution Milestones",
      description: "Logs, images, timestamps – tamper-proof",
      color: "bg-green-50 text-green-600",
    },
    {
      icon: DollarSign,
      title: "Fund Transfers",
      description: "On-chain tracked budget movements",
      color: "bg-purple-50 text-purple-600",
    },
    {
      icon: Search,
      title: "Blockchain Audit Trail",
      description: "Hashes for every critical action",
      color: "bg-orange-50 text-orange-600",
    },
    {
      icon: UserCheck,
      title: "Official Role Ledger",
      description: "Which officer did what, when",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: Vote,
      title: "Public Feedback",
      description: "Real-time citizen voting & whistleblowing",
      color: "bg-emerald-50 text-emerald-600",
    },
  ]

  const useCases = [
    {
      icon: Users,
      title: "Citizens",
      description: "Track local development & vote on satisfaction",
      color: "bg-blue-500",
    },
    {
      icon: Newspaper,
      title: "Journalists",
      description: "Investigate delays, mismatches in fund use",
      color: "bg-green-500",
    },
    {
      icon: UserCheck,
      title: "Government Officials",
      description: "Earn trust through transparency badges",
      color: "bg-purple-500",
    },
    {
      icon: Code,
      title: "Developers",
      description: "Build tools using public APIs and on-chain data",
      color: "bg-orange-500",
    },
    {
      icon: BarChart3,
      title: "Auditors",
      description: "View timeline and fund flow in real-time",
      color: "bg-red-500",
    },
  ]

  const testimonials = [
    {
      quote: "First time our funds went to actual roads!",
      person: "Village Head",
      location: "Odisha",
    },
    {
      quote: "Found ₹4Cr fund delay in 3 clicks.",
      person: "Journalist",
      location: "UP",
    },
    {
      quote: "Transparency helped me win re-election.",
      person: "MLA",
      location: "MP",
    },
  ]

  const faqs = [
    {
      question: "Is this blockchain secure?",
      answer:
        "Yes, we use enterprise-grade blockchain infrastructure with multi-signature validation and immutable record keeping.",
    },
    {
      question: "Can a citizen file complaints?",
      answer:
        "Citizens can file complaints, vote on project satisfaction, and track the resolution process in real-time.",
    },
    {
      question: "Can officials fake data?",
      answer:
        "No, all data is cryptographically signed and stored on blockchain. Any tampering attempts are immediately detected and logged.",
    },
    {
      question: "How do you verify on-chain logs?",
      answer:
        "Every transaction has a unique hash that can be verified on the blockchain explorer. We provide direct links to verify authenticity.",
    },
    {
      question: "Who controls the backend?",
      answer:
        "The platform is decentralized with governance tokens. No single entity can control or manipulate the data.",
    },
  ]
  const links = [
  { icon: FileText, title: "Tender", subtitle: "Submission", href: "/tender", color: "blue" },
  { icon: CheckCircle, title: "Approved", subtitle: "Verification", href: "/projects", color: "green" },
  { icon: Shield, title: "On-chain", subtitle: "Hash Record", href: "/dashboard", color: "purple" },
  { icon: TrendingUp, title: "Milestone", subtitle: "Tracking", href: "/dashboard", color: "orange" },
  { icon: Building2, title: "Execution", subtitle: "Progress", href: "/officials", color: "red" },
  { icon: Users, title: "Citizen", subtitle: "Verified", href: "/reports", color: "emerald" },
];


  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Simplified Floating Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-2xl"></div>
      </div>
{/* Hero Section with Parallax Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('/indiagate.jpg?height=1080&width=1920')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        {/* Government Building Overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            backgroundImage: `url('/placeholder.svg?height=800&width=1200')`,
            backgroundSize: "contain",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
            opacity: 0.1,
            transform: `translateY(${scrollY * 0.2}px)`,
          }}
        />

        {/* Animated Gradient Overlay */}
        {/* <div className="absolute inset-0 z-20 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-indigo-900/70"></div> */}

        <div className="relative z-30 container mx-auto px-4 text-center py-20">
          <div className="max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium mb-8">
              <Shield className="w-4 h-4 mr-2" />
Government build over trust
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
             KEY to Radical{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-400">
                Transparency
              </span>{" "}
              in Public Projects
            </h1>

            <p className="text-xl text-blue-100 leading-relaxed mb-8 max-w-3xl mx-auto">
              Track tenders, follow the transactions, and hold officials accountability — from issuance to execution. Built on
              blockchain for immutable trust.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                Explore the Platform
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch the Demo
              </Button>
            </div>
          </div>

          {/* Process Flow Cards */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-white mb-2">Complete Project Lifecycle Tracking</h3>
              <p className="text-green-200">From tender approval to verification by the citizen</p>
            </div>

<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
  {links.map((item, index) => (
    <Link href={item.href} key={index}>
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/20 text-center group hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition-all duration-300">
          <item.icon className="w-6 h-6 text-white" />
        </div>
        <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
        <p className="text-xs text-blue-200">{item.subtitle}</p>
      </div>
    </Link>
  ))}
</div>
 {/* Key Benefits Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Eye,
                  title: "Complete Transparency",
                  description:
                    "Every transaction, approval, and milestone is recorded on blockchain for public verification.",
                },
                {
                  icon: Shield,
                  title: "Tamper-Proof Records",
                  description:
                    "Blockchain technology ensures that once data is recorded, it cannot be altered or manipulated.",
                },
                {
                  icon: Users,
                  title: "Citizen Empowerment",
                  description:
                    "Real-time access to project status, fund utilization, and the ability to provide feedback.",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-white">{benefit.title}</h4>
                  </div>
                  <p className="text-blue-200 text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Live Platform Stats */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Platform Statistics</h2>
            <p className="text-lg text-gray-600">Real-time metrics updated every minute</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 bg-white border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  <div
                    className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${
                      stat.color.includes("blue")
                        ? "from-blue-500 to-blue-600"
                        : stat.color.includes("green")
                          ? "from-green-500 to-green-600"
                          : stat.color.includes("purple")
                            ? "from-purple-500 to-purple-600"
                            : stat.color.includes("orange")
                              ? "from-orange-500 to-orange-600"
                              : stat.color.includes("red")
                                ? "from-red-500 to-red-600"
                                : "from-emerald-500 to-emerald-600"
                    } flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-2">
                    <AnimatedCounter end={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
       </section> */}
     <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Featured Government Projects</h2>
          <p className="text-lg text-gray-600">Trust-driven public works powered on-chain</p>
        </div>

        <div className="flex gap-6 overflow-x-auto scrollbar-hide px-2 lg:grid lg:grid-cols-3">
          {projects.map((project) => (
            <Link key={project.id} href={`/project/${project.id}`} className="min-w-[320px] lg:min-w-0 group">
              <Card className="hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white border border-gray-100 shadow-md">
                <CardHeader className="p-0">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                  />
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <CardTitle className="text-lg text-gray-900">{project.title}</CardTitle>
                    <Badge
                      variant={project.status === "Completed" ? "default" : "secondary"}
                      className={`text-xs ${
                        project.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : project.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  <CardDescription className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                  </CardDescription>

                  <div className="flex justify-between items-center text-sm text-gray-500">
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

     

      {/* Use Cases */}
      <section className="py-16 bg-orange-50 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Benefits</h2>
            <p className="text-lg text-gray-600">Transparency that serves everyone in the nation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {useCases.map((useCase, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 bg-white border-0 shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-16 h-16 ${useCase.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{useCase.title}</h3>
                  <p className="text-gray-600 text-sm">{useCase.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Real Success Stories</h2>
            <p className="text-lg text-gray-600">Impact driven by the platform</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 bg-white border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <blockquote className="text-gray-700 italic mb-4 text-lg">"{testimonial.quote}"</blockquote>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-900">{testimonial.person}</div>
                      <div className="text-gray-600">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-16 bg-green">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Interactive Demo</h2>
            <p className="text-lg text-gray-600">See the platform in action</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: "Timeline of Real Project",
                description: "Step-by-step project progression",
                color: "blue",
              },
              { icon: Globe, title: "Map View", description: "Location pins + progress colors", color: "green" },
              {
                icon: Shield,
                title: "Smart Contract Hash",
                description: "Linked to Etherscan / testnet",
                color: "purple",
              },
              {
                icon: UserCheck,
                title: "Official Approval Log",
                description: "Signed steps verification",
                color: "orange",
              },
            ].map((demo, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 bg-white border border-gray-100 shadow-lg"
              >
                <CardContent className="p-6">
                  <demo.icon
                    className={`w-8 h-8 mb-4 ${
                      demo.color === "blue"
                        ? "text-blue-600"
                        : demo.color === "green"
                          ? "text-green-600"
                          : demo.color === "purple"
                            ? "text-purple-600"
                            : "text-orange-600"
                    }`}
                  />
                  <h3 className="font-semibold text-gray-900 mb-2">{demo.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{demo.description}</p>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                   Live Dashboard →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
 {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Everything you need to know about the platform</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-gray-200 shadow-sm">
                <CardContent className="p-6">
                  <details className="group">
                    <summary className="flex justify-between items-center cursor-pointer list-none">
                      <h3 className="font-semibold text-gray-900 text-lg">{faq.question}</h3>
                      <ChevronDown className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Not Just Transparency — A New Era of Governance
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-80 flex items-center justify-center shadow-lg">
              <div className="text-center">
                <Globe className="w-24 h-24 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 text-lg font-medium">Smart Cities with structured Pipelines</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                {[
                  "Blockchain-based citizen complaint resolutions",
                  "Performance-based official promotions (via scoreboards)",
                  "Real-time public feedback → auto-notifies MLAs",
                  "AI forecasting of project delays",
                  "Linking Aadhaar + land records to infra audits",
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Roadmap</h3>
                <div className="flex items-center space-x-4 text-sm flex-wrap gap-2">
                  <Badge className="bg-blue-600 text-white px-3 py-1">Now</Badge>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Badge variant="outline" className="px-3 py-1">
                    Q4 2025
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Badge variant="outline" className="px-3 py-1">
                    2026 Scaling
                  </Badge>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                  <Badge variant="outline" className="px-3 py-1">
                    2027 Partnerships
                  </Badge>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Let's build a transparent tomorrow.</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of citizens, officials, and developers working towards government accountability.
          </p>

          <div className="max-w-md mx-auto flex gap-4 mb-6">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-sm"
            />
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6">Subscribe</Button>
          </div>

          <div>
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 bg-white/5 backdrop-blur-sm px-6"
            >
              Launch Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CK</span>
                </div>
                <span className="text-xl font-bold">KEY</span>
              </div>
              <p className="text-gray-400">A public-first platform for government accountability.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Links</h3>
              <div className="space-y-2 text-gray-400">
                {["Docs", "Privacy", "GitHub", "Contact", "Press"].map((item) => (
                  <Link key={item} href="#" className="block hover:text-white transition-colors">
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
                <Mail className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              </div>
              <p className="text-gray-400 text-sm">Powered by Polygon • Built with ❤️ for transparency</p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 The Key. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        details[open] summary ~ * {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
