var tableHeader = document.getElementById('data-head-row');
var selectTable = document.getElementById('select-table');
var addRemoveFormRow = document.getElementById('add-remove-form-row');
var submitRow = document.getElementById('submit-row');
var insertLabel = document.getElementById('insert-label');

var charSPowers = ["Character", "Character ID", "Superpower", "Superpower ID"];
var charEvents = ["Character", "Character ID", "Event", "Event ID"];
var charTeams = ["Character", "Character ID", "Team", "Team ID"];
var eventLocs = ["Event", "Event ID", "Location", "Location ID"];

selectTable.addEventListener('change', function(){
	var value = selectTable.value;
	tableHeader.innerHTML = '';
	addRemoveFormRow.innerHTML = '';
	insertLabel.innerHTML = '';
	submitRow.innerHTML = '';

	if(value == 'show-character-superpower'){
		insertLabel.innerHTML = '<label for="add-remove-form-row">Add/Remove a Character-Superpower Relationship:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="add_character_superpower">Add</button>' +
							  '<button class="btn btn-primary ml-3" type="submit" value="delete_character_superpower">Remove</button>';
		for(var i = 0; i < charSPowers.length; i++){
			tableHeader.innerHTML += '<th>' + charSPowers[i] + '</th>';
		}
		for(var i = 1; i < charSPowers.length; i+=2){
			addRemoveFormRow.innerHTML += '<div class="col"> <input type="number" min="0" class="form-control" placeholder="' + charSPowers[i] + '">';
		}
	}else if(value == 'show-character-event'){
		insertLabel.innerHTML = '<label for="add-remove-form-row">Add/Remove a Character-Event Relationship:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="add_character_event">Add</button>' +
							  '<button class="btn btn-primary ml-3" type="submit" value="delete_character_event">Remove</button>';
		for(var i = 0; i < charEvents.length; i++){
			tableHeader.innerHTML += '<th>' + charEvents[i] + '</th>';
		}
		for(var i = 1; i < charEvents.length; i+=2){
			addRemoveFormRow.innerHTML += '<div class="col"> <input type="number" min="0" class="form-control" placeholder="' + charEvents[i] + '">';
		}
	}else if(value == 'show-character-team'){
		insertLabel.innerHTML = '<label for="add-remove-form-row">Add/Remove a Character-Team Relationship:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="add_character_team">Add</button>' +
							  '<button class="btn btn-primary ml-3" type="submit" value="delete_character_team">Remove</button>';
		for(var i = 0; i < charTeams.length; i++){
			tableHeader.innerHTML += '<th>' + charTeams[i] + '</th>';
		}
		for(var i = 1; i < charTeams.length; i+=2){
			addRemoveFormRow.innerHTML += '<div class="col"> <input type="number" min="0" class="form-control" placeholder="' + charTeams[i] + '">';
		}
	}else{
		insertLabel.innerHTML = '<label for="add-remove-form-row">Add/Remove an Event-Location Relationship:</label>';
		submitRow.innerHTML = '<button class="btn btn-primary" type="submit" value="add_event_location">Add</button>' +
							  '<button class="btn btn-primary ml-3" type="submit" value="delete_event_location">Remove</button>';
		for(var i = 0; i < eventLocs.length; i++){
			tableHeader.innerHTML += '<th>' + eventLocs[i] + '</th>';
		}
		for(var i = 1; i < eventLocs.length; i+=2){
			addRemoveFormRow.innerHTML += '<div class="col"> <input type="number" min="0" class="form-control" placeholder="' + eventLocs[i] + '">';
		}
	}
})