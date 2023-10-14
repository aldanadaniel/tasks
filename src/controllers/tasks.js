import { pool } from "../database.js";

export const getTasks = async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM tasks");
  res.json(rows);
};

export const saveTask = async (req, res) => {
  try {
    const [results] = await pool.query(
      "INSERT INTO tasks(title, description) VALUES (?, ?)",
      [req.body.title, req.body.description]
    );

    const newUser = {
      id: results.insertId,
      ...req.body,
    };
    res.json(newUser);
  } catch (error) {
    console.error(error);
  }
};

export const getTask = async (req, res) => {
  const rows = await pool.query("SELECT * FROM tasks WHERE id = ?", [
    req.params.id,
  ]);
  res.json(rows[0][0]);
};

export const deleteTask = async (req, res) => {
  const result = await pool.query("DELETE FROM tasks WHERE id = ?", [
    req.params.id,
  ]);
  console.log(result);

  res.sendStatus(204);
};

export const updateTask = async (req, res) => {
  await pool.query("UPDATE tasks SET ? WHERE id = ?", [
    req.body,
    req.params.id,
  ]);
  res.sendStatus(204);
};

export const getTasksCount = async (req, res) => {
  const [rows] = await pool.query("SELECT COUNT(*) FROM tasks");
  res.json(rows[0]["COUNT(*)"]);
};
