const ffi = require('ffi')
const ref = require('ref')
const array = require('ref-array')

const U8array = array(ref.types.uint8);

const lib = ffi.Library('libmessend', {
  messend_initiate: ['pointer', ['string', 'uint16']],
  messend_peer_send_message: ['void', ['pointer', 'pointer']],
  messend_peer_send_message_new: ['void', ['pointer', U8array, 'uint32']],
  messend_peer_receive_message_wait: ['pointer', ['pointer']],
  messend_message_create: ['pointer', [U8array, 'uint64']],
  messend_message_get_size: ['uint64', ['pointer']],
  messend_message_get_data: [U8array, ['pointer']],
  messend_message_free: ['void', ['pointer']],
})

class Peer {
  constructor(peer) {
    // TODO: free this._peer
    this._peer = peer
  }

  sendMessage(message) {
    const mess = new U8array(message.length)
    // TODO: figure out how to do this automatically
    for (let i = 0; i < message.length; i++) {
      mess[i] = message[i]
    }

    const messendMessage = lib.messend_message_create(mess, mess.length)
    lib.messend_peer_send_message_new(this._peer, mess, mess.length)
    //lib.messend_peer_send_message(this._peer, messendMessage)
  }

  receiveMessageWait() {
    const messendMessage = lib.messend_peer_receive_message_wait(this._peer)
    const size = lib.messend_message_get_size(messendMessage)
    const data = lib.messend_message_get_data(messendMessage)
    data.length = size
    // TODO: might not need copy here, but doing it just in case becase we're
    // freeing
    const message = new Uint8Array(data).slice()
    lib.messend_message_free(messendMessage)
    return message
  }
}

function initiate(host, port) {
  const peer = lib.messend_initiate(host, port)
  return new Peer(peer)
}

module.exports = {
  initiate,
}
