import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore, firebaseConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedSidebar from './EventDetailedSidebar';
import { objectToArray, createDataTree } from '../../../app/common/util/helpers';
import { goingToEvent, cancelGoingToEvent } from '../../user/userActions';
import { addEventComment } from '../eventActions';
import { openModal } from '../../modals/modalActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

class EventDetailedPage extends Component {
	state = {
		initialLoading: true,
	};

	componentDidMount = async () => {
		// create _isMounted to fix memory leak
		this._isMounted = true;
		const { firestore, match } = this.props;
		let event = await firestore.get(`events/${match.params.id}`);
		if (!event.exists) {
			toastr.error('Not Found', 'This is not the event you are looking for');
			this.props.history.push('/error');
		}
		await firestore.setListener(`events/${match.params.id}`);
		// check _isMounted to fix memory leak
		if (this._isMounted) {
			this.setState({ initialLoading: false });
		}
	};

	componentWillUnmount = async () => {
		// remove _isMounted to fix memory leak
		this._isMounted = false;
		const { firestore, match } = this.props;
		await firestore.unsetListener(`events/${match.params.id}`);
	};

	render() {
		const {
			requesting,
			event,
			loading,
			auth,
			goingToEvent,
			cancelGoingToEvent,
			addEventComment,
			eventChat,
			openModal,
			match,
		} = this.props;
		const attendees = event && event.attendees && objectToArray(event.attendees);
		const isHost = event && event.hostUid === auth.uid;
		const isGoing = attendees && attendees.some(attendee => attendee.id === auth.uid);
		const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
		const authenticated = auth.isLoaded && !auth.isEmpty;
		const loadingEvent = requesting[`events/${match.params.id}`];

		if (loadingEvent || this.state.initialLoading) return <LoadingComponent inverted={true} />;

		return (
			<Grid>
				<Grid.Column width={10}>
					<EventDetailedHeader
						event={event}
						loading={loading}
						isHost={isHost}
						isGoing={isGoing}
						goingToEvent={goingToEvent}
						cancelGoingToEvent={cancelGoingToEvent}
						authenticated={authenticated}
						openModal={openModal}
					/>
					<EventDetailedInfo event={event} />
					{authenticated && (
						<EventDetailedChat
							addEventComment={addEventComment}
							eventId={event.id}
							eventChat={chatTree}
						/>
					)}
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
		requesting: state.firestore.status.requesting,
		event,
		loading: state.async.loading,
		auth: state.firebase.auth,
		eventChat:
			!isEmpty(state.firebase.data.event_chat) &&
			objectToArray(state.firebase.data.event_chat[ownProps.match.params.id]),
	};
};

const actions = {
	goingToEvent,
	cancelGoingToEvent,
	addEventComment,
	openModal,
};

export default compose(
	withFirestore,
	connect(
		mapState,
		actions,
	),
	firebaseConnect(props => [`event_chat/${props.match.params.id}`]),
)(EventDetailedPage);
