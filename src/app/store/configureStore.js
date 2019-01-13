import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import firebase from '../config/firebase';
import rootReducer from '../reducers/rootReducer';

const rrfConfig = {
	userProfile: 'users',
	attachAuthIsReady: true,
	useFirestoreForProfile: true,
	updateProfileOnLogin: false,
};

export const configureStore = preloadedState => {
	const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
	const middlewareEnhancer = applyMiddleware(...middlewares);
	const storeEnhancers = [middlewareEnhancer];

	const composedEnhancer = composeWithDevTools(
		...storeEnhancers,
		reactReduxFirebase(firebase, rrfConfig),
		reduxFirestore(firebase),
	);

	const store = createStore(rootReducer, preloadedState, composedEnhancer);

	return store;
};
