require("dotenv").config();
const express = require("express");
const app=express();
const router = new express.Router();
const mysql=require("mysql2");
const cors=require("cors");
const conn = require("./db/conn");
//const router=require("./Routes/router")
const util=require("util");
const port=8001;


//redis config
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const redisClient = redis.createClient(redisUrl);

redisClient.set=util.promisify(redisClient.set);
redisClient.get=util.promisify(redisClient.get);



//middleware
app.use(express.json());
app.use(cors());
//app.use(router);



//Register user data
/*router.post("/create", async(req, res) => {
    console.log(req.body);

    const { name, nid } = req.body;
    const {key, value} = {nid, name};
    const response=await redisClient.set(key, value);

    if (!name || !nid) {
        res.status(422).json("plz fill the all data");
    }

    try {
        //const test = await deleteRedisCache();

        console.log("test"+test);
        conn.query("SELECT * FROM todolist WHERE nid = ?", nid, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist")
            } else {
                res.status(200).json({ message: "success" });
                conn.query("INSERT INTO todolist SET ?", { name, nid }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});*/

app.post("/create", async(req, res) => {
    console.log(req.body);

    const { name, nid } = req.body;
    const {key, value} = {nid, name};
    const response=await redisClient.set(key, value);


    if (!name || !nid) {
        res.status(422).json("plz fill the all data");
    }

    try {
        conn.query("SELECT * FROM todolist WHERE nid = ?", nid, (err, result) => {
            if (result.length) {
                res.status(422).json("This Data is Already Exist")
            } else {
                res.status(200).json({ message: "success" });
                conn.query("INSERT INTO todolist SET ?", { name, nid }, (err, result) => {
                    if (err) {
                        console.log("err" + err);
                    } else {
                        res.status(201).json(req.body);
                    }
                })
            }
        })
    } catch (error) {
        res.status(422).json(error);
    }

});


// get userdata
/*router.get("/getusers", async(req, res) => {

    const { name, nid } = req.body;
    const {key, value} = {nid, name};

    try {
        let val;
        console.log("cached data=="+cachedData)
        const cachedData = await redisClient.get(key);
        
        if (cachedData) {
          res.json(cachedData);
          return;
        }

        conn.query("SELECT * FROM todolist", (err, result) => {
            if (err) {
                res.status(422).json("nodata available");
            } else {
                res.status(201).json(result);
            }
        })

        const response=await redisClient.set(key, value);

      } catch (error) {
        console.log({ error });
        res.status(500).json({ message: "failure", error });
      }

});*/

app.get("/getusers", (req, res) => {
    console.log("i am here");

    conn.query("SELECT * FROM todolist",(err,result)=>{
        if(err){
            res.status(422).json("nodata available");
        }else{
            res.status(201).json(result);
        }
    })

});

// user delete api
app.delete("/deleteuser/:id", (req, res) => {

    const { id } = req.params;

    conn.query("DELETE FROM todolist WHERE id = ? ", id, (err, result) => {
        if (err) {
            res.status(422).json("error");
        } else {
            res.status(201).json(result);
        }
    })
});

/*app.patch("/updateuser/:id", (req, res) => {

    const { id } = req.params;

    const data = req.body;

    conn.query("UPDATE todolist SET ? WHERE id = ? ", [data, id], (err, result) => {
        if (err) {
            res.status(422).json({ message: "error" });
        } else {
            res.status(201).json(result);
        }
    })
});*/;


app.listen(port, ()=>{
    console.log("server starts at port no: "+port);
})