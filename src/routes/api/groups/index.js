export const post = ({ request }) => {};

export const del = ({ request }) => {
	const {id} = await request.json();
	console.log(id);
	return {
		status: 200,
		body: {
			message: `Ok`
		}
	};
};