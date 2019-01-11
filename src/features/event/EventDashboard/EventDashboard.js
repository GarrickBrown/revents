import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { deleteEvent } from '../eventActions';

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
				<Grid.Column width={6} />
			</Grid>
		);
	}
}

const mapState = state => ({
	events: state.events,
	loading: state.async.loading,
});

const actions = {
	deleteEvent,
};

export default connect(
	mapState,
	actions,
)(EventDashboard);
