import axios from "axios";
import { sign } from "jsonwebtoken";

import { prisma } from "../prisma";

interface AccessTokenResponse {
	access_token: string;
}

interface UserReponse {
	avatar_url: string;
	login: string;
	id: number;
	name: string;
}

class AuthenticateUserService {
	async execute(code: string, client: string, secret: string) {
		//recuperando o acccess token
		const url = "https://github.com/login/oauth/access_token";

		const { data: accessTokenResponse } = await axios.post<AccessTokenResponse>(
			url,
			null,
			{
				params: {
					client_id: client,
					client_secret: secret,
					code,
				},
				headers: {
					accept: "application/json",
				},
			},
		);
		//recuperando o usuario no github
		const { data } = await axios.get<UserReponse>(
			"https://api.github.com/user",
			{
				headers: {
					authorization: `Bearer ${accessTokenResponse.access_token}`,
				},
			},
		);

		const { avatar_url, id, login, name } = data;
		let user = await prisma.user.findFirst({
			where: {
				github_id: id,
			},
		});

		if (!user) {
			user = await prisma.user.create({
				data: {
					avatar_url,
					github_id: id,
					login,
					name,
				},
			});
		}

		// token
		const token = sign(
			{
				user: {
					name: user.name,
					avatar_url: user.avatar_url,
					id: user.id,
				},
			},
			process.env.JWT_SECRET,
			{
				subject: user.id,
				expiresIn: "1d",
			},
		);

		return {
			token,
			user,
		};
	}
}

export { AuthenticateUserService };
