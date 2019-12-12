import React from 'react';
import '@/style/index.styl';

// 路由
import { Link } from 'react-router-dom';

// 样式
import { Icon } from 'antd';

// 组件
import LoginComponent from '@/components/index/Login.jsx';

export default () => {
  return (
    <div className='index-box'>
      <div className='index-inner-box'>
        <div className='left-box'>
          <h1 className='logo'>
            <Icon type='reconciliation' /> <span>业务管理系统</span>
          </h1>
          <div className='nav'>
            <button to='/index/login' className='focus button'>
              登录
            </button>
          </div>
          <div className='form'>
            <LoginComponent />
          </div>
          <ul className='performance'>
            <li>
              <Icon type='clock-circle' className='icon' />
              <span>更快捷的业务办理</span>
            </li>
            <li>
              <Icon type='bug' className='icon' />
              <span>更稳定的测试流程</span>
            </li>
            <li>
              <Icon type='safety-certificate' className='icon' />
              <span>更安全的项目管理</span>
            </li>
          </ul>
        </div>
        <div className='right-box'>
          <div>
            <p className='main-describe'>欢迎使用</p>
            <p className='main-describe'>软件测试</p>
            <p className='main-describe'>业务管理系统</p>
            <p className='sub-describe'>
              欢迎使用软件测试业务管理系统,使您快速方便地办理各类软件测试。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
