function filterEventsByStartYear() {
    //get the id of the selected homeworld from the filter dropdown
    var event = document.getElementById('start_date_filter').value
    var actualDate = event + "-01-01"
    //construct the URL and redirect to it
    window.location.href = '/events/filter/' + actualDate
}