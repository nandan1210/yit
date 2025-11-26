const Web3 = require("web3");
const fs = require("fs");

const web3 = new Web3("http://127.0.0.1:8545");

(async () => {
  const abi = JSON.parse(fs.readFileSync("abi.json"));
  const address = fs.readFileSync("address.txt", "utf8").trim();

  const contract = new web3.eth.Contract(abi, address);

  const result = await contract.methods.sayHello().call();
  console.log("✔ Result:", result);
})();
