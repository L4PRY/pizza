import express from 'express';
import pool from '../main/db.js';

export const getVevo = async () => {
    const [rows] = await pool.execute("SELECT * FROM `vevo`");
    return [rows];
};

export const getVevoID = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM `vevo` WHERE vevo.vazon=?", [id]);
    return [rows];
};

export const createVevo = async (vnev,vcim) => {
    await pool.execute("INSERT INTO `vevo` (vnev,vcim) VALUES (?, ?)", [vnev,vcim]);
};

export const editVevo = async (vnev,vcim,vazon) => {
    await pool.execute("UPDATE `vevo` SET vevo.vnev=?, vevo.vcim=? WHERE vevo.vazon=?", [vnev,vcim,vazon]);
};

export const deleteVevo = async (id) => {
    await pool.execute("DELETE FROM `vevo` WHERE vevo.vazon=?", [id]);
};