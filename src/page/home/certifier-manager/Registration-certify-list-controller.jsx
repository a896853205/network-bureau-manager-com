import React, { useState, useEffect } from 'react';

// 请求
import { QUARY_REGISTRATION_NEED_CERTIFIED } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// redux
import { useDispatch } from 'react-redux';
import enterpriseAction from '@/redux/action/enterprise';

// 路由
import {
  HOME_REGISTRATION_FILE_DOWNLOAD,
  HOME_REGISTRATION_CERTIFY_PROFILE
} from '@/constants/route-constants';
import { useHistory } from 'react-router-dom';

// localStorage
import { LOCAL_STORAGE } from '@/constants/app-constants';

// 样式
import { Table, Button,Icon } from 'antd';
import '@/style/home/certifier-manager/registration-certify.styl';
import '@/style/home/item.styl';

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
        QUARY_REGISTRATION_NEED_CERTIFIED,
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
    <div className='registion-certify-box'>
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
          align='center'
          title='软件评测现场测试申请表状态'
          dataIndex='enterpriseRegistrationApply.managerStatus'
          key='enterpriseRegistrationApply.managerStatus'
          width='300px'
          render={(text, record) => (
            <div className='certify-status-box'>
              {record?.['enterpriseRegistrationApply.managerStatus'] === -3 ? (
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
              {record?.['enterpriseRegistrationApply.managerStatus'] === -2 ? (
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
              {record?.['enterpriseRegistrationApply.managerStatus'] === -1 ? (
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
              {record?.['enterpriseRegistrationApply.managerStatus'] === 1 ? (
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
              {record?.['enterpriseRegistrationApply.managerStatus'] === 2 ? (
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
              {record?.['enterpriseRegistrationApply.managerStatus'] === 3 ? (
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
              {record?.['enterpriseRegistrationApply.managerStatus'] === 100 ? (
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
                  enterpriseAction.setFileDownloadRegistrationUuid(record.uuid)
                );
                history.push(HOME_REGISTRATION_FILE_DOWNLOAD.path);
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
          render={(text, record) => (
            <Button
              type='link'
              onClick={() => {
                localStorage.setItem(
                  `${LOCAL_STORAGE}-registrationUuid`,
                  record.uuid
                );
                dispatch(
                  enterpriseAction.setEnterpriseRegistrationUuid(record.uuid)
                );
                history.push(HOME_REGISTRATION_CERTIFY_PROFILE.path);
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
