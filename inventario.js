class Inventario {
    constructor() {
        this.primero = null;
        this.anterior = null;
        this.siguiente = null;
        this.longitud = 0;
    }

    agregar(nuevo) {
        if (this.primero === null) {
            this.primero = nuevo;
            this.primero.anterior = nuevo;
            this.primero.siguiente = nuevo;
        } else if (this.primero.siguiente === null) {
            this.primero.siguiente = nuevo;
            this.primero.anterior = nuevo;
            nuevo.anterior = this.primero;
            nuevo.siguiente = this.primero;
        } else {
            let aux = this.primero;
            do {
                aux = aux.siguiente;
            } while (aux.siguiente !== this.primero)
            nuevo.anterior = aux;
            aux.siguiente = nuevo;
            nuevo.siguiente = this.primero;
            this.primero.anterior = nuevo;
        }
    }

    listar() {
        if (this.primero === null) {
            return "<p>El inventario esta vacio</p>";
        } else {
            let datos = "";
            let aux = this.primero;
            do {
                datos += aux.producto.infoHTML();
                aux = aux.siguiente;
            } while (aux.siguiente !== this.primero)
            return datos;
        }
    }

    eliminar(codigo) {
        const nodo = this.buscarNodoPorCodigo(codigo);
        if (nodo === null) {
            return null;
        }

        this.desenlazar(nodo);
        return nodo.producto;
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
            return "<p>El inventario esta vacio</p>";
        } else {
            let datos = "";
            let aux = this.primero;
            do {
                datos += aux.producto.infoHTML();
                aux = aux.anterior
            } while (aux.anterior !== this.primero)
            return datos;
        }
    }

    buscarPorCodigo(codigo) {
        const nodo = this.buscarNodoPorCodigo(codigo);
        return nodo === null ? null : nodo.producto;
    }

    compararCodigos(a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    }

    buscarNodoPorCodigo(codigo) {
        let actual = this.cabeza;

        while (actual !== null) {
            const comparacion = this.compararCodigos(actual.producto.codigo, codigo);
            if (comparacion === 0) {
                return actual;
            }
            if (comparacion > 0) {
                return null;
            }
            actual = actual.siguiente;
        }

        return null;
    }

    desenlazar(nodo) {
        if (nodo.anterior === null) {
            this.primero = nodo.siguiente;
        } else {
            nodo.anterior.siguiente = nodo.siguiente;
        }

        if (nodo.siguiente === null) {
            this.primero = nodo.anterior;
        } else {
            nodo.siguiente.anterior = nodo.anterior;
        }

        this.longitud--;
    }
}
