"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    short_description: "",
    long_description: "",
    image_url: "",
    extra_images: [] as string[]
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin123") { // Change to your desired password
      setAuthenticated(true)
      setAuthError("")
    } else {
      setAuthError("Incorrect password")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)
    setMessage("")

    try {
      // First upload the image
      let imageUrl = ""
      if (imageFile) {
        const formDataUpload = new FormData()
        formDataUpload.append("file", imageFile)

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formDataUpload
        })

        if (!uploadRes.ok) {
          throw new Error("Failed to upload image")
        }

        const uploadData = await uploadRes.json()
        imageUrl = uploadData.url
      }

      // Then create the project
      const projectData = {
        ...formData,
        image_url: imageUrl
      }

      const res = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData)
      })

      if (!res.ok) {
        throw new Error("Failed to create project")
      }

      setMessage("Project created successfully!")
      setFormData({
        title: "",
        short_description: "",
        long_description: "",
        image_url: "",
        extra_images: []
      })
      setImageFile(null)

    } catch (error) {
      setMessage("Error: " + (error as Error).message)
    } finally {
      setUploading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Admin Access</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAuth} className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Login</Button>
                {authError && <p className="text-sm text-red-500">{authError}</p>}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="short_description">Short Description</Label>
                <Textarea
                  id="short_description"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="long_description">Long Description</Label>
                <Textarea
                  id="long_description"
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="image">Project Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              <Button type="submit" disabled={uploading}>
                {uploading ? "Creating..." : "Create Project"}
              </Button>

              {message && (
                <p className={`text-sm ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
                  {message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}