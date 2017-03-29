

function GroupListItem(groupInfo) {
	this.groupInfo = groupInfo;
	this.name = groupInfo.name;
	this.avatar = groupInfo.photo_50;

	return this.createElement();
}

GroupListItem.prototype.createElement = function() {
	var container = document.createElement('div');
	container.style.width = '300px';
	container.style.height = '100px';
	container.style.background = '#eee';
	
	var spanTitle = document.createElement('span');
	spanTitle.style.font: '1em Arial';
	spanTitle.textContent = this.name;
	
	container.appendChild(spanTitle);

	return container;
}



