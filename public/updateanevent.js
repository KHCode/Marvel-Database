function updateEvent(id){
    $.ajax({
        url: '/events/' + id,
        type: 'PUT',
        data: $('#updateevent').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};