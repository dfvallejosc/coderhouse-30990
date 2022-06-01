const { Router } = require('express');
const Container = require('../container');

const personas = new Container('people.txt');

personas.init();

const router = Router();

router.get('/', (req, res)=>{
    res.send(personas.data)
})

router.get('/:id', async (req, res)=>{
    const { id } = req.params;
    const idNumber = Number(id);

    if (isNaN(idNumber)) {
        return res.status(400).send({ error: 'El parámetro debe ser un número' });
    }

    if (idNumber > personas.data.length) {
        return res.status(400).send({ error: 'El parámetro está fuera de rango' });
    }

    if (idNumber < 0) {
        return res.status(400).send({ error: 'El parámetro debe ser mayor a cero' });
    }

    const person = await personas.getById(idNumber);

    if (!person) {
        return res.status(400).send({ error: `La persona con el id: ${id} no existe` });
    }

    return res.send(person)
})

router.post('/', async (req, res)=>{
    const { name, lastname, age, city } = req.body;

    if (!name || !lastname || !age || !city) {
        return res.status(400).send({ error: 'Los datos están incompletos' });
    }

    await personas.save({ name, lastname, age, city });
    await personas.init();

    return res.send({ message: 'Persona agregada exitosamente'})
})

router.put('/:id', async (req, res)=>{
    try {
        const { id } = req.params;
        const { field, value } = req.body;
    
        await personas.editById(Number(id), field, value);
    
        res.send({ message: `El usuario con id: ${id} se modificó exitosamente`})
    } catch (error) {
        throw error
    }

})

module.exports = router;