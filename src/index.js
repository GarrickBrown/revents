import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './app/store/configureStore';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layout/App';
import ScrollToTop from './app/common/util/ScrollToTop';
import * as serviceWorker from './serviceWorker';

const store = configureStore();

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<ScrollToTop>
				<App />
			</ScrollToTop>
		</Router>
	</Provider>,
	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
