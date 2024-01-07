/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston'
const { combine, timestamp, label, printf } = format
import DailyRotateFile from 'winston-daily-rotate-file'
import path from 'path'

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)

  return `${date} - [${label}] ${level}: ${message}`
})

export const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Shama' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'Shama-%DATE%-success.log'
      ),
      datePattern: 'HH - DD.MM.YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Shama' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'Shama-%DATE%-error.log'
      ),
      datePattern: 'HH - DD.MM.YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
