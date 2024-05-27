import express from "express";
import { getTodoByID,getUsers,getUserByEmail,createTodo,shareTodo } from './database.js';
import cors from "cors"; 
const corsOptions = { 
origin: "*", // specify the allowed origin |
methods: ["POST", "GET"], // specify the allowed methods |
credentials: true, // allow sending credentials (cookies, authentication) |
};
const app = express(); 

app.use(express.json()); 
app.use(cors(corsOptions)); 

app.get("/usuario/:id", async (req, res) => {
    await getTodoByID(req.params.id)
    .then((user) => {
        res.status(200).send(user);
      })
    .catch((error) => {
        console.error(error);
      });
    
});
app.get("/usuarios/", async (req, res) => {
    await getUsers()
    .then((user) => {
        res.status(200).send(user);
      })
    .catch((error) => {
        console.error(error);
      });
    
});

app. listen(8080, () => {
    console. log("Server running on port 8080"); 
});