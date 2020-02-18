import React from 'react';

// 样式
import { Button } from 'antd';
import '@/style/home/enterprise-write.styl';
import '@/style/home/item.styl';

export default props => {
  return (
    <div className='item-box enterprise-write'>
      <h5 className='title-box'>企业填写的登记测试信息</h5>
      <div className='button-box'>
        <Button className='button' type='primary' icon='file-text' ghost>
          查看登记测试基本信息
        </Button>
        <Button className='button' type='primary' icon='file-text' ghost>
          查看评测合同信息
        </Button>
        <Button className='button' type='primary' icon='file-text' ghost>
          查看样品登记表信息
        </Button>
        <Button className='button' type='primary' icon='file-text' ghost>
          查看现场测试申请表信息
        </Button>
        <Button className='button' type='primary' icon='download' ghost>
          下载用户文档集
        </Button>
        <Button className='button' type='primary' icon='download' ghost>
          下载软件著作权证书
        </Button>
        <Button className='button' type='primary' icon='download' ghost>
          下载产品说明
        </Button>
        <Button className='button' type='primary' icon='download' ghost>
          下载产品介质
        </Button>
      </div>
    </div>
  );
};
