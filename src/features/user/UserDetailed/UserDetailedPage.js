import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid } from 'semantic-ui-react';
// import LoadingComponent from '../../../app/layout/LoadingComponent';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedDescription from './UserDetailedDescription';
import UserDetailedPhotos from './UserDetailedPhotos';
import UserDetailedEvents from './UserDetailedEvents';
import UserDetailedSidebar from './UserDetailedSidebar';

class UserDetailedPage extends Component {
	render() {
		const { profile, photos /* loading */ } = this.props;
		// Add method to have loading page if user profile is being fetched from firebase
		// if (loading) return <LoadingComponent inverted={true} />;
		return (
			<Grid>
				<Grid.Column width={16}>
					<UserDetailedHeader profile={profile} />
				</Grid.Column>

				<Grid.Column width={12}>
					<UserDetailedDescription profile={profile} />
					{photos && photos.length > 0 && <UserDetailedPhotos photos={photos} />}
					<UserDetailedEvents />
				</Grid.Column>

				<Grid.Column width={4}>
					<UserDetailedSidebar />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapState = state => ({
	profile: state.firebase.profile,
	auth: state.firebase.auth,
	photos: state.firestore.ordered.photos,
	// loading: state.async.loading,
});

const query = ({ auth }) => {
	return [
		{
			collection: 'users',
			doc: auth.uid,
			subcollections: [{ collection: 'photos' }],
			storeAs: 'photos',
		},
	];
};

export default compose(
	connect(mapState),
	firestoreConnect(auth => query(auth)),
)(UserDetailedPage);
