import { toZonedTime, format } from "date-fns-tz"

const timeZone = 'America/Bogota'

export function getTime(){
  const now = new Date()
  const zonedDate = toZonedTime(now, timeZone)
  const fecha = format(zonedDate, 'yyyy-MM-dd', { timeZone })
  const hora = format(zonedDate, 'HH:mm', { timeZone })

  return { fecha, hora }
}