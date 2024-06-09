use crate::protocol::BroadcastingPacket;
use serde_json;
use std::{
    net::{IpAddr, Ipv4Addr, SocketAddr},
    str::FromStr,
};
use tokio::net::UdpSocket;

pub struct Sender;

impl Sender {
    pub async fn find_reciever(
        listening_ip: &str,
        listening_port: u16,
    ) -> Option<(BroadcastingPacket, SocketAddr)> {
        let mut buffer = [0; 1024];

        //generate the socket address of multicast group
        let multicast_group: SocketAddr =
            SocketAddr::new(IpAddr::from_str(listening_ip).unwrap(), listening_port);

        // Bind the socket to multicast group
        let sock = UdpSocket::bind(multicast_group).await.unwrap();

        // Join multi cast group
        sock.join_multicast_v4(
            Ipv4Addr::from_str(listening_ip).unwrap(),
            Ipv4Addr::new(0, 0, 0, 0),
        )
        .unwrap();

        loop {
            // Recieve the data from the reciever
            let (dlen, reciever) = sock.recv_from(&mut buffer).await.unwrap();

            if dlen != 0 {
                let data = &buffer[..dlen];
                match serde_json::from_slice::<BroadcastingPacket>(data) {
                    Ok(msg) => {
                        return Some((msg, reciever));
                    }
                    Err(err) => {
                        eprintln!("[ERROR] Cannot serialize the data {}", err);
                        return None;
                    }
                }
            }
        }
    }
}
