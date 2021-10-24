

/**
 * {<Icon type="icon-xxx"/>
 */
 import React, { Component } from 'react';
 import classNames from 'classnames';
 import './index.less';
 
 require('./iconfont/iconfont.js');
 require('./iconfont/iconfont.css');
 
 var customCache = new Set();
 function isValidCustomScriptUrl(scriptUrl) {
     return typeof scriptUrl === 'string' && scriptUrl.length && !customCache.has(scriptUrl);
 }
   
 function createScriptUrlElements(scriptUrls) {
     var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
     var currentScriptUrl = scriptUrls[index];
 
     if (isValidCustomScriptUrl(currentScriptUrl)) {
         var script = document.createElement('script');
         script.setAttribute('src', currentScriptUrl);
         script.setAttribute('data-namespace', currentScriptUrl);
 
         if (scriptUrls.length > index + 1) {
         script.onload = function () {
             createScriptUrlElements(scriptUrls, index + 1);
         };
 
         script.onerror = function () {
             createScriptUrlElements(scriptUrls, index + 1);
         };
         }
 
         customCache.add(currentScriptUrl);
         document.body.appendChild(script);
     }
 }
 
 createScriptUrlElements(['script/iconfont.js'])
 
 export default class Icon extends Component {
 
 
   render() {
 
     const { type, name, size, color, spin, className, rotate, ...restProps } = this.props;
 
     return (
         <svg className={classNames("anticon component-icon",className, spin && "spin")} style={{fontSize:size,color:color,transform:`rotate(${rotate}deg)`}} aria-hidden="true" {...restProps}>
             <use xlinkHref={`#${type || name}`}></use>
         </svg>
     )
   }
 }
 
 