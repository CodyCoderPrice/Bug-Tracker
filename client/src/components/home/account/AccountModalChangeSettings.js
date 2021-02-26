import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
} from "../../../actions/constants/containerNames";

import {
	clearBackendErrors,
	setWhichAccountComponentsDisplay,
	updateAccountSettings,
} from "../../../actions";

import {
	getAccountModalChangeSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode,
	getTextColorClassNameForThemeWithLightOrDarkMode,
	getBackendErrorsTextColorClassNameForLightOrDarkMode,
} from "../../../utils";

// Components
import ToggleSwitch from "../../basic/ToggleSwitch";

export default function AccountModalChangeSettings() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// clears prior backend errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearBackendErrors());
		};
		// eslint-disable-next-line
	}, []);

	const onChangeFilter = (e) => {
		if (e.target.name === "filter-completed-projects") {
			dispatch(
				updateAccountSettings({
					...reduxState[ACCOUNT_CONTAINER].settings,
					filter_completed_projects_by_default: e.target.checked,
				})
			);
		} else if (e.target.name === "filter-completed-bugs") {
			dispatch(
				updateAccountSettings({
					...reduxState[ACCOUNT_CONTAINER].settings,
					filter_completed_bugs_by_default: e.target.checked,
				})
			);
		}
	};

	const backToAccountSidebar = () => {
		dispatch(setWhichAccountComponentsDisplay({ accountSidebar: true }));
	};

	return (
		<div>
			<h1 className="title">Account Settings</h1>
			<div
				className={
					"category-container" +
					getAccountModalChangeSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<h2
					className={
						"category-container__heading" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					<i
						className="fa fa-filter"
						aria-hidden="true"
						alt="Icon of a filter"
					/>{" "}
					Filter
				</h2>
				<div className="category-container__content-container category-container__content-container--smaller-top-margin">
					<label className="category-container__content-container__label">
						Filter out completed projects (by default)
					</label>
					<ToggleSwitch
						name="filter-completed-projects"
						onChangeFunction={onChangeFilter}
						isOn={
							reduxState[ACCOUNT_CONTAINER].settings
								.filter_completed_projects_by_default
						}
						id="account-settings-filter-completed-projects"
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</div>
				<div className="category-container__content-container">
					<label className="category-container__content-container__label">
						Filter out completed bugs (by default)
					</label>
					<ToggleSwitch
						name="filter-completed-bugs"
						onChangeFunction={onChangeFilter}
						isOn={
							reduxState[ACCOUNT_CONTAINER].settings
								.filter_completed_bugs_by_default
						}
						id="account-settings-filter-completed-bugs"
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</div>
			</div>

			{/* <div
				className={
					"category-container" +
					getAccountModalChangeSettingsCategoryContainerBorderBackgroundTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<h2
					className={
						"category-container__heading" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					<i
						className="fa fa fa-sort"
						aria-hidden="true"
						alt="Icon of a filter"
					/>{" "}
					Sort
				</h2>
				<div className="category-container__content-container category-container__content-container--smaller-top-margin">
					<label className="category-container__content-container__label">
						Filter out completed projects (by default)
					</label>
					<ToggleSwitch
						name="sort-projects-ascending"
						isOn={
							reduxState[ACCOUNT_CONTAINER].settings
								.filter_completed_projects_by_default
						}
						onChangeFunction={onChangeFilterCompletedProjects}
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</div>
				<div className="category-container__content-container">
					<label className="category-container__content-container__label">
						Filter out completed bugs (by default)
					</label>
					<ToggleSwitch
						name="sort-bugs-ascending"
						isOn={
							reduxState[ACCOUNT_CONTAINER].settings
								.filter_completed_bugs_by_default
						}
						onChangeFunction={onChangeFilterCompletedBugs}
						dark_mode={reduxState[ACCOUNT_CONTAINER].settings.dark_mode}
					/>
				</div>
			</div> */}
			<span
				className={
					"backend-errors" +
					getBackendErrorsTextColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				{reduxState[GENERAL_CONTAINER].backendErrors.authorization}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverSettings}
				{reduxState[GENERAL_CONTAINER].backendErrors.serverConnection}
			</span>
			<div className="modal-links-container">
				<span
					onClick={backToAccountSidebar}
					className={
						"modal-link" +
						getTextColorClassNameForThemeWithLightOrDarkMode(
							reduxState[ACCOUNT_CONTAINER].settings.dark_mode,
							reduxState[ACCOUNT_CONTAINER].settings.theme_color
						)
					}
				>
					Close
				</span>
			</div>
		</div>
	);
}
