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

export const getGroups = async () => {
	let querySnapshot;

	querySnapshot = await getDoc(doc(db, 'users', '0BOeGj0ztyLFlHT7856oxHhji2c2'));

	if (!querySnapshot.exists()) return 'No such document!';

	const userGroups = querySnapshot.data().groups.map(async (e) => {
		return getGroup(e);
	});

	return await Promise.all(userGroups);
};

const getGroup = async (groupID) => {
	const querySnapshot = await getDoc(doc(db, 'groups', `${groupID}`));
	if (querySnapshot.exists()) return querySnapshot.data();
	return 'No such document!';
};
