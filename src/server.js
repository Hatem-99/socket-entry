import express from 'express'
import listEndpoints from 'express-list-endpoints'
import mongoose from 'mongoose'
import { Server as SocketIOServer } from "socket.io"
import { createServer } from "http" 
import { newConnection } from './socket/index.js'


const expressServer = express()
const port =  3001

const httpServer = createServer(expressServer)
const io = new SocketIOServer(httpServer) 

io.on("connection", newConnection)

mongoose.connect(process.env.MONGO_CONNECTION)

mongoose.connection.on("connected", () =>
  httpServer.listen(port, () => {
    
    console.table(listEndpoints(expressServer))
    console.log(`Server is running on port ${port}`)
  })
)