import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { formatWIBDateTime } from '../utils';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip, headers } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;
      const wibDateTime = formatWIBDateTime(new Date());
      const userAgent = headers['user-agent'] || '';
      const contentLength = res.getHeader('content-length') || 0;
      console.log(
        `[${wibDateTime}] [${method}] ${originalUrl} -> ${statusCode} (${duration}ms) | IP: ${ip} | UA: ${userAgent} | Content-Length: ${contentLength}`,
      );
    });

    next();
  }
}
