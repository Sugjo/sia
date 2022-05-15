import { db } from '$lib/user/firebase';
import { auth } from '$lib/user/firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const getGroup = async (groupID) => {
	const querySnapshot = await getDoc(doc(db, 'groups', `${groupID}`));
	if (querySnapshot.exists()) return querySnapshot.data();
	return 'No such document!';
};

export async function get({ params }) {
	onAuthStateChanged(auth, (user) => {
		console.log(user);
	});
	const groupsData = await getDoc(doc(db, 'users', '0BOeGj0ztyLFlHT7856oxHhji2c2'));

	if (!groupsData.exists()) return 'No such document!';

	let userGroups = groupsData.data().groups?.map(async (e) => {
		return getGroup(e);
	});
	userGroups = await Promise.all(userGroups);

	if (userGroups) {
		return {
			body: { userGroups }
		};
	}

	return {
		status: 404
	};
}
