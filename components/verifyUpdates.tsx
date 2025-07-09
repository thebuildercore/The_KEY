import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
// import ABI from "@/utils/ProjectLoggerABI.json";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract" // ✅ Your contract ABI
// const [supabaseUrl, supabaseKey] = ... // TODO: Add your Supabase credentials if needed, or remove this line if not used

export default function VerifyUpdates() {
  const [updates, setUpdates] = useState<any[]>([]);

  const fetchAllUpdates = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const updatesList: any[] = [];

      for (let pid = 0; pid < 20; pid++) {
        try {
          const project = await contract.projects(pid);
          if (project.timestamp === 0) continue;

          // Loop through updates until it fails (no .length for mappings)
          let i = 0;
          while (true) {
            try {
              const update = await contract.projectUpdates(pid, i);
              if (!update.verified) {
                updatesList.push({
                  projectId: pid,
                  index: i,
                  updateHash: update.updateHash,
                  uploadedBy: update.uploadedBy,
                  timestamp: update.timestamp,
                });
              }
              i++;
            } catch {
              break;
            }
          }
        } catch {
          continue;
        }
      }

      setUpdates(updatesList);
    } catch (error) {
      console.error("Failed to fetch updates:", error);
    }
  };

  const verify = async (projectId: number, updateIndex: number) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tx = await contract.verifyUpdate(projectId, updateIndex);
      await tx.wait();

      alert("✅ Update verified!");
      fetchAllUpdates(); // refresh the list
    } catch (error) {
      console.error("Failed to verify:", error);
      alert("❌ Verification failed.");
    }
  };

  useEffect(() => {
    fetchAllUpdates();
  }, []);

  return (
    <div>
      <h2>Verify Updates (Admin)</h2>
      {updates.length === 0 && <p>No unverified updates found.</p>}
      {updates.map((u, i) => (
        <div
          key={i}
          style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}
        >
          <p>
            <strong>Project ID:</strong> <span>{u.projectId}</span>
          </p>
          <p>
            <strong>Update Index:</strong> {u.index}
          </p>
          <p>
            <strong>Update Hash:</strong> {u.updateHash}
          </p>
          <p>
            <strong>Uploaded By:</strong> {u.uploadedBy}
          </p>
          <p>
            <strong>Time:</strong>{" "}
            {new Date(Number(u.timestamp) * 1000).toLocaleString()}
          </p>
          <button onClick={() => verify(u.projectId, u.index)}>✅ Verify</button>
        </div>
      ))}
    </div>
  );
}
