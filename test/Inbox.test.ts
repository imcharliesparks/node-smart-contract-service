import assert from 'assert'
import ganache from 'ganache-cli'
import Web3 from 'web3'
import Inbox from '../compile'

const { interface: contractInterface, bytecode } = Inbox

const web3Instance = new Web3(ganache.provider())

describe('The `Inbox` Contract', () => {
    const initialMessage: string = 'Hi there!'
    let accounts: string[]
    let inboxContract

    beforeEach(async () => {
        // grabbing all of the accounts spun up by Ganache on the local network
        accounts = await web3Instance.eth.getAccounts()

        // deploy the contract to one of the accounts
        inboxContract = await new web3Instance.eth.Contract(JSON.parse(contractInterface))
            .deploy({ data: bytecode, arguments: [initialMessage]})
            .send({ from: accounts[0], gas: 1000000 })
    })

    it('should deploy the contract', () => {
        assert.ok(inboxContract.options.address)
    })
    
    it('should deploy the contract with the default message', async () => {
        const message: string = await inboxContract.methods.message().call()
        assert.equal(message, initialMessage)
    })
    
    it('should update the message when the `setMethod` function is called', async () => {
        const newMessage: string = "cheeseballz"
        await inboxContract.methods.setMessage(newMessage).send({ from: accounts[0] })
        const currentMessage: string = await inboxContract.methods.message().call()
        assert.equal(newMessage, currentMessage)
    })
})
