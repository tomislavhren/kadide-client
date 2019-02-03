import * as ActionTypes from './schedule.actionTypes';

const initialState = {
	schedule: []
};
export default function ScheduleReducer(state = initialState, action) {
	switch (action.type) {
		case ActionTypes.GET_SCHEDULE:
			return { ...state, schedule: action.payload };
		default:
			return state;
	}
}