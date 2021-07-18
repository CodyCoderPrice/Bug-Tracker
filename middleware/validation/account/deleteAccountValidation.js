const Validator = require("validator");
const isEmpty = require("is-empty");

/**
 * An exported middleware function for routes in the routes folder, this
 * middleware validates the user form input for deleting an account
 *
 * @param {Object} req - Express request Object
 * @param {Object} res - Express response Object
 * @param {Function} next - Express function to be ran after this one
 */
module.exports = (req, res, next) => {
	let backendErrors = {};

	try {
		let { capitalizedDeleteTypedOut, currentPassword } = req.body;

		// Convert empty fields to empty string so Validator module can be used
		capitalizedDeleteTypedOut = !isEmpty(capitalizedDeleteTypedOut)
			? capitalizedDeleteTypedOut
			: "";
		currentPassword = !isEmpty(currentPassword) ? currentPassword : "";

		if (capitalizedDeleteTypedOut !== "DELETE") {
			backendErrors.validationAccountTypeOutCheck = "Doesn't match: DELETE";
		}

		if (Validator.isEmpty(currentPassword)) {
			backendErrors.currentPassword = "Current password required";
		}

		if (!isEmpty(backendErrors)) {
			// returns error and next middle/function is not called
			return res.status(400).json({ success: false, backendErrors });
		}

		// calls next middleware/function
		next();
	} catch (err) {
		console.error(err.message);
		backendErrors.validationAccount = "Validation Error";
		return res.status(403).json({ success: false, backendErrors });
	}
};
