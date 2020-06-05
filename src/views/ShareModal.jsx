"use strict";

import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "antd/lib/modal";
import Tree from "antd/lib/tree";
const TreeNode = Tree.TreeNode;

import { action } from 'action/ShareModal';
import { Ajax } from 'Ajax'


class ShareModal extends Component {


    constructor(props) {

        super(props)
        this.state = {
            data:[],
            checkedKeys:[]
        }
    }

    componentDidMount() {
        //this.loadUserTree()
    }

    componentWillUnmount() {}

    componentDidUpdate(nextProps) {

    }

    loadUserTree = () => {

        Ajax.request(`sys_unit/unitUserTree`,{},res => {
            this.setState({data:res})
        })

    }

    eachNode(nodes,pidx = 0){
		let treeNode = (<TreeNode disabled title="暂无数据" key="0"></TreeNode>)
		if(nodes && nodes.length > 0){
			treeNode = nodes.map(function(node,idx){
				return(
					<TreeNode title={node.name} node={node} key={pidx === 0 ? 0 : ((!node.leaf ? '_' : '') + node.code)}>
						{node.children && this.eachNode(node.children,idx+1)}
					</TreeNode>
				)
			},this)
		}
		return treeNode
    }

    onCheck = (checkedKeys) => {
        this.setState({checkedKeys: checkedKeys})
    }

    onOk = () => {

        //const specialId = this.props.id
        //const { checkedKeys } = this.state
        
        
    }

    render() {
        const { visible } = this.props
        
        return (

            <Modal
                title={"请选择分享人员"}
                width={600}
                visible={visible}
                onCancel={this.props.hideShareModal}
                onOk={this.onOk}
            >
                <div style={{height:300,overflow: 'auto'}}>
                    <Tree
                        checkable
                        onCheck={this.onCheck}
                        defaultExpandedKeys={["0"]}
                    >
                        {this.eachNode(this.state.data)}
                    </Tree>
                </div>


            </Modal>
        );
    }
}

export default connect(
    state => state.ShareModal,
    Object.assign({}, action)
)(ShareModal);
