import { ethers } from "hardhat";

async function main() {
    const ProjectLogger = await ethers.getContractFactory("ProjectLogger");
    const contract = await ProjectLogger.deploy();
    await contract.waitForDeployment();
    console.log(`✅ ProjectLogger deployed to: ${contract.target}`);
}
 main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
