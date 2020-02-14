import React, { useState, useEffect } from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link, useHistory } from 'react-router-dom';

// 工具
import { getAuthortyNameByCode } from '@/constants/auth-constants';

// 请求
import proxyFetch from '@/util/request';
import {
  QUERY_TECHNICAL_MANAGER,
  ARRANGE_TECH_LEADER_MANAGER
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

//样式
import { Icon, Table, Button } from 'antd';
import '@/style/home/project-manager/finance-show.styl';
const { Column } = Table;

export default props => {
  const { steps, enterpriseRegistrationUuid } = useSelector(
      state => state.enterpriseStore
    ),
    [loading, setLoading] = useState(true),
    [technicalManagerList, setTechnicalManagerList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    [savaDataLoading, setSavaDataLoading] = useState(false),
    [technicalManagerUuid, setTechnicalManagerUuid] = useState(''),
    dispatch = useDispatch(),
    history = useHistory();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { technicalManagerList, total, pageSize } = await proxyFetch(
        QUERY_TECHNICAL_MANAGER,
        {
          page
        },
        'GET'
      );

      setTechnicalManagerList(technicalManagerList);
      setTotal(total);
      setPageSize(pageSize);
      setLoading(false);
    })();
  }, [page]);

  // 确认选择提交按钮
  const handleUpdateStep = () => {
    (async () => {
      setSavaDataLoading(true);

      let res = await proxyFetch(ARRANGE_TECH_LEADER_MANAGER, {
        registrationUuid: enterpriseRegistrationUuid,
        technicalManagerUuid
      });

      setSavaDataLoading(false);

      if (res) {
        dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));
        history.push(HOME_REGISTRATION_PROFILE.path);
      }
    })();
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>选择技术负责人</p>
      </div>
      <Button
        type='primary'
        htmlType='submit'
        className='button'
        loading={savaDataLoading}
        onClick={handleUpdateStep}
        disabled={!technicalManagerUuid || steps[3].status === 100}
      >
        确定选择
      </Button>
      <div className='finance-show-box'>
        <Table
          dataSource={technicalManagerList}
          className='table'
          rowKey={record => record.uuid}
          loading={loading}
          pagination={{
            current: page,
            total,
            pageSize,
            onChange: page => {
              setPage(page);
            }
          }}
          rowSelection={{
            type: 'radio',
            onChange: selectedRowKeys => {
              setTechnicalManagerUuid(selectedRowKeys[0]);
            },
            columnTitle: '选择',
            columnWidth: '100px'
          }}
        >
          <Column title='账号' dataIndex='username' key='username' />
          <Column title='姓名' dataIndex='name' key='name' />
          <Column title='电话' dataIndex='phone' key='phone' />
          <Column
            title='权限'
            dataIndex='role'
            key='role'
            render={(text, record) => (
              <span> {getAuthortyNameByCode(text)} </span>
            )}
          />
        </Table>
      </div>
    </>
  );
};

