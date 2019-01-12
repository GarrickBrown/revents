import { SubmissionError } from 'redux-form';
import { closeModal } from '../modals/modalActions';

export const login = credentials => {
	return async (dispatch, getState, { getFirebase }) => {
		const firebase = getFirebase();
		try {
			await firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
			dispatch(closeModal());
		} catch (error) {
			console.log(error);
			throw new SubmissionError({
				_error: error.message,
			});
		}
	};
};

export const registerUser = user => async (dispatch, getState, { getFirebase, getFirestore }) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	try {
		// create the user in firebase auth
		let createdUser = await firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password);
		console.log(createdUser);
		// update the auth profile
		let currentUser = await firebase.auth().currentUser;
		console.log(currentUser);
		await currentUser.updateProfile({
			displayName: user.displayName,
		});
		// create a new profile in firestore
		let newUser = {
			displayName: user.displayName,
			createdAt: firestore.FieldValue.serverTimestamp(),
		};
		await firestore.set(`users/${currentUser.uid}`, { ...newUser });
		dispatch(closeModal());
	} catch (error) {
		console.log(error);
		throw new SubmissionError({
			_error: error.message,
		});
	}
};
