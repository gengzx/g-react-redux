'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';  


import { action } from 'action/explore';

import './Default.less';

import { Http } from "utils"

class Default extends Component {

	constructor(props) {
		super(props)
		this.state = {
        }
	}

	componentDidMount(){
		 

		Http.request(`common/find?t=test`,{tbname:"t_sys_unit",cond:``},res => {
            console.log(res);
		})
		
        this.props.load();

	}

	componentWillUnmount() {

	}

	componentDidUpdate(nextProps) {

    }

    onShareClick = (id) => {
        this.props.showShareModal(id)
    }

   	render() {

        const { data } = this.props;

      	return (
    			<div className="page-default">  

                    default
                    
    			</div>
      	);
   	}
}

export default connect(
    state => state.explore,
    Object.assign({}, action)
)(Default);

