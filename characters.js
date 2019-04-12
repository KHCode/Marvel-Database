module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getHome(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM location", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations  = results;
            complete();
        });
    }

    function getCharacters(res, mysql, context, complete){
        mysql.pool.query("SELECT mc1.id, mc1.alias, mc1.codename, location.name AS home, (SELECT mc2.codename FROM marvel_character mc2 WHERE mc1.archNemesis = mc2.id) AS arch_nemesis FROM marvel_character mc1 LEFT JOIN location ON location.id = mc1.home ORDER BY mc1.alias", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

    function getCharactersbyHome(req, res, mysql, context, complete){
        var query = "SELECT mc1.id, mc1.alias, mc1.codename, location.name AS home, (SELECT mc2.codename FROM marvel_character mc2 WHERE mc1.archNemesis = mc2.id) AS arch_nemesis FROM marvel_character mc1 LEFT JOIN location ON mc1.home = location.id WHERE mc1.home = ? ORDER BY mc1.alias";
        console.log(req.params)
        var inserts = [req.params.home]
        mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }

    /* Find people whose fname starts with a given string in the req */
    function getCharactersWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT mc1.id, mc1.alias, mc1.codename, location.name AS home, (SELECT mc2.codename FROM marvel_character mc2 WHERE mc1.archNemesis = mc2.id) AS arch_nemesis FROM marvel_character mc1 LEFT JOIN location ON mc1.home = location.id WHERE mc1.codename LIKE" + mysql.pool.escape('%' + req.params.s + '%') + "ORDER BY mc1.alias";
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.characters = results;
            complete();
        });
    }
     
    function getACharacter(res, mysql, context, id, complete){
        var sql = "SELECT mc1.id, mc1.alias, mc1.codename, mc1.home, mc1.archNemesis FROM marvel_character mc1 WHERE mc1.id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.character = results[0];
            complete();
        });
    }

    /*Display all characters. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletecharacters.js","filtercharacters.js","searchcharacters.js"];
        var mysql = req.app.get('mysql');
        getCharacters(res, mysql, context, complete);
        getHome(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('characters', context);
            }

        }
    });

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:home', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletecharacters.js","filtercharacters.js","searchcharacters.js"];
        var mysql = req.app.get('mysql');
        getCharactersbyHome(req,res, mysql, context, complete);
        getHome(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('characters', context);
            }

        }
    });

    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletecharacters.js","filtercharacters.js","searchcharacters.js"];
        var mysql = req.app.get('mysql');
        getCharactersWithNameLike(req, res, mysql, context, complete);
        getHome(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('characters', context);
            }
        }
    });

    /* Display one person for the specific purpose of updating people */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectedlocation.js", "selectednemesis.js", "updateacharacter.js"];
        var mysql = req.app.get('mysql');
        getACharacter(res, mysql, context, req.params.id, complete);
        getHome(res, mysql, context, complete);
        getCharacters(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-character', context);
            }

        }
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        console.log(req.body.home)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO marvel_character (alias, codename, home, archNemesis) VALUES (?,?,?,?)";
        var inserts = [req.body.alias, req.body.codename, req.body.home, req.body.archnemesis];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/characters');
            }
        });
    });

    /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE marvel_character SET alias=?, codename=?, home=?, archNemesis=? WHERE id=?";
        var inserts = [req.body.alias, req.body.codename, req.body.home, req.body.archNemesis, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM marvel_character WHERE id=?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log("Now you're inside the delete route error clause! Oh no!");
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                console.log("It's all gravy from inside the delete route else clause!");
                res.status(202).end();
            }
        })
    })

    return router;
}();