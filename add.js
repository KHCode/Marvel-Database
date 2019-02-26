var tableHeader = document.getElementById('data-head-row');
var selectTable = document.getElementById('select-table');
var addFormRow = document.getElementById('add-form-row');
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
	addFormRow.innerHTML = '';
	insertLabel.innerHTML = '';
	submitRow.innerHTML = '';
	if(value == 'show-characters'){
		insertLabel.innerHTML = '<label for="add-form-row">Search/Add a Character:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="add_character">Add A Character</button>' + 
							  '<button class="btn btn-secondary ml-3" type="submit" value="search_character">Search Characters</button>';
		for(var i = 0; i < charAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + charAttrs[i] + '</th>';
		}
		for(var i = 1; i < charAttrs.length; i++){
			addFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + charAttrs[i] + '>';
		}
	}else if(value == 'show-events'){
		insertLabel.innerHTML = '<label for="add-form-row">Search/Add an Event:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="add_event">Add An Event</button>' + 
							  '<button class="btn btn-secondary ml-3" type="submit" value="search_event">Search Events</button>';
		for(var i = 0; i < eventAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + eventAttrs[i] + '</th>';
		}
		for(var i = 1; i < eventAttrs.length; i++){
			addFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + eventAttrs[i] + '>';
		}
	}else if(value == 'show-locations'){
		insertLabel.innerHTML = '<label for="add-form-row">Search/Add a Location:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="add_location">Add A Location</button>' + 
							  '<button class="btn btn-secondary ml-3" type="submit" value="search_location">Search Locations</button>';
		for(var i = 0; i < locAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + locAttrs[i] + '</th>';
		}
		for(var i = 1; i < locAttrs.length; i++){
			addFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + locAttrs[i] + '>';
		}
	}else if(value == 'show-teams'){
		insertLabel.innerHTML = '<label for="add-form-row">Search/Add a Team:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="add_team">Add A Team</button>' + 
							  '<button class="btn btn-secondary ml-3" type="submit" value="search_team">Search Teams</button>';
		for(var i = 0; i < teamAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + teamAttrs[i] + '</th>';
		}
		for(var i = 1; i < teamAttrs.length; i++){
			addFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + teamAttrs[i] + '>';
		}
	}else{
		insertLabel.innerHTML = '<label for="add-form-row">Search/Add a Superpower:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="add_superpower">Add A Superpower</button>' + 
							  '<button class="btn btn-secondary ml-3" type="submit" value="search_superpower">Search Superpowers</button>';
		for(var i = 0; i < sPowersAttrs.length; i++){
			tableHeader.innerHTML += '<th>' + sPowersAttrs[i] + '</th>';
		}
		for(var i = 1; i < sPowersAttrs.length; i++){
			addFormRow.innerHTML += '<div class="col"> <input type="text" class="form-control" placeholder=' + sPowersAttrs[i] + '>';
		}
	}
})