import { User } from "./../types/user";
import { PropsWithChildren } from "react";
import { useAuth } from "./AuthProvider";
import UnauthorizedPage from "./UnauthorizedPage";

type ProtectedRouteProps = PropsWithChildren & {
	allowedRoles?: User["role"];
};

export default function ProtectedRoute({
	children,
	allowedRoles,
}: ProtectedRouteProps) {
	const { currentUser } = useAuth();
	if (!currentUser) {
		return <UnauthorizedPage />;
	}
	if (currentUser && allowedRoles != currentUser.role) {
		return <UnauthorizedPage />;
	}
	return children;
}
