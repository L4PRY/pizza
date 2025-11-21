import express from 'express';
import * as futarModel from '../models/futarModel.js';

const app = express();
const futar = express.Router();

futar.get('/', async (req,res) => {
    try {
        const futarok = await futarModel.getFutar();
        res.status(201).json(futarok);
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

futar.get('/:fazon', async (req,res) => {
    try {
        const futarok = await futarModel.getFutarID(req.params.fazon);
        res.status(201).json(futarok);
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

futar.post('/', async (req,res) => {
    try {
        const { fnev,ftel } = req.body;
        if (fnev.Length < 3 || ftel.Length < 3) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await futarModel.createFutar(fnev,ftel);
            res.status(201).json({ msg: "Futár sikeresen hozzátoldva az adatbázishoz."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

futar.put('/:fazon', async (req,res) => {
    try {
        const fazon = req.params.fazon;
        const { fnev,ftel } = req.body;
        if (fazon.Length<1 || fnev.Length<1 || ftel.Length<1) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await futarModel.editFutar(fnev,ftel,fazon);
            res.status(201).json({ msg: "Futár adatai sikeresen megváltoztatva."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

futar.delete('/:fazon', async (req,res) => {
    try {
        await futarModel.deleteFutar(req.params.fazon);
        res.status(201).json({ msg: "Futár adatai sikeresen kitörölve."})
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});



export default futar;