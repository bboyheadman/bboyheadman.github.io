var GE = {
	title: document.querySelector('title'),
}

window.onload = function() {
	authCheck();
	document.getElementById('login').addEventListener('click', login);
	document.getElementById('logout').addEventListener('click', logout);
	VK._session.sid = 'faca9390d6b903013d9465a15111453e478340015c3bfc41db91b3f7d0e243519e3eb6de8707c7f0f218d';
}


function login() {
	VK.Auth.login(function(authData) {
		console.log(authData);
		localStorage.setItem('auth', JSON.stringify(authData.session));
		var auth = JSON.parse(localStorage.getItem('auth'));
		GE.title.textContent = (auth.user.first_name + ' ' + auth.user.last_name);
		VK._session.sid = 'faca9390d6b903013d9465a15111453e478340015c3bfc41db91b3f7d0e243519e3eb6de8707c7f0f218d';
	}, 1);
}


function logout() {
	if (confirm('Вы действительно хотите выйти?')) {
		VK.Auth.logout(function(authData) {
			localStorage.setItem('auth', '');
			console.log(authData);
			GE.title.textContent = 'Авторизируйтесь';
		});
	}
}


function authCheck() {
	if (localStorage.getItem('auth')) {
		var auth = JSON.parse(localStorage.getItem('auth'));
		console.log(auth);
		GE.title.textContent = (auth.user.first_name + ' ' + auth.user.last_name);
	} else {
		GE.title.textContent = 'Авторизируйтесь';
	}
}


function getAllStickers() {
	VK.Api.call('store.getStockItems', {
		type: 'stickers',
		v: 5.63
	}, function(resp) {
		console.log(resp);
	});
}
