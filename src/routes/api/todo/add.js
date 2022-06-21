import { handle } from '$lib/tools/handle';
import { set, ref, push, getDatabase } from 'firebase/database';

export async function post({ request }) {
    const { id: placeId, name, from, text } = await request.json();

    const [, error] = await handle(
        set(push(ref(getDatabase(), 'todo/' + placeId)), {
            placeId,
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