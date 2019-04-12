function updateSuperpowers(id){
    $.ajax({
        url: '/superpowers/' + id,
        type: 'PUT',
        data: $('#updatesuperpowers').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};