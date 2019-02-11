#include <stdio.h>
#include "messend.h"

int main() {
    MessendPeer peer = messend_initiate("127.0.0.1", 9001);

    MessendMessage message;
    message.data = (uint8_t*)"Hi there from C client";
    message.size = 22;
    messend_peer_send_message(peer, message);

    MessendMessage* recvMessage = messend_peer_receive_message_wait(peer);
    printf("Server responded: %s\n", message.data);

    messend_message_free(recvMessage);
    messend_peer_free(peer);
    return 0;
}
