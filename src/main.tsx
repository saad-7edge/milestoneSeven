import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { Toaster } from "./components/ui/toaster"

import "./index.css";
import App from "./App.tsx";
import AuthProvider from "./components/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<AuthProvider>
		<Provider>
			<App />
			<Toaster />
		</Provider>
	</AuthProvider>
);
