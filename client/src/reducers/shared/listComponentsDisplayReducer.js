import { SET_WHICH_LIST_COMPONENTS_DISPLAY } from "../../actions/constants/types";

// Default state for either which project or bug components (reducer used by
// ...both containers) should be displayed by the app
const initialState = {
	listView: false,
	listViewDeleteModal: false,
	listViewCreateItemSidbar: false,
	itemView: false,
	itemViewEditItemInfo: false,
	itemViewDeleteModal: false,
	targetItem: null,
};

/**
 * Used to set JSON in either the project or bug container (reducer used by
 * both) of the redux state for either which project or bug components should
 * display by the app
 *
 * @param {JSON} state - JSON for either which project or bug components
 * (reducer used by both containers) are currently being displayed by the app
 * @param {JSON} action - JSON containing a container name and type (used to
 * determin where and what task to do in the redux state), also contians any
 * addition data needed for the task (typically data to be updated in the
 * redux state)
 * @returns {JSON} JSON for either which project or bug components (reducer
 * used by both containers) should display by the app, to be stored in either
 * the project or bug container of the redux state
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case SET_WHICH_LIST_COMPONENTS_DISPLAY:
			return {
				// Ternary operator is used to set undefined components to
				// ...false, so you only have to pass the components you want
				// ...to set to true, to make using this redux action easier
				listView:
					action.displays.listView !== undefined
						? action.displays.listView
						: false,
				listViewDeleteModal:
					action.displays.listViewDeleteModal !== undefined
						? action.displays.listViewDeleteModal
						: false,
				listViewCreateItemSidbar:
					action.displays.listViewCreateItemSidbar !== undefined
						? action.displays.listViewCreateItemSidbar
						: false,
				itemView:
					action.displays.itemView !== undefined
						? action.displays.itemView
						: false,
				itemViewEditItemInfo:
					action.displays.itemViewEditItemInfo !== undefined
						? action.displays.itemViewEditItemInfo
						: false,
				itemViewDeleteModal:
					action.displays.itemViewDeleteModal !== undefined
						? action.displays.itemViewDeleteModal
						: false,
				targetItem:
					action.displays.targetItem !== undefined
						? action.displays.targetItem
						: null,
			};
		default:
			return state;
	}
}
