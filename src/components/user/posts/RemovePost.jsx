import { cloneElement } from "react";

import { deletePost } from "services/userService";
import { toastError, toastSuccess } from "utils/toastUtil";

const RemovePost = ({ id, post_id, children, setPosts }) => {
	const removePost = async () => {
		try {
			await deletePost(id, post_id);
			toastSuccess("Post Deleted");
			setPosts({});
		} catch (error) {
			toastError(error);
		}
	};
	return cloneElement(children, { onPress: removePost });
};

export default RemovePost;
