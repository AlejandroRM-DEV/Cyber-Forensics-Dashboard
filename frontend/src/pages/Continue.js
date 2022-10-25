import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import jwt_decode from "jwt-decode";
import { UserContext } from "../contexts/UserContextManagement";
import API from "../util/api";

function Continue() {
	const location = useLocation();
	const navigate = useNavigate();
	const context = useContext(UserContext);

	useEffect(() => {
		API.get(`/login?code=${queryString.parse(location.search).code}`).then((response) => {
			if (response.ok) {
				context.setUser(jwt_decode(response.data));
				navigate("/home");
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
}

export default Continue;
