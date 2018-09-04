'use strict';

import React, { Component, PropTypes } from 'react';

import { Pagination } from 'antd';

import { Ajax, BaseService } from 'Ajax'

import './DataView.less';


class DataView extends Component {

	constructor(props) {
		super(props)

		this.state = {
			data: [],
			curpage: 1,
			pagesize: 12,
			total: 0
		}
	}

	componentDidMount() {


		Ajax.request(`http://localhost:8083/WMC/server/fore/common/documentDataService.jsp?identity=queryDocumentCount`, {}, function (data) {
			console.log(data);
			this.setState({
				total: data
			})

		}, { scope: this });

		var params = { start: 1, limit: 20 };
		Ajax.request(`http://127.0.0.1:8083/WMC/server/fore/common/documentDataService.jsp?identity=queryDocumentData`, params, function (data) {
			this.setState({
				data: data
			})

		}, { scope: this });

	}

	loadData(nextProps) {
		const { dataSource } = nextProps || this.props

		if (dataSource.constructor == Object) {
			this.loadRemoteData(dataSource)
		} else {
			this.setState({ data: dataSource })
		}
	}

	loadRemoteData(dataSource) {
		// if(!dataSource.params) return
		const { curpage, pagesize } = this.state
		let params = {
			columns: this._columnsParams.join(","),
			page: curpage,
			limit: pagesize
		}

		Ajax.request(dataSource.url, $.extend(params, dataSource.params), function (res) {
			this.setState({
				data: res.resultList,
				total: res.total
			})
			this.props.afterLoad(res.resultList, res.total);
		}, { scope: this })
	}

	onPageChange = (page) => {
		this.setState({
			curpage: page
		}, function () {
			this.loadData()
		})
	}

	render() {
		return (

			<div style={{ padding: '30px' }}>


				<ul style={{ textAlign: 'center' }}>
					<div>
						<Pagination
							onChange={this.onPageChange}
							defaultCurrent={this.state.curpage}
							total={this.state.total}
							showTotal={total => `共 ${total} 条`} />
					</div>
					{
						this.state.data.map(function (file, idx) {

							var ahref = "http://127.0.0.1:8083/WMC/WMC_FE/views/doc-view/doc-view.html?fileid=" + file.f_id;


							var imgrobj = { filepath: file.f_targetpath, filename: file.f_name.substring(0, file.f_name.lastIndexOf(".")) + ".png", width: 180, height: 200 };
							var imgpath = encodeURI(encodeURI('http://127.0.0.1:8083/WMC/server/fore/imageShow.jsp?robj=' + JSON.stringify(imgrobj)));

							return (
								<li key={idx} className="file-card">
									<a href={ahref}>
										<div className="file-card-center">
											<img width="180" height="200" src={imgpath} />
										</div>
										<div className="file-card-footer">
											<h3>{file.f_name}</h3>
											<p className="p1">{file.f_create_time}</p>
											<p className="p2"><span >1</span>次浏览 | <span >0</span>人下载</p>
										</div>
									</a>
								</li>
							)
						}, this)
					}
				</ul>
			</div>
		);
	}
}


// 参数验证
DataView.propTypes = {
	columns: PropTypes.array.isRequired,
	/**
	 * 数据源 本地数据或者远程数据都可以
	 * 示例 本地
	 * [name:'name',value:'value']
	 * 远程
	 * {
	 * url:'src/demo/basin.json',
	 * params:{}
	 * }
	 * @type {[type]}
	 */
	dataSource: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	afterLoad: PropTypes.func
}
// 默认参数
DataView.defaultProps = {
	dataSource: [],
	afterLoad: () => { }
}

export default DataView