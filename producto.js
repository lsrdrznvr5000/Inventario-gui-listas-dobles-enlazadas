class Producto {
    constructor(codigo, nombre, cant, precio) {
        this.codigo = codigo;
        this.nombre = nombre;
        this.cant = cant;
        this.precio = precio;
    }

    info() {
        return `Codigo: ${this.codigo} Nombre: ${this.nombre} Cantidad: ${this.cant} Precio: ${this.precio}`;
    }

    infoHTML() {
        return `<div class="Producto"><h2>${this.codigo}</h2><p class="nombre">${this.nombre}</p><p class="cant">${this.cant}</p><p class="precio">${this.precio}</p></div>`;
    }
}
