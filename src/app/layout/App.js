import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';
import EventDashboard from '../../features/event/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/event/EventDetailed/EventDetailedPage';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import EventForm from '../../features/event/EventForm/EventForm';
import NotFound from '../../app/layout/NotFound';
import TestComponent from '../../features/testarea/TestComponent';
import ModalManager from '../../features/modals/ModalManager';
import { UserIsAuthenticated } from '../../features/auth/authWrapper';

class App extends Component {
	render() {
		return (
			<Fragment>
				<ModalManager />
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/error" component={NotFound} />
				</Switch>

				<Route
					path="/(.+)"
					render={() => (
						<Fragment>
							<NavBar />
							<Container className="main">
								<Switch>
									<Route path="/test" component={TestComponent} />
									<Route path="/events" component={EventDashboard} />
									<Route path="/event/:id" component={EventDetailedPage} />
									<Route path="/manage/:id" component={UserIsAuthenticated(EventForm)} />
									<Route path="/people" component={UserIsAuthenticated(PeopleDashboard)} />
									<Route path="/profile/:id" component={UserIsAuthenticated(UserDetailedPage)} />
									<Route path="/settings" component={UserIsAuthenticated(SettingsDashboard)} />
									<Route path="/createEvent" component={UserIsAuthenticated(EventForm)} />
									<Route component={NotFound} />
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
