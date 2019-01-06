import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import { deleteEvent } from '../eventActions';

class EventDashboard extends Component {
	handleDeleteEvent = eventId => () => {
		this.props.deleteEvent(eventId);
	};

	render() {
		const { events } = this.props;

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList onDeleteEvent={this.handleDeleteEvent} events={events} />
				</Grid.Column>
				<Grid.Column width={6} />
			</Grid>
		);
	}
}

const mapState = state => ({
	events: state.events,
});

const actions = {
	deleteEvent,
};

export default connect(
	mapState,
	actions,
)(EventDashboard);
