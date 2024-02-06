/********f************
    
	Project 4 Javascript
	Name: JiaHui Wu
	Date: 2023-12-9
	Description: JavaScript for Project 4.

*********************/

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear form?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
    // Error flag
	let errorFlag = false;

    let contactInfo = ["name", "phone", "email", "comment"];

    for (let i = 0; i < contactInfo.length; i++) {
        let textField = document.getElementById(contactInfo[i]);

        // Empty fields
        if (!formFieldHasInput(textField)) {
            document.getElementById(contactInfo[i] + "_error").style.display = "block";

            if (!errorFlag) {
                textField.focus();
                textField.select();
            }

            // Raise the error flag
            errorFlag = true;
        }
    }

    // Validate phone number
	let cardNumber = document.getElementById("phone").value;
	let cardNumberLength = document.getElementById("phone").value.length;

    // Invalid phone number 
    if (cardNumberLength < 10 || cardNumberLength > 10) {
        document.getElementById("phoneformat_error").style.display = "block";

        if (!errorFlag) {
            document.getElementById("phone").focus();
            document.getElementById("phone").select();
        }

            // Raise the error flag
            errorFlag = true;
    }

	// Regular expression to validate email
	let emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	let emailValue = document.getElementById("email").value;

    // Invalid email
	if (!emailRegex.test(emailValue)) {
		document.getElementById("emailformat_error").style.display = "block";

		if (!errorFlag) {
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		// Raise the error flag
		errorFlag = true;
    }

    return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Determines if a text field element has input
 *
 * param	fieldElement A text field input element object
 * return	True if the field contains input; False if nothing entered
 */
function formFieldHasInput(fieldElement) {
	// Check if the text field has value
	if (fieldElement.value == null || fieldElement.value.trim() == "") {
		// Invalid entry
		return false;
	} 

	// Valid entry
	return true;
}

/*
 * Handles the load event of the document.
 */
function load() {
	// Hides all error elements on the page
	hideErrors();

	// Add event listener for the form submit
	document.getElementById("contactForm").addEventListener("submit", validate);

	// Reset the form using the default browser reset
	document.getElementById("contactForm").reset();

	// Add event listener for the for customer reset 
	document.getElementById("contactForm").addEventListener("reset", resetForm);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);