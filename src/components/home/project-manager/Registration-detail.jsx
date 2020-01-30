import React from 'react';

// 组件
import Apply from '@/components/home/project-manager/registration-detail/Apply.jsx';
import Contract from '@/components/home/project-manager/registration-detail/Contract.jsx';
import Copyright from '@/components/home/project-manager/registration-detail/Copyright.jsx';
import Document from '@/components/home/project-manager/registration-detail/Document.jsx';
import ProductDescription from '@/components/home/project-manager/registration-detail/Product-description.jsx';
import Product from '@/components/home/project-manager/registration-detail/Product.jsx';
import Specimen from '@/components/home/project-manager/registration-detail/Specimen.jsx';
import Basic from '@/components/home/project-manager/registration-detail/Basic.jsx';

export default ({ type }) => {
  let content = null;

  switch (type) {
    case 'apply':
      content = <Apply />;
      break;
    case 'contract':
      content = <Contract />;
      break;
    case 'copyright':
      content = <Copyright />;
      break;
    case 'specimen':
      content = <Specimen />;
      break;
    case 'productDescription':
      content = <ProductDescription />;
      break;
    case 'document':
      content = <Document />;
      break;
    case 'product':
      content = <Product />;
      break;
    case 'basic':
      content = <Basic />;
      break;
    default:
      content = null;
  }

  return (
    <div className='item-box detail-item-box'>
      <p className='title-box'>审查详情</p>
      {content}
    </div>
  );
};
