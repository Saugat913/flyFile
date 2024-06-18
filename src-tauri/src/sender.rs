use crate::protocol::BroadcastingPacket;
use serde_json;
use std::{
    net::{IpAddr, Ipv4Addr, SocketAddr},
    str::FromStr,
    sync::Arc,
};
use tauri::async_runtime::Sender;
use tokio::{net::UdpSocket, sync::Mutex};

pub async fn start_find_reciever(
    running_signal: Arc<Mutex<bool>>,
    listening_ip: &str,
    listening_port: u16,
    sender_channel: Sender<(BroadcastingPacket, SocketAddr)>,
) {
    let mut running_signal_locked = running_signal.lock().await;
    *running_signal_locked = true;
    drop(running_signal_locked);

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
        let running_signal_locked = running_signal.lock().await;

        if *running_signal_locked == false {
            return;
        }

        drop(running_signal_locked);

        // Recieve the data from the reciever
        let (dlen, reciever) = sock.recv_from(&mut buffer).await.unwrap();

        if dlen != 0 {
            let data = &buffer[..dlen];
            match serde_json::from_slice::<BroadcastingPacket>(data) {
                Ok(msg) => {
                    sender_channel.send((msg, reciever)).await.unwrap();
                }
                Err(err) => {
                    //IGNORE the error data
                    eprintln!("[ERROR] Cannot serialize the data {}", err);
                }
            }
        }
    }
}
