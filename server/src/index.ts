import app from "./config/express";
import { APP_PORT } from "./config/env";

app.listen(APP_PORT, () => {
  console.log(`App is running ${APP_PORT}`);
});
