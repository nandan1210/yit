const fs = require("fs");
const path = require("path");
const solc = require("solc");

const source = fs.readFileSync("./contracts/HelloWorld.sol", "utf8");

const input = {
  language: "Solidity",
  sources: {
    "HelloWorld.sol": { content: source }
  },
  settings: {
    outputSelection: { "*": { "*": ["abi", "evm.bytecode"] } }
  }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

const contract = output.contracts["HelloWorld.sol"]["HelloWorld"];

fs.writeFileSync("abi.json", JSON.stringify(contract.abi, null, 2));
fs.writeFileSync("bytecode.txt", contract.evm.bytecode.object);

console.log("✔ Compiled successfully!");
