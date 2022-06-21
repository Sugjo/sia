import { db } from "$lib/tools/firebase";
import { child, get, getDatabase, ref, update } from "firebase/database";

export async function post({ request }) {
    const { uid, path } = await request.json();
    const db = getDatabase()
    let todoData = (await get(child(ref(db), path))).val()

    if (todoData?.checkedData?.includes(uid)) {
        todoData = { ...todoData, checkedData: todoData.checkedData.filter((e) => e != uid) }
    } else if (Array.isArray(todoData?.checkedData)) {
        todoData = { ...todoData, checkedData: [...todoData.checkedData, uid] }
    } else {
        todoData = { ...todoData, checkedData: [uid] }
    }

    update(ref(db, path), todoData)

    return {
        status: 200
    };

    // if (userChecks.includes(checkId)) {
    //     const res = await updateDoc(
    //         userRef,
    //         {
    //             checks: userChecks.filter((e) => e != checkId)
    //         },
    //         { merge: true }
    //     );

    //     return {
    //         status: 200,
    //         body: {
    //             message: "tets"
    //         }
    //     };
    // } else {
    //   
    // }

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
}