import { db } from "$lib/tools/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function post({ request }) {
    const { uid, checkId } = await request.json();

    const userRef = await getDoc(doc(db, 'users', uid))
    const userChecks = userRef.data()?.checks

    console.log(userChecks, checkId);

    if (userChecks.includes(checkId)) {
        const res = await updateDoc(
            userRef,
            {
                checks: userChecks.filter((e) => e != checkId)
            },
            { merge: true }
        );
        
        return {
            status: 200,
            body: {
                message: "tets"
            }
        };
    } else {
        return {
            status: 200,
            body: {
                message: "tets"
            }
        };
    }

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