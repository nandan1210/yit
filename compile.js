const fs = require("fs");
const solc = require("solc");

const source = fs.readFileSync("SimpleStorage.sol", "utf8");

const input = {
    language: "Solidity",
    sources: { "SimpleStorage.sol": { content: source } },
    settings: { outputSelection: { "*": { "*": ["*"] } } },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
fs.writeFileSync("compiled.json", JSON.stringify(output, null, 2));
console.log("Compiled Successfully!");
