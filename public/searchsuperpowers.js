function searchSuperpowers() {
    //get the team name 
    var superpower_search_string  = document.getElementById('superpower_search_string').value
    //construct the URL and redirect to it
    window.location.href = '/superpowers/search/' + encodeURI(superpower_search_string)
}