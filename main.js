

window.onload = function() {
	if (localStorage.auth) {
		localStorage.getItem('auth')
	} else {
		document.getElementById('auth-status').textContent = 'Авторизируйтесь';
	}

	document.getElementById('login').addEventListener('click', function() {
		VK.Auth.login(function(authData) {
			console.log(authData);
			localStorage.setItem('auth', JSON.stringify(authData));
			// alert('Авторизирован как ' + authData.session.user.first_name + ' ' + authData.session.user.last_name);
			document.getElementById('auth-status').textContent = ('Авторизирован как ' + authData.session.user.first_name + ' ' + authData.session.user.last_name);
		}, 8192)
	});

	document.getElementById('logout').addEventListener('click', function() {
		if (confirm('Вы действительно хотите выйти?')) {
			VK.Auth.logout(function(authData) {
				localStorage.setItem('auth', null);
				console.log(authData);
			});
			document.getElementById('auth-status').textContent = 'Авторизируйтесь';
		}
	});
}