"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.serverHttp = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const serverHttp = http_1.default.createServer(app);
exports.serverHttp = serverHttp;
const io = new socket_io_1.Server(serverHttp, {
    cors: {
        origin: "*",
    },
});
exports.io = io;
io.on("connection", (socket) => {
    console.log(`New client connected ${socket.id}`);
});
app.use(express_1.default.json());
app.use(routes_1.router);
app.get("/github", (req, res) => {
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
});
app.get("/signin/callback", (req, res) => {
    const { code } = req.query;
    return res.json(code);
});
