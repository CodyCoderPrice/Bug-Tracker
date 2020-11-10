import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	logoutAccount,
	setWhichAccountComponentsDisplay,
} from "../../../actions";

import { formatDateMMddYYYY } from "../../../utils/dateUtils";

import { useSidebarResize } from "../../../utils/sidebarResizeHookUtils";

import "../../../SCSS/home/account/accountSidebar.scss";

export default function AccountSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Custom hook resizes the sidebar so that the overflow functionality works
	useSidebarResize(
		reduxState,
		"js-account-sidebar",
	);

	const openEditInfoModals = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				editInfoModal: true,
			})
		);
	};

	const handleLogoutAccount = (e) => {
		// Makes sure onclick set on the home component for closing
		// ... itemContainerTopBarOptionsDropdown doesn't intefere
		e.stopPropagation();
		dispatch(logoutAccount());
	};

	const logReduxState = () => {
		console.log(reduxState);
	};

	return (
		<div className="account-sidebar-component">
			<div className="sidebar-container js-account-sidebar">
				<div className="padded-container">
					<div className="account-info-container">
						<div className="account-info account-info--large-bold">
							{reduxState.accountContainer.info.first_name +
								" " +
								reduxState.accountContainer.info.last_name}
						</div>
						<div className="account-info">{reduxState.accountContainer.info.email}</div>
						<div className="account-info">
							Joined: {formatDateMMddYYYY(reduxState.accountContainer.info.joinDate)}
						</div>
					</div>
					<div className="account-link-container">
						<span onClick={openEditInfoModals} className="account-link">
							Edit Account
						</span>
						<span onClick={(e) => handleLogoutAccount(e)} className="account-link">
							Logout
						</span>
						<span onClick={logReduxState} className="account-link">
							Console Log Redux State
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
