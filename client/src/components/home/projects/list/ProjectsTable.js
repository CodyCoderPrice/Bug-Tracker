import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setMassDelete,
	setWhichAccountComponentsDisplay,
	setWhichProjectComponentsDisplay,
	setWhichMassDeleteComponentsDisplay,
} from "../../../../actions";

import { getElementLocation } from "../../../../utils/displaySizeUtils";

import { searchFilterSort } from "../../../../utils/searchFilterSortUtils";

import { toggleDisableButtons } from "../../../../utils/massDeleteUtils";

// Components
/* import SortButtons from "./SortButtons"; */
import ProjectRow from "./ProjectRow";
import SortArrowsButton from "./SortArrowsButton";

import "../../../../SCSS/projects/projectsTableAndRows.scss";

export default function ProjectsTable() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Fills remaining space in a table row after status
	useEffect(() => {
		if (reduxState.displaySizeVariables.window !== null) {
			let remainingSpaceElement = document.getElementsByClassName(
				"js-remaining-space"
			)[0];
			remainingSpaceElement.style.width =
				reduxState.displaySizeVariables.window.width -
				getElementLocation(
					document.getElementsByClassName("js-remaining-space")[0]
				).left +
				"px";
		}
	}, [reduxState.displaySizeVariables]);

	// Disables mass delete options buttons when no checkboxes are selected
	useEffect(() => {
		toggleDisableButtons(
			reduxState.massDelete.projects.length === 0,
			"project-table__header__mass-delete-options"
		);
	}, [reduxState.massDelete.projects]);

	const checkAllProjects = () => {
		let allProjects = [];
		for (let project of reduxState.projects) {
			allProjects.push(project.project_id);
		}

		dispatch(
			setMassDelete({
				projects: allProjects,
			})
		);
	};

	const uncheckAllProjects = () => {
		dispatch(
			setMassDelete({
				projects: [],
			})
		);
	};

	const openMassDeleteProjectsModal = () => {
		dispatch(setWhichAccountComponentsDisplay({}));

		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				createProjectSidbar: false,
			})
		);

		dispatch(
			setWhichMassDeleteComponentsDisplay({
				massDeleteProjectsModal: true,
			})
		);
	};

	return (
		<div className="projects-table-component">
			<table className="projects-table">
				<thead className="">
					<tr className="project-table__row">
						<th className="project-table__header project-table__header--for-mass-delete">
							<div className="project-table__header__mass-delete-options">
								<div
									className="project-table__header__mass-delete-options__button"
									onClick={checkAllProjects}
								>
									<i className="fa fa-check-square-o" aria-hidden="true" />
								</div>
								<div
									className="project-table__header__mass-delete-options__button"
									onClick={uncheckAllProjects}
								>
									<i className="fa fa-square-o" aria-hidden="true" />
								</div>
								<div
									className="project-table__header__mass-delete-options__button"
									onClick={openMassDeleteProjectsModal}
								>
									<i className="fa fa-trash-o" aria-hidden="true" />
								</div>
							</div>
						</th>
						<th className="project-table__header js-project-table__header">
							<span className="project-table__header__span">
								Name
							</span>
							<SortArrowsButton sortId={1} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">
								Created on
							</span>
							<SortArrowsButton sortId={2} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">
								Start Date
							</span>
							<SortArrowsButton sortId={3} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">
								Due Date
							</span>
							<SortArrowsButton sortId={4} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">
								Priority
							</span>
							<SortArrowsButton sortId={5} />
						</th>
						<th className="project-table__header">
							<span className="project-table__header__span">
								Status
							</span>
							<SortArrowsButton sortId={6} />
						</th>
						<th className="project-table__header js-remaining-space">
							{/*Fills remaining empty space*/}
						</th>
					</tr>
				</thead>
				<tbody>
					{/*Spread operator used for deep copy so 
					  ...original projects array is unaffected*/}
					{searchFilterSort(
						[...reduxState.projects],
						reduxState.projectsSearchFilterSort
					).map((project, i) => {
						return <ProjectRow key={i} project={project} />;
					})}
					{/*Creates an empty space at the bottom*/}
					<tr className="project-table__row--empty" />
				</tbody>
			</table>
		</div>
	);
}