const express = require('express');

const app = express();

const PORT = 8080;

let frase = 'Desafio clase siete';

app.use(express.json());

app.get('/api/frase', (req, res)=>{
    res.json({ frase });
});

app.get('/api/palabras/:posicion', (req, res) => {
    const { posicion } = req.params;

    const posNumber = Number(posicion);
    
    if (isNaN(posNumber)) {
        return res.status('400').send({ error: 'El parámetro posición debe ser un número' });
    }

    const palabraArray = frase.split(' ');

    if (posNumber > palabraArray.length || posNumber === 0 || posNumber < 0) {
        return res.status('400').send({ error: 'El parámetro posición está fuera de rango' });
    }

    return res.send({ buscada: palabraArray[posNumber - 1] })
})

app.post('/api/palabras', (req, res) => {
    const { palabra } = req.body;

    if (!palabra.length) {
        return res.status('400').send({ error: 'Se debe enviar una palabra' });
    }

    frase += ' ' + palabra;

    res.send({ palabra, pos: frase.split(' ').length })
})

app.put('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params;
    const { palabra } = req.body;

    const posNumber = Number(pos);

    if (isNaN(posNumber)) {
        return res.status('400').send({ error: 'El parámetro posición debe ser un número' });
    }

    const palabraArray = frase.split(' ');

    if (posNumber > palabraArray.length || posNumber === 0 || posNumber < 0) {
        return res.status('400').send({ error: 'El parámetro posición está fuera de rango' });
    }

    if (!palabra.length) {
        return res.status('400').send({ error: 'Se debe enviar una palabra' });
    }

    const replace = palabraArray[posNumber - 1];
    const actualizada = frase.replace(replace, palabra);
    const anterior = frase;

    frase = frase.replace(palabra);

    res.send({ actualizada, anterior })
})

app.delete('/api/palabras/:pos', (req, res) => {
    const { pos } = req.params;

    const posNumber = Number(pos);

    if (isNaN(posNumber)) {
        return res.status('400').send({ error: 'El parámetro posición debe ser un número' });
    }

    const palabraArray = frase.split(' ');

    if (posNumber > palabraArray.length || posNumber === 0 || posNumber < 0) {
        return res.status('400').send({ error: 'El parámetro posición está fuera de rango' });
    }

    palabraArray.splice(pos - 1, 1);

    frase = palabraArray.join(' ');

    res.send({ frase })
})

app.listen(PORT, () => {
    console.log('Listening on port: ' + PORT);
});