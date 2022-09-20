import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import jwt_decode from "jwt-decode";
import { UserContext } from "../contexts/UserContextMangement";
import useFetch from "../hooks/useFetch";

function Continue() {
	const location = useLocation();
	const navigate = useNavigate();
	const context = useContext(UserContext);
	const { response, error } = useFetch(
		`${process.env.REACT_APP_BACKEND_URL}/login?code=${queryString.parse(location.search).code}`
	);

	useEffect(() => {
		if (response) {
			context.setUser(jwt_decode(response.data));
			navigate("/home");
		} else if (error) {
			console.error(error);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response, error]);

	return <></>;
}

export default Continue;
