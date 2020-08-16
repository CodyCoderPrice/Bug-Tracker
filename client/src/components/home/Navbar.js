import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
} from "../../actions";

import { setNavbarButtonColor, setProjectsIcon } from "../../utils/navbarUtils";

// Components
import CreateProjectSidebar from "./projects/CreateProjectSidebar";
import viewProjectDashboard from "./projects/viewProjectDashboard";
import EditProjectSidebar from "./projects/editProjectSidebar";
import AccountDropdown from "./account/AccountDropdown";

import "../../SCSS/home/navbar.scss";
import ViewProjectDashboard from "./projects/viewProjectDashboard";

export default function Navbar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	useEffect(() => {
		setNavbarButtonColor(
			document.getElementsByClassName("js-account-button")[0],
			reduxState.accountComponentsDisplay.accountDropdown
		);

		setNavbarButtonColor(
			document.getElementsByClassName("js-project-button")[0],
			reduxState.projectComponentsDisplay.projectsList
		);
		setProjectsIcon(
			document.getElementById("project-button-icon"),
			reduxState.projectComponentsDisplay.projectsList
		);
	}, [
		reduxState.accountComponentsDisplay.accountDropdown,
		reduxState.projectComponentsDisplay.projectsList,
	]);

	const openAccountDropdown = () => {
		dispatch(
			setWhichAccountComponentsDisplay({
				accountDropdown: !reduxState.accountComponentsDisplay.accountDropdown,
			})
		);
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				createProjectSidbar: false,
				viewProjectDashboard: false,
				editProjectSidebar: false,
			})
		);
	};

	const openProjectsList = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				projectsList: true,
			})
		);
	};

	/* 	const closeCreateProjectSidebar = () => {
		dispatch(setWhichProjectComponentsDisplay({}));
	}; */

	return (
		<div>
			<div
				className="navbar-component" /* onClick={closeCreateProjectSidebar} */
			>
				<div
					className="navbar-button js-project-button"
					onClick={openProjectsList}
				>
					<div className="navbar-button__text-container">
						<i id="project-button-icon" aria-hidden="true"></i> Projects
					</div>
				</div>
				<div
					className="navbar-button"
					/* onClick={} */
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-bug" aria-hidden="true"></i>
						<label className="choiceLabel"> Bugs</label>
					</div>
				</div>
				<div
					className="navbar-button navbar-button--right navbar-button--large js-account-button"
					onClick={openAccountDropdown}
				>
					<div className="navbar-button__text-container">
						<i className="fa fa-fw fa-user"></i>
						<label className="choiceLabel">Account</label>
					</div>
				</div>
			</div>
			<div className="create-project-component-container">
				{reduxState.projectComponentsDisplay.createProjectSidbar ? (
					<CreateProjectSidebar />
				) : null}
			</div>
			<div className="view-project-component-container">
				{reduxState.projectComponentsDisplay.viewProjectDashboard ? (
					<ViewProjectDashboard />
				) : null}
			</div>
			<div className="edit-project-component-container">
				{reduxState.projectComponentsDisplay.editProjectSidebar ? (
					<EditProjectSidebar />
				) : null}
			</div>
			<div className="account-dropdown-component-container">
				{reduxState.accountComponentsDisplay.accountDropdown ? (
					<AccountDropdown />
				) : null}
			</div>
		</div>
	);
}