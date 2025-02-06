import {
	createContext,
	PropsWithChildren,
	useContext,
	useState,
	useEffect,
} from "react";
import { User } from "./../types/user";
import { login } from "../api/auth";

type AuthContext = {
	authToken?: string | null;
	currentUser?: User | null;
	handleLogin: (email: string) => Promise<User | null>;
	handleLogout: () => Promise<void>;
	updateUserProfile: (profileUrl: string) => void;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
	const [authToken, setAuthToken] = useState<string | null>();
	const [currentUser, setCurrentUser] = useState<User | null>(() => {
		// Initialize from localStorage
		const stored = localStorage.getItem("user");
		return stored ? JSON.parse(stored) : null;
	});

	// Sync localStorage with state changes
	useEffect(() => {
		console.log(currentUser, "is user in auth");
		if (currentUser) {
			localStorage.setItem("user", JSON.stringify(currentUser));
		} 
	}, [currentUser]);

	const updateUserProfile = (profileUrl: string) => {
		if (currentUser) {
			const updatedUser = { ...currentUser, profile: profileUrl };
			setCurrentUser(updatedUser);
			// localStorage will be updated via useEffect
		}
	};

	async function handleLogin(email: string): Promise<User | null> {
		try {
			const response = await login(email);
			if (response[0] === 401) {
				localStorage.removeItem("user");
				throw new Error(response[1].message);
			}
			const { authToken, user } = response[1];

			setAuthToken(authToken);
			setCurrentUser(user);
			return user;
		} catch {
			setAuthToken(null);
			setCurrentUser(null);
			return null;
		}
	}

	async function handleLogout() {
		setAuthToken(null);
		setCurrentUser(null);
	}

	return (
		<AuthContext.Provider
			value={{
				authToken,
				currentUser,
				handleLogin,
				handleLogout,
				updateUserProfile,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used inside of a AuthProvider");
	}
	return context;
}
