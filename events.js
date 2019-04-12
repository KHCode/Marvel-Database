module.exports = function(){
	var express = require('express');
    var router = express.Router();

    function getEvents(res, mysql, context, complete){
        mysql.pool.query("SELECT id, name, DATE_FORMAT(start_date, '%M %Y') AS start_date, DATE_FORMAT(end_date, '%M %Y') AS end_date, DATE_FORMAT(start_date, '%Y') AS start_year, description FROM event ORDER BY start_year", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.events = results;
            complete();
        });
    }
    // Find just the years of the start dates for using in a select menu for filtering 
    function getStartYears(res, mysql, context, complete){
    	mysql.pool.query("SELECT YEAR(start_date) AS start_year FROM event", function(error, results, fields){
    		if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.startYears = results;
            complete();
    	});
    }
    // Find events based on the start year
    function getEventsByStartYears(req, res, mysql, context, complete){
    	var query = "SELECT id, name, DATE_FORMAT(start_date, '%M %Y') AS start_date, DATE_FORMAT(end_date, '%M %Y') AS end_date, DATE_FORMAT(start_date, '%Y') AS start_year, description FROM event WHERE start_date >= ? ORDER BY start_year";
    	console.log(req.params)
    	var inserts = [req.params.start_date]
    	mysql.pool.query(query, inserts, function(error, results, fields){
    		if(error){
    			res.write(JSON.stringify(error));
    			res.end();
    		}
    		context.events = results;
    		complete();
    	});
    }
    /* Find events whose name contains given search characters */
    function getEventsWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
      var query = "SELECT id, name, DATE_FORMAT(start_date, '%M %Y') AS start_date, DATE_FORMAT(end_date, '%M %Y') AS end_date, DATE_FORMAT(start_date, '%Y') AS start_year, description FROM event WHERE event.name LIKE" + mysql.pool.escape('%' + req.params.s + '%') + "ORDER BY start_year";
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.events = results;
            complete();
        });
    }
    // Find one event to display for updating
    function getAnEvent(res, mysql, context, id, complete){
        var sql = "SELECT id, name, DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date, DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date, description FROM event WHERE event.id =?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.event = results[0];
            complete();
        });
    }
    // Display all events
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteevents.js","filterevents.js","searchevents.js"];
        var mysql = req.app.get('mysql');
        getEvents(res, mysql, context, complete);
        getStartYears(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('events', context);
            }

        }
    });
    // Adds an event, redirects to the people page after adding
    router.post('/', function(req, res){
        console.log(req.body.home)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO event (name, start_date, end_date, description) VALUES (?,?,?,?)";
        var inserts = [req.body.name, req.body.start_date, req.body.end_date, req.body.description];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/events');
            }
        });
    });

    router.get('/filter/:start_date', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteevents.js","filterevents.js","searchevents.js"];
        var mysql = req.app.get('mysql');
        getEventsByStartYears(req,res, mysql, context, complete);
        getStartYears(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('events', context);
            }

        }
    });

    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteevents.js","filterevents.js","searchevents.js"];
        var mysql = req.app.get('mysql');
        getEventsWithNameLike(req, res, mysql, context, complete);
        getStartYears(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('events', context);
            }
        }
    });

    // Display one event for the specific purpose of updating events
	router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateanevent.js"];
        var mysql = req.app.get('mysql');
        getAnEvent(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-event', context);
            }

        }
    });
	// The URL that update data is sent to in order to update an event
    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE event SET name=?, start_date=?, end_date=?, description=? WHERE id=?";
        var inserts = [req.body.name, req.body.start_date, req.body.end_date, req.body.description, req.params.id];
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
        var sql = "DELETE FROM event WHERE id = ?";
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