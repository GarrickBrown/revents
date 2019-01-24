import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedSidebar from './UserDetailedSidebar';
import { userDetailedQuery } from '../userQueries';
import { getUserEvents, followUser, unfollowUser } from '../userActions';
import LoadingComponent from '../../../app/layout/LoadingComponent';

class UserDetailedPage extends Component {
	componentDidMount = async () => {
		let user = await this.props.firestore.get(`users/${this.props.match.params.id}`);
		if (!user.exists) {
			toastr.error('Not Found', 'This is not the person you are looking for');
			this.props.history.push('/error');
		}
		await this.props.getUserEvents(this.props.userUid);
	};

	changeTab = (event, data) => {
		this.props.getUserEvents(this.props.userUid, data.activeIndex);
	};

	render() {
		const {
			profile,
			photos,
			auth,
			match,
			requesting,
			events,
			eventsLoading,
			followUser,
			unfollowUser,
			following,
		} = this.props;
		const isCurrentUser = auth.uid === match.params.id;
		const isFollowing = !isEmpty(following);
		const loading = requesting[`users/${match.params.id}`];
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
					<UserDetailedSidebar
						isCurrentUser={isCurrentUser}
						profile={profile}
						followUser={followUser}
						unfollowUser={unfollowUser}
						isFollowing={isFollowing}
					/>
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
		following: state.firestore.ordered.following,
	};
};

const actions = {
	getUserEvents,
	followUser,
	unfollowUser,
};

export default compose(
	connect(
		mapState,
		actions,
	),
	firestoreConnect(props => userDetailedQuery(props)),
)(UserDetailedPage);
