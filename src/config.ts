export const config = {
  POSTGRES_LOCALISE: {
    HOST: process.env.POSTGRES_LOCALISE_HOST || 'localhost',
    PORT: process.env.POSTGRES_LOCALISE_PORT || '5416',
  },
};
