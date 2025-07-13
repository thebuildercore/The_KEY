import { supabase } from "@/lib/supabaseClient"

export async function logEvent({
  level,
  category,
  action,
  details,
  user,
  txHash,
  gasUsed,
}: {
  level: "info" | "warning" | "error"
  category: "system" | "blockchain" | "auth" | string
  action: string
  details: string
  user: string
  txHash?: string
  gasUsed?: string
}) {
  const { error } = await supabase.from("system_logs").insert([
    {
      timestamp: new Date().toISOString(),
      level,
      category,
      action,
      details,
      user,
      tx_hash: txHash || null,
      gas_used: gasUsed || null,
    },
  ])

  if (error) {
    console.error("❌ Failed to log system event:", error.message)
  }
}
