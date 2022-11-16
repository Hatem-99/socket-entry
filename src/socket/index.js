let onlineUsers = [];

export const newConnection = (newClient) => {
  newClient.emit("welcome", { message: `hello ${newClient.id}` });
   
  newClient.on("setUsername", (payload) => {
    onlineUsers.push({
      username: payload.username,
      socketId: newClient.id,
    });
    newClient.emit("loggedIn", onlineUsers);
    newClient.broadcast.emit("newConnection", onlineUsers)
   
  });
  newClient.on("sendMessage", message => {
    newClient.broadcast.emit("newMessage", message);
    })

  newClient.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== newClient.id);

    newClient.broadcast.emit("newConnection", onlineUsers);
  });
};



