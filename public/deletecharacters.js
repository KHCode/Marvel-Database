function deleteCharacters(id){
    $.ajax({
        url: '/characters/' + id,
        type: 'DELETE',
        success: function(result){
        	console.log("Hi from inside deleteCharacters!");
            window.location.reload(true);
        }
    })
};

function deleteCharPowers(pwr_id, char_id){
  $.ajax({
      url: '/character-superpowers/power/' + pwr_id + '/character/' + char_id,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};