import express from 'express';
import pool from '../main/db.js';

export const getPizza = async () => {
    const [rows] = await pool.execute("SELECT * FROM `pizza`");
    return [rows];
};

export const getPizzaID = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM `pizza` WHERE pizza.pazon=?", [id]);
    return [rows];
};

export const createPizza = async (pnev,par) => {
    await pool.execute("INSERT INTO `pizza` (pnev,par) VALUES (?, ?)", [pnev,par]);
};

export const editPizza = async (pnev,par,pazon) => {
    await pool.execute("UPDATE `pizza` SET pizza.pnev=?, pizza.par=? WHERE pizza.pazon=?", [pnev,par,pazon]);
};

export const deletePizza = async (id) => {
    await pool.execute("DELETE FROM `pizza` WHERE pizza.pazon=?", [id]);
};