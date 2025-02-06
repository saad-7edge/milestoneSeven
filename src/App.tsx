import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router";
// import { useAuth } from "./components/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import HomeScreen from "./components/HomeScreen";
import LoginPage from "./components/LoginPage";
import AdminDashboard from "./components/AdminDashboard";
import UnauthorizedPage from "./components/UnauthorizedPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route
					path="/home"
					element={
						<ProtectedRoute allowedRoles={"user"}>
							<HomeScreen />
						</ProtectedRoute>
					}
				/>
				{/* Protected Admin Route */}
				<Route
					path="/admin"
					element={
						<ProtectedRoute allowedRoles={"admin"}>
							<AdminDashboard />
						</ProtectedRoute>
					}
				/>
				{/* Unauthorized Access Page */}
				<Route path="/unauthorized" element={<UnauthorizedPage />} />

				{/* <Route 
				  path="/protected" 
				  element={
					<ProtectedRoute>
					  <div>Protected Content</div>
					</ProtectedRoute>
				  } 
				/> */}
				{/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
			</Routes>
		</BrowserRouter>
	);
}

export default App;
