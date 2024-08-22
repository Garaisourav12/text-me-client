import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

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
