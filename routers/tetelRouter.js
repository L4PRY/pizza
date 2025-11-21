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
        const { vnev,vcim } = req.body;
        if (vnev.Length < 3 || vcim < 3) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await tetelModel.createTetel(vnev,vcim);
            res.status(201).json({ msg: "Tétel sikeresen hozzátoldva az adatbázishoz."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

tetel.put('/:vazon', async (req,res) => {
    try {
        const vazon = req.params.vazon;
        const { vnev,vcim } = req.body;
        if (vazon.Length<1 || vnev.Length<1 || vcim.Length<1) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await tetelModel.editTetel(vnev,vcim,vazon);
            res.status(201).json({ msg: "Tétel adatai sikeresen megváltoztatva."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

tetel.delete('/:vazon', async (req,res) => {
    try {
        await tetelModel.deleteTetel(req.params.vazon);
        res.status(201).json({ msg: "Tétel adatai sikeresen kitörölve."})
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});



export default tetel;