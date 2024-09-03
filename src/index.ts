// import { CODIGOS } from './constants'
// import { createTable, dropTable } from './utils/scripts'

// const main = async () => {
//   try {
//     await Promise.all(CODIGOS.map(async (codigo) => await createTable(codigo)))
//     return console.log('Tablas creadas y/o Eliminadas');
//   } catch (error) {
//     console.error(error)
//   } finally {
//     return console.log('Proceso finalizado');
//   }
// }
// main()

import { inserDataintoTable, insertDataSinc } from './utils/scripts'
import { CODIGOS } from './constants'
import { Meta } from './models'
import { CronJob } from 'cron'
import { fn } from 'sequelize'

const main = async () => {

  try {
    const products = await Meta.findAll({
      where: {
        FECHA: fn('CURDATE')
      }
    })

    const noExisten = CODIGOS.filter(cod => !products.some(p => parseInt(p.SUCURSAL) === cod))

    console.log(noExisten);
    console.log(noExisten.length);

    await Promise.all(products.map(async (product) => {
      const codigo = parseInt(product.SUCURSAL);
      inserDataintoTable(codigo,product)
    }))

    await Promise.all(noExisten.map(async (codigo) => {
      await insertDataSinc(codigo)
    }))

    console.log(`Se han insertado ${products.length + noExisten.length} registros`);
  } catch (error) {
    console.error(error)
  } finally {
    console.log('Proceso finalizado')
  }
}

const job = new CronJob(
  '*/2 * * * *', // Ejecutar cada hora entre las 6:00 y las 22:00 6-22
  main,         // La función que se ejecutará en cada tick (cuando se cumpla la expresión cron).
  null,         // (Opcional) La función que se ejecutará cuando el trabajo se detenga.
  true,         // Si el trabajo debe comenzar inmediatamente al ser creado.
  'America/Bogota' // La zona horaria en la que se debe interpretar la expresión cron.
)

job.start()
