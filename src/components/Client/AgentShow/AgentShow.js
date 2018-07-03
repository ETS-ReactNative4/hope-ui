// Dependencias
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';

// Componentes
import cls from './AgentShow.css';
import CardAgentShow from './CardAgentShow/CardAgentShow';
import Reviews from '../../../components/Agent/Reviews/Reviews';


import * as actions from '../../../store/actions';

class AgentShow extends Component {
  componentDidMount() {
    this.props.onFetchJob(localStorage.getItem('token'), this.props.match.params.job_id);
  }
  render() {
    // console.log(this.props.job)
    return (
      <div>
        <Grid container justify="center" className={cls.root}>
          <Grid item xs={12} sm={10}>
            <Paper elevation={0}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Paper elevation={0}>
                    <Typography variant="title" gutterBottom className={cls.Typogra}>Agente Contratado</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper className={cls.CardAgentShow} elevation={0}>
                    <CardAgentShow jobCard={this.props.job} />
                  </Paper>
                </Grid>
              </Grid>
              <Grid container justify="center">
                <Grid item xs={12} sm={8}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Reviews
                        // jobCardInfo={this.props.jobCard}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    job: state.job.job,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchJob: (token, job_id) => dispatch(actions.fetchJob(token, job_id)),
    onAcceptedJob: (token, job_id, proposal_id) => dispatch(actions.acceptedJob(token, job_id, proposal_id)),
    onCancelledJob: (token, job_id) => dispatch(actions.cancelledJob(token, job_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AgentShow);