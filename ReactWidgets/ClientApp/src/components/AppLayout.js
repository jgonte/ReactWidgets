import React from 'react';
import NavMenu from './NavMenu';
import { Layout } from '../rw';

const {
    Header, Content, Footer, Sider
} = Layout;

const AppLayout = props => (
    <Layout>
        <Header style={{ color: 'white', fontSize: '1.2em' }}>
            React Widgets
        </Header>
        <Layout>
            <Sider
                breakpoint="md"
                collapsedWidth="0"
            >
                <NavMenu />
            </Sider>
            <Content>
                {props.children}
            </Content>
        </Layout>
        <Footer style={{ textAlign: 'center', fontSize: '1.2em'}}>
            &copy; 2019 Created by Gonte &#9786;
        </Footer>
    </Layout>
);

export default AppLayout;