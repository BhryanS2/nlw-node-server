import { serverHttp } from "./app";

serverHttp.listen(8000, () => {
	console.log("server started at http://localhost:3000");
});
