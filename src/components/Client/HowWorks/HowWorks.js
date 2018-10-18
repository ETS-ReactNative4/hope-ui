import React from 'react';

// Components
import {
  Grid,
} from 'material-ui';

// Css
import cls from './HowWorks.css';

import Check from '../../../assets/check.png';

const howWorks = props => {
  return (
    <Grid container>
      <div className={cls.HowWorks}>
        <div>
          <div className={cls.Question}>
            <h3>
              Cómo funciona?
            </h3>
          </div>
          <ul>
          <li className={cls.ListItem}>
              <img src={Check} className={cls.Check} alt="check"/>
              &nbsp;&nbsp;Dinos el número de habitaciones y baños de tu hogar.
            </li>
            <li className={cls.ListItem}>
              <img src={Check} className={cls.Check} alt="check"/>
              &nbsp;&nbsp;Elige la frecuencia, día y hora de nuestra visita.
            </li>
            <li className={cls.ListItem}>
              <img src={Check} className={cls.Check} alt="check"/>
              &nbsp;&nbsp;Elige servicios adicionales.
            </li>
            <li className={cls.ListItem}>
              <img src={Check} className={cls.Check} alt="check"/>
              &nbsp;&nbsp;Elige o registra tú dirección.
            </li>
            <li className={cls.ListItem}>
              <img src={Check} className={cls.Check} alt="check"/>
              &nbsp;&nbsp;Paga tú servicio con una tarjeta de crédito o débito.
            </li>
          </ul>
        </div>
      </div>
    </Grid>
  );
}

export default howWorks;