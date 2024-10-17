import React from 'react';
import './Loading.css';

const Loading = () => (
  <div className="loading-container">
    <div className="content">
      {[...Array(2)].map((_, i) => (
        <div className="bars" key={i}>
          {[...Array(7)].map((_, b) => (
            <div className="bar" key={b}></div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Loading;
