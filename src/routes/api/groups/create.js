export const post = async ({ request }) => {
	const { name, uid, img } = await request;

	return {
		body: JSON.stringify('Group created')
	};
};
