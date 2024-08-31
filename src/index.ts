/*
import { CODIGOS } from './constants'
import { createTable, dropTable } from './utils/scripts'

const main = async () => {
  try {
    await Promise.all(CODIGOS.map(async (codigo) => await createTable(codigo)))
    return console.log('Tablas creadas y/o Eliminadas');
  } catch (error) {
    console.error(error)
  } finally {
    return console.log('Proceso finalizado');
  }
}
main()
*/


import { inserDataintoTable } from './utils/scripts'
import { CronJob } from 'cron'
import { fn } from 'sequelize'
import { Meta } from './models'

const main = async () => {
  try {
    const products = await Meta.findAll({
      where: {
        FECHA: fn('CURDATE'),
        ZONA: '39627',
        CCOSTO: '39629'
      }
    })
    // Ejecutar todas las operaciones asincrónicas en paralelo
    await Promise.all(products.map(async (product) => {
      const codigo = parseInt(product.SUCURSAL)
      await inserDataintoTable(codigo,product)
    }))

    console.log(`Se han insertado ${products.length} registros`);
  } catch (error) {
    console.error(error)
  } finally {
    console.log('Proceso finalizado')
  }
}

const job = new CronJob(
  '0 6-22 * * *', // Ejecutar cada 5 minutos
  main,         // La función que se ejecutará en cada tick (cuando se cumpla la expresión cron).
  null,         // (Opcional) La función que se ejecutará cuando el trabajo se detenga.
  true,         // Si el trabajo debe comenzar inmediatamente al ser creado.
  'America/Bogota' // La zona horaria en la que se debe interpretar la expresión cron.
)

job.start()