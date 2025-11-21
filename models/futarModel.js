import express from 'express';
import pool from '../main/db.js';

export const getFutar = async () => {
    const [rows] = await pool.execute("SELECT * FROM `futar`");
    return [rows];
};

export const getFutarID = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM `futar` WHERE futar.fazon=?", [id]);
    return [rows];
};

export const createFutar = async (fnev,ftel) => {
    await pool.execute("INSERT INTO `futar` (fnev,ftel) VALUES (?, ?)", [fnev,ftel]);
};

export const editFutar = async (fnev,ftel,fazon) => {
    await pool.execute("UPDATE `futar` SET futar.fnev=?, futar.ftel=? WHERE futar.fazon=?", [fnev,ftel,fazon]);
};

export const deleteFutar = async (id) => {
    await pool.execute("DELETE FROM `futar` WHERE futar.fazon=?", [id]);
};