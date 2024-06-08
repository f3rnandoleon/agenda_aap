import express from "express";
import { getTodoByID,getUsers,getTasksByID,getCitacionesByID,getUserByEmail,createTodo,shareTodo, getAlumns, getAlumnByID,updatePassword, getParents, getAnotacionesByID } from './database.js';
import cors from "cors"; 
const corsOptions = { 
origin: "*", // specify the allowed origin |
methods: ["POST", "GET","PUT"], // specify the allowed methods |
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
app.get("/alumn/:id", async (req, res) => {
  await getAlumnByID(req.params.id)
  .then((user) => {
      res.status(200).send(user);
    })
  .catch((error) => {
      console.error(error);
    });
  
});
app.get("/tasks/:id", async (req, res) => {
  await getTasksByID(req.params.id)
  .then((user) => {
      res.status(200).send(user);
    })
  .catch((error) => {
      console.error(error);
    });
  
});
app.get("/anotaciones/:id", async (req, res) => {
  await getAnotacionesByID(req.params.id)
  .then((user) => {
      res.status(200).send(user);
    })
  .catch((error) => {
      console.error(error);
    });
  
});
app.get("/citaciones/:id", async (req, res) => {
  await getCitacionesByID(req.params.id)
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
app.get("/alumns/", async (req, res) => {
  await getAlumns()
  .then((user) => {
      res.status(200).send(user);
    })
  .catch((error) => {
      console.error(error);
    });
  
});
app.get("/parents/", async (req, res) => {
  await getParents()
  .then((user) => {
      res.status(200).send(user);
    })
  .catch((error) => {
      console.error(error);
    });
  
});
app.put("/alumn/:id", async (req, res) => {
  const { value } = req.body;
  try {
    updatePassword(req.params.id, value);
    res.status(200).send({ message: "¡Contraseña actualizada con éxito!" });
  } catch (error) {
    console.error("¡Oh no! Hubo un error al cambiar la contraseña:", error);
    res.status(500).send({ error: "Error al actualizar la contraseña" });
  }
});

app.put("/cambiar-clave", async (req, res) => {
  const { userId, newPassword } = req.body;
  // Aquí deberías tener lógica para actualizar la contraseña en tu base de datos
  try {
    await updatePassword(userId, newPassword);
    res.status(200).send({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send({ error: "Error al actualizar la contraseña" });
  }
});

  app.delete("/todos/:id", async (req, res) => { 
  await deleteTodo(req.params.id); 
  res.send({ message: "Todo deleted successfully" }); 
  });
  app.post("/todos/shared_todos", async (req, res) => { 
  const { todo_id, user_id, email } = req.body; 
  const userToShare = await getUserByEmail(email);
  const sharedTodo = await shareTodo(todo_id, user_id, userToShare.id);
  res.status (201) .send(sharedTodo) ; 
  });

  const PORT = process.env.PORT || 3001;
  const HOST = '0.0.0.0'; // Esto permite que la aplicación escuche en todas las interfaces de red
  
  app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
  });