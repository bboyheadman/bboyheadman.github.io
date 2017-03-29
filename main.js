var GE = {
	title: document.querySelector('title'),
}

window.onload = function() {
	authCheck();
	document.getElementById('login').addEventListener('click', login);
	document.getElementById('logout').addEventListener('click', logout);
	document.getElementById('logout').addEventListener('click', getAllGroups);
}

function login() {
	VK.Auth.login(function(authData) {
		console.log(authData);
		localStorage.setItem('auth', JSON.stringify(authData.session));
		// alert('Авторизирован как ' + authData.session.user.first_name + ' ' + authData.session.user.last_name);
		var auth = JSON.parse(localStorage.getItem('auth'));
		GE.title.textContent = (auth.user.first_name + ' ' + auth.user.last_name);
	}, 8192)
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

function getAllGroups() {
	VK.Api.call('groups.get', {
		extended: true,
		v: 5.63
	}, function(resp) {
		console.log(resp);
		resp.response.items.map(function(item, index) {
			document.body.appendChild(new GroupListItem(item));
		});
	});
}
