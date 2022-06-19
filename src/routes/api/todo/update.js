export async function post({ request }) {
    const { uid, name, from, text } = await request.json();

    const [, error] = await handle(
        set(push(ref(dbref, 'todo/' + uid)), {
            uid,
            name,
            from,
            text
        })
    );

    if (error) {
        return {
            status: 400,
            body: {
                message: `Error: ${error.message}`
            }
        };
    }

    return {
        status: 200,
        body: {
            message: `Task created`
        }
    };
}