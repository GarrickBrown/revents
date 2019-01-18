import moment from 'moment';
import { toastr } from 'react-redux-toastr';
import cuid from 'cuid';
import { asyncActionStart, asyncActionFinish, asyncActionError } from '../async/asyncActions';

export const updateProfile = user => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	// Create variable updateUser that doesn't include isLoaded and isEmpty
	const { isLoaded, isEmpty, ...updatedUser } = user;
	if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
		updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
	}

	try {
		// Update firestore user profile
		await firebase.updateProfile(updatedUser);
		toastr.success('Success', 'Profile updated');
	} catch (error) {
		console.log(error);
	}
};

export const uploadProfileImage = (file, filename) => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore },
) => {
	const imageName = cuid();
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	const path = `${user.uid}/user_images`;
	const options = {
		name: imageName,
	};
	try {
		// Start async loading condition
		dispatch(asyncActionStart());
		// Upload the file to firebase storage
		let uploadedFile = await firebase.uploadFile(path, file, null, options);
		// Get url of image in storage
		let downloadURL = await uploadedFile.uploadTaskSnapshot.ref.getDownloadURL();
		// Get userdoc from firestore
		let userDoc = await firestore.get(`users/${user.uid}`);
		// Check if user has a photo, if not, update profile with new image
		if (!userDoc.data().photoURL) {
			await firebase.updateProfile({
				photoURL: downloadURL,
			});
			await user.updateProfile({
				photoURL: downloadURL,
			});
		}
		// Add the new photo to photos collection
		await firestore.add(
			{
				collection: 'users',
				doc: user.uid,
				subcollections: [{ collection: 'photos' }],
			},
			{
				name: imageName,
				url: downloadURL,
			},
		);
		// Finish async loading condition
		dispatch(asyncActionFinish());
	} catch (error) {
		console.log(error);
		dispatch(asyncActionError());
		throw new Error('Problem uploading photo');
	}
};

export const deletePhoto = photo => async (dispatch, getState, { getFirebase, getFirestore }) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	try {
		await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
		await firestore.delete({
			collection: 'users',
			doc: user.uid,
			subcollections: [{ collection: 'photos', doc: photo.id }],
		});
	} catch (error) {
		console.log(error);
		throw new Error('Problem deleting the error');
	}
};

export const setMainPhoto = photo => async (dispatch, getState, { getFirebase }) => {
	const firebase = getFirebase();
	try {
		return await firebase.updateProfile({
			photoURL: photo.url,
		});
	} catch (error) {
		console.log(error);
		throw new Error('Problem setting main photo');
	}
};

export const goingToEvent = event => async (dispatch, getState, { getFirebase, getFirestore }) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	const photoURL = getState().firebase.profile.photoURL;
	const attendee = {
		going: true,
		joinDate: Date.now(),
		photoURL: photoURL || '/assets/user.png',
		displayName: user.displayName,
		host: false,
	};

	try {
		await firestore.update(`events/${event.id}`, {
			[`attendees.${user.uid}`]: attendee,
		});
		await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
			eventId: event.id,
			userId: user.uid,
			eventDate: event.date,
			host: false,
		});
		toastr.success('Success', 'You have joined the event');
	} catch (error) {
		console.log(error);
		toastr.error('Oops', 'Problem signing up to event');
	}
};

export const cancelGoingToEvent = event => async (
	dispatch,
	getState,
	{ getFirebase, getFirestore },
) => {
	const firebase = getFirebase();
	const firestore = getFirestore();
	const user = firebase.auth().currentUser;
	try {
		await firestore.update(`events/${event.id}`, {
			[`attendees.${user.uid}`]: firestore.FieldValue.delete(),
		});
		await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
		toastr.success('Success', 'You have removed yourself from the event');
	} catch (error) {
		console.log(error);
		toastr.error('Oops', 'Something went wrong');
	}
};
