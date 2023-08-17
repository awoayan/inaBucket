import React, { useState, useEffect } from "react";

import { useGetTokenQuery } from './app/api';

import "./App.css";
import HomePage from "./HomePage";

function App() {
	const { data: tokenData } = useGetTokenQuery()
	const accountId = tokenData && tokenData.account && tokenData.account.id;

	return (
		<>
			<HomePage />
		</>
	)


}

export default App;
