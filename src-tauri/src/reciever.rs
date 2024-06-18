use std::{
    io,
    net::{IpAddr, Ipv4Addr, SocketAddr},
    str::FromStr,
    sync::Arc,
    time::Duration,
};

use log::info;

use tokio::{
    io::AsyncReadExt,
    net::{TcpListener, UdpSocket},
    select,
    sync::Mutex,
};

use crate::{config::UserConfig, protocol::BroadcastingPacket};

#[derive(Clone, serde::Serialize)]
pub struct NewReceiverPayload {
    pub user_config: UserConfig,
    pub receiver_id: i32,
}

pub async fn broadcast(
    is_broadcasting: Arc<Mutex<bool>>,
    broadcasting_ip: &str,
    broadcasting_port: u16,
    recieving_port: u16,
) {
    // Set the broadcasting to true while calling the function
    {
        let mut is_broadcasting_lock = is_broadcasting.lock().await;
        *is_broadcasting_lock = true;
    }

    let sock = UdpSocket::bind("0.0.0.0:8089").await.unwrap();

    let recieve_listener = TcpListener::bind(format!("0.0.0.0:{}", recieving_port))
        .await
        .unwrap();

    let _ = sock.join_multicast_v4(
        Ipv4Addr::from_str(broadcasting_ip).unwrap(),
        Ipv4Addr::new(0, 0, 0, 0),
    );

    let _ = sock
        .connect(SocketAddr::new(
            IpAddr::from_str(broadcasting_ip).unwrap(),
            broadcasting_port,
        ))
        .await
        .unwrap();

    let broadcasting_packet = serde_json::to_string(&BroadcastingPacket::new(
        "saugat".to_string(),
        12,
        recieving_port,
    ))
    .unwrap();

    let is_broad_casting_clone = is_broadcasting.clone();

    //This thread will recieve for the acknowledgement message
    let rhandler = tokio::spawn(async move {
        loop {
            let (mut stream, addr) = recieve_listener.accept().await.unwrap();
            let data_len: usize = stream.read_u16().await.unwrap() as usize;
            let mut buffer = vec![0; data_len];
            stream.read_exact(&mut buffer).await.unwrap();

            let asking_user =
                serde_json::from_slice::<BroadcastingPacket>(&buffer.as_slice()).unwrap();

            println!(
                "{} want to connect! Do you want to recieve file from them(Y/n)?",
                asking_user.name
            );

            let mut input = String::new();
            io::stdin().read_line(&mut input).unwrap();

            if input != "Y" {}
        }
    });

    //This thread broadcast the message
    let bhandler = tokio::spawn(async move {
        loop {
            {
                let is_broadcasting_lock = is_broad_casting_clone.lock().await;
                if *is_broadcasting_lock == false {
                    break;
                }
            }
            sock.send(broadcasting_packet.as_bytes()).await.unwrap();
            tokio::time::sleep(Duration::from_secs(20)).await;
        }
    });

    select! {
        _ = rhandler=>{},
        _= bhandler=>{}
    }
}
