// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl ="https://ylkhhasvisjopiwwtyut.supabase.co"
const supabaseAnonKey ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsa2hoYXN2aXNqb3Bpd3d0eXV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5OTc0MDksImV4cCI6MjA2NjU3MzQwOX0.pCVaxfPL8BZWuxMC2SLk4XY4cCahGg-VJQR8zqfzItQ"
console.log("SUPABASE_URL:", supabaseUrl)
console.log("SUPABASE_KEY:", supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export { createClient }
