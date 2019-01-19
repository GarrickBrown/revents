import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import EventListItem from './EventListItem';

class EventList extends Component {
	render() {
		const { events, loading, moreEvents, getNextEvents } = this.props;

		return (
			<div>
				{events && events.length !== 0 && (
					<InfiniteScroll
						pageStart={0}
						loadMore={getNextEvents}
						hasMore={!loading && moreEvents}
						initialLoad={false}
					>
						{events && events.map(event => <EventListItem key={event.id} event={event} />)}
					</InfiniteScroll>
				)}
			</div>
		);
	}
}

export default EventList;
