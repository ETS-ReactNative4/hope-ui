import React from 'react';
import { Link } from 'react-router-dom';

// Components
import {
  Grid,
} from 'material-ui';

// Css
import cls from './CardProperties.css';
const cardProperties = props => {
 return (
  <div className={cls.Div}>
    <Link className={cls.ButtonEdit} to="/cliente/perfil/propiedades/nuevo"><span>Nuevo</span></Link>
    <h3 className={cls.CardTitle}><span>Propiedades</span></h3>
    <Grid className={cls.CardPrincipalAccount} container>
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <div className={cls.Container}>
          <Grid container>
            <p>
              <strong>Working Up</strong>
              <span className={cls.MarginLeft}>Gonzalo suarez con San Ignacio</span>
              <Link className={cls.LinkEdit} to="/cliente/perfil/propiedades/nuevo">Editar</Link>
              <Link className={cls.LinkDelete} to="/cliente/perfil/propiedades/nuevo">Borrar</Link>
            </p>
            <p>
              <strong>Working Up</strong>
              <span className={cls.MarginLeft}>Gonzalo suarez con San Ignacio</span>
              <Link className={cls.LinkEdit} to="/cliente/perfil/propiedades/nuevo">Editar</Link>
              <Link className={cls.LinkDelete} to="/cliente/perfil/propiedades/nuevo">Borrar</Link>
            </p>
            <p>
              <strong>Working Up</strong>
              <span className={cls.MarginLeft}>Gonzalo suarez con San Ignacio</span>
              <Link className={cls.LinkEdit} to="/cliente/perfil/propiedades/nuevo">Editar</Link>
              <Link className={cls.LinkDelete} to="/cliente/perfil/propiedades/nuevo">Borrar</Link>
            </p>
          </Grid>
        </div>
      </Grid>
    </Grid>
  </div>
 )
}

export default cardProperties;