import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { getSchedule } from '../../core/services/schedule/schedule.actions';

import './schedule.css';

moment.locale('hr-HR')

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};

class Schedule extends PureComponent {

	state = {
		routeId: '',
		activeTab: 0,
		isBusRoute: false,
		isRotated: undefined,
		isLoading: false
	}

	async componentDidMount() {
		const { match: { params: { routeId } } } = this.props;
		this.setState({ isLoading: true }, async () => {
			await this.props.getSchedule(routeId);
			this.setState({ isLoading: false });
		});
	}

	getDiffInMinutes = (time) => {
		const departureTime = moment(time);
		const now = moment();
		let minutes = departureTime.diff(now, 'minutes');
		minutes = minutes > 0 ? minutes : 0;
		let departureTimeClassName = 'departure-in-future';
		if (minutes === 0) {
			departureTimeClassName = 'departure-left';
		} else if (minutes < 10) {
			departureTimeClassName = 'departure-soon';
		}
		return (
			<span className={departureTimeClassName}>
				<i className={`material-icons`}>track_changes</i>
				<span>
					<big>{minutes || ''}</big>
					<small>{minutes > 0 ? ' min' : 'otišao'}</small>
				</span>
			</span>
		)
	}

	render() {
		const { activeTab, isBusRoute, isLoading } = this.state;
		const { schedule } = this.props;

		const direction1 = schedule[activeTab] || EMPTY_OBJECT;

		return (
			<main className="schedule">
				<div className={`schedule-loading ${isLoading ? 'is-active' : ''}`}>
					<div className={`mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active`} />
				</div>
				<ul className="schedule__list">
					{(direction1.schedule || EMPTY_ARRAY).map(d => (
						<li key={d.time} className="schedule__list-item-container">
							<div className="schedule__list-item mdl-shadow--2dp">
								<div className="departure-time">
									<i className="material-icons">{isBusRoute ? 'directions_bus' : 'tram'}</i>
									<span className="time">Polazak u {moment(d.time).format('HH:mm')}</span>
								</div>
								<div className="departure-info">
									<span className="direction">
										<span className="origin">
											<i className={`material-icons`}>trip_origin</i>
											{d.departure}
										</span>
										<i className={`material-icons`}>more_vert</i>
										<span className="destination">
											<i className={`material-icons`}>place</i>
											{d.arrival}
										</span>
									</span>
									<span className="time-info">
										{this.getDiffInMinutes(d.time)}
									</span>
								</div>
							</div>
						</li>
					))}
				</ul>
			</main>
		);
	}
}

function mapStateToProps({ schedule }) {
	return { schedule: schedule.schedule };
}

export default connect(mapStateToProps, { getSchedule })(Schedule);
