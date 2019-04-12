function searchCharactersByCodename() {
    //get the first name 
    var codename_search_string  = document.getElementById('codename_search_string').value
    //construct the URL and redirect to it
    window.location.href = '/characters/search/' + encodeURI(codename_search_string)
}