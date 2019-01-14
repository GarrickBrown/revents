import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'semantic-ui-css/semantic.min.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import './index.css';
import App from './app/layout/App';
import ScrollToTop from './app/common/util/ScrollToTop';
import { configureStore } from './app/store/configureStore';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

store.firebaseAuthIsReady.then(() => {
	ReactDOM.render(
		<Provider store={store}>
			<Router>
				<ScrollToTop>
					<ReduxToastr position="bottom-right" transitionIn="fadeIn" transitionOut="fadeOut" />
					<App />
				</ScrollToTop>
			</Router>
		</Provider>,
		document.getElementById('root'),
	);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
