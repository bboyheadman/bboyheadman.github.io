var loginButton,
	logoutButton;

window.onload = function() {

	loginButton = document.getElementById('login');
	loginButton.addEventListener('click', login);

	logoutButton = document.getElementById('logout');
	logoutButton.addEventListener('click', logout);

	if (VK._session) {
		logoutButton.style.display = 'block';
		loginButton.style.display = 'none';
	} else {
		logoutButton.style.display = 'none';
		loginButton.style.display = 'block';
	}

	// https://oauth.vk.com/authorize?client_id=5744830&v=5.7&scope=notify&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token
}


function login() {
	VK.Auth.login(function(authData) {
		console.log(authData);
		localStorage.setItem('auth', JSON.stringify(authData.session));
		var auth = JSON.parse(localStorage.getItem('auth'));
	}, 140492191 - 4096);
}


function logout() {
	if (confirm('Вы действительно хотите выйти?')) {
		VK.Auth.logout(function(authData) {
			localStorage.setItem('auth', '');
			console.log(authData);
		});
	}
}
