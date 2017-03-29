

function GroupListItem(groupInfo) {
	this.groupInfo = groupInfo;
	this.name = groupInfo.name;
	this.avatar = groupInfo.photo_50;

	return this.createElement();
}

GroupListItem.prototype.createElement = function() {
	var container = document.createElement('div');
	container.style.width = '300px';
	container.style.height = '80px';
	container.style.background = '#eee';
	container.style.marginTop = '3px';

	var itemPhoto = document.createElement('img');
	itemPhoto.src = this.avatar;
	itemPhoto.style.height = '100%';

	
	var spanTitle = document.createElement('span');
	spanTitle.style.font = '1em Arial';
	spanTitle.textContent = this.name;
	
	container.appendChild(itemPhoto);
	container.appendChild(spanTitle);

	return container;
}



