"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, IndianRupee } from "lucide-react"

type Project = {
  id: number
  title: string
  description: string
  budget: string
  location: string
  status: string
  image?: string
}

export function projectsList({ projects }: { projects: Project[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Government Schemes</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((scheme) => (
            <Link key={scheme.id} href={`/scheme/${scheme.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-0">
                  <Image
                    src={scheme.image || "/placeholder.svg"}
                    alt={scheme.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{scheme.title}</CardTitle>
                    <Badge
                      variant={scheme.status === "Completed" ? "default" : "secondary"}
                      className={
                        scheme.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : scheme.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {scheme.status}
                    </Badge>
                  </div>
                  <CardDescription className="mb-4">{scheme.description}</CardDescription>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <IndianRupee className="w-4 h-4" />
                      {scheme.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {scheme.location}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
