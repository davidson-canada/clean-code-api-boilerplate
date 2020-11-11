import { app } from "./app";
import Config from "./config";
import { logger } from "./utils/logger.utils";

app.listen(Config.getInstance().port, () => logger.info(`listening on port ${Config.getInstance().port}`));
