use std::io::prelude::*;
use std::net::{TcpListener};

fn main() {
    let listener = TcpListener::bind("127.0.0.1:9001").expect("bind failed");

    for stream in listener.incoming() {
        let mut stream = stream.expect("stream failed");
        stream.write("Hi there".as_bytes()).expect("send failed");
    }
}
