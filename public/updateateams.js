function updateTeam(id){
    $.ajax({
        url: '/teams/' + id,
        type: 'PUT',
        data: $('#updateteam').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};