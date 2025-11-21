import express from 'express';
import * as vevoModel from '../models/vevoModel.js';

const app = express();
const vevo = express.Router();

vevo.get('/', async (req,res) => {
    try {
        const vevok = await vevoModel.getVevo();
        res.status(201).json(vevok);
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

vevo.get('/:vazon', async (req,res) => {
    try {
        const vevo = await vevoModel.getVevoID(req.params.vazon);
        res.status(201).json(vevo);
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

vevo.post('/', async (req,res) => {
    try {
        const { vnev,vcim } = req.body;
        if (vnev.Length < 3 || vcim < 3) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await vevoModel.createVevo(vnev,vcim);
            res.status(201).json({ msg: "Vevő sikeresen hozzátoldva az adatbázishoz."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

vevo.put('/:vazon', async (req,res) => {
    try {
        const vazon = req.params.vazon;
        const { vnev,vcim } = req.body;
        if (vazon.Length<1 || vnev.Length<1 || vcim.Length<1) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await vevoModel.editVevo(vnev,vcim,vazon);
            res.status(201).json({ msg: "Vevő adatai sikeresen megváltoztatva."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

vevo.delete('/:vazon', async (req,res) => {
    try {
        await vevoModel.deleteVevo(req.params.vazon);
        res.status(201).json({ msg: "Vevő adatai sikeresen kitörölve."})
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});



export default vevo;