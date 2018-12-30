import React, { Component } from 'react';
import EventListAttendee from './EventListAttendee';
import { Segment, Item, Icon, List, Button } from 'semantic-ui-react';

class EventListItem extends Component {
	render() {
		const { hostPhotoURL, title, hostedBy, date, venue, attendees, description } = this.props.event;

		return (
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size="tiny" circular src={hostPhotoURL} />
							<Item.Content>
								<Item.Header as="a">{title}</Item.Header>
								<Item.Description>
									Hosted by <a href="#!">{hostedBy}</a>
								</Item.Description>
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name="clock" /> {date} |
						<Icon name="marker" /> {venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal>
						{attendees &&
							attendees.map(attendee => (
								<EventListAttendee key={attendee.id} attendee={attendee} />
							))}
					</List>
				</Segment>
				<Segment clearing>
					<span>{description}</span>
					<Button as="a" color="teal" floated="right" content="View" />
				</Segment>
			</Segment.Group>
		);
	}
}

export default EventListItem;
