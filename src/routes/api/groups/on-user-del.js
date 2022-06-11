import { db } from '$lib/user/firebase';
import { update } from 'firebase/database';
import {
	arrayRemove,
	arrayUnion,
	collection,
	deleteField,
	doc,
	FieldValue,
	getDoc,
	query,
	updateDoc,
	where
} from 'firebase/firestore';

export const del = async ({ request }) => {
	const { id, uid } = await request.json();
	console.log(id, uid);

	const docRef = doc(db, 'users', uid);
	const groupRef = doc(db, 'groups', id);
	docRef;
	const res = await updateDoc(
		docRef,
		{
			groups: arrayRemove(groupRef)
		},
		{ merge: true }
	);

	console.log(res);

	return {
		status: 200,
		body: {
			message: `Ok`
		}
	};
};
