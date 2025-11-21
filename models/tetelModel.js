import express from 'express';
import pool from '../main/db.js';

export const getTetelID = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM `tetel` WHERE tetel.razon=?", [id]);
    return [rows];
};

export const createTetel = async (razon,pazon,db) => {
    await pool.execute("INSERT INTO `tetel` (razon,pazon,db) VALUES (?, ?, ?)", [razon,pazon,db]);
};

export const editTetel = async (razon,pazon,db) => {
    await pool.execute("UPDATE `tetel` SET tetel.db=? WHERE tetel.razon=? AND tetel.pazon=?", [db,razon,pazon]);
};

export const deleteTetel = async (id) => {
    await pool.execute("DELETE FROM `tetel` WHERE tetel.razon=? AND tetel.pazon=?", [id]);
};