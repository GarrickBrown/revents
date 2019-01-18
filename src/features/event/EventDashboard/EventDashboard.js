import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';

class EventDashboard extends Component {
	render() {
		const { events } = this.props;
		if (!isLoaded(events) || isEmpty(events)) return <LoadingComponent inverted={true} />;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapState = state => ({
	events: state.firestore.ordered.events,
});

export default connect(mapState)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
