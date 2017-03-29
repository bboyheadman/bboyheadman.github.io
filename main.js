

window.onload = function() {
	document.getElementById('authorization').addEventListener('click', function() {
		VK.Auth.login(function(authData) {
			console.log(authData);
			localStorage.setItem('auth', authData);
		}, 8192)
	});
}