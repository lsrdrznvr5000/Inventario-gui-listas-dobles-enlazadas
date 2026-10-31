class Inventario {
    constructor() {
        this.primero = null;
        this.longitud = 0;
    }

    agregar(producto) {
        if (this.primero === null) {
            this.primero = producto;
            this.primero.anterior = producto;
            this.primero.siguiente = producto;
        } else if (this.primero.siguiente === null) {
            this.primero.siguiente = producto;
            this.primero.anterior = producto;
            producto.anterior = this.primero;
            producto.siguiente = this.primero;
        } else {
            let aux = this.primero;
            do {
                aux = aux.siguiente;
            } while (aux.siguiente !== this.primero)
            producto.anterior = aux;
            aux.siguiente = producto;
            producto.siguiente = this.primero;
            this.primero.anterior = producto;
        }
    }

    listar() {
        if (this.primero === null) {
            return "<p>El inventario está vacío</p>";
        } else {
            let datos = "";
            let aux = this.primero;
            do {
                datos += aux.infoHTML();
                aux = aux.siguiente;
            } while (aux !== this.primero);
            return datos;
        }
    }

    eliminar(codigo) {
        const nodo = this.buscarNodoPorCodigo(codigo);
        if (nodo === null) {
            return null;
        }
        this.desenlazar(nodo);
        return nodo;
    }

    extraerPrimero() {
        if (this.primero === null) {
            return null;
        }
        const aux = this.primero;
        if (this.primero.siguiente === this.primero) {
            this.primero = null;
            return aux;
        }
        let ultimo = this.primero.siguiente;
        while (ultimo.siguiente !== this.primero) {
            ultimo = ultimo.siguiente;
        }
        ultimo.siguiente = this.primero.siguiente;
        this.primero.siguiente.anterior = ultimo;
        this.primero = this.primero.siguiente;
        aux.siguiente = null;
        aux.anterior = null;
        return aux;
    }

    extraerUltimo() {
        if (this.primero === null) {
            return null;
        } else {
            let aux = this.primero;
            let ult = null;
            while (aux.siguiente.siguiente !== this.primero) {
                aux += aux.siguiente;
            }
            ult = aux.siguiente;
            aux.siguiente = this.primero;
            this.primero.anterior = aux;
            return ult;
        }
    }

    listarInverso() {
        if (this.primero === null) {
            return "<p>El inventario está vacío</p>";
        } else {
            let datos = "";
            let aux = this.primero;
            do {
                datos += aux.infoHTML();
                aux = aux.anterior;
            } while (aux !== this.primero);
            return datos;
        }
    }

    buscarPorCodigo(codigo) {
        const nodo = this.buscarNodoPorCodigo(codigo);
        return nodo;
    }

    compararCodigos(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    buscarNodoPorCodigo(codigo) {
        if (this.primero === null) {
            return null;
        }
        let actual = this.primero;
        do {
            const cmp = this.compararCodigos(actual.codigo, codigo);
            if (cmp === 0) {
                return actual;
            }
            if (cmp > 0) {
                return null;
            }
            actual = actual.siguiente;
        } while (actual !== this.primero);
        return null;
    }

    desenlazar(nodo) {
        if (this.longitud === 1) {
            this.primero = null;
        } else {
            nodo.anterior.siguiente = nodo.siguiente;
            nodo.siguiente.anterior = nodo.anterior;
            if (nodo === this.primero) {
                this.primero = nodo.siguiente;
            }
        }
        nodo.anterior = null;
        nodo.siguiente = null;
        this.longitud--;
    }
}
