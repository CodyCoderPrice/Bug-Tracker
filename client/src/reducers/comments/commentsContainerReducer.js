import commentsComponentsDisplayReducer from "./commentsComponentsDisplayReducer";
import commentsListReducer from "./commentsListReducer";

import { COMMENT_CONTAINER } from "../../actions/constants/containerNames";
import { RESET_CONTAINER } from "../../actions/constants/types";

// Default state for the comment container (each reducers initial state)
const initialState = {
	// passing 'undefined, {}' causes reducers to return their initial state
	componentsDisplay: commentsComponentsDisplayReducer(undefined, {}),
	list: commentsListReducer(undefined, {}),
};

/**
 * Used to set JSON for the comment container of the redux state
 *
 * @param {JSON} state - JSON containing all current data for the comment
 * container of the redux state
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} JSON containing all data for the comment container of the
 * redux state
 */
export function commentContainerReducer(state = initialState, action) {
	switch (action.container) {
		case COMMENT_CONTAINER:
			// This if statement is in all container reducers to allow for the
			// ...resetting of the redux state to default
			if (action.type === RESET_CONTAINER) {
				return initialState;
			} else {
				return {
					componentsDisplay: commentsComponentsDisplayReducer(
						state.componentsDisplay,
						action
					),
					list: commentsListReducer(state.list, action),
				};
			}
		default:
			return state;
	}
}
