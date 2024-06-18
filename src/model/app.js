import { invoke } from "@tauri-apps/api/tauri";



class App {
    constructor() {
        this.config = null;
    }

    async writeUserConfig(userName, avatarIndex) {

        let userConfig = {
            'user_name': userName,
            'avatar': avatarIndex,
        }
        await invoke("write_user_config", { data: userConfig });
    }

    async readConfig() {
        let data = await invoke("read_config");
        this.config = data;
    }

    async startBroadCasting() {
        await invoke("start_broadcasting");
    }

    async stopBroadCasting() {
        await invoke("stop_broadcasting");
    }

    async startFindingReceiver() {
        await invoke("find_receiver");
    }

}
const appState = new App();
export default appState;