import { createClient } from "@/lib/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { title, short_description, long_description, image_url } = await request.json()

    if (!title || !short_description) {
      return NextResponse.json({ error: "Title and short description are required" }, { status: 400 })
    }

    const supabase = await createClient()

    const projectData = {
      title,
      short_description,
      long_description: long_description || "",
      image_url: image_url || "/placeholder.svg",
      extra_images: "[]"
    }

    const { error } = await supabase.from("projects").insert(projectData)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
    }

    return NextResponse.json({ success: true, project: projectData })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}