import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedSidebar from './UserDetailedSidebar';
import { userDetailedQuery } from '../userQueries';
import { getUserEvents } from '../userActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

class UserDetailedPage extends Component {
	componentDidMount = () => {
		this.props.getUserEvents(this.props.userUid);
	};

	changeTab = (event, data) => {
		this.props.getUserEvents(this.props.userUid, data.activeIndex);
	};

	render() {
		const { profile, photos, auth, match, requesting, events, eventsLoading } = this.props;
		const isCurrentUser = auth.uid === match.params.id;
		const loading = Object.values(requesting).some(request => request === true);
		if (loading) return <LoadingComponent inverted={true} />;
		return (
			<Grid>
				<Grid.Column width={16}>
					<UserDetailedHeader profile={profile} />
				</Grid.Column>

				<Grid.Column width={12}>
					<UserDetailedDescription profile={profile} />
					{photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
					<UserDetailedEvents
						events={events}
						eventsLoading={eventsLoading}
						changeTab={this.changeTab}
					/>
				</Grid.Column>

				<Grid.Column width={4}>
					<UserDetailedSidebar isCurrentUser={isCurrentUser} />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapState = (state, ownProps) => {
	let userUid = null;
	let profile = {};

	if (ownProps.match.params.id === state.auth.uid) {
		profile = state.firebase.profile;
	} else {
		profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
		userUid = ownProps.match.params.id;
	}

	return {
		profile,
		userUid,
		events: state.events,
		eventsLoading: state.async.loading,
		auth: state.firebase.auth,
		photos: state.firestore.ordered.photos,
		requesting: state.firestore.status.requesting,
	};
};

const actions = {
	getUserEvents,
};

export default compose(
	connect(
		mapState,
		actions,
	),
	firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid)),
)(UserDetailedPage);
