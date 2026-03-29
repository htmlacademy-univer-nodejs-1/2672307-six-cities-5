import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator)

export type RestSchema = {
  PORT: number;
  DB_IP: string;
  SALT: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    default: 4000,
    env: 'PORT',
  },
  DB_IP: {
    doc: 'IP address of the database server',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'DB_IP',
  },
  SALT: {
    doc: 'Salt for password hashing',
    format: String,
    default: null,
    env: 'SALT',
  }
});
