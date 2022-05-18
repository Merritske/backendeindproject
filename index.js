const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;

const User = require("./models/users")
const Reis = require("./models/reizen")

//middleware
app.use(bodyParser.json());
app.use(cors());

//connect database => mongoose.connect
mongoose.connect(process.env.DATA_MONGO_URL, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('connected')
    }
})

//create middleware zodat enkel ingelogde users kunnen inschrijven voor een reis
//met webtoken, opslaan in localstorage?
//isTokenvalid
const isTokenvalid = (req, res, next)=>{
    try{
        const token = req.headers['secret-token'];
        jwt.verify(token, 'SecretToken')
        next()
    }catch(error){
        res.status(402).send("no money, no honey :")
    }
}

//create user route => app.post("/register", (req; res)=>{..........})
app.post("/register", (req, res)=>{
    console.log(req.body)
    const user = new User(req.body)
    user.save()
    .then(response=>{
        res.json({
            response,
        message: 'user created'
    })
    })
})
app.post('/reizen', (req, res)=>{
    const reis = new Reis(req.body)
    reis.save()
    .then(response =>{
        res.json({
            response,
            message: 'reis created'
        })
    })
})

//login route
app.post('/login', (req, res)=>{
    const {username, password} = req.body;
    User.findOne({username})
    .then(user=>{
        if(!user){
            res.json({
                message : "user not found"
            })
        }
        if(user.password !== password){
            res.json({
                message: "user or password is not correct"
            })
        }
        if(user.password === password){
            const token = jwt.sign({
                username, 
                userId: user._id
            }, 'SecretToken', {
                expiresIn: '1h'
            })
            res.json({
                message: "user logged in",
                token
            })
        }
    })
})

//alleen als ingelogd is mogelijkheid om reis te boeken
app.get('/', (req, res)=>{
    res.send("hello")
})
app.get('/login', (req, res)=>{
    res.send("logged in")
})
//reizen 
app.get("/reizen", (req, res)=>{

Reis.find({}, (err, trip)=>{
 if(err){
     alert("reis niet gevonden")
 }else{
          console.log(res.json(trip))
 }
  
})
})

//reizen updaten als deelnemer zich inschrijft
app.put("/reizen", (req, res)=>{
    Reis.findOne({title: res.title}, response=>{
      console.log(response)
    })
})



app.listen(port, ()=>{
    console.log("listening....")
})