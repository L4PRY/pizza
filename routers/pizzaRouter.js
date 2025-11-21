import express from 'express';
import * as pizzaModel from '../models/pizzaModel.js';

const app = express();
const pizza = express.Router();

pizza.get('/', async (req,res) => {
    try {
        const pizzak = await pizzaModel.getPizza();
        res.status(201).json(pizzak);
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

pizza.get('/:pazon', async (req,res) => {
    try {
        const pizza = await pizzaModel.getPizzaID(req.params.pazon);
        res.status(201).json(pizza);
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

pizza.post('/', async (req,res) => {
    try {
        const { pnev,par } = req.body;
        if (pnev.Length < 3 || par < 100) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await pizzaModel.createPizza(pnev,par);
            res.status(201).json({ msg: "Pizza sikeresen hozzátoldva az adatbázishoz."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

pizza.put('/:pazon', async (req,res) => {
    try {
        const pazon = req.params.pazon;
        const { pnev,par } = req.body;
        if (pazon.Length<1 || pnev.Length<1 || !par) {
            res.status(404).json({ error: "Az adatok nem teljesek." })

        } else {
            await pizzaModel.editPizza(pnev,par,pazon);
            res.status(201).json({ msg: "Pizza adatai sikeresen megváltoztatva."})
        }
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});

pizza.delete('/:pazon', async (req,res) => {
    try {
        await pizzaModel.deletePizza(req.params.pazon);
        res.status(201).json({ msg: "Pizza adatai sikeresen kitörölve."})
    } catch (error) {
        res.status(501).json({ error: error.toString() })
    }
});



export default pizza;