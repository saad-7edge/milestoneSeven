import React, { useState } from "react";
import { Button, Flex, Input, Heading, Text } from "@chakra-ui/react";
import { Field } from "./../components/ui/field";
import { PasswordInput } from "./../components/ui/password-input";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router";
import { toaster } from "./../components/ui/toaster";
import { Card } from "@chakra-ui/react"; // Assuming Chakra UI supports Card.Root, Card.Header, etc.

const LoginPage = () => {
	const [inputValue, setValue] = useState({ email: "", password: "" });
	const navigate = useNavigate();
	const { handleLogin } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const handleLoginFunction = async () => {
		setIsLoading(true);

		if (!inputValue.email || !inputValue.password) {
			toaster.create({
				title: "Please fill in all fields",
				type: "error",
				duration: 500,
			});
			setIsLoading(false);
			return;
		}

		try {
			const user = await handleLogin(inputValue.email);

			if (!user) {
				navigate("/unauthorized");
				toaster.create({
					title: "Permission Denied",
					type: "error",
					duration: 1000,
				});
			} else if (user.role === "admin") {
				navigate("/admin");
				toaster.create({
					title: "Successfully logged in as Admin!",
					type: "success",
					duration: 1000,
				});
			} else if (user.role === "user") {
				navigate("/home");
				toaster.create({
					title: "Successfully logged in as User!",
					type: "success",
					duration: 1000,
				});
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Flex justify="center" align="center" height="100vh">
			<Card.Root
				maxW="400px"
				w="100%"
				bg="white"
				p={8}
				boxShadow="lg"
				borderRadius="lg"
			>
				<Card.Header>
					<Heading size="lg" textAlign="center" color="blue.600">
						Login Form
					</Heading>
				</Card.Header>

				<Card.Body>
					<Field label="Email" color="black" required>
						<Input
							placeholder="mail@example.com"
							variant="flushed"
							size="lg"
							color="black"
							value={inputValue.email}
							onChange={(e) =>
								setValue((prev) => ({ ...prev, email: e.target.value }))
							}
						/>
					</Field>

					<Field label="Password" color="black" marginTop="12px" required>
						<PasswordInput
							variant="flushed"
							size="lg"
							value={inputValue.password}
							onChange={(e) =>
								setValue((prev) => ({ ...prev, password: e.target.value }))
							}
						/>
					</Field>

					<Button
						colorScheme="blue"
						size="lg"
						loading={isLoading}
						loadingText="Logging in..."
						onClick={handleLoginFunction}
						width="full"
						variant="solid"
					>
						Login
					</Button>
				</Card.Body>

				<Card.Footer textAlign="center">
					<Text fontSize="sm" color="gray.500">
						Don't have an account?{" "}
						<Button variant="solid" colorScheme="blue">
							Sign Up
						</Button>
					</Text>
				</Card.Footer>
			</Card.Root>
		</Flex>
	);
};

export default LoginPage;
