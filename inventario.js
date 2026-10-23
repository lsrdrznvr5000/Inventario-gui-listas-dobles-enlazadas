class Inventario {
    constructor() {
        this.cabeza = null;
        this.cola = null;
        this.longitud = 0;
    }

    agregar(producto) {
        let actual = this.cabeza;
        let anterior = null;

        while (actual !== null) {
            const comparacion = this.compararCodigos(actual.producto.codigo, producto.codigo);
            if (comparacion === 0) {
                return false;
            }
            if (comparacion > 0) {
                break;
            }

            anterior = actual;
            actual = actual.siguiente;
        }

        const nuevo = {
            producto: producto,
            anterior: anterior,
            siguiente: actual
        };

        if (anterior === null) {
            this.cabeza = nuevo;
        } else {
            anterior.siguiente = nuevo;
        }

        if (actual === null) {
            this.cola = nuevo;
        } else {
            actual.anterior = nuevo;
        }

        this.longitud++;
        return true;
    }

    listar() {
        if (this.cabeza === null) {
            return "<p>El inventario esta vacio</p>";
        }

        let datos = "";
        let actual = this.cabeza;
        while (actual !== null) {
            datos += actual.producto.infoHTML();
            actual = actual.siguiente;
        }
        return datos;
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
        if (this.cabeza === null) {
            return null;
        }

        const nodo = this.cabeza;
        this.desenlazar(nodo);
        return nodo.producto;
    }

    extraerUltimo() {
        if (this.cola === null) {
            return null;
        }

        const nodo = this.cola;
        this.desenlazar(nodo);
        return nodo.producto;
    }

    listarInverso() {
        if (this.cola === null) {
            return "<p>El inventario esta vacio</p>";
        }

        let datos = "";
        let actual = this.cola;
        while (actual !== null) {
            datos += actual.producto.infoHTML();
            actual = actual.anterior;
        }
        return datos;
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
            this.cabeza = nodo.siguiente;
        } else {
            nodo.anterior.siguiente = nodo.siguiente;
        }

        if (nodo.siguiente === null) {
            this.cola = nodo.anterior;
        } else {
            nodo.siguiente.anterior = nodo.anterior;
        }

        this.longitud--;
    }
}
