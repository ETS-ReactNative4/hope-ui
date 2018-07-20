import Alert from 'react-s-alert';
import moment from 'moment';
import { push } from 'react-router-redux';
import * as actionTypes from './actionTypes';
import axios from '../../axios-instance';


export const createJobSuccess = () => ({
  type: actionTypes.CREATE_JOB_SUCCESS,
});

export const createJobStart = () => ({
  type: actionTypes.CREATE_JOB_START,
});

export const createJobFail = () => ({
  type: actionTypes.CREATE_JOB_FAIL,
});

export const createJob = (token, formData) => dispatch => {
  dispatch(createJobStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  axios.post('/customers/jobs', formData, headers)
    .then((res) => {
      dispatch(createJobSuccess());
      // dispatch(push(`/cliente/trabajo/${res.data.job.data.id}`));
      Alert.success(res.data.message, {
        position: 'top',
        effect: 'genie',
      });
    })
    .catch((err) => {
      dispatch(createJobFail());
      Alert.error(err.response.data.message, {
        position: 'top',
        effect: 'genie',
      });
    });
}

export const fetchJobsStart = () => ({
  type: actionTypes.FETCH_JOBS_START,
});

export const fetchJobsFail = error => ({
  type: actionTypes.FETCH_JOBS_FAIL,
  error,
});

export const fetchJobsSuccess = jobs => ({
  type: actionTypes.FETCH_JOBS_SUCCESS,
  jobs,
});

export const fetchJobs = (token, current_page) => dispatch => {
  dispatch(fetchJobsStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  var body = [];
  body.push(`current_page=${1}`)
  axios.get(`/customers/jobs?${body.join('&')}`, headers)
    .then((res) => {
      let jobs = [];
      jobs = res.data.job.data;
      dispatch(fetchJobsSuccess(jobs));
      Alert.success(res.data.message, {
        position: 'top',
        effect: 'genie',
      });
    })
    .catch((err) => {
      dispatch(fetchJobsFail(err));
      Alert.error(err.response.data.message, {
        position: 'top',
        effect: 'genie',
      });
    });
}

export const fetchNextJobsStart = () => ({
  type: actionTypes.FETCH_NEXTJOBS_START,
});

export const fetchNextJobsFail = error => ({
  type: actionTypes.FETCH_NEXTJOBS_FAIL,
  error,
});

export const fetchNextJobsSuccess = nextjobs => ({
  type: actionTypes.FETCH_NEXTJOBS_SUCCESS,
  nextjobs,
});

export const fetchNextJobs = (token, limit = 4) => dispatch => {
  dispatch(fetchNextJobsStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  var body = [];
  body.push(`status=nextjobs`);
  body.push(`current_page=${1}`);
  body.push(`limit=${limit}`);
  axios.get(`/customers/jobs?${body.join('&')}`, headers)
    .then((res) => {
      let nextjobs = [];
      if (res.data.job) {
        nextjobs = res.data.job.data;
      } else {
        nextjobs = res.data.data;
      }
      dispatch(fetchNextJobsSuccess(nextjobs));
    })
    .catch((err) => {
      dispatch(fetchNextJobsFail(err));
    });
}

export const fetchHistoryJobsStart = () => ({
  type: actionTypes.FETCH_HISTORYJOBS_START,
});

export const fetchHistoryJobsFail = error => ({
  type: actionTypes.FETCH_HISTORYJOBS_FAIL,
  error,
});

export const fetchHistoryJobsSuccess = historyjobs => ({
  type: actionTypes.FETCH_HISTORYJOBS_SUCCESS,
  historyjobs,
});

export const fetchHistoryJobs = (token, limit = 4) => dispatch => {
  dispatch(fetchHistoryJobsStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  var body = [];
  body.push(`status=history`);
  body.push(`current_page=${1}`);
  body.push(`limit=${limit}`);
  axios.get(`/customers/jobs?${body.join('&')}`, headers)
    .then((res) => {
      let historyjobs = [];
      if (res.data.job) {
        historyjobs = res.data.job.data;
      } else {
        historyjobs = res.data.data;
      }
      dispatch(fetchHistoryJobsSuccess(historyjobs));
    })
    .catch((err) => {
      dispatch(fetchHistoryJobsFail(err));
    });
}

export const fetchJobStart = () => ({
  type: actionTypes.FETCH_JOB_START,
});

export const fetchJobFail = error => ({
  type: actionTypes.FETCH_JOB_FAIL,
  error,
});

export const fetchJobSuccess = job => ({
  type: actionTypes.FETCH_JOB_SUCCESS,
  job,
});

export const fetchJob = (token, job_id) => dispatch => {
  dispatch(fetchJobStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  axios.get(`/customers/jobs/${job_id}`, headers)
    .then((res) => {
      let job = [];
      if (res.data.job) {
        job = res.data.job.data;
      } else {
        job = res.data.data;
      }
      dispatch(fetchJobSuccess(job));
    })
    .catch((err) => {
      dispatch(fetchJobFail(err));
    });
}

export const fetchJobsAgentStart = () => ({
  type: actionTypes.FETCH_AGENT_JOBS_START,
});

export const fetchJobsAgentFail = (error) => ({
  type: actionTypes.FETCH_AGENT_JOBS_FAIL,
  error,
});

export const fetchJobsAgentSuccess = (jobs, total_pages) => ({
  type: actionTypes.FETCH_AGENT_JOBS_SUCCESS,
  jobs,
  total_pages,
});

export const fetchJobsAgent = (token, filter) => dispatch => {
  dispatch(fetchJobsAgentStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  var body = [];
  if (filter !== null) {
    body.push(`date_from=${filter.date_from}`);
    body.push(`date_to=${filter.date_to}`);
    body.push(`min_price=${filter.min_price}`);
    body.push(`max_price=${filter.max_price}`);
    body.push(`frequency=${filter.frequency}`);
    body.push(`current_page=${filter.current_page}`)
  }
  axios.get(`/agents/jobs?${body.join('&')}`, headers)
    .then((res) => {
      let jobs = [];
      if (res.data.job) {
        jobs = res.data.job.data;
      } else {
        jobs = res.data.data;
      }
      let total_pages = 0;
      total_pages = res.headers['x-total-pages'];
      dispatch(fetchJobsAgentSuccess(jobs, total_pages));
    })
    .catch((err) => {
      dispatch(fetchJobsAgentFail(err));
    });
};

export const acceptedJobStart = () => ({
  type: actionTypes.ACCEPTED_JOB_START,
});

export const acceptedJobSuccess = (job) => ({
  type: actionTypes.ACCEPTED_JOB_SUCCESS,
  job,
});

export const acceptedJobFail = () => ({
  type: actionTypes.ACCEPTED_JOB_FAIL,
});

export const acceptedJob = (token, job_id, proposal_id) => dispatch => {
  dispatch(acceptedJobStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    }
  }
  axios.get(`/customers/jobs/${job_id}/accepted/${proposal_id}`, headers)
    .then((res) => {
      let job = [];
      job = res.data.job.data;
      dispatch(acceptedJobSuccess(job));
      Alert.success(res.data.message, {
        position: 'top',
        effect: 'genie',
      });
    })
    .catch((err) => {
      if (err.response.data.job) {
        let job = err.response.data.job.data;
        dispatch(push(`/cliente/trabajo/${job_id}`));
        dispatch(acceptedJobSuccess(job));
      } else {
        dispatch(acceptedJobFail());
      }
      Alert.error(err.response.data.message, {
        position: 'top',
        effect: 'genie',
      });
    })
};

export const cancelledJobStart = () => ({
  type: actionTypes.CANCELLED_JOB_START,
});

export const cancelledJobSuccess = () => ({
  type: actionTypes.CANCELLED_JOB_SUCCESS,
});

export const cancelledJobFail = () => ({
  type: actionTypes.CANCELLED_JOB_FAIL,
});

export const cancelledJob = (token, job_id) => dispatch => {
  dispatch(cancelledJobStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    }
  }
  axios.get(`/customers/jobs/${job_id}/cancelled`, headers)
    .then((res) => {
      dispatch(cancelledJobSuccess());
      dispatch(push('/cliente/dashboard'));
      Alert.success(res.data.message, {
        position: 'top',
        effect: 'genie',
      });
    })
    .catch((err) => {
      dispatch(cancelledJobFail());
      Alert.error(err.response.data.message, {
        position: 'top',
        effect: 'genie',
      });
    })
};

export const applyProposalStart = () => ({
  type: actionTypes.APPLY_PROPOSAL_START,
});

export const applyProposalSuccess = () => ({
  type: actionTypes.APPLY_PROPOSAL_SUCCESS,
});

export const applyProposalFail = () => ({
  type: actionTypes.APPLY_PROPOSAL_FAIL,
});

export const applyProposal = (token, job_id) => dispatch => {
  dispatch(applyProposalStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  axios.post(`/agents/jobs/${job_id}/proposals`, null, headers)
    .then((res) => {
      dispatch(applyProposalSuccess());
      dispatch(push(`/agente/trabajos`));
      Alert.success(res.data.message, {
        position: 'top',
        effect: 'genie',
      });
    })
    .catch((err) => {
      dispatch(applyProposalFail());
      if (err.response.data.message.base) {
        Alert.error(err.response.data.message.base[0], {
          position: 'top',
          effect: 'genie',
        });
      } else if (err.response.data.message) {
        Alert.error(err.response.data.message, {
          position: 'top',
          effect: 'genie',
        });
      }
    });
};

export const fetchJobAgentCurrentStart = () => ({
  type: actionTypes.FETCH_JOB_AGENT_CURRENT_START,
});

export const fetchJobAgentCurrentFail = error => ({
  type: actionTypes.FETCH_JOB_AGENT_CURRENT_FAIL,
  error,
});

export const fetchJobAgentCurrentSuccess = acceptedjobs => ({
  type: actionTypes.FETCH_JOB_AGENT_CURRENT_SUCCESS,
  acceptedjobs,
});

export const fetchJobAgentCurrent = (token) => dispatch => {
  
  dispatch(fetchJobAgentCurrentStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  axios.get(`/agents/jobs/accepted?date_from=null&date_to=null&min_price=0&max_price=0&frequency=null&current_page=1`, headers)
  .then((res) => {
      let jobs = [];
      jobs = res.data.job.data;
      dispatch(fetchJobAgentCurrentSuccess(jobs));
    })
    .catch((err) => {
      dispatch(fetchJobAgentCurrentFail(err));
    });
}

export const fetchJobAgentCompletedStart = () => ({
  type: actionTypes.FETCH_JOB_AGENT_COMPLETED_START,
});

export const fetchJobAgentCompletedFail = error => ({
  type: actionTypes.FETCH_JOB_AGENT_COMPLETED_FAIL,
  error,
});

export const fetchJobAgentCompletedSuccess = completedjobs => ({
  type: actionTypes.FETCH_JOB_AGENT_COMPLETED_SUCCESS,
  completedjobs,
});

export const fetchJobAgentCompleted = (token) => dispatch => {  
  dispatch(fetchJobAgentCompletedStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  axios.get(`agents/jobs/completed?date_from=null&date_to=null&min_price=0&max_price=0&frequency=null&current_page=1`, headers)
  .then((res) => {
      let jobs = [];
      jobs = res.data.job.data;
      dispatch(fetchJobAgentCompletedSuccess(jobs));
    })
    .catch((err) => {
      dispatch(fetchJobAgentCompletedFail(err));
    });
}

export const fetchJobAgentPostulatedStart = () => ({
  type: actionTypes.FETCH_JOB_AGENT_POSTULATED_START,
});

export const fetchJobAgentPostulatedFail = error => ({
  type: actionTypes.FETCH_JOB_AGENT_POSTULATED_FAIL,
  error,
});

export const fetchJobAgentPostulatedSuccess = postulatedJobs => ({
  type: actionTypes.FETCH_JOB_AGENT_POSTULATED_SUCCESS,
  postulatedJobs,
});

export const fetchJobAgentPostulated = (token) => dispatch => {  
  dispatch(fetchJobAgentPostulatedStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    },
  };
  axios.get(`agents/jobs/postulated?date_from=null&date_to=null&min_price=0&max_price=0&frequency=null&current_page=1`, headers)
  .then((res) => {
      let jobs = [];
      jobs = res.data.job.data;
      dispatch(fetchJobAgentPostulatedSuccess(jobs));
    })
    .catch((err) => {
      dispatch(fetchJobAgentPostulatedFail(err));
    });
}

export const jobDetailsStart = () => ({
  type: actionTypes.JOB_DETAILS_START,
});

export const jobDetailsSuccess = details => ({
  type: actionTypes.JOB_DETAILS_SUCCESS,
  jobDetails: details,
});

export const jobDetailsFail = () => ({
  type: actionTypes.JOB_DETAILS_FAIL,
});

export const jobDetails = (token, job_id) => dispatch => {
  dispatch(jobDetailsStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    }
  }
  axios.get(`/agents/jobs/${job_id}`, headers)
  .then((res) => {
      let details = [];
      details = res.data.job_for_agents.data;
      dispatch(jobDetailsSuccess(details));
      // console.log(details)
    })
    .catch((err) => {
      dispatch(jobDetailsFail(err));
    })
};

export const disableButtonStart = () => ({
  type: actionTypes.DISABLE_BUTTON_START,
});

export const disableButtonSuccess = disableButton => ({
  type: actionTypes.DISABLE_BUTTON_SUCCESS,
  disableButton: disableButton,
});

export const disableButtonFail = () => ({
  type: actionTypes.DISABLE_BUTTON_FAIL,
});

export const disableButton = (token, job_id) => dispatch => {
  dispatch(disableButtonStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    }
  }
  axios.get(`/customers/jobs/${job_id}/can_review`, headers)
  .then((res) => {
    let canReview = [];
    canReview = res.data;
    dispatch(disableButtonSuccess(canReview));
  })
  .catch((err) => {
      dispatch(disableButtonFail(err));
    })
};

export const disableButtonCustomerStart = () => ({
  type: actionTypes.DISABLE_BUTTON_CUSTOMER_START,
});

export const disableButtonCustomerSuccess = disableButtonCustomer => ({
  type: actionTypes.DISABLE_BUTTON_CUSTOMER_SUCCESS,
  disableButtonCustomer: disableButtonCustomer,
});

export const disableButtonCustomerFail = () => ({
  type: actionTypes.DISABLE_BUTTON_CUSTOMER_FAIL,
});

export const disableButtonCustomer = (token, job_id) => dispatch => {
  dispatch(disableButtonCustomerStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    }
  }
  axios.get(`/agents/jobs/${job_id}/can_review`, headers)
  .then((res) => {
    let canReview = [];
    canReview = res.data;
    dispatch(disableButtonCustomerSuccess(canReview));
  })
  .catch((err) => {
    dispatch(disableButtonCustomerFail(err));
  })
};

export const jobCalendarStart = () => ({
  type: actionTypes.JOB_CALENDAR_START,
});

export const jobCalendarSuccess = jobs => ({
  type: actionTypes.JOB_CALENDAR_SUCCESS,
  jobs,
});

export const jobCalendarFail = () => ({
  type: actionTypes.JOB_CALENDAR_FAIL,
});

export const jobCalendar = token => dispatch => {
  dispatch(jobCalendarStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    }
  }
  axios.get('/agents/jobs/calendar', headers)
  .then((res) => {
    let jobs = [];
    jobs = res.data.job_calendar.data;
    let calendar = [];
    calendar = jobs.map(c => ({
        title: c.attributes.title,
        start: moment(c.attributes.start),
        end: moment(c.attributes.end),
        url: c.attributes.url,
      })
    );
    dispatch(jobCalendarSuccess(calendar));
  })
  .catch((err) => {
    dispatch(jobCalendarFail(err));
  })
}

export const canApplyStart = () => ({
  type: actionTypes.CAN_APPLY_START,
});

export const canApplySuccess = canApply => ({
  type: actionTypes.CAN_APPLY_SUCCESS,
  canApply: canApply,
});

export const canApplyFail = () => ({
  type: actionTypes.CAN_APPLY_FAIL,
});

export const canApply = (token, job_id) => dispatch => {
  dispatch(canApplyStart());
  const headers = {
    headers: {
      Authorization: `Token token=${token}`,
    }
  }
  axios.get(`/agents/jobs/${job_id}/can_apply`, headers)
  .then((res) => {
    let canApply = [];
    canApply = res.data;
    dispatch(canApplySuccess(canApply));
  })
  .catch((err) => {
    dispatch(canApplyFail(err));
  })
};