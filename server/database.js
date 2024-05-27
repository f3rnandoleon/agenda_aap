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