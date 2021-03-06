import {GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings} from "@tsed/common";
import "@tsed/swagger";
import {$log} from "ts-log-debug";

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compress = require("compression");
const methodOverride = require("method-override");
const cors = require("cors");
const rootDir = __dirname;

@ServerSettings({
  httpPort: "127.0.0.1:3000",
  httpsPort: "127.0.0.2:3001",
  rootDir,
  acceptMimes: ["application/json"],
  mount: {
    "/api": `${rootDir}/**/*Ctrl.ts`
  },
  logger: {
    debug: false,
    logRequest: true,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  swagger: {
    path: "/api-docs"
  },
  calendar: {
    token: true
  }
})
export class Server extends ServerLoader {
  /**
   * This method let you configure the middleware required by your application to works.
   * @returns {Server}
   */
  $onMountingMiddlewares(): void | Promise<any> {
    this
      .use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(cors())
      .use(bodyParser.urlencoded({
        extended: true
      }));

    return null;
  }

  $onReady() {
    $log.debug("Server initialized");
  }

  $onServerInitError(error): any {
    $log.error("Server encounter an error =>", error);
  }
}
