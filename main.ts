if (Deno.args[0] === "-?" || Deno.args[0] === "--help" || Deno.args[0] === "-h") console.log("Usage:\n deno run --allow-net main.ts <port>");

const port = Number(Deno.args[0] || "8080");

Deno.serve({port}, (req: Request) => {
	let path = new URL(req.url).pathname;
	const pathToIndex = path.endsWith("/");
	if (path.endsWith("/")) path += "index.html";

	try {
		const file = Deno.openSync("./" + path, {read: true});
		const readableStream = file.readable;

		if (!pathToIndex) logRequest(req.method, new URL(req.url).pathname, 200);
		else logRequest(req.method, new URL(req.url).pathname, 200, path);

		return new Response(readableStream);
	} catch {
		try {
			const file = Deno.openSync("./" + path + ".html", {read: true});
			const readableStream = file.readable;

			logRequest(req.method, new URL(req.url).pathname, 200, path + ".html");

			return new Response(readableStream);
		} catch {
			if (!pathToIndex) logRequest(req.method, new URL(req.url).pathname, 404);
			else logRequest(req.method, new URL(req.url).pathname, 404, path);

			return new Response("404 Not Found", {
				status: 404,
				headers: {
					"Content-Type": "text/plain",
				},
			});
		}
	}
});

const logRequest = (method: string, url: string, status: number, redirect?: string) => console.log(`${(" " + method).substring(-1, 4)} ${status} ${url}${redirect ? ` -> ${redirect}` : ""}`);
