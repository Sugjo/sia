import { db } from '../firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { auth } from '$lib/user/firebase';
import { getAuth } from 'firebase/auth';

export const createGroup = async () => {
	try {
		const docRef = await addDoc(collection(db, 'groups'), {
			first: 'Ada',
			last: 'Lovelace',
			born: 1815
		});
		console.log(docRef.id);
	} catch (error) {
		return { type: 'other', message: error };
	}
};

