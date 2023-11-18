const express= require('express');
const cors = require('cors');
const mysql = require('mysql');


const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection(
 {   user:"root",
    host:"localhost",
    password:"",
    database:"test",
}
)


app.post('/test', (req, res) => {
    const id= req.body.id;
    const username= req.body.username;
    const password= req.body.password;

    con.query("SELECT * FROM login WHERE id = ? AND username = ? AND password = ?", [id, username, password],
        (err, result) => {
            if (err) {
                res.send({ message: err.message });
            } else {
                if (result.length > 0) {
                    // If there are rows in the result, it means login is successful
                    res.send({ message: "Login successful" });
                   
                } else {
                    // No rows in the result, login failed
                    res.send({ message: "Wrong details" });
                }
            }
        }
    );
});

app.listen(3001,()=>{
    console.log("Backend is ready to use")
})