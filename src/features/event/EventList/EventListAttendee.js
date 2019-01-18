import React, { Component } from 'react';
import { List, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class EventListAttendee extends Component {
	render() {
		const { photoURL, id } = this.props.attendee;
		return (
			<List.Item>
				<Image as={Link} to={`/profile/${id}`} size="mini" circular src={photoURL} />
			</List.Item>
		);
	}
}

export default EventListAttendee;
