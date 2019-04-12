function filterCharactersByHome() {
    //get the id of the selected homeworld from the filter dropdown
    var home = document.getElementById('home_filter').value
    //construct the URL and redirect to it
    window.location.href = '/characters/filter/' + parseInt(home)
}