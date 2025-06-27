"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe, Wallet, ChevronDown, Copy, ExternalLink } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import Link from "next/link"

export function Navbar() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [language, setLanguage] = useState("English")

  const connectWallet = async () => {
    // Simulate wallet connection
    setIsWalletConnected(true)
    setWalletAddress("0xABCD...1234")
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">The Key</h1>
          </Link>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {/* Language Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Globe className="w-4 h-4 mr-2" />
                {language}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("English")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("हिंदी")}>हिंदी (Hindi)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Wallet Connection */}
          {!isWalletConnected ? (
            <Button onClick={connectWallet} className="bg-blue-600 hover:bg-blue-700">
              <Wallet className="w-4 h-4 mr-2" />
              Connect Wallet
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="font-mono text-sm">{walletAddress}</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Address
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View on Explorer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={disconnectWallet} className="text-red-600">
                  Disconnect Wallet
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}
