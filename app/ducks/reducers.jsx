import { combineReducers } from 'redux';
import singlePolitician from './singlePolitician.jsx';
import politicians, * as fromPoliticians from './politicians.jsx';
import issues from './issues.jsx';

const rootReducer = combineReducers({
  politicians: politicians,
  issues: issues,
  singlePolitician: singlePolitician
});

export default rootReducer;

export const selectPoliticianByState = (state) => {
	return fromPoliticians.selectPoliticianByState(state.politicians, state.issues)
}
