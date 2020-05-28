import React, { useState, useEffect } from 'react';

// 请求
import { QUARY_DELEGATION_NEED_ASSIGNED } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table, Button, Icon } from 'antd';
import '@/style/home/tech-leader-manager/delegation-task.styl';
import '@/style/home/item.styl';

// redux
import { useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 路由
import {
  // HOME_DELEGATION_FILE_DOWNLOAD,
  HOME_DELEGATION_TASK_PROFILE
} from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

const { Column } = Table;

export default props => {
  const [loading, setLoading] = useState(true),
    [enterpriseDelegationList, setEnterpriseDelegationList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1),
    history = useHistory(),
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await proxyFetch(
        QUARY_DELEGATION_NEED_ASSIGNED,
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

  return (
    <div className='registion-task-box'>
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
        <Column
          title='合同编号'
          dataIndex='enterpriseDelegationContract.contractCode'
          key='enterpriseDelegationContract.contractCode'
        />
        <Column
          title='企业名称'
          dataIndex='enterpriseDelegationBasic.enterpriseName'
          key='enterpriseDelegationBasic.enterpriseName'
        />
        <Column
          title='电话'
          dataIndex='enterpriseDelegationBasic.phone'
          key='enterpriseDelegationBasic.phone'
        />
        <Column
          title='分配状态'
          dataIndex='enterpriseDelegationStep.statusText'
          key='statusText'
          render={(text, record) => (
            <span className='task-status-box'>
              {record?.['enterpriseDelegationStep.status'] === 2 ? (
                <span>
                  未分配技术人员
                  <Icon
                    type='exclamation-circle'
                    className='success-icon'
                    theme='twoTone'
                    twoToneColor='#fadb14'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationStep.status'] >= 3 ? (
                <span>
                  已分配技术人员
                  <Icon
                    type='check-circle'
                    className='success-icon'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                </span>
              ) : null}
            </span>
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
                dispatch(
                  enterpriseAction.setFileDownloadDelegationUuid(record.uuid)
                );
                history.push(HOME_DELEGATION_FILE_DOWNLOAD.path);
              }}
            >
              查看内容详情
            </Button>
          )}
        /> */}
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
                dispatch(
                  enterpriseAction.setEnterpriseDelegationUuid(record.uuid)
                );
                history.push(HOME_DELEGATION_TASK_PROFILE.path);
              }}
            >
              查看进度详情
            </Button>
          )}
        />
      </Table>
    </div>
  );
};

