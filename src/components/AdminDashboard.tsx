import { Box, Tabs } from "@chakra-ui/react";
import "./AdminDashboard.css"; // Import the CSS file
import ProfileScreen from "./ProfileScreen";
import Dashboard from "./Dashboard";


const AdminDashboard = () => {
	return (
		<Box>
			<Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
				<Tabs.List justifyContent="center" width="100%" gap="10px">
					<Tabs.Trigger
						_selected={{
							color: "green",
							borderColor: "black",
							fontWeight: "bold",
						}}
						value="tab-1"
					>
						Dashboard
					</Tabs.Trigger>
					<Tabs.Trigger
						_selected={{
							color: "green",
							borderColor: "black",
							fontWeight: "bold",
						}}
						value="tab-2"
					>
						Profile
					</Tabs.Trigger>
				</Tabs.List>

				{/* Dashboard Content with Custom Styling */}
				<Tabs.Content value="tab-1">
					<Dashboard />
				</Tabs.Content>

				<Tabs.Content value="tab-2">
					<ProfileScreen />
				</Tabs.Content>
			</Tabs.Root>
		</Box>
	);
};

export default AdminDashboard;
