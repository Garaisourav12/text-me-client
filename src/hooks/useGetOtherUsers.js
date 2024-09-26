import { useEffect, useState } from "react";
import hitApi from "../api";

function useGetOtherUsers(auth) {
	const [otherUsers, setOtherUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getOtherUsers = async () => {
		try {
			setLoading(true);
			const response = await hitApi("/user/get_other_users", "get");
			setOtherUsers(response.data.users);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getOtherUsers();
	}, [auth]);

	return { otherUsers, loading, error };
}

export default useGetOtherUsers;
