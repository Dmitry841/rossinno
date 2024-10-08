import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const portArgIndex = process.argv.indexOf('port');
  console.log(8, process.argv);
  const port =
    portArgIndex >= 0
      ? process.argv[portArgIndex + 1]
      : process.env.PORT || 3000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setViewEngine('html');
  console.log(`app listenen on port: ${port}`);
  await app.listen(port);
}
bootstrap();
