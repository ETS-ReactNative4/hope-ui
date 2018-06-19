import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import {MenuItem} from 'material-ui';

// Components
import {
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
} from 'material-ui';
import PostulateAgent from '../PostulatedAgent/PostulateAgent';

// Css
import cls from './JobShow.css';

class JobShow extends Component {
  render() {
    console.log(this.props.job)
    let agent = (
      <Grid container></Grid>
    );
    let agents = null;
    let date = null;
    let caption = null;
    let services = null;
    if (this.props.job.attributes) {
      date = moment(this.props.job.attributes.started_at).format('MMMM D, YYYY h:mm:ss a').replace(/\b\w/g, l => l.toUpperCase())
      caption = `${moment(this.props.job.attributes.started_at).format('h:mm a')} - ${moment(this.props.job.attributes.finished_at).format('h:mm a')}`
      services = (
        <Grid className={cls.Services} container>
          <Grid item xs={12}>
            <Typography variant="headline">
              Servicios contratados
            </Typography>
            <Typography variant="subheading" className={cls.subServicios}>
              {this.props.job.attributes.job_details.map(detail => {
                if (detail.service.type_service === 'base') {
                  return detail.service.name
                }
                return null;
              })}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="headline" className={cls.HeadService}>
              Servicios Adicionales
            </Typography>
            {this.props.job.attributes.job_details.map(detail => {
              if (detail.service.type_service === 'addon') {
                if (detail.service.quantity) {
                  return (
                    <Typography key={detail.id} variant="subheading" className={cls.subServicios}>
                      {detail.service.name} x{detail.value}
                    </Typography>
                  );
                } else {
                  return (
                    <Typography key={detail.id} variant="subheading" className={cls.subServicios}>
                      {detail.service.name}
                    </Typography>
                  );
                }
              }
              return null;
            })}
          </Grid>
        </Grid>
      );
      if (this.props.job.attributes.agent ) {
        agent = (
          <Grid className={cls.JobAgent} container justify="center">        
            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="center">
                Agente
              </Typography>
            </Grid>
            <div className={cls.AvatarAgent}>
              <Avatar className={cls.AvatarMargin}>
                RR
              </Avatar>
              <div className={cls.NameAgent}>
                <Typography className={cls.Name} variant="subheading">
                  Rainiero Romero
                </Typography>
                <Typography className={cls.Name} variant="caption">
                  estrellas
                </Typography>
              </div>
            </div>
          </Grid>        
        );
      }
      if (this.props.job.attributes.proposals.length === 0) {
        agents = "SIN AGENTE ASIGNADO";
      } else {
        agents = (
          <Grid className={cls.OtherAgents} container justify="center">
            <Grid item xs={12} sm={6}>
              <Typography variant="headline" align="center">
                Asignar Agente
              </Typography>
            </Grid>
            {this.props.job.attributes.proposals.map(proposal => {
              return (
                <div key={proposal.id} className={cls.AvatarAgent}>
                  <Avatar className={cls.AvatarMargin}>
                    RR
                  </Avatar>
                  <div className={cls.NameAgent}>
                    <Typography className={cls.Name} variant="subheading">
                      {proposal.agent.first_name} {proposal.agent.last_name}
                    </Typography>
                    <Typography className={cls.Name} variant="caption">
                      estrellas
                    </Typography>
                  </div>
                </div>
              );
            })}                  
          </Grid>
        );
      }
    }

    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Paper elevation={0}>
              <Grid container className={cls.JobShow}>
                <Grid item xs={5}>
                  <Paper elevation={0}>
                    <Grid container className={cls.ServiceDate}>
                      <Grid item xs={12}>
                        <Paper>
                          <Typography variant="headline" className={cls.TitleDate}>{date}</Typography>
                          <Typography variant="caption" className={cls.TitleCaption}>{caption}</Typography>
                        </Paper>
                        <Paper>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper>{services}</Paper>
                      </Grid>
                      <Button className={cls.ButtonCancelar}>CANCELAR TRABAJO</Button>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={7}>
                  <Paper elevation={0}>
                    <Grid container className={cls.ServiceDate}>
                      <Grid item xs={12}>
                        <Paper elevation={0}><Typography variant="headline">Agentes Postulados</Typography></Paper>
                      </Grid>
                      <Grid item xs={12} className={cls.AgentPostulate}>
                        <Paper>
                          <div className={cls.AvatarAgent}>
                            <Avatar className={cls.AvatarMargin}>
                              RR
                            </Avatar>
                            <div className={cls.NameAgent}>
                              <Typography className={cls.Name} variant="subheading">
                                <MenuItem component={Link} to="/trabajo/vistagente">
                                  Rainiero Romero
                                </MenuItem>
                              </Typography>
                              <Typography className={cls.Name} variant="caption">
                                estrellas
                              </Typography>
                              <Typography className={cls.Name} variant="caption">
                                10 Reviews
                              </Typography>
                            </div>
                            <Button className={cls.ButtonContratar}>CONTRATAR AGENTE</Button>
                          </div>
                        </Paper>
                      </Grid>
                      <Grid item xs={12} className={cls.AgentPostulate}>
                        <Paper>
                          <div className={cls.AvatarAgent}>
                            <Avatar className={cls.AvatarMargin}>
                              JC
                            </Avatar>
                            <div className={cls.NameAgent}>
                              <Typography className={cls.Name} variant="subheading">
                                Jose Castellanos
                              </Typography>
                              <Typography className={cls.Name} variant="caption">
                                estrellas
                              </Typography>
                              <Typography className={cls.Name} variant="caption">
                                20 Reviews
                              </Typography>
                            </div>
                            <Button className={cls.ButtonContratar}>CONTRATAR AGENTE</Button>
                          </div>
                        </Paper>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default JobShow;