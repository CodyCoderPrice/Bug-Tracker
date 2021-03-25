import { SET_LIST } from "../../actions/constants/types";

// Default state for either the project or bug list (reducer used by both
// ..containers) (empty array since if the account has any projects/bugs, they
// ...are retrieved only during and after login)
const initialState = []

/**
 * Used to set JSON containing either the account's project or bug list
 * (reducer used by both containers) from the database in either the project
 * or bug container of the redux state
 * 
 *
 * @param {JSON} state - JSON for either the current project or bug list
 * (reducer used by both containers) in the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} - JSON for either the project or bug list (reducer used by
 * both containers) to be stored in either the project or bug container of the
 * redux state
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_LIST:
			return action.list;
		default:
			return state;
	}
}