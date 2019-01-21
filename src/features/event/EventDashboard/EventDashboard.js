import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Grid, Loader } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import EventActivity from '../EventActivity/EventActivity';
import { getEventsForDashboard } from '../eventActions';

class EventDashboard extends Component {
	state = {
		loadingInitial: true,
		moreEvents: false,
		loadedEvents: [],
		contextRef: {},
	};

	componentDidMount = async () => {
		let next = await this.props.getEventsForDashboard();

		if (next && next.docs && next.docs.length > 1) {
			this.setState({
				loadingInitial: false,
				moreEvents: true,
			});
		}
	};

	componentWillReceiveProps = nextProps => {
		if (this.props.events !== nextProps.events) {
			this.setState({
				loadedEvents: [...this.state.loadedEvents, ...nextProps.events],
			});
		}
	};

	getNextEvents = async () => {
		const { events } = this.props;
		let lastEvent = events && events[events.length - 1];
		let next = await this.props.getEventsForDashboard(lastEvent);

		if (next && next.docs && next.docs.length <= 1) {
			this.setState({
				moreEvents: false,
			});
		}
	};

	handleContextRef = contextRef => {
		this.setState({
			contextRef,
		});
	};

	render() {
		const { loading, activities } = this.props;
		const { loadingInitial, moreEvents, loadedEvents } = this.state;
		if (loadingInitial) return <LoadingComponent inverted={true} />;
		return (
			<Grid>
				<Grid.Column width={10}>
					<div ref={this.handleContextRef}>
						<EventList
							loading={loading}
							moreEvents={moreEvents}
							events={loadedEvents}
							getNextEvents={this.getNextEvents}
						/>
					</div>
				</Grid.Column>
				<Grid.Column width={6}>
					<EventActivity activities={activities} contextRef={this.state.contextRef} />
				</Grid.Column>
				<Grid.Column width={10}>
					<Loader active={loading} />
				</Grid.Column>
			</Grid>
		);
	}
}

const mapState = state => ({
	events: state.events,
	loading: state.async.loading,
	activities: state.firestore.ordered.activity,
});

const actions = {
	getEventsForDashboard,
};

const query = [
	{
		collection: 'activity',
		orderBy: ['timestamp', 'desc'],
		limit: 5,
	},
];

export default connect(
	mapState,
	actions,
)(firestoreConnect(query)(EventDashboard));
