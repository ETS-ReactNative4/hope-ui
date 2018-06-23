import React from 'react';
import {
  Link,
} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';

// Components
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  Button,
} from 'material-ui';
import iconUbicacion from '../../../../assets/Ubicacion.svg'

// Css
import cls from './Job.css';
import Profile from '../../../../assets/AvatarProfile.svg';

moment.locale('es');
const job = props => {
  let services = null;
  if (props.job_details) {
    services = props.job_details.map(detail => {
      if (detail.service.type_service === 'base') {
        return detail.service.name
      }
      return null;
    });
  }
  let avatar = props.agent ? props.agent.avatar : Profile;
  let name = props.agent ? props.agent.first_name + " " + props.agent.last_name : "Sin agente asignado";
  return (
    <Grid item xs={12} sm={5}>
      <Card className={cls.CardBorder}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <Grid container>
              <Grid item xs={12}>
                <CardHeader
                  avatar = {<Avatar aria-label="Recipe" src={avatar}></Avatar>}
                  title={<Typography className={cls.Title}>
                          {name}
                        </Typography>}
                  subheader={<Typography className={cls.Date}>
                              {moment(props.date).format('MMMM D YYYY').replace(/\b\w/g, l => l.toUpperCase())} <br/>
                              {moment(props.date).format('h:mm:ss a').replace(/\b\w/g, l => l.toUpperCase())}
                            </Typography>}  
                />
              </Grid>
              <Grid item xs={12}>
                <CardContent className={cls.CardContent}>
                  <Grid item xs={12}>
                    <Typography className={cls.Service}>
                      {services}
                    </Typography>
                  </Grid>
                  <Grid className={cls.CardSubTitle} item xs={12}>
                    <Typography>
                      Servicios Adicionales
                    </Typography>
                    <div>
                      <ul className={cls.list}>
                        <li>Limpieza de Baños</li>
                        <li>Limpieza de Hono</li>
                        <li>Limpieza de Ventana</li>
                      </ul>
                    </div>  
                    <Typography>
                      <img className={cls.IconUbicacion} src={iconUbicacion} alt="IconUbucacion" />
                      San Ignacio y Gonzales Suares
                    </Typography>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={4} lg={4} className={cls.TotalContainer}>
            <Grid container className={cls.TotalMargin}>
              <Grid item xs={12}>
                <Typography className={cls.Total}>
                  {props.total}$
                </Typography>
              </Grid>
              <Grid container alignItems="flex-end">
                <Grid className={cls.ViewDetails} item xs={12}>
                  <Button className={cls.Button} component={Link} to={`/cliente/trabajo/${props.id}`}>
                    Ver Detalles
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}

export default job;