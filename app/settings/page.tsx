"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Wallet, Database, Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    projectUpdates: true,
    citizenReports: true,
    paymentAlerts: false,
    systemMaintenance: true,
  })

  const [profile, setProfile] = useState({
    name: "Government Administrator",
    email: "admin@thekey.gov.in",
    role: "Super Admin",
    department: "Digital Governance",
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account preferences and system configuration</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save All Changes
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal information and account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={profile.role} onValueChange={(value) => setProfile({ ...profile, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Project Manager">Project Manager</SelectItem>
                      <SelectItem value="Financial Officer">Financial Officer</SelectItem>
                      <SelectItem value="Auditor">Auditor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Language & Region</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Preferred Language</Label>
                    <Select defaultValue="english">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
                        <SelectItem value="tamil">தமிழ் (Tamil)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Select defaultValue="ist">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ist">IST (UTC+05:30)</SelectItem>
                        <SelectItem value="utc">UTC (UTC+00:00)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Configure how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Project Updates</Label>
                    <p className="text-sm text-gray-500">Get notified when projects are updated</p>
                  </div>
                  <Switch
                    checked={notifications.projectUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, projectUpdates: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Citizen Reports</Label>
                    <p className="text-sm text-gray-500">Receive alerts for new citizen feedback</p>
                  </div>
                  <Switch
                    checked={notifications.citizenReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, citizenReports: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Payment Alerts</Label>
                    <p className="text-sm text-gray-500">Get notified about payment transactions</p>
                  </div>
                  <Switch
                    checked={notifications.paymentAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, paymentAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>System Maintenance</Label>
                    <p className="text-sm text-gray-500">Important system updates and maintenance</p>
                  </div>
                  <Switch
                    checked={notifications.systemMaintenance}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemMaintenance: checked })}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Notification Methods</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>Email</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch defaultChecked />
                    <Label>In-App</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <Label>SMS</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>Manage your account security and access controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" className="mt-2" />
                  </div>
                  <Button>Update Password</Button>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Enable 2FA</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">API Access</h3>
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex gap-2">
                      <Input value="sk_live_..." readOnly className="font-mono" />
                      <Button variant="outline">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Blockchain Settings */}
        <TabsContent value="blockchain">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Blockchain Configuration
              </CardTitle>
              <CardDescription>Configure blockchain network and wallet settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Blockchain Network</Label>
                  <Select defaultValue="ethereum">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum Mainnet</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                      <SelectItem value="testnet">Ethereum Testnet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Connected Wallet</Label>
                  <div className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="font-mono">0xABCD...1234</span>
                    <Button variant="outline" size="sm" className="ml-auto bg-transparent">
                      Disconnect
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Gas Price Settings</Label>
                  <Select defaultValue="standard">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow (Lower fees)</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="fast">Fast (Higher fees)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Smart Contract Settings</h3>
                <div className="space-y-2">
                  <Label>Project Registry Contract</Label>
                  <Input value="0x742d35Cc6634C0532925a3b8D4C9db..." readOnly className="font-mono" />
                </div>
                <div className="space-y-2">
                  <Label>Payment Contract</Label>
                  <Input value="0x8ba1f109551bD432803012645Hac..." readOnly className="font-mono" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Configuration
                </CardTitle>
                <CardDescription>Advanced system settings and maintenance options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-sm text-gray-500">Enable maintenance mode for system updates</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Debug Logging</p>
                      <p className="text-sm text-gray-500">Enable detailed system logging</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Backup</p>
                      <p className="text-sm text-gray-500">Automatically backup system data</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Data Management</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline">
                      <Database className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear Cache
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">System Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Version:</span>
                      <div className="font-medium">The Key v2.1.0</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Updated:</span>
                      <div className="font-medium">2024-01-22</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Database Size:</span>
                      <div className="font-medium">2.4 GB</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Active Users:</span>
                      <div className="font-medium">1,247</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
