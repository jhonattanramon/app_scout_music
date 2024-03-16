import axios from "axios";

export const api_spotify = axios.create({
    baseURL: "https://api.spotify.com"
})