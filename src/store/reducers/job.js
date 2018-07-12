import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  jobs: [],
  job: [],
  acceptedjobs: [],
  completedjobs: [],
  postulatedjobs: [],
  nextjobs: [],
  historyjobs: [],
  total_pages: 0,
  jobDetails: [],
  disableButton: [],
};

const fetchJobsSuccess = (state, action) => updateObject(state, {
  jobs: action.jobs,
});

const fetchNextJobsSuccess = (state, action) => updateObject(state, {
  nextjobs: action.nextjobs,
});

const fetchHistoryJobsSuccess = (state, action) => updateObject(state, {
  historyjobs: action.historyjobs,
});

const fetchJobSuccess = (state, action) => updateObject(state, {
  job: action.job,
});

const acceptedJobSuccess = (state, action) => updateObject(state, {
  job: action.job,
});

const fetchAgentJobsSuccess = (state, action) => updateObject(state, {
  jobs: action.jobs,
  total_pages: action.total_pages,
});

const fetchJobAgentCurrent = (state, action) => updateObject(state, {
  acceptedjobs: action.acceptedjobs,
});

const fetchJobAgentCompleted = (state, action) => updateObject(state, {
  completedjobs: action.completedjobs,
});

const fetchJobAgentPostulated = (state, action) => updateObject(state, {
  postulatedjobs: action.postulatedJobs,
});

const jobDetails = (state, action) => updateObject(state, {
  jobDetails: action.jobDetails,
});

const disableButtonSuccess = (state, action) => updateObject(state, {
  disableButton: action.disableButton,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_JOBS_START: return state;
    case actionTypes.FETCH_JOBS_SUCCESS: return fetchJobsSuccess(state, action);
    case actionTypes.FETCH_JOBS_FAIL: return state;
    case actionTypes.FETCH_JOB_START: return state;
    case actionTypes.FETCH_JOB_SUCCESS: return fetchJobSuccess(state, action);
    case actionTypes.FETCH_JOB_FAIL: return state;
    case actionTypes.FETCH_NEXTJOBS_START: return state;
    case actionTypes.FETCH_NEXTJOBS_SUCCESS: return fetchNextJobsSuccess(state, action);
    case actionTypes.FETCH_NEXTJOBS_FAIL: return state;
    case actionTypes.FETCH_HISTORYJOBS_START: return state;
    case actionTypes.FETCH_HISTORYJOBS_SUCCESS: return fetchHistoryJobsSuccess(state, action);
    case actionTypes.FETCH_HISTORYJOBS_FAIL: return state;
    case actionTypes.ACCEPTED_JOB_START: return state;
    case actionTypes.ACCEPTED_JOB_SUCCESS: return acceptedJobSuccess(state, action);
    case actionTypes.ACCEPTED_JOB_FAIL: return state;
    case actionTypes.CANCELLED_JOB_START: return state;
    case actionTypes.CANCELLED_JOB_SUCCESS: return state;
    case actionTypes.CANCELLED_JOB_FAIL: return state;
    case actionTypes.FETCH_AGENT_JOBS_START: return state;
    case actionTypes.FETCH_AGENT_JOBS_SUCCESS: return fetchAgentJobsSuccess(state, action);
    case actionTypes.FETCH_AGENT_JOBS_FAIL: return state;
    case actionTypes.APPLY_PROPOSAL_START: return state;
    case actionTypes.APPLY_PROPOSAL_SUCCESS: return state;
    case actionTypes.APPLY_PROPOSAL_FAIL: return state;
    case actionTypes.FETCH_JOB_AGENT_CURRENT_START: return state;
    case actionTypes.FETCH_JOB_AGENT_CURRENT_SUCCESS: return fetchJobAgentCurrent(state, action);
    case actionTypes.FETCH_JOB_AGENT_CURRENT_FAIL: return state;
    case actionTypes.FETCH_JOB_AGENT_COMPLETED_START: return state;
    case actionTypes.FETCH_JOB_AGENT_COMPLETED_SUCCESS: return fetchJobAgentCompleted(state, action);
    case actionTypes.FETCH_JOB_AGENT_COMPLETED_FAIL: return state;
    case actionTypes.FETCH_JOB_AGENT_POSTULATED_START: return state;
    case actionTypes.FETCH_JOB_AGENT_POSTULATED_SUCCESS: return fetchJobAgentPostulated(state, action);
    case actionTypes.FETCH_JOB_AGENT_POSTULATED_FAIL: return state;
    case actionTypes.JOB_DETAILS_START: return state;
    case actionTypes.JOB_DETAILS_SUCCESS: return jobDetails(state, action);
    case actionTypes.JOB_DETAILS_FAIL: return state;
    case actionTypes.DISABLE_BUTTON_START: return state;
    case actionTypes.DISABLE_BUTTON_SUCCESS: return disableButtonSuccess(state, action);
    case actionTypes.DISABLE_BUTTON_FAIL: return state;
    default: return state;
  }
};

export default reducer;
