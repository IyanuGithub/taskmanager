const { response } = require("express")
const Tasks = require("../model/task")
const asyncWrapper = require('../middleware/async')

//get all the tasks
const getAllTasks = asyncWrapper(async (req, res) => {

        const tasks =await Tasks.find()
        res.status(200).json({  numOftasks: tasks.length, tasks })
 
    
})
//get a single task
const getTask = asyncWrapper (async (req,res) =>{
const { taskId } =req.params

    const task = await Tasks.findOne({ _id: taskId})
    if (!task){
        return res.status(404).json({msg: `Task with the id : ${taskId} not found`})
    }
    res.status(200).json({ task })

    
})



//create task
const createTask = asyncWrapper(async(req, res) => {
    
        const {title, priority } = req.body
        if(!title|| !priority) {
            return res.status(400).json({ msg: 'please provide neccesary information'})
        }
        const task = await Tasks.create(req.body)
        res.status(201).json({ msg: 'task created', task})
   
        
    } )

// update
const updateTask = asyncWrapper(async (req,res) => {
    const {title, priority} = req.body
    const {taskId} = req.params
    
        const task = await Tasks.findOneAndUpdate({_id: taskId}, req.body, {new:true, runValidators: true})
        res.status(200).json({ msg: 'Task Updated Succesfully', task})
        
        
    })

// delete
const deleteTask = asyncWrapper(async (req, res) => {
    const {taskId} = req.params

    const task = await Tasks.findOneAndDelete({_id: taskId})
    if(!task){
        return res.status(404).json({msg: 'Task not found'})
    }
    res.status(200).json({msg: 'Task Deleted Succesfully, task'})
    
})


//exports
module.exports = {getAllTasks,getTask,updateTask,deleteTask,createTask,}