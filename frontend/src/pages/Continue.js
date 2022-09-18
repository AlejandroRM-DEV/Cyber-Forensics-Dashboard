import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import jwt_decode from "jwt-decode";

function Continue({ location }) {
	const history = useHistory();

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/login?code=${queryString.parse(location.search).code}`, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((res) => {
				var decoded = jwt_decode(res.data);
				console.log(decoded);
				history.replace("/home");
			})
			.catch((error) => console.error(error));
	});

	return <></>;
}

export default Continue;
