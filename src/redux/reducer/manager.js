import { handleActions } from 'redux-actions';

export default handleActions(
  {
    // 保存企业基本信息
    setManager(state, { payload: result }) {
      return {
        ...state,
        uuid: result.uuid,
        phone: result.phone,
        name: result.name,
        role: result.role
      };
    },
    // 设置登录loading
    setLoginLoading(state, { payload: result }) {
      return {
        ...state,
        loginLoading: result
      };
    },
    setManagerLoading(state, { payload: result }) {
      return {
        ...state,
        managerLoading: result
      };
    }
  },
  {
    loginLoading: false,
    managerLoading: false,
    uuid: '',
    phone: '',
    name: '',
    role: 0
  }
);
