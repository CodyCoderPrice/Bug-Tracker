export function toggleCharCountColor(
	nameOfClass,
	descriptionLength,
	charLimit
) {
	document.getElementsByClassName(nameOfClass)[0].style.color =
		descriptionLength > charLimit ? "red" : "black";
}

export function populateComboBox(selectElementClassName, array, id) {
	let selectElement = document.getElementsByClassName(selectElementClassName)[0];

	for (let i = 0; i < array.length; i++) {
		let optionElement = document.createElement("option");

		// Makes the first item of the array the default selection
		if (i === 0) {
			optionElement.selected = "selected";
		}

		optionElement.value = array[i].id;
		optionElement.textContent = array[i].option;
		selectElement.appendChild(optionElement);
	}

	selectElement.value = id;
}

export function toggleClassName(shouldHaveClassName, element, nameOfToggledClass) {
	if (shouldHaveClassName) {
		if (!element.className.includes(nameOfToggledClass)) {
			// Space is needed for nameOfToggledClass
			// ...to keep it from merging with other classNames
			element.className = element.className + " " + nameOfToggledClass;
		}
	} else {
		const regex = new RegExp("(?:^|\\s)"+nameOfToggledClass+"(?!\\S)", "g");
		element.className = element.className.replace(
			regex,
			""
		);
	}
}