function updateLocation(id){
    $.ajax({
        url: '/locations/' + id,
        type: 'PUT',
        data: $('#updatelocation').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};