import path from 'path'
import fs from 'fs'
import solc from 'solc'

const inboxPath: string = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source: string = fs.readFileSync(inboxPath, 'utf8')

export default solc.compile(source, 1).contracts[":Inbox"]