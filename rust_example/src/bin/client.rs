use std::io::prelude::*;
use std::net::TcpStream;
use std::str;

const MAX_MESSAGE_LEN: usize = 100;

fn main() {
    let mut stream = TcpStream::connect("127.0.0.1:9001").expect("connect failed");
    
    let mut buf = [0u8; MAX_MESSAGE_LEN];
    let length = stream.read(&mut buf).expect("read failed");
    println!("{:?}", str::from_utf8(&buf[0..length]).expect("utf conversion failed"));
}
