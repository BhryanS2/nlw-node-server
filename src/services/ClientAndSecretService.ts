import { prisma } from "../prisma";

class ClientAndSecretService {
	async execute(clientParms: string, secretParams: string) {
		if (!clientParms && !secretParams) {
			throw new Error("Client and secret are required");
		}

		let keys = await prisma.secret.findFirst({
			where: {
				client: clientParms,
				secret: secretParams,
			},
		});

		if (!keys) {
			keys = await prisma.secret.create({
				data: {
					client: clientParms,
					secret: secretParams,
				},
			});
		}
		return keys;
	}
}
export { ClientAndSecretService };
