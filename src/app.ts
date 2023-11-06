import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from './logger';
import { GRAPHQL_PATH } from './server';

class App {
  public app: express.Application;

  public constructor() {
    this.app = express();
    this.config();

    // eslint-disable-next-line global-require
    this.app.use(require('../daosign/src/routes'));

    // Error handler
    this.app.use((error, req, res, next) => {
      if (!error) {
        return next();
      }

      Logger.error(error);

      return res.status(error.httpStatusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
        error: error.message || error,
      });
    });

    // 404 page
    this.app.use((req, res, next) => {
      if (!req.path.startsWith(GRAPHQL_PATH)) {
        res.status(StatusCodes.NOT_FOUND).json({
          error: 'Not found',
        });
      } else {
        next();
      }
    });
  }

  private config(): void {
    this.app.disable('x-powered-by');
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    // serving static files
    this.app.use(express.static('public'));
  }
}

export default new App().app;
