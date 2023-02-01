const router = require('express').Router()

const {
    getAllTasks,getTask,updateTask,deleteTask,createTask,
}= require("../controller/taskController")

router.route('/').get(getAllTasks).post(createTask)
router.route('/:taskId').get(getTask).patch(updateTask).delete(deleteTask)

module.exports = router