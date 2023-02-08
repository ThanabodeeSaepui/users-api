require('dotenv').config();

export const jwtConstants = {
  secret: process.env.SECRET, // TODO use .env
};
