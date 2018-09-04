'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';  


import { action } from 'action/explore';
import { action as ShareModalAction } from 'action/ShareModal';


import './Default.less';

class Default extends Component {

	constructor(props) {
		super(props)
		this.state = {
        }
	}

	componentDidMount(){
        

        //this.props.load();

	}

	componentWillUnmount() {

	}

	componentWillReceiveProps(nextProps) {

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
    Object.assign({}, action, ShareModalAction)
)(Default);

