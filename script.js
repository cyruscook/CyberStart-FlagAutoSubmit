// If we are on a challenge page (& That is compatible)
if($("div#msg-correct").length){
	// Initialise a do once gate
	var doneOnce = false;
	
	// Retreive the div where the flag will be placed (as a native dom)
	var flagMessage  = $("div#msg-correct")[0];
	
	// Set a listener whenever the div changes
	// Modified from https://stackoverflow.com/a/37168579/7641587
	var observer = new MutationObserver( function(mutations){
		mutations.forEach( function(mutation) {
			// If this iteration is not for the style, skip
			if (mutation.attributeName !== 'style') return;
			
			// Get whether the value is currently displayed, proceed if it is (and check the do once gate)
			var currentValue = mutation.target.style.display;
			if (currentValue !== "none" && !doneOnce) {
				// Flag is formatted as "Success! The flag is {flag}", retrieve only the flag
				theFlag = flagMessage.innerHTML.slice(21, 500);
				
				//Enter the flag into the form and submit it
				$('#codeAttempt').val(theFlag);
				$('form.form-flag > input.btn').click();
				
				doneOnce = true;
			}
		});
	});
	
	// Activate the listener
	observer.observe(flagMessage, { attributes: true });
}