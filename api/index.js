import express from "express";
import serverless from 'serverless-http';
import cors from 'cors';
import { fetchTasks, createTasks, updateTasks, deleteTasks }  from "./task";

const app = express();
const port = 3001;

app.use(express.json());
if(process.env.DEVELOPMENT){
    app.use(cors())
}

app.get("/", async(req, res) => {
  res.send("Hello world")
});
app.get("/task", async (req, res) => {
    try{
        const tasks=await  fetchTasks()
        res.send(tasks.items)
      }catch(err){
        res.status(400).send(`error fetching tasks: ${err}`)
    
      }
});
app.post("/task", async (req, res) => {
    try{
  const task=req.body;
  const response= await createTasks(task)
  res.send(response)
    }catch(err){
       res.send(400).send(`Error creating taks ${err}`)
    }
});
app.put("/task", async (req, res) => {
    try{
        const task=req.body;
        const response=await updateTasksTasks(task)
        res.send(response)
          }catch(err){
             res.send(400).send(`Error updating taks ${err}`)
          }
});
app.delete("/task/:id", async (req, res) => {
    try{
        const {id}=req.params;
        const response=await deleteTasks(id)
        res.send(response)
          }catch(err){
             res.send(400).send(`Error deleting taks ${err}`)
          }
});
if(process.env.DEVELOPMENT){
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
      
}

export const handler=serverless(app)