import { createAction } from 'redux-actions';

export default {
  asyncSetManager: createAction('asyncSetManager'),
  setManager: createAction('setManager'),
  setLoginLoading: createAction('setLoginLoading'),
  asyncSetManagerByToken: createAction('asyncSetManagerByToken'),
  setManagerLoading: createAction('setManagerLoading')
};
