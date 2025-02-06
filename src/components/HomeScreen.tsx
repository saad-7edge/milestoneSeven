import { Box, Tabs } from "@chakra-ui/react";
import "./styles.css";
import TodoScreen from "./TodoScreen";
import ProfileScreen from "./ProfileScreen";

const HomeScreen = () => {
	return (
		<Box>
			<Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
				<Tabs.List
					justifyContent="center" // Centers the tabs
					width="100%"
					gap="10px"
				>
					<Tabs.Trigger
						_selected={{
							// Styles for active tab
							color: "green",
							borderColor: "black",
							fontWeight: "bold",
							// Optional: makes active tab more prominent
						}}
						value="tab-1"
					>
						Todos
					</Tabs.Trigger>
					<Tabs.Trigger
						_selected={{
							// Styles for active tab
							color: "green",
							borderColor: "black",
							fontWeight: "bold",
							// Optional: makes active tab more prominent
						}}
						value="tab-2"
					>
						Profile
					</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="tab-1">
					<TodoScreen />
				</Tabs.Content>
				<Tabs.Content value="tab-2">
					<ProfileScreen />
				</Tabs.Content>
			</Tabs.Root>
		</Box>
	);
};

export default HomeScreen;
