import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { ValidationPipe } from '@nestjs/common/pipes/index.js';
//import { AuthGuard } from './common/guards/auth.guards.js';
import helmet  from 'helmet';
import { doubleCsrf } from 'csrf-csrf';
import type { Request } from 'express';
import {NestExpressApplication} from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    instrument: ObserveInstrument,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['http://localhost:4200', 'http://localhost:3000'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type',  'Accept',  'Authorization'],
    exposedHeaders: ['Content-Type',  'Accept',  'X-Total-Count', 'Authorization'],
    maxAge: 600,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  });
  
//app.useGlobalGuards(new AuthGuard());
const { doubleCsrfProtection } = doubleCsrf({
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  getSecret: () => process.env.CSRF_SECRET as string,
  // No express-session here; swap for the session/user id once auth exists.
  getSessionIdentifier: (req: Request) => req.ip ?? '',
  });
  app.use(doubleCsrfProtection);
  app.set('trust proxy', 'loopback'); // trust first proxy
  app.use(
    helmet({
      crossOriginOpenerPolicy: false,
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
      crossOriginEmbedderPolicy: false,
      originAgentCluster: false,
      permittedCrossDomainPolicies: false,
      referrerPolicy: false,
      strictTransportSecurity: false,
      xContentTypeOptions: false,
      xDownloadOptions: false,
  }),
);
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
