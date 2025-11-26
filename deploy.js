const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3("http://127.0.0.1:8545");

(async () => {
  const accounts = await web3.eth.getAccounts();
  const deployer = accounts[0];

  console.log("Deploying from:", deployer);

  const abi = JSON.parse(fs.readFileSync("abi.json"));
  const bytecode = fs.readFileSync("bytecode.txt", "utf8");

  const contract = new web3.eth.Contract(abi);

  const deployed = await contract
    .deploy({ data: "0x" + bytecode })
    .send({ from: deployer, gas: 1500000 });

  console.log("✔ Contract deployed at:", deployed.options.address);

  fs.writeFileSync("address.txt", deployed.options.address);
})();
