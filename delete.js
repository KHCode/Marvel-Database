var tableHeader = document.getElementById('data-head-row');
var selectTable = document.getElementById('select-table');
var deleteFormRow = document.getElementById('delete-form-row');
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
	deleteFormRow.innerHTML = '';
	insertLabel.innerHTML = '';
	submitRow.innerHTML = '';
	if(value == 'show-characters'){
		insertLabel.innerHTML = '<label for="delete-form-row">Delete a Character:</label>';
		deleteFormRow.innerHTML += '<div class="col"> <input type="number" min="0" class="form-control" placeholder="Character ID">';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="delete_character">Delete</button>';
		for(var i = 0; i < charAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + charAttrs[i] + '</th>';
		}
	}else if(value == 'show-events'){
		insertLabel.innerHTML = '<label for="delete-form-row">Delete an Event:</label>';
		deleteFormRow.innerHTML += '<div class="col"> <input type="number" min="0" class="form-control" placeholder="Event ID">';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="delete_event">Delete</button>';
		for(var i = 0; i < eventAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + eventAttrs[i] + '</th>';
		}
	}else if(value == 'show-locations'){
		insertLabel.innerHTML = '<label for="delete-form-row">Delete a Location:</label>';
		deleteFormRow.innerHTML += '<div class="col"> <input type="number" min="0" class="form-control" placeholder="Location ID">';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="delete_location">Delete</button>';
		for(var i = 0; i < locAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + locAttrs[i] + '</th>';
		}
	}else if(value == 'show-teams'){
		insertLabel.innerHTML = '<label for="delete-form-row">Delete a Team:</label>';
		deleteFormRow.innerHTML += '<div class="col"> <input type="number" min="0" class="form-control" placeholder="Team ID">';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="delete_team">Delete</button>';
		for(var i = 0; i < teamAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + teamAttrs[i] + '</th>';
		}
	}else{
		insertLabel.innerHTML = '<label for="delete-form-row">Delete a Superpower:</label>';
		deleteFormRow.innerHTML += '<div class="col"> <input type="number" min="0" class="form-control" placeholder="Superpower ID">';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="delete_superpower">Delete</button>';
		for(var i = 0; i < sPowersAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + sPowersAttrs[i] + '</th>';
		}
	}
})