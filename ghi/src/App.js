import { useEffect, useState } from "react";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import { useGetTokenQuery } from "./app/api.js";
import ListBucketDrops from "./BucketsDropsPage";

function App() {
	const { data: tokenData } = useGetTokenQuery();
	return (
		<div>
			<h1>Hello Pintrip</h1>
		</div>
	);
}

export default App;
