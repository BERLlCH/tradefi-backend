import * as winston from 'winston';

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
};

const customMessageFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  if (level === 'error' || metadata?.stack) {
    return `${timestamp} ${
      metadata?.stack
        ? `${
            metadata.stack.startsWith('Error')
              ? metadata.stack.replace('Error', level)
              : `${level}: \n${metadata.stack}`
          }`
        : message
    }`;
  }

  const metadataCopy = { ...metadata };
  delete metadataCopy.stack;

  const mainMessage = `${timestamp} ${level}: ${message}`;

  let formattedMetadata: string;
  delete metadataCopy?.httpStatusCode;
  if (metadataCopy && Object.keys(metadataCopy).length !== 0) {
    formattedMetadata = `\n    ${JSON.stringify(metadataCopy)}`;
  } else {
    formattedMetadata = '';
  }

  return mainMessage + formattedMetadata;
});

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
];

const Logger = winston.createLogger({
  level: 'debug',
  levels,
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.colorize({ all: true }),
    winston.format.splat(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    customMessageFormat
  ),
  transports,
});

export default Logger;
