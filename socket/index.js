import {Server} from 'socket.io';


const io = new Server(9000,{
    cors:{
        origin:'http://localhost:3000'
    }
})

let users=[];


const AddUser = (userData, socketId) => {
    // You should add the user if the user is NOT already in the array
    if (!users.some(user => user.sub === userData.sub)) {
        users.push({ ...userData, socketId });
    }
};


const getUser=(userId)=>{
    return users.find(user => user.sub === userId);
}

// io.on('connection',(Socket)=>{
//     console.log("user connected ");
//     Socket.on("AddUser",userData =>{
//         AddUser(userData,Socket.id);
//         io.emit("getUser",users);
//     })


//     Socket.on("sendMessage",data =>{
//         const user=getUser(data.receiverId);
//         io.to(user.socketId).emit('getMessage',data);
//     })
// })


io.on('connection', (Socket) => {
    console.log("user connected ");
    Socket.on("AddUser", userData => {
        AddUser(userData, Socket.id);
        io.emit("getUser", users);
    });

    Socket.on("sendMessage", data => {
        const user = getUser(data.receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', data);
        }
    });
});
