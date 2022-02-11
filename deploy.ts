import dotenv from 'dotenv'
import HDWalletProvider from "@truffle/hdwallet-provider"
import Web3 from "web3"
import Inbox from './compile'

const { bytecode, interface: contractInterface } = Inbox

dotenv.config()

const { METAMASK_PNEUMONIC, INFURA_URL } = process.env
const provider = new HDWalletProvider(METAMASK_PNEUMONIC, INFURA_URL)
const web3 = new Web3(provider)

async function deploy() {
    const [account] = await web3.eth.getAccounts()
    const contract = await new web3.eth.Contract(JSON.parse(contractInterface))
    const contractArguments = {
        data: bytecode,
        arguments: ['Hi there!']
    }
    console.log('deploying contract')
    const result = await contract
        .deploy(contractArguments)
        .send({ gas: 1000000, from: account })
    console.log('result', result.options.address)
}

// export default deploy

deploy()