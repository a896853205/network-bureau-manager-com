import React, { useState, useEffect } from 'react';

// 请求
import { QUARY_REGISTRATION_NEED_FIELD_TEST } from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 样式
import { Table, Button } from 'antd';
import '@/style/home/tech-leader-manager/registration-task.styl';
import '@/style/home/item.styl';

// redux
//import { useDispatch } from 'react-redux';
//import enterpriseAction from '@/redux/action/enterprise';

// 路由
//import {} from '@/constants/route-constants';
//import { useHistory } from 'react-router-dom';

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
          title='状态'
          dataIndex='enterpriseRegistrationStep.statusText'
          key='enterpriseRegistrationStep.statusText'
        />
        <Column
          align='center'
          title='查看详情'
          dataIndex=''
          key=''
          render={(text, record) => <Button>查看详情</Button>}
        />
      </Table>
    </div>
  );
};
