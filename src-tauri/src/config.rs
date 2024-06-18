use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
enum FileSize {
    MB(f32),
    KB(f32),
    GB(f32),
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct UserConfig {
    pub user_name: String,
    pub avatar: i8,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RecentTransferConfig {
    file_name: String,
    file_size: FileSize,

    file_type: i8,
    is_upload: bool,
}
