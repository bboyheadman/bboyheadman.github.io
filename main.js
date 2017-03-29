

window.onload = function() {
	

	document.getElementById('login').addEventListener('click', login);
	document.getElementById('logout').addEventListener('click', logout);

}



function login() {
	VK.Auth.login(function(authData) {
		console.log(authData);
		localStorage.setItem('auth', JSON.stringify(authData.session));
		// alert('Авторизирован как ' + authData.session.user.first_name + ' ' + authData.session.user.last_name);
		var auth = JSON.parse(localStorage.getItem('auth'));
		document.getElementById('auth-status').textContent = ('Авторизирован как ' + auth.user.first_name + ' ' + auth.user.last_name);
	}, 8192)
}

function logout() {
	if (confirm('Вы действительно хотите выйти?')) {
		VK.Auth.logout(function(authData) {
			localStorage.setItem('auth', '');
			console.log(authData);
		});
		document.getElementById('auth-status').textContent = 'Авторизируйтесь';
	}
}

function authCheck() {
	if (localStorage.getItem('auth')) {
		var auth = JSON.parse(localStorage.getItem('auth'));
		console.log(auth);
		document.querySelector('title').textContent = ('Авторизирован как ' + auth.user.first_name + ' ' + auth.user.last_name);
	} else {
		document.querySelector('title').textContent = 'Авторизируйтесь';
	}
}