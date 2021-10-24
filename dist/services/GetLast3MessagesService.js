"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLast3MessagesService = void 0;
const prisma_1 = require("../prisma");
class GetLast3MessagesService {
    async execute() {
        const messages = prisma_1.prisma.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc",
            },
            include: {
                user: true,
            }
        });
        return messages;
    }
}
exports.GetLast3MessagesService = GetLast3MessagesService;
