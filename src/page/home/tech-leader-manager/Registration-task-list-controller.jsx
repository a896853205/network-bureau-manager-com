import React, { useState, useEffect } from 'react';

// 请求
import { QUARY_REGISTRATION_NEED_ASSIGNED } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table, Button, Icon } from 'antd';
import '@/style/home/tech-leader-manager/registration-task.styl';
import '@/style/home/item.styl';

// 路由
import {
  HOME_REGISTRATION_FILE_DOWNLOAD,
  HOME_REGISTRATION_TASK_ASSIGN_TECH
} from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
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
    dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await proxyFetch(
        QUARY_REGISTRATION_NEED_ASSIGNED,
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

  return (
    <div className='registion-task-box'>
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
        <Column
          title='合同编号'
          dataIndex='enterpriseRegistrationContract.contractCode'
          key='enterpriseRegistrationContract.contractCode'
        />
        <Column
          title='企业名称'
          dataIndex='enterpriseRegistrationBasic.enterpriseName'
          key='enterpriseRegistrationBasic.enterpriseName'
        />
        <Column
          title='电话'
          dataIndex='enterpriseRegistrationBasic.phone'
          key='enterpriseRegistrationBasic.phone'
        />
        <Column
          title='分配状态'
          dataIndex='enterpriseRegistrationStep.statusText'
          key='statusText'
          render={(text, record) => (
            <span className='task-status-box'>
              {record?.['enterpriseRegistrationStep.status'] === 2 ? (
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
              {record?.['enterpriseRegistrationStep.status'] === 3 ? (
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
        <Column
          align='center'
          title='查看详情'
          dataIndex=''
          key=''
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
              查看详情
            </Button>
          )}
        />
        <Column
          align='center'
          title='分配技术管理人员'
          dataIndex=''
          key=''
          render={(text, record) => (
            <Button
              type='link'
              onClick={() => {
                window.localStorage.setItem(
                  `${LOCAL_STORAGE}-techLeaderRegistrationUuid`,
                  record.uuid
                );
                history.push(HOME_REGISTRATION_TASK_ASSIGN_TECH.path);
              }}
            >
              分配技术管理人员
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
