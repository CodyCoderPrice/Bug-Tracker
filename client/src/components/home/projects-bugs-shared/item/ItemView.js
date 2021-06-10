import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	SIZE_CONTAINER,
	GENERAL_CONTAINER,
	ACCOUNT_CONTAINER,
	PROJECT_CONTAINER,
	BUG_CONTAINER,
	COMMENT_CONTAINER,
} from "../../../../actions/constants/containerNames";

import {
	setWhichGeneralComponentsDisplay,
	setWhichProjectOrBugComponentsDisplay,
	deleteProjectOrBug,
	deleteComment,
	setWhichCommentComponentsDisplay,
} from "../../../../actions";

import {
	manageSizeOfItemBoxsInPairContainer,
	getWindowSize,
	getItemViewContentContainerBackgroundColorClassNameForLightOrDarkMode,
	getItemViewItemBoxBackgroundColorClassNameForLightOrDarkMode,
} from "../../../../utils";

// Components
import ItemViewTopBar from "./ItemViewTopBar";
import ItemViewListSidebar from "./ItemViewListSidebar";
import ItemViewDisplayItemInfo from "./ItemViewDisplayItemInfo";
import ItemViewEditItemInfo from "./ItemViewEditItemInfo";
import DeleteModal from "../DeleteModal";
import ItemViewBugList from "./ItemViewBugList";
import ItemViewBugPieChart from "./ItemViewBugPieChart";
import ItemViewCommentsBox from "./ItemViewCommentsBox";

export default function ItemView(props) {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	// Adjusts the height and width of the modal to fit the screen
	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].variables.window !== null &&
			reduxState[SIZE_CONTAINER].variables.navbar !== null &&
			reduxState[SIZE_CONTAINER].constants.itemViewTopBarHeight !== null &&
			reduxState[SIZE_CONTAINER].constants.itemViewListSidebarWidth !== null
		) {
			const itemViewElement = document.getElementsByClassName(
				"js-item-content-container"
			)[0];

			itemViewElement.style.height =
				reduxState[SIZE_CONTAINER].variables.window.height -
				reduxState[SIZE_CONTAINER].variables.navbar.height -
				reduxState[SIZE_CONTAINER].constants.itemViewTopBarHeight +
				"px";

			if (reduxState[GENERAL_CONTAINER].componentsDisplay.itemViewListSidebar) {
				itemViewElement.style.width =
					reduxState[SIZE_CONTAINER].variables.window.width -
					reduxState[SIZE_CONTAINER].constants.itemViewListSidebarWidth +
					"px";
			} else {
				itemViewElement.style.width =
					reduxState[SIZE_CONTAINER].variables.window.width + "px";
			}
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER],
		// eslint-disable-next-line
		reduxState[GENERAL_CONTAINER].componentsDisplay.itemViewListSidebar,
	]);

	// If user has not set itemViewListSidebar, then whether it is
	// ...open or closed will be decided based on the current window size
	useEffect(() => {
		if (
			reduxState[GENERAL_CONTAINER].componentsDisplay
				.itemViewListSidebarUserSet === false &&
			reduxState[SIZE_CONTAINER].constants.itemViewListSidebarWidth !== null &&
			reduxState[SIZE_CONTAINER].constants.itemViewPaddingContainerPadding !==
				null &&
			reduxState[SIZE_CONTAINER].constants
				.itemViewOuterDividingContainerMinWidth !== null
		) {
			// Instead of putting in the optimization to re-run once no longer
			// ...null since it would also re-run every window resize
			const windowSize =
				reduxState[SIZE_CONTAINER].variables.window === null
					? getWindowSize()
					: reduxState[SIZE_CONTAINER].variables.window;

			const minWidthNeededForNoItemBoxOverflow =
				reduxState[SIZE_CONTAINER].constants.itemViewPaddingContainerPadding *
					2 +
				reduxState[SIZE_CONTAINER].constants
					.itemViewOuterDividingContainerMinWidth;

			dispatch(
				setWhichGeneralComponentsDisplay({
					...reduxState[GENERAL_CONTAINER].componentsDisplay,
					itemViewListSidebar:
						windowSize.width -
							reduxState[SIZE_CONTAINER].constants.itemViewListSidebarWidth >=
						minWidthNeededForNoItemBoxOverflow,
				})
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants,
	]);

	useEffect(() => {
		if (
			reduxState[SIZE_CONTAINER].constants
				.itemViewOuterDividingContainerMinWidth !== null &&
			props.reduxContainerName === PROJECT_CONTAINER
		) {
			manageSizeOfItemBoxsInPairContainer(
				document.getElementsByClassName(
					"js-bug-info-pair-container-for-project"
				)[0],
				reduxState[SIZE_CONTAINER].constants
					.itemViewOuterDividingContainerMinWidth,
				"outer-dividing-container--half-width"
			);
		}
		// eslint-disable-next-line
	}, [
		// eslint-disable-next-line
		reduxState[SIZE_CONTAINER].constants.itemViewOuterDividingContainerMinWidth,
	]);

	const deleteItem = () => {
		let copyMassDeleteList = [
			...reduxState[props.reduxContainerName].massDeleteList,
		];

		// Object instead of Number since deleting bugs requires the project_id
		// ...so it is appended below when deleting bugs
		let idsObject = {
			id: reduxState[props.reduxContainerName].componentsDisplay
				.itemViewCurrentItem.id,
		};
		// Adds project_id when deleting a bug
		if (props.reduxContainerName === BUG_CONTAINER) {
			idsObject["project_id"] =
				reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem.id;
		}
		dispatch(
			deleteProjectOrBug(
				props.reduxContainerName,
				idsObject,
				copyMassDeleteList
			)
		);
	};

	const closeItemViewDeleteModal = () => {
		dispatch(
			setWhichProjectOrBugComponentsDisplay(props.reduxContainerName, {
				...reduxState[props.reduxContainerName].componentsDisplay,
				itemViewDeleteModal: false,
			})
		);
	};

	// Named deleteSelectedComment since deleteComment is an action function
	const deleteSelectedComment = () => {
		dispatch(
			deleteComment(
				{
					id: reduxState[COMMENT_CONTAINER].componentsDisplay.commentToBeDeleted
						.id,
					project_id:
						reduxState[PROJECT_CONTAINER].componentsDisplay.itemViewCurrentItem
							.id,
					bug_id:
						reduxState[BUG_CONTAINER].componentsDisplay.itemViewCurrentItem.id,
				},
				reduxState[COMMENT_CONTAINER].componentsDisplay.commentBeingEdited
			)
		);
	};

	const closeCommentDeleteModal = () => {
		dispatch(
			setWhichCommentComponentsDisplay({
				commentBeingEdited:
					reduxState[COMMENT_CONTAINER].componentsDisplay.commentBeingEdited,
			})
		);
	};

	return (
		<div className="item-view-component">
			<ItemViewTopBar reduxContainerName={props.reduxContainerName} />
			<ItemViewListSidebar reduxContainerName={props.reduxContainerName} />
			{/* Located outside item-view-component so topBar doesn't cover it */}
			{reduxState[props.reduxContainerName].componentsDisplay
				.itemViewDeleteModal ? (
				// Delete modal for items
				<DeleteModal
					clickToCloseBlurredBackground={false}
					deleteFunction={deleteItem}
					closeModalFunction={closeItemViewDeleteModal}
				/>
			) : null}
			{reduxState[BUG_CONTAINER].componentsDisplay.itemView === true &&
			reduxState[COMMENT_CONTAINER].componentsDisplay.commentToBeDeleted !==
				null ? (
				// Delete modal for comments
				<DeleteModal
					clickToCloseBlurredBackground={false}
					deleteFunction={deleteSelectedComment}
					closeModalFunction={closeCommentDeleteModal}
				/>
			) : null}
			<div
				className={
					"item-content-container js-item-content-container" +
					(reduxState[GENERAL_CONTAINER].componentsDisplay.itemViewListSidebar
						? " item-content-container--shifted-right"
						: "") +
					getItemViewContentContainerBackgroundColorClassNameForLightOrDarkMode(
						reduxState[ACCOUNT_CONTAINER].settings.dark_mode
					)
				}
			>
				<div className="padding-container">
					{!reduxState[props.reduxContainerName].componentsDisplay
						.itemViewEditItemInfo ? (
						<div>
							<ItemViewDisplayItemInfo
								reduxContainerName={props.reduxContainerName}
							/>
						</div>
					) : (
						<div>
							<ItemViewEditItemInfo
								reduxContainerName={props.reduxContainerName}
							/>
						</div>
					)}
					{props.reduxContainerName !== PROJECT_CONTAINER ? null : (
						<div className="pair-container js-bug-info-pair-container-for-project">
							<div className="outer-dividing-container outer-dividing-container--half-width">
								<div
									className={
										"item-box item-box--bugs-stats-height item-box--no-left-right-padding" +
										getItemViewItemBoxBackgroundColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									<h2 className={"item-box__title"}>Status of Bugs</h2>
									{[...reduxState[BUG_CONTAINER].list].filter(
										(item) =>
											item.project_id ===
											reduxState[PROJECT_CONTAINER].componentsDisplay
												.itemViewCurrentItem.id
									).length > 0 ? (
										<ItemViewBugPieChart />
									) : (
										<div className="item-box__no-bugs-message">
											This project has no bugs tracked
										</div>
									)}
								</div>
							</div>
							<div className="outer-dividing-container outer-dividing-container--half-width">
								<div
									className={
										"item-box item-box--bugs-stats-height" +
										getItemViewItemBoxBackgroundColorClassNameForLightOrDarkMode(
											reduxState[ACCOUNT_CONTAINER].settings.dark_mode
										)
									}
								>
									<h2 className={"item-box__title"}>
										Most Recent Bugs Worked On
									</h2>
									{[...reduxState[BUG_CONTAINER].list].filter(
										(item) =>
											item.project_id ===
											reduxState[PROJECT_CONTAINER].componentsDisplay
												.itemViewCurrentItem.id
									).length > 0 ? (
										<ItemViewBugList />
									) : (
										<div className="item-box__no-bugs-message">
											This project has no bugs tracked
										</div>
									)}
								</div>
							</div>
						</div>
					)}
					{props.reduxContainerName === PROJECT_CONTAINER ? null : (
						<ItemViewCommentsBox />
					)}
				</div>
			</div>
		</div>
	);
}
