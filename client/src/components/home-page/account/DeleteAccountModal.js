import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { deleteAccount } from "../../../actions/accountActions";
import { setModalComponent } from "../../../actions/modalActions.js";

import EditInfoModal from "./EditInfoModal";

import "../../../SCSS/accountModals.scss";

export default function DeleteAccountModal() {
	const reduxState = useSelector((state) => state);
	const dispatch = useDispatch();

	const [accountInfo, setAccountInfo] = useState({
		deleteTypedOut: "",
		currentPassword: "",
	});

	const onChange = (e) => {
		setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
	};

	const backToEditInfo = () => {
		dispatch(
			setModalComponent({
				editInfoModal: <EditInfoModal />,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	};

	const closeModals = () => {
		dispatch(
			setModalComponent({
				editInfoModal: null,
				editEmailModal: null,
				editPasswordModal: null,
			})
		);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(deleteAccount(accountInfo));
	};

	return (
		<div>
			<div className="blurredBackground"></div>
			<div className="editAccountContainerDiv">
				<button className="backButton" onClick={backToEditInfo}>
					➔
				</button>
				<button className="exitButton" onClick={closeModals}>
					X
				</button>
				<form className="editAccountForm" noValidate onSubmit={handleSubmit}>
					<label className="titleLabel">Delete Account</label>
					<br />
					<label className="warningMessage">
						If you are sure, type{" "}
						<label className="capitalDelete">DELETE</label> below.
					</label> <br />
					<span className="redErrorText">
						{reduxState.inputErrors.deleteTypedOut}
					</span>
					<input
						type="text"
						name="deleteTypedOut"
						onChange={(e) => onChange(e)}
						value={accountInfo.deleteTypedOut}
						placeholder="Type here..."
						//error={reduxState.inputErrors.deleteTypedOut}
						id="deleteTypedOutInput"
					/>
					<span className="redErrorText">
						{reduxState.inputErrors.currentPassword}
					</span>
					<input
						type="password"
						name="currentPassword"
						onChange={(e) => onChange(e)}
						value={accountInfo.currentPassword}
						placeholder="Current Password"
						//error={reduxState.inputErrors.currentPassword}
						id="currentPasswordInput"
					/>
					<span className="redErrorText">
						{reduxState.inputErrors.validation}
						{reduxState.inputErrors.account}
						{reduxState.inputErrors.server}
					</span>
					<button type="submit" className="submitButton">
						Delete
					</button>
				</form>
			</div>
		</div>
	);
}
