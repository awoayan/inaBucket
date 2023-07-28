import React from "react";
import ReactDOM from "react-dom/client";
import { store } from "./app/store";
import { Provider } from "react-redux";
import HomePage from "./HomePage";
import ProfilePage from "./ProfilePage";
import Nav from "./Nav";
import BucketsDropsPage from "./BucketsDropsPage";
import DropsPage from "./DropsPage";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

const domain = /https?:\/\/[^/]+/
const basename = process.env.PUBLIC_URL.replace(domain, "");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter basename={basename}>
				<Nav />
				<Routes>
					<Route
						path="*"
						element={<Navigate to="/" />}
					/>
					<Route
						path="/"
						element={<HomePage />}
					/>
					<Route
						path="/profile"
						element={<ProfilePage />}
					/>
					<Route
						path="/bucketdrops/:bucketId"
						element={<BucketsDropsPage />}
					/>
					<Route
						path="/drops/:dropId"
						element={<DropsPage />}
					/>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);