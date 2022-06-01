const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo
        this.data = []

        try {
            console.log('Initializing...')
            this.init()
        }
        catch(error) {
            console.log(`Error Initializing ${error}`)
        }
    }

    async init() {
        this.data = await this.getAll()
    }

    async save(objeto) {
        try {
            await this.init()
            objeto = {...objeto, id: this.data.length + 1}
            console.log(this.data)
            this.data.push(objeto)
            await fs.promises.appendFile(this.archivo, JSON.stringify(objeto) + '\n')
            return objeto.id
        }
        catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            let objetosJSON = await fs.promises.readFile(this.archivo, 'utf-8')
            let objSwap = objetosJSON.split('\n').filter(obj => obj != '')
            let objetos = objSwap.map(obj => JSON.parse(obj))
            return objetos
        }
        catch (error) {
            console.log(error)
        }
    }

    async getById(id) {
        try {
            let productos = await this.getAll()
            let coincidencia = null
            productos.forEach(product => {
                if (product.id === id) {
                    coincidencia = product
                }
            })
            return coincidencia
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.archivo, '')
        }
        catch (error) {
            console.log(error)
        }
    }

    async editById(id, campo, valor) {
        try {
            let productos = await this.getAll();
            let producto = productos.filter(producto => producto.id === id);
            producto[campo] = valor;
            const index = productos.findIndex(producto => producto.id === id);

            productos.splice(index, 1, producto);

            const productosParsed = JSON.stringify(productos);

            await fs.promises.writeFile(this.archivo, productosParsed)
        }
        catch (error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            let productos = await this.getAll()
            let productosCargar = productos.filter(obj => obj.id !== id)
            this.deleteAll()
            productosCargar.forEach(obj => fs.promises.appendFile(this.archivo, JSON.stringify(obj) + '\n'))
        }
        catch (error) {
            console.log(error)
        }
    }
}

module.exports = Contenedor