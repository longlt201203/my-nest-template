import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Env, MyExceptionFilter } from "@utils";
import helmet from "helmet";
import { initializeTransactionalContext } from "typeorm-transactional";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { ApiValidationError } from "@errors";

async function bootstrap() {
	initializeTransactionalContext();

	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("/api");
	app.enableCors({ origin: "*" });
	app.useGlobalPipes(
		new ValidationPipe({
			exceptionFactory: (errors) => new ApiValidationError(errors),
		}),
	);
	app.useGlobalFilters(new MyExceptionFilter());

	if (Env.ENABLE_SWAGGER) {
		const config = new DocumentBuilder()
			.setTitle("API Documentation")
			.setDescription("API Description")
			.setVersion("1.0")
			.build();
		const document = SwaggerModule.createDocument(app, config);
		SwaggerModule.setup("api/docs", app, document);
	}
	app.use(helmet());

	await app.listen(Env.LISTEN_PORT);
}
bootstrap();
