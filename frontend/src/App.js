import { Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContextMangement";
import SignIn from "./pages/SignIn";
import Continue from "./pages/Continue";
import Extractions from "./pages/extractions";
import CreateExtraction from "./pages/extractions/Create";
import Requests from "./pages/requests";
import CreateRequest from "./pages/requests/Create";
import Home from "./pages/Home";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";

function App() {
	return (
		<UserContextProvider>
			<div className="App">
				<Routes>
					<Route path="/sign-in" exact element={<SignIn />} />
					<Route path="/continue" exact element={<Continue />} />
					<Route element={<Main />}>
						<Route exact path="/home" element={<Home />} />
						<Route exact path="/requests" element={<Requests />} />
						<Route exact path="/requests/create" element={<CreateRequest />} />
						<Route exact path="/extractions" element={<Extractions />} />
						<Route exact path="/extractions/create" element={<CreateExtraction />} />
					</Route>
					<Route path="*" exact element={<Navigate to="/home" />} />
				</Routes>
			</div>
		</UserContextProvider>
	);
}

export default App;
