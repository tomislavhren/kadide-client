import { combineReducers } from 'redux';

import news from '../services/news/news.reducer';
import schedule from '../services/schedule/schedule.reducer';

export default combineReducers({
	news,
	schedule
});
