import axios from "axios";
/**
 * @param route - route in a server
 */
export function httpUrl(route: string) {
    return axios.create({
        baseURL: "https://not-contest-cdn.openbuilders.xyz/api/" + route,
    })
}