import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
	state = {
		event: {
			title: '',
			date: '',
			city: '',
			venue: '',
			hostedBy: '',
		},
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
		this.props.createEvent(this.state.event);
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
