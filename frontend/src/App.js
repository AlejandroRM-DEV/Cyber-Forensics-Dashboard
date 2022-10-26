import { Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContextManagement";
import SignIn from "./pages/SignIn";
import Continue from "./pages/Continue";
import Requests from "./pages/mobile-requests";
import CreateRequest from "./pages/mobile-requests/Create";
import EditRequest from "./pages/mobile-requests/Edit";
import Home from "./pages/Home";
import DateTime from "./pages/datetime";
import ImageSequence from "./pages/image-sequence";
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
						<Route exact path="/mobile-requests" element={<Requests />} />
						<Route exact path="/mobile-requests/create" element={<CreateRequest />} />
						<Route exact path="/mobile-requests/:id" element={<EditRequest />} />
						<Route exact path="/extractions/:id" element={<EditRequest />} />
						<Route exact path="/date-time" element={<DateTime />} />
						<Route exact path="/image-sequence" element={<ImageSequence />} />
					</Route>
					<Route path="*" exact element={<Navigate to="/home" />} />
				</Routes>
			</div>
		</UserContextProvider>
	);
}

export default App;
