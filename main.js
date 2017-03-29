

window.onload = function() {
	if (localStorage.getItem('auth')) {
		var auth = JSON.parse(localStorage.getItem('auth'));
		document.getElementById('auth-status').textContent = ('Авторизирован как ' + auth.user.first_name + ' ' + auth.user.last_name);
	} else {
		document.getElementById('auth-status').textContent = 'Авторизируйтесь';
	}

	document.getElementById('login').addEventListener('click', function() {
		VK.Auth.login(function(authData) {
			console.log(authData);
			localStorage.setItem('auth', JSON.stringify(authData.session));
			// alert('Авторизирован как ' + authData.session.user.first_name + ' ' + authData.session.user.last_name);
			var auth = JSON.parse(localStorage.getItem('auth'));
			document.getElementById('auth-status').textContent = ('Авторизирован как ' + auth.user.first_name + ' ' + auth.user.last_name);
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