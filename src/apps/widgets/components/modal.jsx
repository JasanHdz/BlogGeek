import React from 'react';
import './modal.css';
import Logo from '../../../fonts/facebook-brands.svg';

function Modal(props) {
  return (
    <div className="Overlay">
      <div className="Modal">
        <div className="Wrapper">
          <div className="col">
            <h2>Bienvenido al VideoBlog Geek</h2>
            <h3>Publica, aprende y conecta con otros por medio de videos Geek.</h3>
            <h4>Empieza ahora</h4>
          </div>

          <form className="col">
            <div className="modal-form-group">
              <label
                className={props.focusActive}
                htmlFor="Email"
              >Email
                </label>
              <input onFocus={props.handleFocus} onBlur={props.removeFocus} type="email" />
              <label className={props.focusActive} htmlFor="Password">Password</label>
              <input onFocus={props.handleFocus} onBlur={props.removeFocus} type="password" name="password" id="" />
              <button className="formButton" type="submit">Iniciar sesión</button>
              <div className="social">
                <p>Ingresa con:</p>
                <div className="Icons">
                  <a className="Icon fab fa-facebook"></a>
                  <a className="Icon fab fa-github"></a>
                  <a className="Icon fab fa-twitter"></a>
                </div>
              </div>
            </div>
          </form>

          <div className="col">
            <button className="formButton btncenter">Crear una cuenta</button>
          </div>
          <button
            onClick={props.closeModal}
            className="Modal-close"
          />
        </div>
      </div>
    </div>
  )
}

export default Modal;