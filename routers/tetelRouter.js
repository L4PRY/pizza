import express from 'express';
import * as tetelModel from '../models/tetelModel.js';

const app = express();
const tetel = express.Router();

tetel.get('/:razon', async (req,res) => {
    try {
        const tetelek = await tetelModel.getTetelID(req.params.razon);
        res.status(201).json(tetelek);
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

tetel.post('/', async (req,res) => {
    try {
        const { razon,pazon,db } = req.body;
        if ( db < 1) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await tetelModel.createTetel(razon,pazon,db);
            res.status(201).json({ msg: "Tétel sikeresen hozzátoldva az adatbázishoz."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

tetel.put('/:razon/:pazon', async (req,res) => {
    try {
        const razon = req.params.razon;
        const pazon = req.params.pazon;
        const { db } = req.body;
        if (db < 1) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await tetelModel.editTetel(razon,pazon,db);
            res.status(201).json({ msg: "Tétel sikeresen megváltoztatva."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

tetel.delete('/:razon/:pazon', async (req,res) => {
    try {
        const razon = req.params.razon;
        const pazon = req.params.pazon;
        await tetelModel.deleteTetel(req.params.razon,req.params.pazon);
        res.status(201).json({ msg: "Tétel adatai sikeresen kitörölve."})
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});



export default tetel;