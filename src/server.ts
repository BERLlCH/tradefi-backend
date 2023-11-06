import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { createServer } from 'http';
import { AuthChecker, buildSchema } from 'type-graphql';

import app from './app';
import env from './env';
import AppDataSource from './ormconfig';
import Logger from './logger';

import UserResolver from '../daosign/src/resolvers/user/userResolver';
import WalletResolver from '../daosign/src/resolvers/wallet/walletResolver';
import AgreementResolver from '../daosign/src/resolvers/agreement/agreementResolver';
import { getSessionByRequest } from '../daosign/src/middleware/auth';
import IRequest from '../daosign/src/interfaces/IRequest';
import IAuthContext from '../daosign/src/interfaces/IAuthContext';
import AuthResolver from '../daosign/src/resolvers/auth/authResolver';
// eslint-disable-next-line max-len
import AgreementLocationResolver from '../daosign/src/resolvers/agreementLocation/agreementLocationResolver';
// eslint-disable-next-line max-len
import AgreementPrivacyResolver from '../daosign/src/resolvers/agreementPrivacy/agreementPrivacyResolver';
// eslint-disable-next-line max-len
import AgreementStatusResolver from '../daosign/src/resolvers/agreementStatus/agreementStatusResolver';
// eslint-disable-next-line max-len
import AgreementInvitationResolver from '../daosign/src/resolvers/agreementInvitation/agreementInvitationResolver';
import ObserverResolver from '../daosign/src/resolvers/observer/observerResolver';
import SignerResolver from '../daosign/src/resolvers/signer/signerResolver';
import AgreementFileProofResolver from '../daosign/src/resolvers/proofs/fileProofResolver';
import AgreementSignProofResolver from '../daosign/src/resolvers/proofs/signProofResolver';
import TestResolver from "./resolvers/test/testResolver";


const { PORT } = env;

export const GRAPHQL_PATH = '/graphql';

const apolloServerLoggingPlugin = {
  async requestDidStart() {
    return {
      async didEncounterErrors(requestContext) {
        const request = requestContext?.request;
        const context = requestContext?.context;
        const errors = requestContext?.errors;
        const query = request?.query as string;
        const errorInfo = {
          query: query?.trim(),
          variables: request?.variables,
          context: { session: context?.session, wallet: context?.wallet },
          errors,
        };
        Logger.error(errorInfo);
      },
    };
  },
};

// Check permission for field/query/mutation that comes from `@Authorized` decorator
const apolloServerAuthChecker: AuthChecker<IAuthContext> = ({ context }) =>
  !!context.session && !!context.wallet;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const startServer = async (): Promise<any> => {
  AppDataSource.initialize()
    .then(async () => {
      const schema = await buildSchema({
        resolvers: [
          AgreementResolver,
          AgreementInvitationResolver,
          AgreementLocationResolver,
          AgreementPrivacyResolver,
          AgreementStatusResolver,
          AuthResolver,
          ObserverResolver,
          SignerResolver,
          UserResolver,
          WalletResolver,
          AgreementFileProofResolver,
          AgreementSignProofResolver,
          TestResolver,
        ],
        authChecker: apolloServerAuthChecker,
      });

      const httpServer = createServer(app);

      const apolloServer = new ApolloServer({
        schema,
        csrfPrevention: true,
        debug: false,
        introspection: true,
        context: async ({ req }) => {
          const { session, error } = await getSessionByRequest(req as IRequest);
          const authContext: IAuthContext = {
            request: req as IRequest,
            session: !error && !!session ? session : null,
            wallet: !error && session.wallet ? session.wallet : null,
          };
          return authContext;
        },
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer }), apolloServerLoggingPlugin],
      });
      await apolloServer.start();
      apolloServer.applyMiddleware({ app, path: GRAPHQL_PATH });

      httpServer.listen({ port: PORT });

      Logger.info(`HTTP Server running at http://localhost:${PORT}`);
      Logger.info(`GraphQL Server running at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    })
    .catch((error) => Logger.error(error));
};

startServer();
