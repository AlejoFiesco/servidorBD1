const express = require('express');
const app  = express();
const port = 5000;
const { insercion, busqueda, eliminar } = require('./connection');

app.get('/agregar/:nombres/:apellidos/:correo/:contrasena', (req, res) => {
    nuevoUsuario = {
        nombres: req.params.nombres.trim(),
        apellidos: req.params.apellidos.trim(),
        correo: req.params.correo.trim(),
        contrasena: req.params.contrasena.trim()
    }
    console.log(nuevoUsuario);
    try{
        insercion(nuevoUsuario.nombres, nuevoUsuario.apellidos, nuevoUsuario.correo, nuevoUsuario.contrasena)
            .then(result => {
                if(result){
                    res.send('Usuario registrado correctamente');
                }else{
                    res.status(500);
                    res.send('El usuario ya se encontraba registrado')
                }
            })
    }catch(e){
        res.send(e)
    }
});

app.get('/buscar/:query', (req, res) => {
    const query = req.params.query;
    try{
        busqueda(query)
            .then(result => result.rows)
            .then(result => {
                console.log(result);
                res.send(result);
        });
    }catch(e){
        res.send(e)
    }
});

app.get('/eliminar/:correo', (req, res) =>{
    const correo = req.params.correo;
    try{
        eliminar(correo)
            .then(result => {
                if(result) console.log(result);
                res.send("Eliminado correctamente");
            })
    }catch(e){
        console.log(e);
    }
})

console.log(`Listening port ${port}`);
app.listen(port);