import axios from 'axios';

import * as ScheduleActionCreators from './schedule.actionCreators';

export function getSchedule(routeId) {
	return async (dispatch) => {
		try {
			const { data: schedule } = await axios.get(`/route/${routeId}`);
			dispatch(ScheduleActionCreators.GET_SCHEDULE(schedule));
		} catch (error) {
			console.log(error);
		}
	}
}