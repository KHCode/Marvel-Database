module.exports = function(){
	var express = require('express');
    var router = express.Router();

    function getLocations(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name FROM location ORDER BY name", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations = results;
            complete();
        });
    }

    function getLocationsWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
      var query = "SELECT id, name FROM location WHERE name LIKE" + mysql.pool.escape('%' + req.params.s + '%') + "ORDER BY name";
      console.log(query)
      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.locations = results;
            complete();
        });
    }
    // Find one event to display for updating
    function getALocation(res, mysql, context, id, complete){
        var sql = "SELECT id, name FROM location WHERE id =?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.location = results[0];
            complete();
        });
    }

    // Display all events
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletelocations.js", "searchlocations.js"];
        var mysql = req.app.get('mysql');
        getLocations(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('locations', context);
            }

        }
    });
    // Adds an event, redirects to the people page after adding
    router.post('/', function(req, res){
        console.log(req.body.home)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO location (name) VALUES (?)";
        var inserts = [req.body.name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/locations');
            }
        });
    });
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletelocations.js","searchlocations.js"];
        var mysql = req.app.get('mysql');
        getLocationsWithNameLike(req, res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('locations', context);
            }
        }
    });
    // Display one event for the specific purpose of updating events
	router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updatelocation.js"];
        var mysql = req.app.get('mysql');
        getALocation(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-location', context);
            }

        }
    });
	// The URL that update data is sent to in order to update an event
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE location SET name=? WHERE id=?";
        var inserts = [req.body.name, req.params.id];
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
    // Route to delete a person
    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM location WHERE id = ?";
        var inserts = [req.params.id];
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