const fs = require("fs");
const {Web3} = require("web3");

const web3 = new Web3("http://127.0.0.1:8545");

const output = JSON.parse(fs.readFileSync("compiled.json", "utf8"));
const abi = output.contracts["SimpleStorage.sol"]["SimpleStorage"].abi;
const bytecode = output.contracts["SimpleStorage.sol"]["SimpleStorage"].evm.bytecode.object;

async function deploy() {
    const accounts = await web3.eth.getAccounts();
    console.log("Deploying from account:", accounts[0]);

    const contract = new web3.eth.Contract(abi);

    const instance = await contract
        .deploy({ data: "0x" + bytecode })
        .send({ from: accounts[0], gas: 1500000 });

    console.log("Contract deployed at:", instance.options.address);
}
deploy();
