const {Web3} = require("web3");
const fs = require("fs");

const web3 = new Web3("http://127.0.0.1:8545");
const output = JSON.parse(fs.readFileSync("compiled.json", "utf8"));

const abi = output.contracts["SimpleStorage.sol"]["SimpleStorage"].abi;

// Put your contract address here (from deploy step)
const address = "0xC2DD0Ac2179F3e74dC6d32D0f3bbBe2060f1a00a";

const contract = new web3.eth.Contract(abi, address);

async function run() {
    const accounts = await web3.eth.getAccounts();

    console.log("Setting value = 50...");
    await contract.methods.setValue(50).send({ from: accounts[0] });

    const value = await contract.methods.value().call();
    console.log("Current Value:", value);
}
run();
