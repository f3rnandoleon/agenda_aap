import mysql from 'mysql2/promise';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'agenda'
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
      `
      SELECT 
      e.id_estudiante,
      u.nombre AS nombre_estudiante,
      u.apellido AS apellido_estudiante,
      u.email AS email_estudiante,
      u.telefono AS telefono_estudiante,
      u.direccion AS direccion_estudiante,
      u.fecha_nacimiento AS fecha_nacimiento_estudiante,
      u.genero AS genero_estudiante,
      e.grado,
      e.curso,
      CONCAT(tu.nombre, ' ', tu.apellido) AS nombre_tutor,
      tu.email AS email_tutor,
      tu.telefono AS telefono_tutor,
      tu.direccion AS direccion_tutor
  FROM 
      Estudiantes e
  JOIN 
      Usuarios u ON e.id_usuario = u.id_usuario
  JOIN 
      Padres p ON e.id_padre_tutor = p.id_padre
  JOIN 
      Usuarios tu ON p.id_usuario = tu.id_usuario
  WHERE 
      e.id_estudiante = ?;
      `,
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
      `
      SELECT 
    t.id_tarea,
    t.titulo,
    t.descripcion,
    t.fecha_entrega,
    c.nombre AS nombre_curso,
    CONCAT(u.nombre, ' ', u.apellido) AS nombre_profesor
FROM 
    Tareas t
JOIN 
    Cursos c ON t.id_curso = c.id_curso
JOIN 
    profesores p ON t.id_profesor = p.id_profesor
JOIN 
	usuarios u ON p.id_usuario=u.id_usuario
JOIN
    Asignaciones_Cursos ac ON t.id_curso = ac.id_curso
WHERE 
    ac.id_estudiante = ?;
      `,
      [id]
    );
    return row[0];
  } catch (error) {
    console.error(error);
  }
};
export const getAnotacionesByID = async (id) => {
  try {
    const row = await (await connection).query(
      `
      SELECT 
    a.id_anotacion,
    a.contenido,
    a.fecha,
    CONCAT(u.nombre, ' ', u.apellido) AS nombre_profesor,
    u.email AS email_profesor
FROM 
    Anotaciones a
JOIN 
    Profesores p ON a.id_profesor = p.id_profesor
JOIN 
    Usuarios u ON p.id_usuario = u.id_usuario
WHERE 
    a.id_estudiante = ?;
      `,
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
      `
      SELECT 
    c.id_citacion,
    c.fecha,
    c.motivo,
    e.grado,
    e.curso,
    CONCAT(u2.nombre, ' ', u2.apellido) AS nombre_estudiante,
    CONCAT(u.nombre, ' ', u.apellido) AS nombre_profesor

FROM 
    Citaciones c
JOIN 
    Profesores pr ON c.id_profesor = pr.id_profesor
JOIN 
    Estudiantes e ON c.id_estudiante = e.id_estudiante
JOIN 
    Usuarios u2 ON u2.id_usuario = e.id_usuario
JOIN 
    Usuarios u ON u.id_usuario = pr.id_usuario

WHERE 
    c.id_estudiante = ?;
      `,
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
      `
      SELECT 
    u.id_usuario AS id_usuario_estudiante,
    e.id_estudiante AS id_estudiante,
    u.nombre AS nombre,
    u.apellido AS apellido,
    u.email AS email,
    u.password AS password,
    u.telefono AS telefono_estudiante,
    u.direccion AS direccion_estudiante,
    u.fecha_nacimiento AS fecha_nacimiento,
    u.genero AS genero,
    e.grado,
    e.curso,
    p.id_usuario AS id_usuario_tutor,
    pa.id_padre AS id_padre,
    p.nombre AS nombre_tutor,
    p.apellido AS apellido_tutor,
    p.email AS email_tutor,
    p.telefono AS telefono_tutor,
    p.direccion AS direccion_tutor,
    p.fecha_nacimiento AS fecha_nacimiento_tutor,
    p.genero AS genero_tutor

FROM 
    Usuarios u
JOIN 
    Estudiantes e ON u.id_usuario = e.id_usuario
LEFT JOIN 
    Padres pa ON e.id_padre_tutor = pa.id_usuario
LEFT JOIN 
    Usuarios p ON pa.id_usuario = p.id_usuario;
      `,
      [id]
    );
    return row[0];
  } catch (error) {
    console.error(error);
  }
};
export const getParents = async (id) => {
  try {
    const row = await (await connection).query(
      `
      SELECT 
    u.id_usuario AS id_usuario_padre,
    p.id_padre AS id_padre,
    u.nombre AS nombre,
    u.apellido AS apellido,
    u.email AS email,
    u.password AS password,
    u.telefono AS telefono,
    u.direccion AS direccion,
    u.fecha_nacimiento AS fecha_nacimiento,
    u.genero AS genero,
    u2.id_usuario AS id_usuario_estudiante,
    e.id_estudiante AS id_estudiante,
    u2.nombre AS nombre_estudiante,
    u2.apellido AS apellido_estudiante,
    u2.email AS email_padre,
    u2.telefono AS telefono_padre,
    u2.direccion AS direccion_padre,
    u2.fecha_nacimiento AS fecha_nacimiento_padre,
    u2.genero AS genero_padre,
    e.grado AS grado_estudiante,
    e.curso AS curso_estudiante
FROM 
    Usuarios u
JOIN 
    Padres p ON u.id_usuario = p.id_usuario
JOIN 
    Estudiantes_Padres ep ON p.id_padre = ep.id_padre
JOIN 
    Estudiantes e ON ep.id_estudiante = e.id_estudiante
JOIN
    Usuarios u2 ON e.id_usuario = u2.id_usuario;

      `,
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
        UPDATE Usuarios
        SET usuarios.password = ?
        WHERE id_usuario = (
        SELECT estudiantes.id_usuario
        FROM Estudiantes 
        WHERE estudiantes.id_estudiante = ?
        );
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