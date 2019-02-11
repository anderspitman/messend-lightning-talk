use std::str;

fn main() {
    let acceptor = messend::Acceptor::new("127.0.0.1", 9001);

    loop {
        let mut peer = acceptor.accept_wait();
        let message = peer.receive_message_wait().expect("message unwrap failed");
        println!("Client sent: {:?}", str::from_utf8(&message).expect("parse bytes"));
        peer.send_message(&message);
    }
}
