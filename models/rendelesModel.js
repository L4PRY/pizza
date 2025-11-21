import express from 'express';
import pool from '../main/db.js';

export const getRendeles = async () => {
    const [rows] = await pool.execute("SELECT rendeles.razon, VEVO.vnev, futar.fnev, sum(pizza.par * tetel.db) AS összeg FROM `rendeles` JOIN vevo on rendeles.vazon = vevo.vazon JOIN futar on rendeles.fazon = futar.fazon JOIN tetel on rendeles.razon = tetel.razon JOIN pizza on tetel.pazon = pizza.pazon GROUP BY rendeles.razon");
    return [rows];
};

export const getRendelesID = async (razon) => {
    const [rows] = await pool.execute("SELECT rendeles.razon, VEVO.vnev, futar.fnev, sum(pizza.par * tetel.db) AS összeg FROM `rendeles` JOIN vevo on rendeles.vazon = vevo.vazon JOIN futar on rendeles.fazon = futar.fazon JOIN tetel on rendeles.razon = tetel.razon JOIN pizza on tetel.pazon = pizza.pazon WHERE rendeles.razon=? GROUP BY rendeles.razon",[razon]);
    return [rows];
};

export const createRendeles = async (fazon,vazon,idopont) => {
    await pool.execute("INSERT INTO `rendeles` (fazon,vazon,idopont) VALUES (?, ?, ?)", [fazon,vazon,idopont]);
};

export const deleteRendeles = async (id) => {
    await pool.execute("DELETE FROM `rendeles` WHERE rendeles.razon=?", [id]);
};