function updateCharacter(id){
    $.ajax({
        url: '/characters/' + id,
        type: 'PUT',
        data: $('#updatecharacter').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};