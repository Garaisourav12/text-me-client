import axios from "axios";

const BASE_URL = "https://text-me-backend.onrender.com";
const API_ENDPOINT = "/api/v1";

axios.defaults.withCredentials = true;

const hitApi = async (endpoint, methode, body) => {
    if (body) {
        const response = await axios[methode](
            BASE_URL + API_ENDPOINT + endpoint,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    } else {
        const response = await axios[methode](
            BASE_URL + API_ENDPOINT + endpoint,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        return response;
    }
};

export default hitApi;
