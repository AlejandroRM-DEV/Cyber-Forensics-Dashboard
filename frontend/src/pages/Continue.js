import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";
import jwt_decode from "jwt-decode";
import { UserContext } from "../contexts/UserContextMangement";

function Continue() {
	const location = useLocation();
	const navigate = useNavigate();
	const context = useContext(UserContext);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/login?code=${queryString.parse(location.search).code}`, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((res) => {
				var decoded = jwt_decode(res.data);
				context.setUser(decoded);
				console.log(decoded);
				navigate("/home");
			})
			.catch((error) => console.error(error));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[]);

	return <></>;
}

export default Continue;
