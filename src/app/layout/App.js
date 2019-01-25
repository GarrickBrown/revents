import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Loadable from 'react-loadable';
import LoadingComponent from '../../app/layout/LoadingComponent';
import ModalManager from '../../features/modals/ModalManager';
import { UserIsAuthenticated } from '../../features/auth/authWrapper';

const AsyncHomePage = Loadable({
	loader: () => import('../../features/home/HomePage'),
	loading: LoadingComponent,
});
const AsyncNavBar = Loadable({
	loader: () => import('../../features/nav/NavBar/NavBar'),
	loading: LoadingComponent,
});
const AsyncEventDashboard = Loadable({
	loader: () => import('../../features/event/EventDashboard/EventDashboard'),
	loading: LoadingComponent,
});
const AsyncEventDetailedPage = Loadable({
	loader: () => import('../../features/event/EventDetailed/EventDetailedPage'),
	loading: LoadingComponent,
});
const AsyncPeopleDashboard = Loadable({
	loader: () => import('../../features/user/PeopleDashboard/PeopleDashboard'),
	loading: LoadingComponent,
});
const AsyncUserDetailedPage = Loadable({
	loader: () => import('../../features/user/UserDetailed/UserDetailedPage'),
	loading: LoadingComponent,
});
const AsyncSettingsDashboard = Loadable({
	loader: () => import('../../features/user/Settings/SettingsDashboard'),
	loading: LoadingComponent,
});
const AsyncEventForm = Loadable({
	loader: () => import('../../features/event/EventForm/EventForm'),
	loading: LoadingComponent,
});
const AsyncNotFound = Loadable({
	loader: () => import('../../app/layout/NotFound'),
	loading: LoadingComponent,
});
const AsyncReroute = Loadable({
	loader: () => import('../../app/layout/Reroute'),
	loading: LoadingComponent,
});

class App extends Component {
	render() {
		return (
			<Fragment>
				<ModalManager />
				<Switch>
					<Route exact path="/" component={AsyncHomePage} />
					<Route exact path="/error" component={AsyncNotFound} />
				</Switch>

				<Route
					path="/(.+)"
					render={() => (
						<Fragment>
							<AsyncNavBar />
							<Container className="main">
								<Switch>
									<Route path="/events" component={AsyncEventDashboard} />
									<Route path="/event/:id" component={AsyncEventDetailedPage} />
									<Route path="/people" component={UserIsAuthenticated(AsyncPeopleDashboard)} />
									<Route
										path="/profile/:id"
										component={UserIsAuthenticated(AsyncUserDetailedPage)}
									/>
									<Route path="/settings" component={UserIsAuthenticated(AsyncSettingsDashboard)} />
									<Route path="/manage/:id" component={UserIsAuthenticated(AsyncEventForm)} />
									<Route path="/createEvent" component={UserIsAuthenticated(AsyncEventForm)} />
									<Route component={AsyncReroute} />
								</Switch>
							</Container>
						</Fragment>
					)}
				/>
			</Fragment>
		);
	}
}

export default App;
