import { Switch, Route, Redirect } from "react-router-dom";
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
		<div className="App">
			<Switch>
				<Route path="/sign-in" exact component={SignIn} />
				<Route path="/continue" exact component={Continue} />
				<Main>
					<Route exact path="/home" component={Home} />
					<Route exact path="/requests" component={Requests} />
					<Route exact path="/requests/create" component={CreateRequest} />
					<Route exact path="/extractions" component={Extractions} />
					<Route exact path="/extractions/create" component={CreateExtraction} />
					<Redirect from="*" to="/home" />
				</Main>
			</Switch>
		</div>
	);
}

export default App;
