import { app } from "./app";
import Config from "./config";

app.listen(Config.getInstance().port, () => console.info(`listening on port ${Config.getInstance().port}`));
