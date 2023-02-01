const { response } = require("express")
const Tasks = require("../model/task")

//get all the tasks
const getAllTasks = async(req, res) => {
    try {
        const tasks =await Tasks.find()
        res.status(200).json({  numOftasks: tasks.length, tasks })
    } catch (error) {
       res.status(500).json({ msg: error}) 
    }
    
}
//get a single task
const getTask = async (req,res) =>{
const { taskId } =req.params
try {
    const task = await Tasks.findOne({ _id: taskId})
    if (!task){
        return res.status(404).json({msg: `Task with the id : ${taskId} not found`})
    }
    res.status(200).json({ task })
} catch (error) {
    res.status(500).json({ msg: error})
    
}
}


//create task
const createTask = async(req, res) => {
    try {
        const {title, priority } = req.body
        if(!title|| !priority) {
            return res.status(400).json({ msg: 'please provide neccesary information'})
        }
        const task = await Tasks.create(req.body)
        res.status(201).json({ msg: 'task created', task})
    } catch (error) {
        console.log(error)
        res.status(500).json({ msg: error})
        
    } 
}
// update
const updateTask = async (req,res) => {
    const {title, priority} = req.body
    const {taskId} = req.params
    try {
        const task = await Tasks.findOneAndUpdate({_id: taskId}, req.body, {new:true, runValidator: true})
        res.status(200).json({ msg: 'Task Updated Succesfully', task})
        
    } catch (error) {
        console.log(error)
        res.status
        
    }
}
// delete
const deleteTask = async (req, res) => {
    const {taskId} = req.params
try {
    const task = await Tasks.findOneAndDelete({_id: taskId})
    if(!task){
        return res.status(404).json({msg: 'Task not found'})
    }
    res.status(200).json({msg: 'Task Deleted Succesfully, task'})
} catch (error) {
    res.status(500).json({msg: error})
    
}
}

//exports
module.exports = {getAllTasks,getTask,updateTask,deleteTask,createTask,}