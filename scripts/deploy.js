const path = require("path");
const fs = require("fs");
const { ethers } = require('hardhat');
const { JsonRpcProvider } = require('@ethersproject/providers');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Fein = await ethers.getContractFactory("Fein");
  const fein = await Fein.deploy();

  await fein.deployed();
  console.log("Fein deployed to:", fein.address);
  saveFrontendFiles(fein, "Fein");
}

function saveFrontendFiles(contract, name) {
  const contractsDir = path.join(__dirname, "../src/contract_data/");

  // Ensure the directory exists
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  // Save contract address
  fs.writeFileSync(
    path.join(contractsDir, `${name}-address.json`),
    JSON.stringify({ address: contract.address }, undefined, 2)
  );

  // Save contract ABI
  const contractArtifact = artifacts.readArtifactSync(name);
  fs.writeFileSync(
    path.join(contractsDir, `${name}.json`),
    JSON.stringify(contractArtifact, null, 2)
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
