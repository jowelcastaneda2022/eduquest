import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'

const PageHeader = ({ text, path }) => {
  return (
    <div className="page-header">
      <Link className="back-link" to={path ? path : '/'}>
        <span className="circle" aria-hidden="true">
          <span className="icon arrow"></span>
        </span>
        <span className="text">{text}</span>
      </Link>
    </div>
  );
};

export default PageHeader;