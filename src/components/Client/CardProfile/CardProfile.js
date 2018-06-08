import React from 'react';
import { NavLink, Route } from 'react-router-dom';

// Components
import {
 Grid,
} from 'material-ui';
import Info from './Info/Info';
import Edit from './Info/Edit/Edit';
import EditPassword from './EditPassword/EditPassword';
import CardProperties from './CardProperties/CardProperties';

// Css
import cls from './CardProfile.css';

const cardProfile = props => {
  return (
    <div className={cls.CardProfile}>
      <Grid container>
        <Grid item xs={12} sm={4} md={3} lg={3}>
            <div className={cls.Div}>
              <ul className={cls.SideNav}>
                <Route path="/cliente/perfil/info" children={({match}) => (
                  <li className={`${cls.SideItem} ${match ? cls.IsSelected : null}`}>
                    <NavLink className={cls.Link} to="/cliente/perfil/info">Perfil</NavLink>
                  </li>
                )}/>
                <Route path="/cliente/perfil/contraseña" exact children={({match}) => (
                  <li className={`${cls.SideItem} ${match ? cls.IsSelected : null}`}>
                    <NavLink className={cls.Link} to="/cliente/perfil/contraseña">Contraseña</NavLink>
                  </li>
                )}/>
                <Route path="/cliente/perfil/propiedades" exact children={({match}) => (
                  <li className={`${cls.SideItem} ${match ? cls.IsSelected : null}`}>
                    <NavLink className={cls.Link} to="/cliente/perfil/propiedades">Propiedades</NavLink>
                  </li>
                )}/>
                <Route path="/cliente/perfil/metodo-pago" exact children={({match}) => (
                  <li className={`${cls.SideItem} ${match ? cls.IsSelected : null}`}>
                    <NavLink className={cls.Link} to="/cliente/perfil/metodo-pago">Metodo de pago</NavLink>
                  </li>
                )}/>
              </ul>
            </div>
        </Grid>
        <Grid item xs={12} sm={8} md={9} lg={9}>
          <Grid container className={cls.CardContainer}>
            <div className={cls.CardPrincipal}>
              <Route path="/cliente/perfil/info" exact render={() => <Info user={props.user}/>}/>
              <Route path="/cliente/perfil/info/editar" exact render={() => <Edit
                user={props.user}
                update={props.update}
                updateAvatar={props.updateAvatar}
                loading={props.loading}/>}/>
                <Route path="/cliente/perfil/contraseña" exact render={() => <EditPassword changePassword={props.changePassword} />}/>
                <Route path="/cliente/perfil/propiedades" exact render={() => <CardProperties />} />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default cardProfile;