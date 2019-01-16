import React from 'react';
import { Button, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const UserDetailedSidebar = () => {
	return (
		<Segment>
			<Button as={Link} to={'/settings'} color="teal" fluid basic content="Edit Profile" />
		</Segment>
	);
};

export default UserDetailedSidebar;
