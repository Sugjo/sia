import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyBWNH3kfxiumQM0r0bwTqWgaNKCQSyKd00',
	authDomain: 'sia-homework.firebaseapp.com',
	databaseURL: 'https://sia-homework-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'sia-homework',
	storageBucket: 'sia-homework.appspot.com',
	messagingSenderId: '951833621313',
	appId: '1:951833621313:web:bcac5d3977d4a09fb6e7c0',
	measurementId: 'G-H4LFKFE0T8'
};

const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth(app);