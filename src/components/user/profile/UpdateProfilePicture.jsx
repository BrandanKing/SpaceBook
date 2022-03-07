import React, { cloneElement, useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";

import { Box, Button, Center, Modal, Pressable } from "native-base";

import { toastError, toastSuccess } from "utils/toastUtil";
import { updateProfilePicture } from "services/userService";

const UpdateProfilePicture = ({ id, ...props }) => {
	const [showModal, setShowModal] = useState(false);
	const [hasPermission, setHasPermission] = useState(false);
	const [update, updateState] = useState(); // Create a blank state to toggle profile pic rerender when picture is taken
	const [cameraType] = useState(Camera.Constants.Type.front);
	const camera = useRef(null);

	const getCameraPermission = async () => {
		const { status } = await Camera.requestCameraPermissionsAsync();
		setHasPermission(status === "granted");
	};

	const saveProfilePicture = async (data) => {
		let res = await fetch(data.base64);
		let blob = await res.blob();
		try {
			await updateProfilePicture(id, blob);
			updateState({});
			setShowModal(false);
			toastSuccess("Profile Picture Updated");
		} catch (error) {
			toastError(error);
		}
	};

	const takePicture = async () => {
		if (camera) {
			const options = {
				quality: 0.5,
				base64: true,
				onPictureSaved: (data) => saveProfilePicture(data),
			};
			await camera.current.takePictureAsync(options);
		}
	};

	const openModal = () => {
		if (!hasPermission) {
			toastError("Cannot Access Camera");
			return;
		}
		setShowModal(true);
	};

	const onMount = async () => {
		await getCameraPermission();
	};

	useEffect(() => {
		onMount();
	}, []);

	return (
		<>
			<Pressable onPress={openModal}>
				{cloneElement(props.children, { pic_updated: update })}
			</Pressable>
			{showModal && hasPermission && (
				<Modal isOpen={showModal} onClose={() => setShowModal(false)}>
					<Modal.Content maxWidth="400px">
						<Modal.CloseButton />
						<Modal.Header>Update Profile Picture</Modal.Header>
						<Modal.Body>
							<Center flex={1}>
								<Box
									minW="200px"
									maxW="200px"
									minH="200px"
									maxH="200px"
									rounded="full"
									overflow="hidden">
									<Camera ref={camera} type={cameraType}></Camera>
								</Box>
							</Center>
						</Modal.Body>
						<Modal.Footer>
							<Button.Group space={2}>
								<Button
									variant="ghost"
									colorScheme="blueGray"
									onPress={() => {
										setShowModal(false);
									}}>
									Close
								</Button>
								<Button onPress={takePicture}>Update</Button>
							</Button.Group>
						</Modal.Footer>
					</Modal.Content>
				</Modal>
			)}
		</>
	);
};

export default UpdateProfilePicture;
