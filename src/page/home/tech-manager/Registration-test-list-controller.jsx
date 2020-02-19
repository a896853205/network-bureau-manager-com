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
          dataIndex=''
          key=''
          render={() => <span>这个是评测样品登记表的managerStatus</span>}
        />
        <Column
          align='center'
          title='软件评测现场测试申请表状态'
          dataIndex=''
          key=''
          render={() => <span>这个是查申请表的managerStatus</span>}
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
