import axios from "axios";

const BASE_URL = "http://localhost:8000";
const API_ENDPOINT = "/api/v1";

const hitApi = async (endpoint, methode, body) => {
    if (body) {
        const response = await axios[methode](
            BASE_URL + API_ENDPOINT + endpoint,
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
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
                withCredentials: true,
            }
        );

        return response;
    }
};

export default hitApi;
