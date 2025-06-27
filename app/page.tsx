"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { supabase } from "../lib/supabaseClient"
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

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching projects:", error)
      } else {
        setProjects(data as Project[])
      }
    }

    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Carousel */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">The Key - Government Transparency Platform</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unlock transparency in government projects through blockchain technology. Monitor progress, verify
              updates, and ensure accountability with The Key.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-lg shadow-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={project.id} className="w-full flex-shrink-0 relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={1200}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                    <div className="p-8 text-white">
                      <h3 className="text-3xl font-bold mb-2">{project.title}</h3>
                      <p className="text-lg mb-4">{project.description}</p>
                      <div className="flex items-center gap-4">
                        <Badge variant="secondary" className="bg-white text-black">
                          {project.budget}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
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
            <Button size="lg" variant="secondary">
              View All Projects
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-navy-900 bg-transparent"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
