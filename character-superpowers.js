module.exports = function(){
    var express = require('express');
    var router = express.Router();

    /* get characters to populate in dropdown */
    function getCharacters(res, mysql, context, complete){
        mysql.pool.query("SELECT id AS char_id, codename FROM marvel_character", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

    /* get superpowers to populate in dropdown */
    function getSuperpowers(res, mysql, context, complete){
        sql = "SELECT id AS pwr_id, description FROM superpowers";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.superpowers = results
            complete();
        });
    }

 	/* get characters with their superpowers */
    /* TODO: get multiple superpowerss in a single column and group on
     * fname+lname or id column
     */
    function getCharactersWithSuperpowers(res, mysql, context, complete){
        sql = "SELECT sc.superpower_id AS pwr_id, sc.character_id AS char_id, ch.codename, sp.description FROM marvel_character ch LEFT JOIN superpower_characters sc ON ch.id = sc.character_id INNER JOIN superpowers sp ON sp.id = sc.superpower_id ORDER BY ch.codename"
         mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end()
            }
            context.char_powers = results
            complete();
        });
    }
    /* List people with certificates along with 
     * displaying a form to associate a person with multiple certificates
     */
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletecharacters.js"];
        var mysql = req.app.get('mysql');
        var handlebars_file = 'character-superpowers'

        getCharacters(res, mysql, context, complete);
        getSuperpowers(res, mysql, context, complete);
        getCharactersWithSuperpowers(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render(handlebars_file, context);
            }
        }
    });

    router.post('/', function(req, res){
        console.log("We get the multi-select superpower dropdown as ", req.body.superpowers)
        var mysql = req.app.get('mysql');
        // let's get out the superpowers from the array that was submitted by the form 
        let superpowers = []
        if(!Array.isArray(req.body.superpowers)){
        	superpowers.push(req.body.superpowers)
        }else{
        	superpowers = req.body.superpowers
        }
        var mar_char = req.body.char_id
        for (let power of superpowers) {
          console.log("Processing certificate id " + power)
          var sql = "INSERT INTO superpower_characters (superpower_id, character_id) VALUES (?,?)";
          var inserts = [power, mar_char];
          sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
                console.log(error)
            }
          });
        } //for loop ends here 
        res.redirect('/character-superpowers');
    });

	/* Delete a character's superpowers record */
    /* This route will accept a HTTP DELETE request in the form
     * /pid/{{pid}}/cert/{{cid}} -- which is sent by the AJAX form 
     */
    router.delete('/power/:pwr_id/character/:char_id', function(req, res){
        //console.log(req) //I used this to figure out where did pid and cid go in the request
        console.log(req.params.pwr_id)
        console.log(req.params.char_id)
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM superpower_characters WHERE superpower_id = ? AND character_id = ?";
        var inserts = [req.params.pwr_id, req.params.char_id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.status(400); 
                res.end(); 
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();