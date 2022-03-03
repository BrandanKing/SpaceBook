import React, { useEffect, useState } from 'react';
import { saveDraftPost, getDraftPost } from 'services/userService';

const DraftScreen = () => {
	const [drafts, setDrafts] = useState();

	const onMount = () => {};

	useEffect(() => {
		onMount();
	}, []);

	return <></>;
};

export default DraftScreen;
