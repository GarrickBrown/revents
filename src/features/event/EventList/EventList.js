import React, { Component } from 'react';
import EventListItem from './EventListItem';

class EventList extends Component {
	render() {
		const { events, onDeleteEvent } = this.props;

		return (
			<div>
				{events &&
					events.map(event => (
						<EventListItem key={event.id} event={event} onDeleteEvent={onDeleteEvent} />
					))}
			</div>
		);
	}
}

export default EventList;
