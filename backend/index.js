const express = require('express')
const cors = require('cors')
const { Router, json } = require('express')
const { Task } = require('./models')

const app = express()
const PORT = 3333

app.use(json())
app.use(cors({
    origin(address, callback) {
        return callback(null, true)
    }
}))

const taskController = Router()

taskController.get('/', async (req, res) => {
    const tasks = await Task.findAll()

    return res.status(200).send(tasks)
})

taskController.post('/', async (req, res) => {
    const task = await Task.create(req.body)
    return res.status(200).send(task)
})

taskController.delete('/:id', async (req, res) => {
    const id = Number(req.params.id)
    const task = await Task.destroy({
        where: {
            id
        }
    })

    return res.status(200).send()
})

taskController.put("/:id", async (req, res) => {
    const id = Number(req.params.id)
    
    await Task.update({
        ...req.body
    }, {
        where: {
            id
        }
    })

    const task = await Task.findOne({
        where: {
            id
        }
    })

    return res.status(200).send(task)
})

app.use('/task', taskController)


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})
