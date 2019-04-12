var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_hillkri',
  password        : '2322',
  database        : 'cs340_hillkri'
});
module.exports.pool = pool;