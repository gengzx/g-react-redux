/**
 * 头部
 */
import React from 'react'

import './Header.less';
import { Ajax, Api } from 'Ajax'

class Header extends React.Component {

    
    constructor(props) {
		super(props)
		this.state = {
            searchValue:"",
            menus:[]
		}
    }

	componentDidMount() {
        
        Api.loadSpecial({start:1, limit:8}, result => {
            this.setState({menus: result.rows});
        })
	}

	/**
	 *已加载组件收到新的参数时调用
	 */

	componentWillReceiveProps(nextProps) {

	}

	onSearchChange(event) {
		this.setState({searchValue: event.target.value});
	}

	render() {

		return (
            <div className="page-header">
       

            </div>
		);
	}
};

export default Header