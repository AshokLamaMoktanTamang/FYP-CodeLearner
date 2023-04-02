const express = require("express");
const app = express();
const server = require("http").Server(app);

// importing models
const Admin = require('./models/adminModel'),
  Interview = require('./models/interviewModel'),
  User = require('./models/userModel');

const dotenv = require('dotenv')
dotenv.config()

const db = require('./db')
db()

app.set("view engine", "ejs");

const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});

const { ExpressPeerServer } = require("peer");
const opinions = {
  debug: true,
}

app.use(express.json())
app.use("/peerjs", ExpressPeerServer(server, opinions));
app.use(express.static("public"));


app.get("/:room", async (req, res) => {
  try {
    const { id } = req.query,
      { room } = req.params;

    const interviewExists = await Interview.findById(room);

    if (!interviewExists) {
      return res.status(404).json({ message: "No interview room found" })
    }

    // if(new Date(interviewExists.interviewTime) > new Date(Date.now())){
    //   return res.status(401).json({message: "Interview has not started yet", interviewTime: interviewExists.interviewTime})
    // }
    
    const adminUser = await Admin.findById(id);
    
    if (adminUser) {
      return res.render("room", { roomId: room, userName: adminUser.name, host: process.env.BASE_URL, port: process.env.PORT });
    }
    
    const user = await User.findById(id) 
    
    if (id == interviewExists.user) {
      return res.render("room", { roomId: room, userName: `${user.firstName} ${user.lastName}`, host: process.env.BASE_URL, port: process.env.PORT });
    }
    
    console.log(id , interviewExists.user);
    return res.status(401).json({ message: "UnAuthorised user" })
  } catch (error) {
    return res.status(500).json({ message: "Failed to load room", error })
  }

});


io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    setTimeout(() => {
      socket.to(roomId).broadcast.emit("user-connected", userId);
    }, 1000)
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
  });
});


server.listen(process.env.PORT || 3030, () => {
  console.log(`Live server listening at port ${process.env.BASE_URL}:${process.env.PORT}`)
});
