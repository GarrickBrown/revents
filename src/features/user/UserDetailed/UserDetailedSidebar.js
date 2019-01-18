import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailedSidebar = ({ isCurrentUser }) => {
	return (
		<Segment>
			{isCurrentUser ? (
				<Button as={Link} to={'/settings'} color="teal" fluid basic content="Edit Profile" />
			) : (
				<Button color="blue" fluid basic content="Follow User" />
			)}
		</Segment>
	);
};

export default UserDetailedSidebar;
