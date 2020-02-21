import React from 'react';
// 样式
import { Table, Button } from 'antd';
import '@/style/home/tech-leader-manager/registration-task.styl';
import '@/style/home/item.styl';

const { Column } = Table;


export default props => {

  return (
    <div className='registion-task-box'>
      <Table
        className='table'
        rowKey={record => record.uuid}
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
          render={(text, record) => (
            <Button
              type='link'
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
            >
              查看进度详情
            </Button>
          )}
        />
      </Table>
    </div>
  );
};
