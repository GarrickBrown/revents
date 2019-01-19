import React from 'react';
import { Card, Header, Image, Segment, Tab } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const panes = [
	{ menuItem: 'All Events', pane: { key: 'allEvents' } },
	{ menuItem: 'Past Events', pane: { key: 'pastEvents' } },
	{ menuItem: 'Future Events', pane: { key: 'futureEvents' } },
	{ menuItem: 'Hosting', pane: { key: 'hosted' } },
];

const UserDetailedEvents = ({ events, eventsLoading, changeTab }) => {
	return (
		<Segment attached loading={eventsLoading}>
			<Header icon="calendar" content="Events" />
			<Tab
				onTabChange={(event, data) => changeTab(event, data)}
				panes={panes}
				menu={{ secondary: true, pointing: true }}
			/>
			<br />

			<Card.Group itemsPerRow={5}>
				{events &&
					events.map(event => (
						<Card as={Link} to={`/event/${event.id}`} key={event.id}>
							<Image src={`/assets/categoryImages/${event.category}.jpg`} />
							<Card.Content>
								<Card.Header textAlign="center">{event.title}</Card.Header>
								<Card.Meta textAlign="center">
									<div>{format(event && event.date.toDate(), 'DD MMM YYYY')}</div>
									<div>{format(event && event.date.toDate(), 'h:mm A')}</div>
								</Card.Meta>
							</Card.Content>
						</Card>
					))}
			</Card.Group>
		</Segment>
	);
};

export default UserDetailedEvents;
