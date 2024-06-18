use std::path::Path;
use std::sync::Arc;

use crate::config;
use serde::{Deserialize, Serialize};
use tokio::fs;
use tokio::io;
use tokio::sync::Mutex;

#[derive(Debug, Serialize, Deserialize)]
pub struct AppStateConfig {
    pub user_config: Option<config::UserConfig>,
    pub recent_config: Vec<config::RecentTransferConfig>,
}

impl AppStateConfig {
    pub fn new() -> AppStateConfig {
        return AppStateConfig {
            user_config: None,
            recent_config: vec![],
        };
    }
}

pub struct AppState {
    pub config: Arc<Mutex<AppStateConfig>>,
    pub is_broadcasting: Arc<Mutex<bool>>,
    pub is_finding_receiver: Arc<Mutex<bool>>,
}

impl AppState {
    pub fn new() -> AppState {
        return AppState {
            config: Arc::new(Mutex::new(AppStateConfig::new())),
            is_broadcasting: Arc::new(Mutex::new(false)),
            is_finding_receiver: Arc::new(Mutex::new(false)),
        };
    }

    pub async fn set_user_config(&self, user_config: config::UserConfig) {
        let mut user_config_locked = self.config.lock().await;
        user_config_locked.user_config = Some(user_config);
        drop(user_config_locked);
    }

    pub async fn write_config_to_file<P>(&self, path: P) -> io::Result<()>
    where
        P: AsRef<Path>,
    {
        let config_locked = self.config.lock().await;
        fs::write(path, serde_json::to_string(&*config_locked).unwrap()).await
    }
}
