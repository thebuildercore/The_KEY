"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/lib/contract";

export default function WalletConnector() {
  const [walletAddress, setWalletAddress] = useState("");
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      const projectLogger = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      setContract(projectLogger);
      console.log("Connected:", address);
    } else {
      alert("Install MetaMask");
    }
  };

  const mintSampleProject = async () => {
    if (!contract) return;
    const tx = await contract.mintProject(1, "QmHashExample123");
    await tx.wait();
    alert("Project minted!");
  };

  return (
    <div className="p-4">
      <button onClick={connectWallet}>
        {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
      </button>

      <button
        onClick={mintSampleProject}
        disabled={!walletAddress}
        className="ml-4"
      >
        Mint Sample Project
      </button>
    </div>
  );
}
