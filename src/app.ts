import cors from "cors";
import express from "express";

import "express-async-errors";

import errorMiddleware from "@/middlewares/error.middleware";

class App {
	public app: express.Express;

	constructor() {
		this.app = express();

		this.config();
		this.routes();
	}

	private config(): void {
		this.app.use(
			cors({
				origin: "*",
				methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
				allowedHeaders: ["Content-Type", "Authorization"],
			}),
		);
		this.app.use(
			express.json({
				limit: "10mb",
			}),
		);
	}

	private routes(): void {
		this.app.get("/", (_req, res) => {
			res.status(200).json({
				message: "Welcome to the API",
			});
			return;
		});

		this.app.use("*", (_req, res, _next) => {
			res.redirect("/docs");
		});
		this.app.use(errorMiddleware);
	}

	public start(PORT: string | number): void {
		this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
	}
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
