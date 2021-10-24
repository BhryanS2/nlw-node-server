"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientAndSecretService = void 0;
const prisma_1 = require("../prisma");
class ClientAndSecretService {
    async execute(clientParms, secretParams) {
        if (!clientParms && !secretParams) {
            throw new Error("Client and secret are required");
        }
        let keys = await prisma_1.prisma.secret.findFirst({
            where: {
                client: clientParms,
                secret: secretParams,
            },
        });
        if (!keys) {
            keys = await prisma_1.prisma.secret.create({
                data: {
                    client: clientParms,
                    secret: secretParams,
                },
            });
        }
        return keys;
    }
}
exports.ClientAndSecretService = ClientAndSecretService;
