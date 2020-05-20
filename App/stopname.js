const http = require('http');
const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pmpmldb',
  password: '8551',
  port: 5432,
})
pool.connect()
query ="select distinct(stop_name) from stops";
pool.query(query).then(res=>{

    str='{"name":[';
	for(var i=0;i<res.rows.length;i++) {
        str=str+'\"'+res.rows[i].stop_name+'\"';
        if(i!=res.rows.length-1) str+=",";
    }
    let app = http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
    
        res.end(str+"]}");
    });
    app.listen(3000, 'localhost');
    console.log('Node server running on port 3000');
    
    
}
    )
    