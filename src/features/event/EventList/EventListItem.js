import React, { Component } from 'react';
import { Segment, Item, Icon, List, Button, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import EventListAttendee from './EventListAttendee';

class EventListItem extends Component {
	render() {
		const { event, onDeleteEvent } = this.props;
		let eventDate;
		if (event.date) {
			eventDate = event.date.toDate();
		}
		return (
			<Segment.Group>
				<Segment>
					<Item.Group>
						<Item>
							<Item.Image size="tiny" circular src={event.hostPhotoURL} />
							<Item.Content>
								<Item.Header as="a">{event.title}</Item.Header>
								<Item.Description>
									Hosted by <a href="#!">{event.hostedBy}</a>
								</Item.Description>
								{event.cancelled && (
									<Label
										style={{ top: '-40px' }}
										ribbon="right"
										color="red"
										content="This event has been cancelled"
									/>
								)}
							</Item.Content>
						</Item>
					</Item.Group>
				</Segment>
				<Segment>
					<span>
						<Icon name="clock" /> {format(eventDate, 'dddd Do MMMM')} at{' '}
						{format(eventDate, 'h:mm a')} | <Icon name="marker" /> {event.venue}
					</span>
				</Segment>
				<Segment secondary>
					<List horizontal>
						{event.attendees &&
							Object.values(event.attendees).map((attendee, index) => (
								<EventListAttendee key={index} attendee={attendee} />
							))}
					</List>
				</Segment>
				<Segment clearing>
					<span>{event.description}</span>
					<Button
						as="a"
						color="red"
						floated="right"
						content="Delete"
						onClick={onDeleteEvent(event.id)}
					/>
					<Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View" />
				</Segment>
			</Segment.Group>
		);
	}
}

export default EventListItem;
