import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import 'moment/locale/es';
import moment from 'moment';
import {
    Grid,
    Paper,
    Typography,
    Avatar,
    Button,
} from 'material-ui';
import Rating from 'react-rating';

// Css
import cls from './DetailsJob.css';

import * as actions from '../../../store/actions';
class DetailsJob extends Component {
  componentDidMount() {
    this.props.onJobDetails(localStorage.getItem('token'), this.props.match.params.job_id);
    this.props.onDisableButtonCustomer(localStorage.getItem('token'), this.props.match.params.job_id);
    this.props.onCanApply(localStorage.getItem('token'), this.props.match.params.job_id);
  };
  componentDidUpdate() {
    if (this.props.jobDetails.attributes && this.props.reviews.length === 0) {
      this.props.onReviews(localStorage.getItem('token'), this.props.jobDetails.attributes.customer.data.attributes.hashed_id);
    }
  };
  render() {
    let total = null;
    let service_base = null;
    let frequency = null;
    let services_addon = null;
    let finishedAt = null;
    let firstNameCustomer = null;
    let lastNameCustomer = null;
    let avatar = null;
    let commentCard = null;
    let rewiewsAverage = null;
    let details = null;
    if(this.props.jobDetails.attributes){
      rewiewsAverage = this.props.jobDetails.attributes.customer_rewiews_average;
      firstNameCustomer = this.props.jobDetails.attributes.customer.data.attributes.first_name;
      lastNameCustomer = this.props.jobDetails.attributes.customer.data.attributes.last_name;
      total = this.props.jobDetails.attributes.total;
      finishedAt = moment(this.props.jobDetails.attributes.started_at).format('MMMM D h:mm a').replace(/\b\w/g, l => l.toUpperCase());
      avatar = this.props.jobDetails.attributes.customer.data.attributes.avatar.url;
      if(this.props.jobDetails.attributes.customer){
        avatar = this.props.jobDetails.attributes.customer.data.attributes.avatar.url;
      }
      if(this.props.reviews){
        if(this.props.reviews.length > 0 ){
          commentCard = this.props.reviews.map( cr => {
            return (
              <div className={cls.AvatarAgent} key={cr.attributes.id}>
                { avatar === null ? (
                  <Avatar>
                    {cr.attributes.owner.data.attributes.first_name.charAt(0).toUpperCase()}
                    {cr.attributes.owner.data.attributes.last_name.charAt(0).toUpperCase()}
                  </Avatar>
                ) : (
                  <Avatar className={cls.AvatarMargin} src={cr.attributes.owner.data.attributes.avatar.url}></Avatar>
                )}
                <div className={cls.NameAgent}>
                  <Typography variant="subheading">
                    {cr.attributes.owner.data.attributes.first_name} {cr.attributes.owner.data.attributes.last_name}
                  </Typography>
                  <Typography variant="caption">
                    {cr.attributes.comment}
                  </Typography>
                </div>
              </div>
            );
          })
        }else{
          commentCard = <Typography variant="title" gutterBottom align="center" className={cls.Typogra}>Sin comentarios</Typography>
        }
      }
      if(this.props.jobDetails.attributes.job_details.length > 0 ){
        this.props.jobDetails.attributes.job_details.map( detail => {
          if (detail.service.type_service === 'base') {
            service_base = detail.service.name;
          }
          return null;
        })
        services_addon = this.props.jobDetails.attributes.job_details.map( detail => {
          if (detail.service.type_service === 'addon') {
            return (
              <ul key={detail.id}>{detail.service.name}</ul>
            );
          }
          return null;
        })
      }
    }
    if (this.props.jobDetails.attributes){
      details = this.props.jobDetails.attributes.details
    }
    return (
      <div>
        <Grid container justify="center">
          <Grid item xs={8}>
            <Paper elevation={0}>
              <Grid container className={cls.DetailsJob}>
                <Grid item xs={5}>
                  <Paper elevation={0}>
                    <Grid container className={cls.ServiceDate}>
                      <Grid item xs={12}>
                        <Paper>
                          <Typography variant="headline" className={cls.TitleDate}>{service_base}</Typography>
                          <Typography variant="caption" className={cls.TitleCaption}>{frequency}</Typography>
                          <Typography variant="caption" className={cls.TitleCaption}>
                            {finishedAt}
                          </Typography>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className={cls.ServiceDate}>
                          <Typography variant="headline">Servicios Adicionales</Typography>
                          <Grid container className={cls.ServiceDate}>
                            <Grid item xs={12}>
                              <Paper elevation={0}>
                                {services_addon}
                              </Paper>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className={cls.ServiceDate}>
                          <Typography variant="headline">Detalles a considerar</Typography>
                          <Grid container className={cls.ServiceDate}>
                            <Grid item xs={12}>
                              <Paper elevation={0}>
                                {details}
                              </Paper>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper className={cls.ServiceDate}>
                            <Typography variant="display3" gutterBottom className={cls.TypograFechaPrecio}>{total}$</Typography>
                        </Paper>
                      </Grid>
                      {this.props.canApply.can_apply === true ? (
                        <Button className={cls.ButtonCancelar} onClick={() => this.props.onApplyProposal(localStorage.getItem('token'), this.props.match.params.job_id)}>APLICAR</Button>
                      ) : (
                        <p></p>
                        )
                      }
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={7}>
                  <Paper elevation={0}>
                    <Grid container className={cls.ContenUserCliente}>
                      <Grid item xs={12}>
                        <Paper elevation={0}><Typography variant="headline">Cliente</Typography></Paper>
                      </Grid>
                      <Grid item xs={12} className={cls.AgentPostulate}>
                        <Paper elevation={0}>
                          <div className={cls.AvatarAgent}>
                            <Grid container spacing={24}>
                              <Grid item xs={12} sm={1}>
                                <Paper elevation={0}>
                                  {avatar === null ? (
                                    <Avatar>
                                      {firstNameCustomer === null ? (<p></p>) : (firstNameCustomer.charAt(0).toUpperCase())}
                                      {lastNameCustomer === null ? (<p></p>) : (lastNameCustomer.charAt(0).toUpperCase())}
                                    </Avatar>
                                  ) : (
                                    <Avatar src={avatar} className={cls.AvatarMargin}>
                                    </Avatar>
                                  )}
                                </Paper>
                              </Grid>
                              <Grid item xs={12} sm={7}>
                                <Paper elevation={0}>
                                  <div className={cls.NameAgent}>
                                    <Typography className={cls.Name} variant="subheading">
                                      {firstNameCustomer} {lastNameCustomer}
                                    </Typography>
                                  </div>
                                </Paper>
                              </Grid>
                              <Grid item xs={12} sm={4}>
                                <Paper className={cls.TextRight} elevation={0}>
                                  <Typography className={cls.Name} variant="subheading">
                                    <Rating initialRating={rewiewsAverage}
                                      readonly
                                      emptySymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-empty.png" className={`${cls.Stars} ${"icon"}`} alt="starsMin" />}
                                      fullSymbol={<img src="http://dreyescat.github.io/react-rating/assets/images/star-full.png" className={`${cls.Stars} ${"icon"}`} alt="startFull" />}
                                    />
                                  </Typography>
                                </Paper>
                              </Grid>
                              <Grid item xs={12}>
                                <Paper className={cls.TextRight} elevation={0}>
                                {this.props.disableButtonCustomer.can_review === true ? (
                                  <Button
                                  className={cls.ButtonContratar}
                                  component={Link}
                                  to={`/agente/${this.props.match.params.job_id}/calificar`}
                                  >
                                    CALIFICAR
                                  </Button>
                                  ) : (
                                    <p></p>
                                  )
                                }
                                </Paper>
                              </Grid>
                            </Grid>
                          </div>
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Paper elevation={0}><Typography variant="headline">Opiniones</Typography></Paper>
                      </Grid>
                      <Grid item xs={12} className={cls.AgentPostulate}>
                        <Paper elevation={0}>
                          {commentCard}
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

const mapDispatchToProps = dispatch => ({
  onJobDetails: (token, job_id) => dispatch(actions.jobDetails(token, job_id)),
  onReviews: (token, id) => dispatch(actions.reviews(token, id)),
  onApplyProposal: (token, job_id) => dispatch(actions.applyProposal(token, job_id)),
  onDisableButtonCustomer: (token, job_id) => dispatch(actions.disableButtonCustomer(token, job_id)),
  onCanApply: (token, job_id) => dispatch(actions.canApply(token, job_id)),
});

const mapStateToProps = state => ({
  jobDetails: state.job.jobDetails,
  reviews: state.reviews.reviews,
  disableButtonCustomer: state.disableButtonCustomer.disableButtonCustomer,
  canApply: state.job.canApply,
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsJob);