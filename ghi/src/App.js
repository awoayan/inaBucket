import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

import SignUpModal from "./SignUpModal.js";

function App() {
	return (
		<div>
			<h1>Hello Pintrip</h1>
			<SignUpModal />
		</div>
	);
}

export default App;
