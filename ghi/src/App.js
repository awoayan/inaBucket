import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { useGetTokenQuery } from "./app/api.js";

function App() {
	const { data: tokenData } = useGetTokenQuery();
	return (
		<div>
			<h1>Hello Pintrip</h1>
			<div className="clipping-container"></div>
		</div>
	);
}

export default App;
