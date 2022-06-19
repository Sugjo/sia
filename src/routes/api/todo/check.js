import { set } from "firebase/database";

export async function post({ request }) {
    const { uid, id } = await request.json();

    // const [, error] = await handle(
    //     set(push(ref(dbref, 'todo/' + uid)), {
    //         uid,
    //         name,
    //         from,
    //         text
    //     })
    // );

    // if (error) {
    //     return {
    //         status: 400,
    //         body: {
    //             message: `Error: ${error.message}`
    //         }
    //     };
    // }

    return {
        status: 200,
        body: {
            message: !isChecked
        }
    };
}