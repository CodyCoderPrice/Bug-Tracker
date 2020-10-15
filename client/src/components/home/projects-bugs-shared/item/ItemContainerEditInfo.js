import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	projectContainerName,
	bugContainerName,
} from "../../../../reducers/containerNames";

import {
	setWhichProjectOrBugComponentsDisplay,
	updateProjectOrBug,
	clearInputErrors,
} from "../../../../actions";

import {
	formatDateMMddYYYY,
	formatDateYYYYmmDD,
} from "../../../../utils/dateUtils";

/* import {
	getElementSize,
	getElementStyle,
	stripNonDigits,
} from "../../../../utils/displaySizeUtils"; */

import {
	toggleCharCountColor,
	populateComboBox,
} from "../../../../utils/elementUtils";

import { useToggleableDateInput } from "../../../../utils/formHookUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/itemContainerEditInfo.scss";

export default function ItemContainerEditInfo(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [itemInfo, setItemInfo] = useState({
		id: reduxState[props.reduxContainerName].componentsDisplay.targetItem.id,
		name:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.name,
		description:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.description,
		priority_id:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.priority_id,
		priorityOption:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.priority_option,
		status_id:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.status_id,
		statusOption:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.status_option,
		creation_date: formatDateMMddYYYY(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.creation_date
		),
		start_date: formatDateYYYYmmDD(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.start_date
		),
		due_date: formatDateYYYYmmDD(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.due_date
		),
		completion_date: formatDateYYYYmmDD(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem
				.completion_date
		),
	});

	const [descriptionCharLimit] = useState(500);

	// clears prior input errors when closing the component
	useEffect(() => {
		return () => {
			dispatch(clearInputErrors());
		};
		// eslint-disable-next-line
	}, []);

	// Custom hook toggles the display of the date input for completion date
	// ...based on status and makes sure itemInfo contains accurate
	// ...completion date info after every toggle
	const [preservedCompletionDate] = useToggleableDateInput(
		itemInfo,
		"js-completion-date-container",
		reduxState[props.reduxContainerName].priorityStatusOptions
			.statusCompletionId
	);

	useEffect(() => {
		populateComboBox(
			"js-item-priority-select",
			reduxState[props.reduxContainerName].priorityStatusOptions
				.priorityOptions,
			itemInfo.priority_id
		);
		populateComboBox(
			"js-item-status-select",
			reduxState[props.reduxContainerName].priorityStatusOptions.statusOptions,
			itemInfo.status_id
		);
		// eslint-disable-next-line
	}, []);

	// Adjust description text area size to match ItemContainerDisplayInfo's description
	useEffect(() => {
		let editDescriptionTextArea = document.getElementsByClassName(
			"js-item-description-text-area"
		)[0];

		const myObserver = new ResizeObserver(() => {
			editDescriptionTextArea.style.height = "0px";
			editDescriptionTextArea.style.height =
				editDescriptionTextArea.scrollHeight + 10 + "px";
		});

		myObserver.observe(
			document.getElementsByClassName("js-item-description-item-box")[0]
		);
	}, []);

	useEffect(() => {
		toggleCharCountColor(
			"js-item-character-counter",
			itemInfo.description.length,
			descriptionCharLimit
		);
		// eslint-disable-next-line
	}, [itemInfo.description]);

	useEffect(() => {
		if (
			itemInfo.status_id !==
			reduxState[props.reduxContainerName].priorityStatusOptions
				.statusCompletionId
		) {
			setItemInfo({ ...itemInfo, completion_date: null });
		} else {
			setItemInfo({
				...itemInfo,
				completion_date: preservedCompletionDate,
			});
		}
		// eslint-disable-next-line
	}, [itemInfo.status_id]);

	const onChange = (e) => {
		// Since select option values are always strings while priority and status take integers
		if (e.target.name === "status_id" || e.target.name === "priority_id") {
			setItemInfo({
				...itemInfo,
				[e.target.name]: Number(e.target.value),
			});
		} else {
			setItemInfo({ ...itemInfo, [e.target.name]: e.target.value });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let itemInfoDeepCopy = { ...itemInfo };
		// Adds project_id when updating bugs
		if (props.reduxContainerName === bugContainerName) {
			itemInfoDeepCopy["project_id"] =
				reduxState[projectContainerName].componentsDisplay.targetItem.id;
		}
		dispatch(
			updateProjectOrBug(
				props.reduxContainerName,
				itemInfoDeepCopy,
				reduxState[props.reduxContainerName].componentsDisplay
			)
		);
	};

	const switchToDisplayItemInfo = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemContainerEditInfo: false,
			})
		);
	};

	return (
		<form noValidate onSubmit={handleSubmit} className="js-edit-item-form">
			<div className="outer-dividing-container">
				<div className="centering-container">
					<input
						type="text"
						name="name"
						onChange={(e) => onChange(e)}
						value={itemInfo.name}
						id="edit-item-name"
						className="centering-container__form-name-input"
					/>
					<span className="form-errors form-errors--test">
						{reduxState.generalContainer.inputErrors.name}
					</span>
				</div>
				<div className="item-creation-date">
					Created on: {itemInfo.creation_date}
				</div>
			</div>
			<div className="outer-dividing-container">
				<div className="item-box js-item-description-item-box">
					<label htmlFor="edit-item-description">
						<h2 className="item-box__title item-box__title--no-bottom-margin">
							Description
						</h2>
					</label>
					<span className="item-box__form-character-counter js-item-character-counter">
						{itemInfo.description.length + "/" + descriptionCharLimit}
					</span>
					<textarea
						name="description"
						onChange={(e) => onChange(e)}
						value={itemInfo.description}
						id="edit-item-description"
						className="item-box__form-textarea js-item-description-text-area"
					/>
					<span className="form-errors">
						{reduxState.generalContainer.inputErrors.description}
					</span>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container--fixed-width-for-info">
				<div className="item-box">
					<h2 className="item-box__title">Info</h2>
					<div className="item-box__group">
						<div className="item-box__group__field">
							<label
								htmlFor="edit-item-start-date"
								className="item-box__group__field__form-label item-box__group__field__form-label--medium-width"
							>
								Start Date:
							</label>
							<input
								type="date"
								name="start_date"
								value={itemInfo.start_date}
								onChange={(e) => onChange(e)}
								id="edit-item-start-date"
								className="item-box__group__field__form-date"
							/>
						</div>
						<div className="item-box__group__field">
							<label
								htmlFor="edit-item-due-date"
								className="item-box__group__field__form-label item-box__group__field__form-label--medium-width"
							>
								Due Date:
							</label>
							<input
								type="date"
								name="due_date"
								value={itemInfo.due_date}
								onChange={(e) => onChange(e)}
								id="edit-item-due-date"
								className="item-box__group__field__form-date"
							/>
						</div>
						<div className="item-box__group__field item-box__group__field--no-bottom-margin item-box__group__field--inline-flex js-completion-date-container">
							<label
								htmlFor="edit-item-completion-date"
								className="item-box__group__field__form-label item-box__group__field__form-label--long-width"
							>
								Completed on:
							</label>
							<input
								type="date"
								name="completion_date"
								value={itemInfo.completion_date}
								onChange={(e) => onChange(e)}
								id="edit-item-completion-date"
								className="item-box__group__field__form-date"
							/>
						</div>
					</div>
					<div className="item-box__group item-box__group--right">
						<div className="item-box__group__field">
							<label
								htmlFor="edit-item-priority"
								className="item-box__group__field__form-label"
							>
								Priority:
							</label>
							<select
								name="priority_id"
								onChange={(e) => onChange(e)}
								id="edit-item-priority"
								className="item-box__group__field__form-select js-item-priority-select"
							></select>
						</div>
						<div className="item-box__group__field">
							<label
								htmlFor="edit-item-status"
								className="item-box__group__field__form-label"
							>
								Status:
							</label>
							<select
								name="status_id"
								onChange={(e) => onChange(e)}
								id="edit-item-status"
								className="item-box__group__field__form-select js-item-status-select"
							></select>
						</div>
					</div>
				</div>
			</div>
			{props.reduxContainerName === projectContainerName ? (
				<div>
					<div className="outer-dividing-container outer-dividing-container--one-third">
						<div className="item-box">
							<h2 className="item-box__title">Status of Bugs</h2>
							<span>Comming soon!</span>
						</div>
					</div>
					<div className="outer-dividing-container outer-dividing-container--one-third">
						<div className="item-box">
							<h2 className="item-box__title">Last Five Bugs</h2>
							<span>Comming soon!</span>
						</div>
					</div>
				</div>
			) : (
				<div> 
					<div className="outer-dividing-container outer-dividing-container--one-third">
						<div className="item-box">
							<h2 className="item-box__title">Comments</h2>
							<span>Comming soon!</span>
						</div>
					</div>
				</div>
			)}
			<div className="outer-dividing-container">
				<div className="form-buttons-outer-container">
					<div className="form-buttons-centered-container">
						<button
							type="submit"
							className="form-buttons-centered-container__submit-button"
						>
							{props.reduxContainerName === projectContainerName
								? "Edit Project"
								: "Edit Bug"}
						</button>
						<div
							className="form-buttons-centered-container__cancel-button"
							onClick={switchToDisplayItemInfo}
						>
							Cancel
						</div>
					</div>
				</div>
				<div className="bottom-form-errors-container">
					<span className="form-errors">
						{reduxState.generalContainer.inputErrors.validation}
						{reduxState.generalContainer.inputErrors.server}
					</span>
				</div>
			</div>
		</form>
	);
}