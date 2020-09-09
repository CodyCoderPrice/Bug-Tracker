import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// Easier to use than Date()
import moment from "moment";

import {
	setWhichProjectComponentsDisplay,
	createProject,
	clearInputErrors,
} from "../../../actions";

import { toggleClassName } from "../../../utils/elementUtils";

import {
	getElementStyle,
	stripNonDigits,
} from "../../../utils/displaySizeUtils";

import {
	toggleCharCountColor,
	populateComboBox,
} from "../../../utils/elementUtils";

import { useToggleableDateInput } from "../../../utils/formHookUtils";

import "../../../SCSS/projects/createProjectSidebar.scss";

export default function CreateProjectSidebar() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [projectInfo, setProjectInfo] = useState({
		name: "",
		description: "",
		// Sets default to the first option
		priorityId: reduxState.priorityStatusArrays.projectPriority[0].id,
		statusId: reduxState.priorityStatusArrays.projectStatus[0].id,
		startDate: moment().format("YYYY-MM-DD"),
		dueDate: null,
		completionDate: null,
	});

	const [descriptionCharLimit] = useState(500);

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	// Custom hook toggles the display of the date input for completion date
	// ...based on status and makes sure projectInfo contains accurate 
	// ...completion date info after every toggle
	const [preservedCompletionDate] = useToggleableDateInput(
		projectInfo,
		"js-completion-input-container",
		reduxState.priorityStatusArrays.projectStatusCompletionIndex
	);

	// Used to decide when to resize the sidebar, and to reset its size
	const [originalSidebarSizeAndStyle, setOriginalSidebarHeight] = useState(
		null
	);

	// Move window to top of screen and disable scrolling for the HTML and body
	useEffect(() => {
		window.scrollTo(0, 0);
		let body = document.getElementsByClassName("js-body")[0];

		toggleClassName(true, body, "stop-scrolling");

		return () => {
			toggleClassName(false, body, "stop-scrolling");
		};
	}, []);

	// Adjusts the height of the sidebar to fit the screen
	useEffect(() => {
		if (
			reduxState.displaySizeVariables.window !== null &&
			reduxState.displaySizeVariables.navbar !== null
		) {
			let createProjectSidebarElement = document.getElementsByClassName(
				"js-create-project-sidebar"
			)[0];

			// Makes sure originalSidebarSizeAndStyle gets set
			if (originalSidebarSizeAndStyle === null) {
				const sidebarStyle = getElementStyle(createProjectSidebarElement);
				setOriginalSidebarHeight({
					height: stripNonDigits(sidebarStyle.height),
					marginBottom: stripNonDigits(sidebarStyle.marginBottom),
					borderBottom: stripNonDigits(sidebarStyle.borderBottomWidth),
				});

				// Prevents crash since originalSidebarSizeAndStyle will still
				// ...be null for remainder of this useEfffect iteration
				return;
			}

			const adjustedWindowHeight =
				reduxState.displaySizeVariables.window.height -
				reduxState.displaySizeVariables.navbar.height -
				originalSidebarSizeAndStyle.marginBottom -
				originalSidebarSizeAndStyle.borderBottom;

			if (originalSidebarSizeAndStyle.height > adjustedWindowHeight) {
				createProjectSidebarElement.style.height = adjustedWindowHeight + "px";
			} else {
				createProjectSidebarElement.style.height =
					originalSidebarSizeAndStyle.height + "px";
			}
		}
	}, [
		reduxState.displaySizeVariables,
		originalSidebarSizeAndStyle,
		reduxState.projects,
	]);

	useEffect(() => {
		populateComboBox(
			"js-priority-select",
			reduxState.priorityStatusArrays.projectPriority,
			1
		);
		populateComboBox(
			"js-status-select",
			reduxState.priorityStatusArrays.projectStatus,
			1
		);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		toggleCharCountColor(
			"js-character-counter",
			projectInfo.description.length,
			descriptionCharLimit
		);
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [projectInfo.description]);

	useEffect(() => {
		if (
			projectInfo.statusId !==
			reduxState.priorityStatusArrays.projectStatusCompletionIndex
		) {
			setProjectInfo({ ...projectInfo, completionDate: "" });
		} else {
			setProjectInfo({
				...projectInfo,
				completionDate: preservedCompletionDate,
			});
		}
		// Below comment disables an unneeded warning about optimization
		// eslint-disable-next-line
	}, [projectInfo.statusId]);

	const onChange = (e) => {
		// Since select option values are always strings while priority and status take integers
		if (e.target.name === "statusId" || e.target.name === "priorityId") {
			setProjectInfo({
				...projectInfo,
				[e.target.name]: Number(e.target.value),
			});
		} else {
			setProjectInfo({ ...projectInfo, [e.target.name]: e.target.value });
		}
	};

	const closeCreateProjectSidebar = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				createProjectSidbar: false,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createProject(projectInfo));
	};

	return (
		<div className="create-projects-component">
			<div className="blurred-background js-create-project-blurred-background" />
			<div className="create-project-sidebar js-create-project-sidebar">
				<div className="x-button" onClick={closeCreateProjectSidebar}>
					<i className="fa fa-times" aria-hidden="true"></i>
				</div>
				<div className="padded-container">
					<h1 className="title">New Project</h1>
					<form className="form" noValidate onSubmit={handleSubmit}>
						<label htmlFor="create-project-name" className="form__label">
							Name:{" "}
						</label>
						<input
							type="text"
							name="name"
							onChange={(e) => onChange(e)}
							value={projectInfo.name}
							id="create-project-name"
							className="form__text-input"
						/>
						<span className="form__errors">{reduxState.inputErrors.name}</span>
						<label htmlFor="create-project-description" className="form__label">
							Description:{" "}
						</label>
						<span className="form__character-counter js-character-counter">
							{projectInfo.description.length + "/" + descriptionCharLimit}
						</span>
						<textarea
							name="description"
							onChange={(e) => onChange(e)}
							value={projectInfo.description}
							id="create-project-description"
							className="form__textarea"
						/>
						<span className="form__errors">
							{reduxState.inputErrors.description}
						</span>
						<div className="form__group-container">
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-project-start-date"
									className="form__group-container__input-container__label"
								>
									Start Date:
								</label>
								<input
									type="date"
									name="startDate"
									value={projectInfo.startDate}
									onChange={(e) => onChange(e)}
									id="create-project-start-date"
									className="form__group-container__input-container__date"
								/>
							</div>
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-project-due-date"
									className="form__group-container__input-container__label"
								>
									Due Date:
								</label>
								<input
									type="date"
									name="dueDate"
									onChange={(e) => onChange(e)}
									id="create-project-due-date"
									className="form__group-container__input-container__date"
								/>
							</div>
							<div className="form__group-container__input-container js-completion-input-container">
								<label
									htmlFor="create-project-completion-date"
									className="form__group-container__input-container__label"
								>
									Completed on:
								</label>
								<input
									type="date"
									name="completionDate"
									onChange={(e) => onChange(e)}
									id="create-project-completion-date"
									className="form__group-container__input-container__date"
								/>
							</div>
						</div>
						<div className="form__group-container form__group-container--right">
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-project-priority"
									className="form__group-container__input-container__label"
								>
									Priority:
								</label>
								<select
									name="priorityId"
									onChange={(e) => onChange(e)}
									id="create-project-priority"
									className="form__group-container__input-container__select js-priority-select"
								></select>
							</div>
							<div className="form__group-container__input-container">
								<label
									htmlFor="create-project-status"
									className="form__group-container__input-container__label"
								>
									Status:
								</label>
								<select
									name="statusId"
									onChange={(e) => onChange(e)}
									id="create-project-status"
									className="form__group-container__input-container__select js-status-select"
								></select>
							</div>
						</div>
						<button type="submit" className="form__submit">
							Create Project
						</button>
						<span className="form__errors">
							{reduxState.inputErrors.validation}
							{reduxState.inputErrors.server}
						</span>
					</form>
				</div>
			</div>
		</div>
	);
}
