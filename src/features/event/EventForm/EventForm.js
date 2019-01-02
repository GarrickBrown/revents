import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

const emptyEvent = {
	title: '',
	date: '',
	city: '',
	venue: '',
	hostedBy: '',
};

class EventForm extends Component {
	state = {
		event: emptyEvent,
	};

	componentDidMount = () => {
		const { selectedEvent } = this.props;
		if (selectedEvent !== null) {
			this.setState({
				event: selectedEvent,
			});
		}
	};

	componentWillReceiveProps = nextProps => {
		if (nextProps.selectedEvent !== this.props.selectedEvent) {
			this.setState({
				event: nextProps.selectedEvent || emptyEvent,
			});
		}
	};

	handleFormChange = e => {
		this.setState({
			event: {
				...this.state.event,
				[e.target.name]: e.target.value,
			},
		});
	};

	handleFormSubmit = e => {
		e.preventDefault();
		if (this.state.event.id) {
			this.props.updateEvent(this.state.event);
		} else {
			this.props.createEvent(this.state.event);
		}
	};

	render() {
		const { handleFormCancel } = this.props;
		const { title, date, city, venue, hostedBy } = this.state.event;

		return (
			<Segment>
				<Form onSubmit={this.handleFormSubmit}>
					<Form.Field>
						<label>Event Title</label>
						<input
							name="title"
							value={title}
							onChange={this.handleFormChange}
							placeholder="Event Title"
						/>
					</Form.Field>
					<Form.Field>
						<label>Event Date</label>
						<input
							name="date"
							value={date}
							onChange={this.handleFormChange}
							type="date"
							placeholder="Event Date"
						/>
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input
							name="city"
							value={city}
							onChange={this.handleFormChange}
							placeholder="City event is taking place"
						/>
					</Form.Field>
					<Form.Field>
						<label>Venue</label>
						<input
							name="venue"
							value={venue}
							onChange={this.handleFormChange}
							placeholder="Enter the Venue of the event"
						/>
					</Form.Field>
					<Form.Field>
						<label>Hosted By</label>
						<input
							name="hostedBy"
							value={hostedBy}
							onChange={this.handleFormChange}
							placeholder="Enter the name of person hosting"
						/>
					</Form.Field>
					<Button positive type="submit">
						Submit
					</Button>
					<Button type="button" onClick={handleFormCancel}>
						Cancel
					</Button>
				</Form>
			</Segment>
		);
	}
}

export default EventForm;
