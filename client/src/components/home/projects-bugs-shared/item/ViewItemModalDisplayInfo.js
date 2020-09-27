import React, { useState } from "react";
import { useSelector } from "react-redux";

import { formatDateMMddYYYY } from "../../../../utils/dateUtils";

import "../../../../SCSS/home/projects-bugs-shared/item/viewItemModalDisplayInfo.scss";

export default function ViewItemModalDisplayInfo(props) {
	const reduxState = useSelector((state) => state);

	const [itemInfo] = useState({
		id: reduxState[props.reduxContainerName].componentsDisplay.targetItem.id,
		name: reduxState[props.reduxContainerName].componentsDisplay.targetItem.name,
		description: reduxState[props.reduxContainerName].componentsDisplay.targetItem.description,
		priority_id: reduxState[props.reduxContainerName].componentsDisplay.targetItem.priority_id,
		priorityOption:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.priority_option,
		status_id: reduxState[props.reduxContainerName].componentsDisplay.targetItem.status_id,
		statusOption:
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.status_option,
		creation_date: formatDateMMddYYYY(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.creation_date
		),
		start_date: formatDateMMddYYYY(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.start_date
		),
		due_date: formatDateMMddYYYY(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.due_date
		),
		completion_date: formatDateMMddYYYY(
			reduxState[props.reduxContainerName].componentsDisplay.targetItem.completion_date
		),
	});

	return (
		<div>
			<div className="outer-dividing-container">
				<h1 className="item-name">{itemInfo.name}</h1>
				<div className="item-creation-date">
					Created on: {itemInfo.creation_date}
				</div>
			</div>
			<div className="outer-dividing-container">
				<div className="item-box">
					<h2 className="item-box__title">Description</h2>
					<span className="item-box__description">
						{itemInfo.description}
					</span>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container--fixed-width-for-info">
				<div className="item-box">
					<h2 className="item-box__title">Info</h2>
					<div className="item-box__group">
						<div className="item-box__group__field">
							<span className="item-box__group__field__type">
								Start Date:
							</span>
							<span className="item-box__group__field_content">
								{itemInfo.start_date}
							</span>
						</div>
						<div className="item-box__group__field">
							<span className="item-box__group__field__type">Due Date:</span>
							<span className="item-box__group__field_content">
								{itemInfo.due_date}
							</span>
						</div>
						{itemInfo.completion_date === null ? null : (
							<div className="item-box__group__field">
								<span className="item-box__group__field__type">
									Completed on:
								</span>
								<span className="item-box__group__field_content">
									{itemInfo.completion_date}
								</span>
							</div>
						)}
					</div>
					<div className="item-box__group item-box__group--right">
						<div className="item-box__group__field">
							<span className="item-box__group__field__type">Priority:</span>
							<span className="item-box__group__field_content">
								{itemInfo.priorityOption}
							</span>
						</div>
						<div className="item-box__group__field">
							<span className="item-box__group__field__type">Status:</span>
							<span className="item-box__group__field_content">
								{itemInfo.statusOption}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container--one-third">
				<div className="item-box">
					<h2 className="item-box__title">Status of Bugs</h2>
				</div>
			</div>
			<div className="outer-dividing-container outer-dividing-container--one-third">
				<div className="item-box">
					<h2 className="item-box__title">Last Five Bugs</h2>
				</div>
			</div>
		</div>
	);
}