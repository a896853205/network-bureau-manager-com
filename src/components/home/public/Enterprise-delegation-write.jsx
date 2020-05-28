// import React from 'react';

// export default props => {
//   return <></>;
// };

import React, { useState } from 'react';

// redux
import { useSelector } from 'react-redux';

// 请求
import {
  DOWNLOAD_PRODUCT,
  DOWNLOAD_PRODUCT_DESCRIPTION,
  DOWNLOAD_DOCUMENT,
  DOWNLOAD_COPYRIGHT,
} from '@/constants/api-constants';
import proxyFetch from '@/util/request';

// 子组件
import Apply from '@/components/home/public/delegation-enterprise-write/Apply.jsx';
import Basic from '@/components/home/public/delegation-enterprise-write/Basic.jsx';
import Contract from '@/components/home/public/delegation-enterprise-write/Contract.jsx';
import Specimen from '@/components/home/public/delegation-enterprise-write/Specimen.jsx';

// 样式
import { Button, Modal } from 'antd';
import '@/style/home/enterprise-write.styl';
import '@/style/home/item.styl';

export default (props) => {
  const { fileDownloadRegistrationUuid } = useSelector(
      (state) => state.enterpriseStore
    ),
    [productDownloadLoading, setProductDownloadLoading] = useState(false),
    [
      productDescriptionDownloadLoading,
      setProductDescriptionDownloadLoading,
    ] = useState(false),
    [documentDownloadLoading, setDocumentDownloadLoading] = useState(false),
    [copyrightDownloadLoading, setCopyrightDownloadLoading] = useState(false),
    [modalVisible, setModalVisible] = useState(false),
    [content, setContent] = useState(null);

  // #FIXME 需要将此4个路由修改为(管理员权限)限制
  const handleDownloadProduct = async () => {
    setProductDownloadLoading(true);

    const url = await proxyFetch(
      DOWNLOAD_PRODUCT,
      { registrationUuid: fileDownloadRegistrationUuid },
      'GET'
    );
    setProductDownloadLoading(false);
    window.open(url, '_blank');
  };

  const handleDownloadProductDescription = async () => {
    setProductDescriptionDownloadLoading(true);

    const url = await proxyFetch(
      DOWNLOAD_PRODUCT_DESCRIPTION,
      { registrationUuid: fileDownloadRegistrationUuid },
      'GET'
    );
    setProductDescriptionDownloadLoading(false);

    const urlArr = url.split('?');
    var urlArrList = urlArr[0],
      appU = urlArrList.split('/');
    var fileName = appU[appU.length - 1];
    if (fileName.split('.')[1].toLowerCase() !== 'pdf') {
      window.open(
        `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
          url
        )}`
      );
    } else {
      window.open(url);
    }
  };

  const handleDownloadDocument = async () => {
    setDocumentDownloadLoading(true);

    const url = await proxyFetch(
      DOWNLOAD_DOCUMENT,
      { registrationUuid: fileDownloadRegistrationUuid },
      'GET'
    );
    setDocumentDownloadLoading(false);

    const urlArr = url.split('?');
    var urlArrList = urlArr[0],
      appU = urlArrList.split('/');
    var fileName = appU[appU.length - 1];
    if (fileName.split('.')[1].toLowerCase() !== 'pdf') {
      window.open(
        `http://view.officeapps.live.com/op/view.aspx?src=${encodeURIComponent(
          url
        )}`
      );
    } else {
      window.open(url);
    }
  };

  const handleDownloadCopyright = async () => {
    setCopyrightDownloadLoading(true);

    const url = await proxyFetch(
      DOWNLOAD_COPYRIGHT,
      { registrationUuid: fileDownloadRegistrationUuid },
      'GET'
    );
    setCopyrightDownloadLoading(false);
    window.open(url, '_blank');
  };

  const handleShowModal = (type) => {
    switch (type) {
      case 'basic':
        setContent(<Basic />);
        break;
      case 'contract':
        setContent(<Contract />);
        break;
      case 'specimen':
        setContent(<Specimen />);
        break;
      case 'apply':
        setContent(<Apply />);
        break;
      default:
        return null;
    }
    setModalVisible(true);
  };

  return (
    <div className='item-box enterprise-write'>
      <h5 className='title-box'>企业填写的登记测试信息</h5>
      <div className='button-box'>
        <Button
          className='button'
          type='primary'
          icon='file-text'
          ghost
          onClick={() => handleShowModal('basic')}
        >
          查看登记测试基本信息
        </Button>
        <Button
          className='button'
          type='primary'
          icon='file-text'
          ghost
          onClick={() => handleShowModal('contract')}
        >
          查看评测合同信息
        </Button>
        <Button
          className='button'
          type='primary'
          icon='file-text'
          ghost
          onClick={() => handleShowModal('specimen')}
        >
          查看样品登记表信息
        </Button>
        <Button
          className='button'
          type='primary'
          icon='file-text'
          ghost
          onClick={() => handleShowModal('apply')}
        >
          查看现场测试申请表信息
        </Button>
        <Button
          onClick={handleDownloadDocument}
          className='button'
          type='primary'
          icon='download'
          ghost
          loading={documentDownloadLoading}
        >
          下载用户文档集
        </Button>
        <Button
          onClick={handleDownloadCopyright}
          className='button'
          type='primary'
          icon='download'
          ghost
          loading={copyrightDownloadLoading}
        >
          下载软件著作权证书
        </Button>
        <Button
          onClick={handleDownloadProductDescription}
          className='button'
          type='primary'
          icon='download'
          ghost
          loading={productDescriptionDownloadLoading}
        >
          下载产品说明
        </Button>
        <Button
          onClick={handleDownloadProduct}
          className='button'
          type='primary'
          icon='download'
          ghost
          loading={productDownloadLoading}
        >
          下载样品
        </Button>
      </div>
      <Modal
        visible={modalVisible}
        footer={null}
        onCancel={() => {
          setModalVisible(false);
        }}
      >
        {content}
      </Modal>
    </div>
  );
};
