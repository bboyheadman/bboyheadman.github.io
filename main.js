

window.onload = function() {
	document.getElementById('login').addEventListener('click', function() {
		VK.Auth.login(function(authData) {
			console.log(authData);
			localStorage.setItem('auth', authData);
			alert('Авторизирован как ' + authData.session.user.first_name + ' ' + authData.session.user.last_name);
		}, 8192)
	});
	document.getElementById('logout').addEventListener('click', function() {
		VK.Auth.logout(function(authData) {
			console.log(authData);
			localStorage.setItem('auth', null);
		});
	});
}