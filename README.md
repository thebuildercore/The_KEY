# 🏛️ The key
 Government Scheme Tracker – Powered by Blockchain

A transparent, decentralized system to track, audit, and verify government schemes in real time.

## 🚀 Built At
- **Hackathon**: Code for Bharat Season 2
- **Team**: Solo build by *Akshaya Krishna*
- **Category**: Governance & Public Welfare
- **Theme**: Blockchain & Web3
---

## ❓ Problem

Billions are allocated to government schemes, but:
- 🕳️ Lack of transparency leads to corruption.
- 🧾 No public tracking of fund flow.
- 🔁 Status updates are unreliable or falsified.
- 👥 Citizens can't report issues effectively.
- 👥 Unnecessary project delays by the officials.
- 👥 Exploitation of unserved population of the nation prevent them from bribes.

---

## ✅ Solution

**Government Scheme Tracker** uses **blockchain + web tech** to:
- Register/Mint each scheme on-chain with a **unique wallet address**.
- Track scheme **progress** and **milestones** via smart contracts.
- Allow **citizen feedback** (off-chain, linked to scheme ID).
- Create a **public dashboard** with verified updates.

---

## 🧱 Tech Stack

| Layer        | Tech Used                            |
|--------------|--------------------------------------|
| Frontend     | React (Next.js), Tailwind CSS           |
| Backend      | Node.js, Supabase                    |
| Blockchain   | Solidity Smart Contracts (Polygon)   |
| Wallet       | MetaMask, Ethers.js                  |
| Off-chain DB | Supabase (for feedback and reports)  |
contracts abis in /contracts/abi
---

## 🔐 Updates

>dated:28-06-2025
>
      -Frontend template upgrades, landing page now fetches real project data from backend
      -error connecting carousel with backend,
> dated: 29-06-2025

      - All interactions are visible on-chain via public explorer.
      -D:\thekey\contracts>npx hardhat run scripts/deploy.ts --network amoy
      -✅ ProjectLogger deployed to: 0xE474A6F728F8eE2D22a686eC52135d21b7AD99Bd
      - (1/3)The application can now mint Project through admin panel. ProjectId, hash and timestamp is stored on chain, rest of all the metadata is stored on supabase table, metamask wallet integrated (navbar+footer)
> dated: 01-07-2025

      -Four more screens added for officials, project updates, verify updates, submit report
      -three out of five functions of contract integrated: logUpdates, add new official
      -supabase integrated in three screens
> dated: 02-07-2025

      -Citizens report flow, update project status having error, and few  more integration
      -Settings screen with no backend integration
      -Finalized the flow of the app, demo clips ready with 1/3 of backend integration under process
> dated 03-07-2025

      -Build finalized, complete codes to be uploaded on git after 17th of July.
> dated 05-07-2025 (Updates from 03-07-2025)

      -Verify updates function integrated with contract and supabase.
      - system logs, Manage officials, Projects.. Admin section all clear.
      - Dashboard and citizens reports has mock data.
      - And one issue integrating contract function logUpdate with frontend.
>dated 07-07-2025

       - Citizen report it live with everything integrated.
       - All features working, contracts integrated, backend almost done.
       - Three pages including settings dashboard and project updates fetch mock data... unless database has enough rows.
       - Ready to be reviewed.
---

Project setup
Follow these steps to run the project locally.

### 1. Clone the Repo

# 1. Clone the Repo
git clone https://github.com/thebuildercore/The_KEY.git
cd The_KEY

# 2. Install dependencies
pnpm install

# 3. Setup Environment
# Create a `.env` file based on `.env.example`

# 4. Start the Server
pnpm dev
# Then visit: http://localhost:3000

> ✅ Smart contracts deployed — [View contract](https://amoy.polygonscan.com/address/0xE474A6F728F8eE2D22a686eC52135d21b7AD99Bd)

---

## 🧪 Demo Links

- 🔴 [Initial Demo (Old Version)](https://youtu.be/fXxhq8IvnQs?si=0rygTN_2gSiQZmNA)  
- ✅ [Final Demo (Full Features)](https://youtu.be/cmqX5FXaEek?si=00TebBwrOjidfpFX)

---

## 📌 Features

- 🎯 Add & manage schemes on-chain
- 📊 Live scheme tracking
- 🧩 Wallet visibility for each scheme
- 🗣️ Citizen reports (off-chain)
- 🔔 Event logs for every action


---

