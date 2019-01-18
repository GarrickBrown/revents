import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { Grid } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray } from '../../../app/common/util/helpers';

class EventDetailedPage extends Component {
	componentDidMount = async () => {
		const { firestore, match, history } = this.props;
		let event = await firestore.get(`events/${match.params.id}`);
		if (!event.exists) {
			history.push('/events');
			toastr.error('Sorry', 'Event not found');
		}
	};

	render() {
		const { event } = this.props;
		const attendees = event && event.attendees && objectToArray(event.attendees);
		return (
			<Grid>
				<Grid.Column width={10}>
					<EventDetailedHeader event={event} />
					<EventDetailedInfo event={event} />
					<EventDetailedChat />
				</Grid.Column>
				<Grid.Column width={6}>
					<EventDetailedSidebar attendees={attendees} />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapState = (state, ownProps) => {
	let event = {};
	let eventArray = [];
	if (state.firestore.ordered.events) {
		eventArray = state.firestore.ordered.events.filter(
			event => event.id === ownProps.match.params.id,
		);
		event = eventArray[0];
	}
	return {
		event,
	};
};

export default withFirestore(connect(mapState)(EventDetailedPage));
