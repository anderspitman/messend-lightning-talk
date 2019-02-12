#include <stdio.h>
#include "messend.h"

int main() {
    MessendPeer peer = messend_initiate("127.0.0.1", 9001);

    MessendMessage* message = messend_message_create((uint8_t*)"Hi there from C", 15);

    messend_peer_send_message(peer, *message);
    messend_message_free(message);

    MessendMessage* recvMessage = messend_peer_receive_message_wait(peer);
    uint8_t* data = messend_message_get_data(recvMessage);
    printf("Server responded: %s\n", data);
    messend_message_free(recvMessage);

    messend_peer_free(peer);
    return 0;
}
