const express = require ('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.listen('3002',()=>{
    console.log("server is running on port 3001")
})