import React from 'react';

// 样式
import { Icon } from 'antd';
import { Table } from 'antd';
import '@/style/super-manager/Manager-show.styl';
const { Column } = Table;

export default props => {
  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      username: `test${i}`,
      name: `测试${i}号`,
      phone: 18351923820,
      role: `${i * 5 > 0 ? i * 5 : 1}`
    });
  }

  return (
    <dev className='manager-show-box'>
      <Table dataSource={data} className='table'>
        <Column title='账号' dataIndex='username' key='username' />
        <Column title='姓名' dataIndex='name' key='name' />
        <Column title='电话' dataIndex='phone' key='phone' />
        <Column title='权限' dataIndex='role' key='role' />
        <Column
          title='操作'
          dataIndex=''
          key='operations'
          render={(icon1, icon2) => (
            <span className='icon-box'>
              <a>
                <Icon type='edit' className='icon' />
              </a>
              <a>
                <Icon type='delete' className='icon' />
              </a>
            </span>
          )}
        />
      </Table>
    </dev>
  );
};
