import express from 'express';
import * as rendelesModel from '../models/rendelesModel.js';

const app = express();
const rendeles = express.Router();

rendeles.get('/', async (req,res) => {
    try {
        const rendelesek = await rendelesModel.getRendeles();
        res.status(201).json(rendelesek);
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

rendeles.get('/:razon', async (req,res) => {
    try {
        const rendeles = await rendelesModel.getRendelesID(req.params.razon);
        res.status(201).json(rendeles);
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

rendeles.post('/', async (req,res) => {
    try {
        const { fazon,vazon } = req.body;
        if (fazon < 1 || vazon < 1) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            var idp = new Date();
            await rendelesModel.createRendeles(fazon,vazon,idp);
            res.status(201).json({ msg: "Rendelés sikeresen hozzátoldva az adatbázishoz."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

rendeles.delete('/:razon', async (req,res) => {
    try {
        await rendelesModel.deleteRendeles(req.params.razon);
        res.status(201).json({ msg: "Rendelés adatai sikeresen kitörölve."})
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

export default rendeles;