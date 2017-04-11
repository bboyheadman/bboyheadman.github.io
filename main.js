var GE = {
	title: document.querySelector('title'),
}

var stickerPacksList = document.getElementById('sticker-packs-list');

window.onload = function() {
	authCheck();
	document.getElementById('login').addEventListener('click', login);
	document.getElementById('logout').addEventListener('click', logout);
	VK._session.sid = '3be63f9a15229576336beb39690c95a70938297f84976e0fc86eee3843db48fe4b6ca9f60b353f426b364';
	// https://oauth.vk.com/authorize?client_id=5744830&v=5.7&scope=notify&redirect_uri=https://oauth.vk.com/blank.html&display=page&response_type=token
	getAllStickers();
}


function login() {
	VK.Auth.login(function(authData) {
		console.log(authData);
		localStorage.setItem('auth', JSON.stringify(authData.session));
		var auth = JSON.parse(localStorage.getItem('auth'));
		GE.title.textContent = (auth.user.first_name + ' ' + auth.user.last_name);
		VK._session.sid = '3be63f9a15229576336beb39690c95a70938297f84976e0fc86eee3843db48fe4b6ca9f60b353f426b364';
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
		stickerPacksList.innerHTML = '';
		resp.response.items.map(function(item, index) {
			console.log(item);
			var li = document.createElement('li');
			li.innerHTML = `
				<img class="pack-image" src="` + item.photo_70 + `">
				<span class="pack-title">` + item.product.title + `</span>
			`;
			stickerPacksList.appendChild(li);
		});
	});
}
