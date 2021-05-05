// Default state for global constants (set here and never changed)
const initialState = {
	// The following five relate to char restraints for input fields
	nameCharLimit: 35,
	passwordCharMin: 6,
	passwordCharLimit: 30,
	descriptionCharLimit: 500,
	locationCharLimit: 100,
	// Min font size when resizing breadcrumb text. USed to know ehn to switch
	// ...to the NavbarHamburger menu
	navbarBreadcrumbMinimumFontSize: 12,
};

/**
 * Used to set Object for global constants in the general container of the 
 * redux state
 *
 * @param {{
 * 	nameCharLimit: number,
 * 	passwordCharMin: number,
 * 	passwordCharLimit: number,
 * 	descriptionCharLimit: number,
 * 	locationCharLimit: number,
 * 	navbarBreadcrumbMinimumFontSize: number,
 * }} state - Object for the global constants currently being stored in the 
 * redux state
 * @param {Object} action - Object containing a type and container name, which 
 * determin what to do and where to do it. Also contians any addition data
 * needed for the task (typically data to be updated in the redux state).
 * @returns {{
 * 	nameCharLimit: number,
 * 	passwordCharMin: number,
 * 	passwordCharLimit: number,
 * 	descriptionCharLimit: number,
 * 	locationCharLimit: number,
 * 	navbarBreadcrumbMinimumFontSize: number,
 * }} Object for the global constants currently being stored in the general
 * container of the redux state
 */
export default function globalConstantsReducer() {
	/*
	Since this reducer is for constants that are set in the inital state, it
	simply just returns the state and does nothing else
	*/
	return initialState;
}
