import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder()
  .setTitle('Desafio Lemobs')
  .setDescription('Descrição da API')
  .setVersion('1.0')
  .addTag('Alunos')
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api',app, document);

  await app.listen(3000);
}
bootstrap();
