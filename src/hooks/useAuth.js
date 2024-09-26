import { useEffect, useState } from "react";
import hitApi from "../api";

function useAuth() {
	const [auth, setAuth] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const verifyToken = async () => {
		try {
			setLoading(true);
			const response = await hitApi("/user/verify_token", "get");
			setAuth(response.data);
		} catch (error) {
			setError(error.response.data.error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		verifyToken();
	}, []);

	return { auth, loading, error };
}

export default useAuth;
