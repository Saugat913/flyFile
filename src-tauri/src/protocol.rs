use serde::{Deserialize, Serialize};

pub const MULTI_CAST_IP: &str = "224.0.0.123";
pub const PORT: u16 = 8092;

#[derive(Debug, Serialize, Deserialize)]
pub struct BroadcastingPacket {
    pub name: String,
    pub avatar: i8,
    pub port: u16,
}

impl BroadcastingPacket {
    pub fn new(name: String, avatar: i8, port: u16) -> BroadcastingPacket {
        return BroadcastingPacket {
            name: name,
            avatar: avatar,
            port: port,
        };
    }
}



