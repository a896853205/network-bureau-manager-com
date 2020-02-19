import React, { useState, useEffect } from 'react';

// 请求
import { QUARY_REGISTRATION_NEED_FIELD_TEST } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table, Button, Icon } from 'antd';
import '@/style/home/tech-manager/registration-test-list.styl';
import '@/style/home/item.styl';

// redux
//import { useDispatch } from 'react-redux';
//import enterpriseAction from '@/redux/action/enterprise';

// 路由
import { HOME_REGISTRATION_TEST_PROFILE } from '@/constants/route-constants';
import { Link } from 'react-router-dom';

// localStorage
//import { LOCAL_STORAGE } from '@/constants/app-constants';

const { Column } = Table;

export default props => {
  const [loading, setLoading] = useState(true),
    [enterpriseRegistrationList, setEnterpriseRegistrationList] = useState([]),
    [total, setTotal] = useState(0),
    [pageSize, setPageSize] = useState(1),
    [page, setPage] = useState(1);
  // history = useHistory(),
  // dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      setLoading(true);

      const res = await proxyFetch(
        QUARY_REGISTRATION_NEED_FIELD_TEST,
        {
          page
        },
        'GET'
      );
      console.log('res=', res);

      setEnterpriseRegistrationList(res?.enterpriseRegistrationList);
      setTotal(res?.total);
      setPageSize(res?.pageSize);
      setLoading(false);
    })();
  }, [page]);

  return (
    <div className='registion-test-list-box'>
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
          title='查看内容详情'
          dataIndex=''
          key=''
          render={() => <Button type='link'>查看内容详情</Button>}
        />
        <Column
          align='center'
          title='软件评测样品登记表状态'
          dataIndex='enterpriseRegistrationSpecimen.managerStatus'
          key='enterpriseRegistrationSpecimen.managerStatus'
          render={(text, record) => (
            <div className='test-status-box'>
              {record?.['enterpriseRegistrationSpecimen.managerStatus'] ===
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
              {record?.['enterpriseRegistrationSpecimen.managerStatus'] ===
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
              {record?.['enterpriseRegistrationSpecimen.managerStatus'] ===
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
              {record?.['enterpriseRegistrationSpecimen.managerStatus'] ===
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
              {record?.['enterpriseRegistrationSpecimen.managerStatus'] ===
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
          dataIndex='enterpriseRegistrationApply.managerStatus'
          key='enterpriseRegistrationApply.managerStatus'
          render={(text, record) => (
            <div className='test-status-box'>
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
          title='操作'
          dataIndex=''
          key=''
          render={(text, record) => (
            <Link to={HOME_REGISTRATION_TEST_PROFILE.path}>查看进度详情</Link>
          )}
        />
      </Table>
    </div>
  );
};
