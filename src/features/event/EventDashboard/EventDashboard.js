import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import { createEvent, updateEvent, deleteEvent } from '../eventActions';
import cuid from 'cuid';

class EventDashboard extends Component {
	state = {
		isOpen: false,
		selectedEvent: null,
	};

	handleFormOpen = () => {
		this.setState({
			selectedEvent: null,
			isOpen: true,
		});
	};

	handleFormCancel = () => {
		this.setState({
			isOpen: false,
		});
	};

	handleCreateEvent = newEvent => {
		newEvent.id = cuid();
		// Add hosts photo
		newEvent.hostPhotoURL = '/assets/user.png';
		this.props.createEvent(newEvent);
		this.setState({
			isOpen: false,
		});
	};

	handleUpdateEvent = updatedEvent => {
		this.props.updateEvent(updatedEvent);
		this.setState({
			isOpen: false,
			selectedEvent: null,
		});
	};

	handleDeleteEvent = eventId => () => {
		this.props.deleteEvent(eventId);
	};

	render() {
		const { isOpen, selectedEvent } = this.state;
		const { events } = this.props;

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventList onDeleteEvent={this.handleDeleteEvent} events={events} />
				</Grid.Column>
				<Grid.Column width={6}>
					<Button positive content="Create Event" onClick={this.handleFormOpen} />
					{isOpen && (
						<EventForm
							handleFormCancel={this.handleFormCancel}
							createEvent={this.handleCreateEvent}
							selectedEvent={selectedEvent}
							updateEvent={this.handleUpdateEvent}
						/>
					)}
				</Grid.Column>
			</Grid>
		);
	}
}

const mapState = state => ({
	events: state.events,
});

const actions = {
	createEvent,
	updateEvent,
	deleteEvent,
};

export default connect(
	mapState,
	actions,
)(EventDashboard);
