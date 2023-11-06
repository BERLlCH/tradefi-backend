import * as dotenv from 'dotenv';

import envalid = require('envalid');

dotenv.config();

// Validator types https://github.com/af/envalid#validator-types
export default envalid.cleanEnv(process.env, {
  PORT: envalid.port({
    default: 3000,
    desc: 'The port to start the server on',
  }),

  TYPEORM_HOST: envalid.host(),
  TYPEORM_USERNAME: envalid.str(),
  TYPEORM_PASSWORD: envalid.str(),
  TYPEORM_DATABASE: envalid.str(),
  TYPEORM_PORT: envalid.port(),
  TYPEORM_LOGGING: envalid.bool(),

  JWT_SECRET: envalid.str(),

  ASSETS_BUCKET_NAME: envalid.str(),
  ASSETS_ENDPOINT: envalid.str(),
  ASSETS_BUCKET_DOMAIN_NAME: envalid.str(),
  ASSETS_ACCESS_KEY: envalid.str(),
  ASSETS_SECRET_KEY: envalid.str(),
  ASSETS_REGION: envalid.str(),

  MAIL_HOST: envalid.host(),
  MAIL_PORT: envalid.port(),
  MAIL_USER: envalid.str(),
  MAIL_PASSWORD: envalid.str(),
  MAIL_FROM: envalid.email(),

  MAILCHIMP_API_KEY: envalid.str(),

  FRONTEND_URL: envalid.url(),

  PINATA_API_KEY: envalid.str(),
  PINATA_API_SECRET_KEY: envalid.str(),

  PINATA_GATEWAY: envalid.str(),

  OPENAI_API_KEY: envalid.str(),

  ETH_PROVIDER_RPC: envalid.str(),
  ETH_CONTRACT: envalid.str(),
  ETH_CONTRACT_OWNER_PK: envalid.str(),
});
