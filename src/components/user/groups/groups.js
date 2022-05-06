// @ts-nocheck
import { goto } from '$app/navigation';
import { db } from '../firebase';
import { settings, settingsToDefault } from '../../../store/settings.store';
import { get } from 'svelte/store';
import { collection, addDoc } from 'firebase/firestore';

export const createGroup = async () => {
	try {
		const docRef = await addDoc(collection(db, 'groups'), {
			first: 'Ada',
			last: 'Lovelace',
			born: 1815
		});
		console.log(docRef.id);
	} catch (error) {
		console.log(error);
	}
};
