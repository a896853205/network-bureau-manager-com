import React, { useState, useEffect } from 'react';

// 请求
import { QUARY_DELEGATION_NEED_FIELD_TEST } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table, Button, Icon } from 'antd';
import '@/style/home/tech-manager/delegation-test-list.styl';
import '@/style/home/item.styl';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// redux
import { useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 路由
import { useHistory } from 'react-router-dom';
import {
  HOME_DELEGATION_TEST_PROFILE,
  HOME_DELEGATION_FILE_DOWNLOAD,
} from '@/constants/route-constants';

const { Column } = Table;

export default (props) => {
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
        QUARY_DELEGATION_NEED_FIELD_TEST,
        {
          page,
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
    <div className='registion-test-list-box'>
      <Table
        dataSource={enterpriseDelegationList}
        className='table'
        rowKey={(record) => record.uuid}
        loading={loading}
        pagination={{
          current: page,
          total,
          pageSize,
          onChange: (page) => {
            setPage(page);
          },
        }}
        scroll={{ x: 1500 }}
      >
        <Column
          align='center'
          title='合同编号'
          dataIndex='enterpriseDelegationContract.contractCode'
          key='enterpriseDelegationContract.contractCode'
          fixed='left'
          width='180px'
        />
        <Column
          align='center'
          title='企业名称'
          dataIndex='enterpriseDelegationBasic.enterpriseName'
          key='enterpriseDelegationBasic.enterpriseName'
          width='250px'
        />
        <Column
          align='center'
          title='电话'
          dataIndex='enterpriseDelegationBasic.phone'
          key='enterpriseDelegationBasic.phone'
          width='180px'
        />
        <Column
          align='center'
          title='软件评测样品登记表状态'
          dataIndex='enterpriseDelegationSpecimen.managerStatus'
          key='enterpriseDelegationSpecimen.managerStatus'
          width='300px'
          render={(text, record) => (
            <div className='test-status-box'>
              {record?.['enterpriseDelegationSpecimen.managerStatus'] ===
              -2 ? (
                <span>
                  项目管理员审查技术人员不合格
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    className='fail-icon'
                    twoToneColor='#f5222d'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationSpecimen.managerStatus'] ===
              -1 ? (
                <span>
                  技术人员审查企业提交信息不合格
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    className='fail-icon'
                    twoToneColor='#f5222d'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationSpecimen.managerStatus'] ===
              1 ? (
                <span>
                  待技术人员确认
                  <Icon
                    type='exclamation-circle'
                    className='wait-icon'
                    theme='twoTone'
                    twoToneColor='#fadb14'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationSpecimen.managerStatus'] ===
              2 ? (
                <span>
                  待项目管理员确认
                  <Icon
                    type='exclamation-circle'
                    className='wait-icon'
                    theme='twoTone'
                    twoToneColor='#fadb14'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationSpecimen.managerStatus'] ===
              100 ? (
                <span>
                  已完成
                  <Icon
                    type='check-circle'
                    className='success-icon'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                </span>
              ) : null}
            </div>
          )}
        />
        <Column
          align='center'
          title='软件评测现场测试申请表状态'
          dataIndex='enterpriseDelegationApply.managerStatus'
          key='enterpriseDelegationApply.managerStatus'
          width='300px'
          render={(text, record) => (
            <div className='test-status-box'>
              {record?.['enterpriseDelegationApply.managerStatus'] === -3 ? (
                <span>
                  批准人审查项目管理人员不合格
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    className='fail-icon'
                    twoToneColor='#f5222d'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationApply.managerStatus'] === -2 ? (
                <span>
                  项目管理员审查技术人员不合格
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    className='fail-icon'
                    twoToneColor='#f5222d'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationApply.managerStatus'] === -1 ? (
                <span>
                  技术人员审查企业提交信息不合格
                  <Icon
                    type='close-circle'
                    theme='twoTone'
                    className='fail-icon'
                    twoToneColor='#f5222d'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationApply.managerStatus'] === 1 ? (
                <span>
                  待技术人员确认
                  <Icon
                    type='exclamation-circle'
                    className='wait-icon'
                    theme='twoTone'
                    twoToneColor='#fadb14'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationApply.managerStatus'] === 2 ? (
                <span>
                  待项目管理员确认
                  <Icon
                    type='exclamation-circle'
                    className='wait-icon'
                    theme='twoTone'
                    twoToneColor='#fadb14'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationApply.managerStatus'] === 3 ? (
                <span>
                  待批准人确认
                  <Icon
                    type='exclamation-circle'
                    className='wait-icon'
                    theme='twoTone'
                    twoToneColor='#fadb14'
                  />
                </span>
              ) : null}
              {record?.['enterpriseDelegationApply.managerStatus'] === 100 ? (
                <span>
                  已完成
                  <Icon
                    type='check-circle'
                    className='success-icon'
                    theme='twoTone'
                    twoToneColor='#52c41a'
                  />
                </span>
              ) : null}
            </div>
          )}
        />
        <Column
          align='center'
          title='查看内容详情'
          width='150px'
          fixed='right'
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
        />
        <Column
          align='center'
          title='查看进度详情'
          dataIndex=''
          key=''
          fixed='right'
          width='160px'
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
                history.push(HOME_DELEGATION_TEST_PROFILE.path);
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

