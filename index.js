const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config(); 

const port = process.env.PORT || 5000; 

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345nitu",
    database: "ed_tech"
}) 

con.connect(function(err) {
    if(err) throw err;
    console.log('Connected!')
});


app.use(cors()); 
app.use(express.json()); 




async function run(){
  try{
   
    app.post('/purchase',  async (req, res) =>{
        const { course_id, user_id } = req.body;

        // MySQL INSERT query
        const insertQuery = 'INSERT INTO purchase_course (course_id, user_id) VALUES (?, ?)';
        
        // Execute the query
        con.query(insertQuery, [course_id, user_id], (err, result) => {
          if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Error inserting data');
            return;
          }
      
          console.log('Data inserted successfully');
          res.status(200).send('Data inserted successfully');
        });
      });

  }
  finally{ 
  }

}
run().catch(console.dir); 

app.get('/', (req, res) => {
  res.send('Hello Ed Tech')
})



app.listen(port, () => {
  console.log(`listening at ${port}`)
})