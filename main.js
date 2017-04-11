var GE = {
	title: document.querySelector('title'),
}

var PACKS = [];

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
		stickerPacksList.innerHTML = '';
		PACKS = [];
		resp.response.items.map(function(item, index) {
			PACKS.push(new StickerPack(item));
		});
		renderAllPacks();
	});
}

function renderAllPacks() {
	PACKS.map(function(item, index) {
		stickerPacksList.appendChild(item.createElement());
	});
}

function StickerPack(pack) {
	this.pack = pack;
	this.rendered = document.createElement('li');
	this.allStickersRenderedList = document.createElement('div');
	this.closed = true;
}

StickerPack.prototype.createElement = function() {
	var self = this;

	var packAvatar = document.createElement('img');
	packAvatar.src = this.pack.photo_70;
	packAvatar.className = 'pack-avatar';
	this.rendered.appendChild(packAvatar);

	var packTitle = document.createElement('span');
	packTitle.textContent = this.pack.product.title;
	packTitle.className = 'pack-title';
	this.rendered.appendChild(packTitle);

	this.rendered.appendChild(this.allStickersRenderedList);

	packAvatar.addEventListener('click', function() {
		console.log(this);
		if (this.closed) {
			this.pack.product.stickers.sticker_ids.map(function(item, index) {
				var sticker = document.createElement('img');
				sticker.src = (self.pack.product.stickers.base_url + item + '/128.png' );
				sticker.addEventListener('click', function(e) {
					console.log(this);
					this.cell.style.width = '150px';
					this.cell.bordered = false;
					if (!this.cell.bordered) {
						this.cell.src = (self.pack.product.stickers.base_url + item + '/512.png');
					} else {
						this.cell.src = (self.pack.product.stickers.base_url + item + '/512b.png');
					}
					this.cell.bordered = !this.cell.bordered;
				}.bind({
					id: item,
					cell: sticker,
				}));
				self.allStickersRenderedList.appendChild(sticker);
			});
		} else {
			this.allStickersRenderedList.innerHTML = '';
		}
		this.closed = !this.closed;
	}.bind(this));

	return this.rendered;
}