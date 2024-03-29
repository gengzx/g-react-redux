
/**
 * @Description : 组件懒加载
 * @Date : 2021/03/25 18:06:25
 * @Author : gengzx gzx97620@126.com
 * @Version :1.0
 */

import React from 'react';
import PropTypes from 'prop-types';

class Bundle extends React.Component {
  state = {
    // short for "module" but that's a keyword in js, so "mod"
    mod: null
  }

  //componentWillMount() { //react 17.x版本中废弃
  componentDidMount() {
    // 加载初始状态
    this.load(this.props);
  }

  //componentWillReceiveProps(nextProps) { //react 17.x版本中废弃
  componentDidUpdate(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    // 重置状态
    this.setState({
      mod: null
    });
    // 传入组件的组件
    props.load((mod) => {
      this.setState({
        // handle both es imports and cjs
        mod: mod.default ? mod.default : mod
      });
    });
  }

  render() {
    // if state mode not undefined,The container will render children
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}

Bundle.propTypes = {
  load: PropTypes.func,
  children: PropTypes.func
};

export default Bundle;

export const LazyLoad = (Component) => {
  return (props) => ( 
    <Bundle load={Component}>
      {(Container) => <Container {...props}/>}
    </Bundle>
  )
}