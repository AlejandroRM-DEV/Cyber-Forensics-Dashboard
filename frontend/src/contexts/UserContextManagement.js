import React, { useState } from "react";

export const UserContext = React.createContext({
	user: {},
	setUser: () => {},
});

export const UserContextProvider = (props) => {
	const setUser = (user) => {
		setState({ ...state, user: user });
	};

	const initState = {
		user: {},
		setUser: setUser,
	};

	const [state, setState] = useState(initState);

	return <UserContext.Provider value={state}>{props.children}</UserContext.Provider>;
};
