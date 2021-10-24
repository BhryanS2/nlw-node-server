import { Response, Request } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { ClientAndSecretService } from "../services/ClientAndSecretService";

class AuthenticateUserController {
	async handle(request: Request, response: Response) {
		const { code, client: client_id, secret: client_secret } = request.body;
		const service = new AuthenticateUserService();
		const keysService = new ClientAndSecretService();
		try {
			const { client, secret } = await keysService.execute(
				client_id,
				client_secret,
			);
			const result = await service.execute(code, client, secret);
			return response.json(result);
		} catch (err) {
			response.status(err.statusCode | 400);
			return response.json({ error: err.message });
		}
	}
}

export { AuthenticateUserController };
