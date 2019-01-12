import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCkkus5UOTblMFdZggDDmCD3SVlqm7FXDs',
	authDomain: 'revents-228102.firebaseapp.com',
	databaseURL: 'https://revents-228102.firebaseio.com',
	projectId: 'revents-228102',
	storageBucket: '',
	messagingSenderId: '1095017014074',
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = {
	timestampsInSnapshots: true,
};
firestore.settings(settings);

export default firebase;
