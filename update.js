var tableHeader = document.getElementById('data-head-row');
var selectTable = document.getElementById('select-table');
var updateFormRow = document.getElementById('update-form-row');
var submitRow = document.getElementById('submit-row');
var insertLabel = document.getElementById('insert-label');

var charAttrs = ['ID', 'Alias', 'Codename', 'Home', 'Archnemesis'];
var eventAttrs = ['ID', 'Name', 'Start Date', 'End Date', 'Description'];
var locAttrs = ['ID', 'Name'];
var teamAttrs = ['ID', 'Name'];
var sPowersAttrs = ['ID', 'Description'];

selectTable.addEventListener('change', function(){
	var value = selectTable.value;
	tableHeader.innerHTML = '';
	updateFormRow.innerHTML = '';
	insertLabel.innerHTML = '';
	submitRow.innerHTML = '';
	if(value == 'show-characters'){
		insertLabel.innerHTML = '<label for="update-form-row">Update a Character:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="update_character">Update A Character</button>';
		for(var i = 0; i < charAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + charAttrs[i] + '</th>';
		}
		for(var i = 0; i < charAttrs.length; i++){
			updateFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + charAttrs[i] + '>';
		}
	}else if(value == 'show-events'){
		insertLabel.innerHTML = '<label for="update-form-row">Update an Event:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="update_event">Update An Event</button>';
		for(var i = 0; i < eventAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + eventAttrs[i] + '</th>';
		}
		for(var i = 0; i < eventAttrs.length; i++){
			updateFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + eventAttrs[i] + '>';
		}
	}else if(value == 'show-locations'){
		insertLabel.innerHTML = '<label for="update-form-row">Update a Location:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="update_location">Update A Location</button>';
		for(var i = 0; i < locAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + locAttrs[i] + '</th>';
		}
		for(var i = 0; i < locAttrs.length; i++){
			updateFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + locAttrs[i] + '>';
		}
	}else if(value == 'show-teams'){
		insertLabel.innerHTML = '<label for="update-form-row">Update a Team:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="update_team">Update A Team</button>';
		for(var i = 0; i < teamAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + teamAttrs[i] + '</th>';
		}
		for(var i = 0; i < teamAttrs.length; i++){
			updateFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + teamAttrs[i] + '>';
		}
	}else{
		insertLabel.innerHTML = '<label for="update-form-row">Update a Superpower:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="update_superpower">Update A Superpower</button>';
		for(var i = 0; i < sPowersAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + sPowersAttrs[i] + '</th>';
		}
		for(var i = 0; i < sPowersAttrs.length; i++){
			updateFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + sPowersAttrs[i] + '>';
		}
	}
})