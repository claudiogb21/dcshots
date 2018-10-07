import React, { Component } from 'react';

export default class Header extends Component {

    render() {
        const { toggleModal } = this.props;

        return (
            <div className="contact">
                <div className="form">
                    <form action="">
                        <h1>contacto</h1>
                        <p><i className="fas fa-exclamation-triangle"></i> Ingrese un mail válido</p>
                        <input type="text" name="nombre y apellido" placeholder="NOMBRE Y APELLIDO" />
                        <input type="text" name="nombre" placeholder="EMAIL" />
                        <textarea name="mensaje" placeholder="MENSAJE..." />
                        <button>ENVIAR</button>
                    </form>
                </div>
            </div>
        )
    }
}