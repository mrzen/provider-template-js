import Winston from 'winston'

const logConfig: Winston.LoggerOptions = {
    format: Winston.format.combine(Winston.format.cli(), Winston.format.timestamp()),
    level: 'debug',
    transports: [
        new Winston.transports.Console()
    ]
};

if (process.env.NODE_ENV !== "" && process.env.NODE_ENV !== "development") {
    logConfig.format = Winston.format.combine(Winston.format.json(), Winston.format.timestamp())
}

const logger = Winston.createLogger(logConfig)

export default logger