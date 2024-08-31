"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const scripts_1 = require("./utils/scripts");
const cron_1 = require("cron");
const sequelize_1 = require("sequelize");
const models_1 = require("./models");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield models_1.Meta.findAll({
            where: {
                FECHA: (0, sequelize_1.fn)('CURDATE'),
                ZONA: '39627',
                CCOSTO: '39629'
            }
        });
        // Ejecutar todas las operaciones asincrónicas en paralelo
        yield Promise.all(products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            const codigo = parseInt(product.SUCURSAL);
            yield (0, scripts_1.inserDataintoTable)(codigo, product);
        })));
        console.log(`Se han insertado ${products.length} registros`);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        console.log('Proceso finalizado');
    }
});
const job = new cron_1.CronJob('0 6-22 * * *', // Ejecutar cada 5 minutos
main, // La función que se ejecutará en cada tick (cuando se cumpla la expresión cron).
null, // (Opcional) La función que se ejecutará cuando el trabajo se detenga.
true, // Si el trabajo debe comenzar inmediatamente al ser creado.
'America/Bogota' // La zona horaria en la que se debe interpretar la expresión cron.
);
job.start();
