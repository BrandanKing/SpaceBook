import React, { useEffect, useState } from "react";
import { FlatList, Heading, Container } from "native-base";
import { getDrafts, deleteDraft } from "services/userService";
import { toastError, toastSuccess } from "utils/toastUtil";
import Body from "components/layout/Body";
import Draft from "components/user/draft/Draft";
import { addPost } from "services/userService";
import AnimatedSpinner from "components/animation/AnimatedSpinner";

const DraftScreen = () => {
	const [drafts, setDrafts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const onMount = async () => {
		let currentDrafts = await getDrafts();
		setDrafts(currentDrafts);
	};
	const removeDraftFromList = async (index) => {
		drafts.splice(index, 1);
		setDrafts([...drafts]);
	};

	const publishDraft = async (user_id, data, index) => {
		setIsLoading(true);
		try {
			await addPost(user_id, data);
			await deleteDraft(index);
			removeDraftFromList(index);
			toastSuccess("Draft successfully posted");
		} catch (error) {
			toastError(error);
		}
		setIsLoading(false);
	};

	const delDraft = async (index) => {
		setIsLoading(true);
		try {
			await deleteDraft(index);
			removeDraftFromList(index);
			toastSuccess("Draft Deleted");
		} catch (error) {
			toastError("Error deleting draft");
		}
		setIsLoading(false);
	};

	useEffect(() => {
		onMount();
	}, []);

	return (
		<Body>
			{isLoading && <AnimatedSpinner />}
			<Container mt={4}>
				{drafts.length > 0 ? (
					<FlatList
						w="100%"
						data={drafts}
						renderItem={(item) => (
							<Draft publish={publishDraft} delDraft={delDraft} {...item} />
						)}
						keyExtractor={(item, index) => index.toString() + item.date.toString()}
					/>
				) : (
					<Heading mt={2} fontSize="lg">
						No Drafts Saved
					</Heading>
				)}
			</Container>
		</Body>
	);
};

export default DraftScreen;
