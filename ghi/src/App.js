import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

import SignUpModal from "./SignUpModal.js";
import LogInModal from "./LoginModal.js";

function App() {
	// const { data: tokenData } = useGetTokenQuery();
	return (
		<div>
			<h1>Hello Pintrip</h1>
			<LogInModal />
		</div>
	);
}

export default App;
