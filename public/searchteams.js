function searchTeamsByName() {
    //get the team name 
    var team_search_string  = document.getElementById('team_search_string').value
    //construct the URL and redirect to it
    window.location.href = '/teams/search/' + encodeURI(team_search_string)
}