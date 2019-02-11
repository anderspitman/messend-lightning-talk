use std::str;

fn main() {
    let mut peer = messend::initiate("127.0.0.1", 9001);
    peer.send_message("Hi there from Rust client".as_bytes());
    let message = peer.receive_message_wait().expect("message unwrap failed");
    println!("Server responded: {:?}", str::from_utf8(&message).expect("parse bytes"));
}
