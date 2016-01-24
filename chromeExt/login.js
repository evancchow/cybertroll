document.addEventListener('DOMContentLoaded', function() {
	$('#login_button').click(function() {
		chrome.storage.sync.set({'username' : $('#login_input').val()}, function() {
			window.location.href = "popup.html";
		});
	});
});