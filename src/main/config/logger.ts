// import winston from "winston";
import { createLogger, transports, format } from "winston";

const formatToBeUsed = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  format.printf((value) => {
    return `LEVEL: ${value.level} - TIME: ${value.timestamp} - MSG: ${value.message}`;
  })
);

export const customerLogger = createLogger({
  defaultMeta: { service: "conversion-api" },
  transports: [
    new transports.File({
      filename: "./src/logs/error.log",
      level: "error",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        format.json(),
        format.prettyPrint()
      ),
    }),
    new transports.File({
      filename: "./src/logs/info.log",
      level: "info",
      format: format.combine(
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        format.json(),
        format.prettyPrint()
      ),
    }),
  ],
});

if (process.env.ENVIRONMENT !== "prd") {
  customerLogger.add(
    new transports.Console({
      format: formatToBeUsed,
    })
  );
}
