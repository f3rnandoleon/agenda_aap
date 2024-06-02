import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sis_school'
});

export const getTodoByID = async (id) => {
  try {
    const row = await (await connection).query(
      'SELECT * FROM usuario WHERE idusuario =?',
      [id]
    );
    return row[0];
  } catch (error) {
    console.error(error);
  }
};
export const getAlumnByID = async (id) => {
  try {
    const row = await (await connection).query(
      'SELECT * FROM alumn WHERE id =?',
      [id]
    );
    return row[0];
  } catch (error) {
    console.error(error);
  }
};
export const getTasksByID = async (id) => {
  try {
    const row = await (await connection).query(
      'SELECT t.id,u.nombre AS nombre_profesor,t.descripcion_tarea,tm.nombre AS nombre_equipo,a.name AS nombre_estudiante,t.date_at AS fecha FROM tareas t JOIN usuario u ON t.id_teacher = u.idusuario JOIN team tm ON t.team_id = tm.idgrupo JOIN alumn a ON t.alumn_id = a.id WHERE t.alumn_id = ?;',
      [id]
    );
    return row[0];
  } catch (error) {
    console.error(error);
  }
};
export const getCitacionesByID = async (id) => {
  try {
    const row = await (await connection).query(
      'SELECT c.id,c.date_at,u.nombre AS nombre_profesor,c.motivo_de_citacion,tm.nombre AS nombre_equipo,a.name,a.lastname FROM citacion c JOIN usuario u ON c.id_teacher = u.idusuario JOIN team tm ON c.team_id = tm.idgrupo JOIN alumn a ON c.alumn_id = a.id WHERE c.alumn_id = ?;',
      [id]
    );
    return row[0];
  } catch (error) {
    console.error(error);
  }
};
export const getAlumns = async (id) => {
  try {
    const row = await (await connection).query(
      'SELECT * FROM alumn',
      [id]
    );
    return row[0];
  } catch (error) {
    console.error(error);
  }
};
export const getUsers = async () => {
    try {
      const row = await (await connection).query(
        'SELECT * FROM usuario'
      );
      return row[0];
    } catch (error) {
      console.error(error);
    }
  };
export async function getUserByEmail(email) {
    const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);
    // console.log(rows[0]) ;
    return rows[0];
}
export async function toggleCompleted(id, value) { 
  const newValue = value === true ? "TRUE" : "FALSE";
  const [result] = await pool.query( 
    `
  UPDATE todos 
  SET completed = ${newValue} 
  WHERE id = ?; 
  `,
  [id] 
  );
  return result; 
  }
  export async function updatePassword(userId, newPassword) {
    try {
      await (await connection).query(
        `
        UPDATE alumn
        SET phone = ?
        WHERE id = ?;
        `,
        [newPassword, userId]
      );
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  }
export async function deleteTodo(id) {
  const [result] = await pool.query( 
  'DELETE FROM todos WHERE id = 7; ',
  [id]
  );
  return result;
  } 
export async function createTodo(user_id, title) {
    const [result] = await pool.query(
    `INSERT INTO todos (user_id, title)
    VALUES (7, 7)`,
    [user_id, title] 
    
    );
    const todoID = result.insertId; 
    return getTodo(tddoID); 
    
}
export async function shareTodo(todo_id, user_id, shared_with_id) { 
    const [result] = await pool.query(    
        `
        INSERT INTO shared_todos (todo_id, user_id, shared_with_id)
        VALUES (?, ?, ?); 
        `,
        [todo_id, user_id, shared_with_id] 
    ); 
    return result. insertld; 
}