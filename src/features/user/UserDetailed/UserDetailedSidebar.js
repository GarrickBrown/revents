import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailedSidebar = ({ isCurrentUser, profile, followUser, unfollowUser, isFollowing }) => {
	return (
		<Segment>
			{isCurrentUser && (
				<Button as={Link} to={'/settings'} color="teal" fluid basic content="Edit Profile" />
			)}

			{!isCurrentUser && !isFollowing && (
				<Button
					onClick={() => followUser(profile)}
					color="blue"
					fluid
					basic
					content="Follow User"
				/>
			)}

			{!isCurrentUser && isFollowing && (
				<Button
					onClick={() => unfollowUser(profile.id, profile.displayName)}
					color="blue"
					fluid
					basic
					content="Unfollow"
				/>
			)}
		</Segment>
	);
};

export default UserDetailedSidebar;
