import React from 'react';
import './style.scss'

const SmallLoader = ({ size, color }) => {
  return (
    <div className="small-loader">
      <svg className="small-loader-svg" width={size ? size : '50'} height={size ? size : '50'}>
        <defs>
          <filter id="poo">
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="4" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -8"
              result="goo"
            />
            <feBlend in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
        <mask id="mask">
          <g
            id="g"
            className="balls"
            style={{ WebkitFilter: "url('#poo')", filter: "url('#poo')", fill: "white" }}
          >
            <circle cx="25" cy="25" r="6" id="b1"></circle>
            <circle cx="25" cy="25" r="6" id="b2"></circle>
          </g>
        </mask>
        <rect
          x="0"
          y="0"
          mask="url(#mask)"
          fill={color ? color : '#000'}
          width="50"
          height="50"
        >
          <animateTransform
            xlinkHref="#g"
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur=".5s"
            repeatCount="indefinite"
          />
          <animate
            id="an1"
            xlinkHref="#b1"
            attributeName="cx"
            calcMode="spline"
            keyTimes="0; 0.5; 1"
            values="25; 18; 25"
            keySplines=".6 .01 .36 .99; .6 .01 .36 .99;"
            dur=".5s"
            repeatCount="indefinite"
          />
          <animate
            id="an2"
            xlinkHref="#b2"
            attributeName="cx"
            values="25; 32; 25"
            calcMode="spline"
            keySplines=".6 .01 .36 .99; .6 .01 .36 .99;"
            keyTimes="0; 0.5; 1"
            dur=".5s"
            repeatCount="indefinite"
          />
          <animate
            xlinkHref="#b1"
            attributeName="r"
            values="6.4; 5; 6.4"
            calcMode="spline"
            keySplines=".6 .01 .36 .99; .6 .01 .36 .99;"
            keyTimes="0; 0.5; 1"
            dur=".5s"
            repeatCount="indefinite"
          />
          <animate
            xlinkHref="#b2"
            attributeName="r"
            values="6.4; 5; 6.4"
            calcMode="spline"
            keySplines=".6 .01 .36 .99; .6 .01 .36 .99;"
            keyTimes="0; 0.5; 1"
            dur=".5s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </div>
  );
};

export default SmallLoader;

