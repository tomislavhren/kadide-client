import * as ActionTypes from './schedule.actionTypes';

export function GET_SCHEDULE(payload) {
	return {
		type: ActionTypes.GET_SCHEDULE,
		payload
	};
}