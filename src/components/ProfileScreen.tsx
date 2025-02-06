import { Card, Image, Button, Box } from "@chakra-ui/react";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "./AuthProvider";
import profile from "./../assets/segun_adebayo.jpg";
import { useNavigate } from "react-router";

const ProfileScreen = () => {
	const { currentUser, updateUserProfile } = useAuth();
	const navigate = useNavigate();
	const { handleLogout } = useAuth();
	const [file, setFile] = useState<File | null>(null);
	const storedUser = JSON.parse(localStorage.getItem("user") || "{}"); // Parse user object safely
	const profileUrl = storedUser.profile ? storedUser.profile : profile;
	const [imageUrl, setImageUrl] = useState<string>(profileUrl);

	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const logOut = () => {
		navigate("/", { replace: true });
		localStorage.removeItem("user");
		handleLogout();
	};

	useEffect(() => {
		console.log(file, "issss");
	}, [file]);

	useEffect(() => {
		console.log(imageUrl, "is url of image");
	}, [imageUrl]);
	// useEffect(() => {
	// 	console.log(storedUser, "is stored User");
	// }, [storedUser]);

	// AWS S3 Configuration
	const S3_BUCKET = "milestone-bucket";
	const REGION = "eu-north-1";

	const s3Client = new S3Client({
		region: REGION,
		credentials: {
			accessKeyId: import.meta.env.VITE_ACCESS_KEY,
			secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY,
		},
	});

	// Upload File to S3
	const uploadFile = async (selectedFile: File) => {
		try {
			const fileBuffer = await selectedFile.arrayBuffer(); // Convert File to ArrayBuffer

			const params = {
				Bucket: S3_BUCKET,
				Key: `profile_pictures/${selectedFile.name}`, // Organized in S3 folder
				Body: new Uint8Array(fileBuffer), // Convert to Uint8Array
				ContentType: selectedFile.type, // Preserve MIME type
			};

			const command = new PutObjectCommand(params);
			await s3Client.send(command);

			// Generate the new image URL
			const newImageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/profile_pictures/${selectedFile.name}`;

			setImageUrl(newImageUrl);
			updateUserProfile(newImageUrl); // This will update both state and localStorage
			alert("File uploaded successfully!");

			// Update the user object in localStorage
			const storedUser = localStorage.getItem("user");
			console.log(storedUser, "is stored");
		} catch (error) {
			console.error("Upload error:", error);
			alert("Upload failed.");
		}
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
			setImageUrl(URL.createObjectURL(selectedFile)); // Show preview before upload
			await uploadFile(selectedFile); // Automatically upload after selection
		}
	};

	// Trigger file selection when clicking "Change Profile Picture"
	const handleChangeProfilePicture = () => {
		fileInputRef.current?.click();
	};

	return (
		<Box
			display="flex"
			justifyContent="center"
			alignItems="center"
			height="600px"
			padding="10px"
		>
			<Card.Root maxW="sm" overflow="hidden" padding="10px" gap="10px">
				<Image
					src={imageUrl}
					alt="Green double couch with wooden legs"
					height="300px"
					width="400px"
				/>
				{/* <div>
					<input type="file" onChange={handleFileChange} />
					<button onClick={uploadFile}>Upload</button>
				</div> */}

				<Card.Body gap="2">
					<Button onClick={handleChangeProfilePicture}>
						Change Profile Picture
					</Button>
					{/* <Card.Title>{currentUser?.email}</Card.Title> */}
					<Card.Description width="100%" textAlign="center">
						{currentUser?.email}
					</Card.Description>
				</Card.Body>
				<Card.Footer gap="2" width="100%" justifyContent="center">
					<Button
						onClick={() => logOut()}
						variant="ghost"
						width="100px"
						_hover={{
							bg: "red.500",
						}}
					>
						Log out
					</Button>
				</Card.Footer>
			</Card.Root>
			<input
				type="file"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={handleFileChange}
			/>
		</Box>
	);
};

export default ProfileScreen;
