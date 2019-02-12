const str2ab = require('string-to-arraybuffer')
const ab2str = require('arraybuffer-to-string')
const { initiate } = require('./messend')

const peer = initiate("127.0.0.1", 9001)
peer.sendMessage(new Uint8Array(str2ab("Hi there from JavaScript")))
const message = peer.receiveMessageWait()
console.log("Server responded: " + ab2str(message))
