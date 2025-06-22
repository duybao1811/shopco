import * as process from 'node:process';

export const config = {
  POSTGRES_LOCALISE: {
    HOST: process.env.POSTGRES_LOCALISE_HOST || 'localhost',
    PORT: process.env.POSTGRES_LOCALISE_PORT || 5432,
    USERNAME: process.env.POSTGRES_LOCALISE_USERNAME || 'postgres',
    PASSWORD: process.env.POSTGRES_LOCALISE_PASSWORD || 'Duybao1811@',
    DATABASE: process.env.POSTGRES_LOCALISE_DATABASE || 'shopco',
  },
};
