import React, { useEffect, useState } from "react";
import { fetchProjectUpdates } from "@/utils/supabaseFetch";

export default function UpdatesTable() {
  const [updates, setUpdates] = useState<any[]>([]);

  useEffect(() => {
    const loadUpdates = async () => {
      const data = await fetchProjectUpdates();
      setUpdates(data);
    };

    loadUpdates();
  }, []);

  return (
    <div>
      <h2>📦 Project Updates (from Supabase)</h2>
      {updates.length === 0 ? (
        <p>No updates found.</p>
      ) : (
        updates.map((update, i) => (
          <div key={i} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <p><strong>Project ID:</strong> {update.project_id}</p>
            <p><strong>Update Hash:</strong> {update.update_hash}</p>
            <p><strong>Uploaded By:</strong> {update.uploaded_by}</p>
            <p><strong>Verified:</strong> {update.verified ? "✅" : "❌"}</p>
            <p><strong>Time:</strong> {new Date(update.timestamp).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}
