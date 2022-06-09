import { db, auth } from './firebase';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';

export const createTodo = async () => {
	const docRef = await addDoc(collection(db, 'groups'), {
		first: 'Ada',
		last: 'Lovelace',
		born: 1815,
	});

    {
        todo: [{}]
    }
};

const getTodo = async (groupID) => {
	const querySnapshot = await getDoc(doc(db, 'groups', `${groupID}`));
	if (querySnapshot.exists()) return querySnapshot.data();
	return 'No such document!';
};
