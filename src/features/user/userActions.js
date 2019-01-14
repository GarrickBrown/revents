import moment from 'moment';
import { toastr } from 'react-redux-toastr';

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
