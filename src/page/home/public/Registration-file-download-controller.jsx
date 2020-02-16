import React from 'react';

// 样式
import { Icon } from 'antd';
import '@/style/home/registration-file-download.styl';
import '@/style/home/item.styl';

export default props => {
  return (
    <div className='item-box'>
      <h5 className='title-box'>登记测试内容文件详情</h5>
      <div>
        {/* 这里用Descriptions展示数据 */}
        <ul className='file-ul'>
          <li>
            <Icon className='file-title-icon' type='reconciliation' theme='twoTone' />
            评测合同下载
          </li>
          <li>
            <Icon className='file-title-icon' type='reconciliation' theme='twoTone' />
            软件著作权证书下载
          </li>
          <li>
            <Icon className='file-title-icon' type='reconciliation' theme='twoTone' />
            样品登记表下载
          </li>
          <li>
            <Icon className='file-title-icon' type='reconciliation' theme='twoTone' />
            产品说明下载
          </li>
          <li>
            <Icon className='file-title-icon' type='reconciliation' theme='twoTone' />
            用户文档集下载
          </li>
          <li>
            <Icon className='file-title-icon' type='reconciliation' theme='twoTone' />
            产品介质下载
          </li>
          <li>
            <Icon className='file-title-icon' type='reconciliation' theme='twoTone' />
            现场测试申请表下载
          </li>
        </ul>
      </div>
    </div>
  );
};
