import React, { useState, useEffect } from 'react';

// 请求
import {
  QUERY_REGISTRATION,
  QUERY_SYS_REGISTRATION_STEP
} from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table, Button } from 'antd';

// 路由
import {
  HOME_REGISTRATION_PROFILE,
  HOME_REGISTRATION_FILE_DOWNLOAD
} from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

const { Column } = Table;

export default props => {
  const [loading, setLoading] = useState(true),
    [enterpriseRegistrationList, setEnterpriseRegistrationList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    history = useHistory(),
    dispatch = useDispatch(),
    [sysRegistrationStepList, setSysRegistrationStepList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await proxyFetch(
        QUERY_REGISTRATION,
        {
          page
        },
        'GET'
      );

      setEnterpriseRegistrationList(res?.enterpriseRegistrationList);
      setTotal(res?.total);
      setPageSize(res?.pageSize);
      setLoading(false);
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      const sysRegistrationStepList = await proxyFetch(
        QUERY_SYS_REGISTRATION_STEP,
        {},
        'GET'
      );

      setSysRegistrationStepList(sysRegistrationStepList);
    })();
  }, []);

  return (
    <div className='query-registion-box'>
      <Table
        dataSource={enterpriseRegistrationList}
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
      >
        <Column title='登记测试项目名称' dataIndex='name' key='name' />
        <Column
          title='最新进展'
          dataIndex='currentStep'
          key='currentStep'
          render={(text, record) => (
            <span>
              {sysRegistrationStepList[text - 1] &&
                sysRegistrationStepList[text - 1].name}
            </span>
          )}
        />
        <Column
          title='企业名称'
          dataIndex='enterpriseUser.name'
          key='enterpriseUser.name'
        />
        <Column
          align='center'
          title='查看进度详情'
          dataIndex='uuid'
          key='uuid'
          render={(text, record) => (
            <Button
              type='link'
              onClick={() => {
                localStorage.setItem(
                  `${LOCAL_STORAGE}-registrationUuid`,
                  record.uuid
                );
                // dispatch
                dispatch(
                  enterpriseAction.setEnterpriseRegistrationUuid(record.uuid)
                );
                history.push(HOME_REGISTRATION_PROFILE.path);
              }}
            >
              查看进度详情
            </Button>
          )}
        />
        <Column
          align='center'
          title='查看内容详情'
          dataIndex='uuid'
          key='uuid'
          render={(text, record) => (
            <Button
              type='link'
              onClick={() => {
                localStorage.setItem(
                  `${LOCAL_STORAGE}-fileDownloadRegistrationUuid`,
                  record.uuid
                );
                dispatch(
                  enterpriseAction.setTechLeaderEnterpriseRegistrationUuid(
                    record.uuid
                  )
                );
                history.push(HOME_REGISTRATION_FILE_DOWNLOAD.path);
              }}
            >
              查看内容详情
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
