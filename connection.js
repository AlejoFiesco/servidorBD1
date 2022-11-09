const oracledb = require('oracledb')

const connParams = {
    user: "alejo", 
    password: "alejo00", 
    connectionString:"localhost"
}

const busqueda = async (query) => {
    let connection;

    try{
        connection = await oracledb.getConnection(connParams);

        let result = await connection.execute(query);
        connection.close();

        return result;
    }catch(e){
        console.log("No se pudo hacer la búsqueda");
    }
}

const eliminar = async (correo) => {
    let connection;

    try{
        connection = await oracledb.getConnection(connParams);

        let result = await connection.execute(`DELETE FROM empleado WHERE correo = '${correo}'`);
        connection.commit();
        connection.close();
        return result.rowsAffected;
    }catch(e){
        console.log("No se pudo eliminar");
        return false;
    };
}

const insercion = async (nombres, apellidos, correo, contrasena) => {
    let connection;
    try{
        connection = await oracledb.getConnection(connParams);
        let result = await connection.execute(`SELECT * FROM empleado WHERE correo = '${correo}'`);
        console.log("filas" + result.rows.length);
        if(result.rows.length === 0){
            console.log("Entrando a insercion");
            connection.execute(`
            INSERT INTO 
            empleado VALUES ('
                ${nombres.trim()}', 
                '${apellidos.trim()}', 
                '${correo.trim()}', 
                '${contrasena}'
            )`)
            .then(res => {
                connection.commit();
                connection.close();
                console.log('Usuario registrado');
                return true;
            });
        }else{
            console.log("Ya está registrado este correo");
            return false 
        }
    }catch(e){
        console.log(e);
        console.log("No fue posible insertar");
        connection.close();
    }
    return true;
}

module.exports = {
    busqueda,
    insercion,
    eliminar
};