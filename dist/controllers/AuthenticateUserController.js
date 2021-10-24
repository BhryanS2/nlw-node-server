"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUserController = void 0;
const AuthenticateUserService_1 = require("../services/AuthenticateUserService");
const ClientAndSecretService_1 = require("../services/ClientAndSecretService");
class AuthenticateUserController {
    async handle(request, response) {
        const { code, client: client_id, secret: client_secret } = request.body;
        const service = new AuthenticateUserService_1.AuthenticateUserService();
        const keysService = new ClientAndSecretService_1.ClientAndSecretService();
        try {
            const { client, secret } = await keysService.execute(client_id, client_secret);
            const result = await service.execute(code, client, secret);
            return response.json(result);
        }
        catch (err) {
            response.status(err.statusCode | 400);
            return response.json({ error: err.message });
        }
    }
}
exports.AuthenticateUserController = AuthenticateUserController;
