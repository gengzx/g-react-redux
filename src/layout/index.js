import React from "react";

import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Container from "./Container.jsx";
import Sider from "./Sider.jsx";


import { action } from 'action/layout';
import { connect } from 'react-redux';  

class Layout extends React.Component {
    render() {
        return (
            <div>
                <Header {...this.props} />
                <div>
                    <Container {...this.props}>{this.props.children}</Container>
                </div>
                <Footer {...this.props} />
            </div>
        );
    }
}

export default connect(state=>state.layout, action)(Layout)