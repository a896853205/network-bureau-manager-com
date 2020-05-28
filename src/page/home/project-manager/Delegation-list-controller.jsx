import React, { useState, useEffect } from 'react';

// 请求
import {
  QUERY_DELEGATION,
  QUERY_SYS_DELEGATION_STEP
} from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table, Button } from 'antd';

// 路由
import {
  HOME_DELEGATION_PROFILE,
  // HOME_DELEGATION_FILE_DOWNLOAD
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
    [enterpriseDelegationList, setEnterpriseDelegationList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    history = useHistory(),
    dispatch = useDispatch(),
    [sysDelegationStepList, setSysDelegationStepList] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await proxyFetch(
        QUERY_DELEGATION,
        {
          page
        },
        'GET'
      );

      setEnterpriseDelegationList(res?.enterpriseDelegationList);
      setTotal(res?.total);
      setPageSize(res?.pageSize);
      setLoading(false);
    })();
  }, [page]);

  useEffect(() => {
    (async () => {
      const sysDelegationStepList = await proxyFetch(
        QUERY_SYS_DELEGATION_STEP,
        {},
        'GET'
      );

      setSysDelegationStepList(sysDelegationStepList);
    })();
  }, []);

  return (
    <div className='query-registion-box'>
      <Table
        dataSource={enterpriseDelegationList}
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
              {sysDelegationStepList[text - 1] &&
                sysDelegationStepList[text - 1].name}
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
          dataIndex=''
          key=''
          render={(text, record) => (
            <Button
              type='link'
              onClick={() => {
                localStorage.setItem(
                  `${LOCAL_STORAGE}-delegationUuid`,
                  record.uuid
                );
                // dispatch
                dispatch(
                  enterpriseAction.setEnterpriseDelegationUuid(record.uuid)
                );
                history.push(HOME_DELEGATION_PROFILE.path);
              }}
            >
              查看进度详情
            </Button>
          )}
        />
        {/* <Column
          align='center'
          title='查看内容详情'
          dataIndex=''
          key=''
          render={(text, record) => (
            <Button
              type='link'
              onClick={() => {
                localStorage.setItem(
                  `${LOCAL_STORAGE}-fileDownloadDelegationUuid`,
                  record.uuid
                );

                history.push(HOME_DELEGATION_FILE_DOWNLOAD.path);
              }}
            >
              查看内容详情
            </Button>
          )}
        /> */}
      </Table>
    </div>
  );
};

