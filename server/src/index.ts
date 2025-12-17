import { APP_PORT } from "./config/env";
import { server } from "./config/socket";
import "./config/express";
server.listen(APP_PORT, () => {
  console.log(`App is running ${APP_PORT}`);
});
