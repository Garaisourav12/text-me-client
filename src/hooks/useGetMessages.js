import { useState, useEffect } from "react";
import hitApi from "../api";

function useGetMessages(selectedUser) {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMessages = async () => {
            try {
                const response = await hitApi(
                    `/message/get/${selectedUser._id}`,
                    "get"
                );
                setMessages(response.data.messages);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        getMessages();
    }, [selectedUser]);

    return { messages, setMessages, loading, error };
}

export default useGetMessages;
