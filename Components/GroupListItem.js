

function GroupListItem(groupInfo) {
	this.groupInfo = groupInfo;
	this.name = groupInfo.name;
	this.avatar = groupInfo.photo_50;

	return this.createElement();
}

GroupListItem.prototype.createElement = function() {
	var container = document.createElement('div');
	container.style = {
		width: '300px',
		minHeight: '100px',
		background: '#eee',
	}
	
	var spanTitle = document.createElement('span');
	spanTitle.style = {
		font: '1em Arial',
	}

	container.appendChild(spanTitle);

	return container;
}



