import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { Grid, Segment, Header, Card } from 'semantic-ui-react';
import PersonCard from './PersonCard';
import { userFollowQuery } from '../userQueries';

const PeopleDashboard = ({ following, followers }) => {
	return (
		<Grid>
			<Grid.Column width={16}>
				<Segment>
					<Header dividing content="People following me" />
					<Card.Group itemsPerRow={8} stackable>
						{followers &&
							followers.map(follower => <PersonCard key={follower.id} user={follower} />)}
					</Card.Group>
				</Segment>
				<Segment>
					<Header dividing content="People I'm following" />
					<Card.Group itemsPerRow={8} stackable>
						{following &&
							following.map(following => <PersonCard key={following.id} user={following} />)}
					</Card.Group>
				</Segment>
			</Grid.Column>
		</Grid>
	);
};

const mapState = state => {
	return {
		auth: state.firebase.auth,
		following: state.firestore.ordered.following,
		followers: state.firestore.ordered.followers,
	};
};

export default compose(
	connect(mapState),
	firestoreConnect(props => userFollowQuery(props)),
)(PeopleDashboard);
