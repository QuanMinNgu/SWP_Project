const express = require("express");
const cors = require("cors");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	socket.on("disconnect", () => {
		console.log("User disconnected", socket.id);
	});
	socket.on("join_room", (data) => {
		socket.join(data?.id);
	});
	socket.on("send_mess", (data) => {
		console.log(data);
		io.to(data?.id).emit("recieve", data);
	});
});
httpServer.listen(7000, () => {
	console.log("Server in runing");
});
