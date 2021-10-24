"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMessageService = void 0;
const app_1 = require("../app");
const prisma_1 = require("../prisma");
class CreateMessageService {
    async execute(text, user_id) {
        const message = await prisma_1.prisma.message.create({
            data: {
                text,
                user_id,
            },
            include: {
                user: true,
            },
        });
        const infosWebSocket = {
            text: message.text,
            user_id: message.user_id,
            created_at: message.created_at,
            user: {
                name: message.user.name,
                avatar_url: message.user.avatar_url,
            },
        };
        app_1.io.emit("new_message", infosWebSocket);
        return message;
    }
}
exports.CreateMessageService = CreateMessageService;
