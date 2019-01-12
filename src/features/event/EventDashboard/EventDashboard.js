import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { deleteEvent } from '../eventActions';
import EventActivity from '../EventActivity/EventActivity';

class EventDashboard extends Component {
	handleDeleteEvent = eventId => () => {
		this.props.deleteEvent(eventId);
	};

	render() {
		const { events, loading } = this.props;
		if (loading) return <LoadingComponent inverted={true} />;
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList onDeleteEvent={this.handleDeleteEvent} events={events} />
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
	loading: state.async.loading,
});

const actions = {
	deleteEvent,
};

export default connect(
	mapState,
	actions,
)(firestoreConnect([{ collection: 'events' }])(EventDashboard));
