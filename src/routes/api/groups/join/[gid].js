export const get = async ({ request, params }) => {
	console.log(params);
	return {
        body: JSON.stringify(params)
    };
};
