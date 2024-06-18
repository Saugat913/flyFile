// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use app_state::AppState;
use config::UserConfig;
use log::info;
use protocol::{BroadcastingPacket, MULTI_CAST_IP, PORT};
use serde::Serialize;

use std::{fs, net::SocketAddr};

use tauri::{async_runtime::channel, AppHandle, Error, Manager, State};

mod app_state;
mod config;
mod protocol;
mod reciever;
mod sender;

#[tauri::command]
async fn write_user_config(
    data: config::UserConfig,
    app_handle: AppHandle,
    app_state: tauri::State<'_, AppState>,
) -> Result<(), Error> {
    let base_dir = app_handle.path_resolver().app_config_dir().unwrap();
    let config_path = base_dir.join("config.json");

    log::info!("Writing to the file {:?}", config_path);
    app_state.set_user_config(data).await;
    app_state.write_config_to_file(config_path).await.unwrap();
    Ok(())
}

#[tauri::command]
fn read_config(app_handle: AppHandle) -> Option<app_state::AppStateConfig> {
    let base_dir = app_handle.path_resolver().app_config_dir().unwrap();
    let config_path = base_dir.join("config.json");
    let config_content = fs::read_to_string(config_path);

    match config_content {
        Ok(content) => {
            let config =
                serde_json::from_str::<app_state::AppStateConfig>(content.as_str()).unwrap();
            return Some(config);
        }
        Err(_) => {
            return None;
        }
    }
}

#[tauri::command]
async fn start_broadcasting(state: tauri::State<'_, AppState>) -> Result<(), Error> {
    let is_broadcasting = state.is_broadcasting.clone();
    reciever::broadcast(is_broadcasting, protocol::MULTI_CAST_IP, PORT, 8081).await;

    Ok(())
}

#[tauri::command]
async fn stop_broadcasting(state: tauri::State<'_, AppState>) -> Result<(), String> {
    let mut is_broadcasting_locked = state.is_broadcasting.lock().await;
    *is_broadcasting_locked = false;
    Ok(())
}

#[tauri::command]
async fn find_receiver(app_handle: AppHandle) -> Result<(), String> {
    let (sx, mut rx) = channel::<(BroadcastingPacket, SocketAddr)>(5);

    let app_state: State<AppState> = app_handle.state();
    let running_status = app_state.is_finding_receiver.clone();

    log::info!("Finding receiver");

    tokio::spawn(sender::start_find_reciever(
        running_status,
        MULTI_CAST_IP,
        PORT,
        sx,
    ));

    while let Some((msg, addr)) = rx.recv().await {
        log::info!("A new Receiver is received");
        app_handle
            .emit_all(
                "new_receiver",
                reciever::NewReceiverPayload {
                    user_config: UserConfig {
                        user_name: msg.name,
                        avatar: msg.avatar,
                    },
                    receiver_id: 1,
                },
            )
            .unwrap();
    }

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .manage(app_state::AppState::new())
        .invoke_handler(tauri::generate_handler![
            start_broadcasting,
            stop_broadcasting,
            read_config,
            write_user_config,
            find_receiver
        ])
        .plugin(tauri_plugin_log::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
