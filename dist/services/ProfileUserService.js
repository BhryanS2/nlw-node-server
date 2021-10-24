"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileUserService = void 0;
const prisma_1 = require("../prisma");
class ProfileUserService {
    async execute(user_id) {
        const profile = await prisma_1.prisma.user.findFirst({
            where: {
                id: user_id,
            },
        });
        return profile;
    }
}
exports.ProfileUserService = ProfileUserService;
