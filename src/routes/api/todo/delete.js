import { handle } from "$lib/tools/handle";
import { getDatabase, ref, remove } from "firebase/database";

export async function del({ request }) {
    const { id, uid } = await request.json();
    console.log(id, uid);
    const [, error] = await handle(remove(ref(getDatabase(), `todo/${uid}/${id}`)));

    if (error) {
        return {
            status: 400,
            body: {
                message: `Ошибка: ${createError}`
            }
        };
    }

    return {
        status: 200,
        body: {
            message: `Задание удалено`
        }
    };
}
