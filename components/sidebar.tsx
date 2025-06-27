"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar as SidebarPrimitive,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  FolderOpen,
  Plus,
  FileText,
  MessageSquare,
  Settings,
  Shield,
  Users,
  Activity,
} from "lucide-react"

const menuItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "All Projects",
    url: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Project Updates",
    url: "/updates",
    icon: FileText,
    badge: "12",
  },
  {
    title: "Citizen Reports",
    url: "/reports",
    icon: MessageSquare,
    badge: "5",
  },
]

const adminItems = [
  {
    title: "Add New Project",
    url: "/admin/projects/new",
    icon: Plus,
  },
  {
    title: "Manage Officials",
    url: "/admin/officials",
    icon: Users,
  },
  {
    title: "System Logs",
    url: "/admin/logs",
    icon: Activity,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isAdmin] = useState(true) // This would be determined by wallet address

  return (
    <SidebarPrimitive className="border-r">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Shield className="w-6 h-6 text-blue-600" />
          <span className="font-semibold text-gray-900">The Key</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin Panel
              </div>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <Link href={item.url} className="flex items-center gap-3">
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/settings" className="flex items-center gap-3">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarPrimitive>
  )
}
