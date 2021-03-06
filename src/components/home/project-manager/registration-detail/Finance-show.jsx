import React, { useState, useEffect } from 'react';

// 路由
import { HOME_REGISTRATION_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// 工具
import { getAuthortyNameByCode } from '@/constants/auth-constants';

// 请求
import proxyFetch from '@/util/request';
import {
  QUERY_FINANCE_MANAGER,
  UPDATE_FINANCE_MANAGER,
  SELECT_REGISTRATION_ACCOUNTANT_MANAGER_UUID
} from '@/constants/api-constants';

// redux
import { useSelector, useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 样式
import { Icon, Table } from 'antd';
import '@/style/home/project-manager/finance-show.styl';
const { Column } = Table;

export default props => {
  const {
      steps,
      enterpriseRegistrationUuid,
      registrationLoading
    } = useSelector(state => state.enterpriseStore),
    [loading, setLoading] = useState(true),
    [financeManagerList, setFinanceManagerList] = useState([]),
    [accountantManagerUuid, setAccountantManagerUuid] = useState(''),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    [savaDataLoading, setSavaDataLoading] = useState(false),
    [isNeedFresh, setIsNeedFresh] = useState(true),
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { financeManagerList, total, pageSize } = await proxyFetch(
        QUERY_FINANCE_MANAGER,
        {
          page
        },
        'GET'
      );

      setFinanceManagerList(financeManagerList);
      setTotal(total);
      setPageSize(pageSize);
      setLoading(false);
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      if (isNeedFresh) {
        setSavaDataLoading(true);
        const accountantManagerUuid = await proxyFetch(
          SELECT_REGISTRATION_ACCOUNTANT_MANAGER_UUID,
          {
            registrationUuid: enterpriseRegistrationUuid
          },
          'GET'
        );
        setAccountantManagerUuid(accountantManagerUuid);
        setIsNeedFresh(false);
        setSavaDataLoading(false);
      }
    })();
  }, [enterpriseRegistrationUuid, isNeedFresh]);

  // 切换提交到数据库
  const handleUpdateStep = financeManagerUuid => {
    (async () => {
      setSavaDataLoading(true);

      let res = await proxyFetch(UPDATE_FINANCE_MANAGER, {
        registrationUuid: enterpriseRegistrationUuid,
        financeManagerUuid
      });
      setIsNeedFresh(true);
      setSavaDataLoading(false);

      if (res) {
        dispatch(enterpriseAction.asyncSetSteps(enterpriseRegistrationUuid));
      }
    })();
  };

  return (
    <>
      <div className='subtitle-box'>
        <Link to={HOME_REGISTRATION_PROFILE.path}>
          <Icon type='left' className='exit-icon' />
        </Link>
        <p className='subtitle-title'>选择负责的财务人员</p>
      </div>
      <div className='finance-show-box'>
        <Table
          dataSource={financeManagerList}
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
              handleUpdateStep(selectedRowKeys[0]);
            },
            columnTitle: '选择',
            columnWidth: '100px',
            selectedRowKeys: [accountantManagerUuid],
            getCheckboxProps: () => ({
              disabled:
                savaDataLoading ||
                registrationLoading ||
                !accountantManagerUuid ||
                (steps[2]?.status !== 1 && steps[2]?.status !== 2)
            })
          }}
        >
          <Column title='账号' dataIndex='username' key='username' />
          <Column title='姓名' dataIndex='name' key='name' />
          <Column title='电话' dataIndex='phone' key='phone' />
          <Column
            title='权限'
            dataIndex='role'
            key='role'
            render={text => <span> {getAuthortyNameByCode(text)} </span>}
          />
        </Table>
      </div>
    </>
  );
};
