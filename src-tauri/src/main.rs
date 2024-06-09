// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use log::info;
use protocol::PORT;
use reciever::Reciever;
use std::sync::Arc;
use tauri::Error;
use tokio::sync::Mutex;

mod protocol;
mod reciever;
mod sender;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn start_broadcasting(state: tauri::State<'_, Arc<Mutex<Reciever>>>) -> Result<(), Error> {
    let receiver = state.lock().await;
    receiver
        .broadcast(protocol::MULTI_CAST_IP, PORT, 8081)
        .await;

    Ok(())
}

#[tauri::command]
async fn stop_broadcasting(state: tauri::State<'_, Arc<Mutex<Reciever>>>) -> Result<(), String> {
    let receiver = state.lock().await;
    let mut is_broadcasting_lock = receiver.is_broadcasting.lock().await;
    *is_broadcasting_lock = false;

    info!("Stopping the broadcast!!");

    Ok(())
}

fn main() {
    tauri::Builder::default()
        .manage(Arc::new(Mutex::new(Reciever {
            is_broadcasting: Arc::new(Mutex::new(false)),
        })))
        .invoke_handler(tauri::generate_handler![
            greet,
            start_broadcasting,
            stop_broadcasting
        ])
        .plugin(tauri_plugin_log::Builder::default().build())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
