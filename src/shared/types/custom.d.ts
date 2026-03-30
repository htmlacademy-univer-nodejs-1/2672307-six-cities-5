declare module 'convict-format-with-validator' {
  import { Format } from 'convict';
  const validator: {
    ipaddress: Format;
    email: Format;
    url: Format;
  };
  export default validator;
}
