import { ProfileManage } from "./profileManage";
import { StoreManage } from "./storeManage";

class MainApi {
    public store = new StoreManage();
    public profile = new ProfileManage();
}

export const api = new MainApi();