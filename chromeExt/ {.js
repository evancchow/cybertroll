document.addEventListener('DOMContentLoaded', function() {
	$('#login_button').click(function() {
		chrome.storage.sync.set({'username' : $('#login_input').text}, function()
	});
});





$(document).ready('#login_button').click(function() {
	var newName = document.getElementById('login_input').value;
	if (newName) {
		chrome.storage.sync.set({'username' : newName}, function() {
			window.location.href = "popup.html";
		});
	}
});