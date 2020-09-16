import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	setWhichProjectComponentsDisplay,
	deleteProject,
} from "../../../../actions";

import "../../../../SCSS/projects-bugs-shared/deleteProjectModal.scss";

export default function DeleteProjectModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const deleteThisProject = () => {
		dispatch(
			deleteProject({
				project_id:
					reduxState.projectComponentsDisplay.targetProject.project_id,
			})
		);
		dispatch(
			setWhichProjectComponentsDisplay({
				projectsTable: true,
			})
		);
	};

	const closeDeleteProjectModal = () => {
		dispatch(
			setWhichProjectComponentsDisplay({
				...reduxState.projectComponentsDisplay,
				deleteProjectModal: false,
			})
		);
	};

	return (
		<div className="delete-project-modal-component">
			<div className="blurred-background js-delete-project-modal-blurred-background" />
			<div className="delete-account-modal">
				<div className="outer-container">
					<span className="warning-message">Are you sure?</span>
				</div>
				<div className="outer-container">
					<div className="centered-buttons-container">
						<div
							className="centered-buttons-container__delete"
							onClick={deleteThisProject}
						>
							Delete
						</div>
						<div
							className="centered-buttons-container__cancel"
							onClick={closeDeleteProjectModal}
						>
							Cancel
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}