import React from 'react';
import { Link } from 'react-router-dom';

import {
    Menu,
    Icon
} from '../rw';

const NavMenu = props => (
    <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        style={{ height: '100%' }}
    >
        <Menu.Item key="1">
            <Link to="/" exact="true">
                <span>
                    <Icon type="home" />
                    Home
                </span>
            </Link>
        </Menu.Item>

        <Menu.Item key="2">
            <Link to="/counter">
                <span>
                    <Icon type="plus-circle" />
                    Counter
                </span>
            </Link>
        </Menu.Item>

        <Menu.Item key="3">
            <Link to="/fetchdata">
                <span>
                    <Icon type="cloud-download-o" />
                    Fetch Data
                </span>
            </Link>
        </Menu.Item>

        <Menu.Item key="4">
            <Link to="/senddata">
                <span>
                    <Icon type="cloud-upload-o" />
                    Send Data
                </span>
            </Link>
        </Menu.Item>

        <Menu.Item key="5">
            <Link to="/tasks">
                <span>
                    <Icon type="carry-out" />
                    Manage Tasks
                </span>
            </Link>
        </Menu.Item>

        <Menu.Item key="6">
            <Link to="/webComponents">
                <span>
                    <Icon type="robot" />
                    Web Components
                </span>
            </Link>
        </Menu.Item>

        <Menu.Item key="7">
            <Link to="/dualListBox">
                <span>
                    <Icon type="unordered-list" />
                    Dual Listbox
                </span>
            </Link>
        </Menu.Item>

        <Menu.Item key="8">
            <Link to="/wizard">
                <span>
                    <Icon type="unordered-list" />
                    Wizard
                </span>
            </Link>
        </Menu.Item>

    </Menu>
);

export default NavMenu;

//export class NavMenu extends Component {
//    displayName = NavMenu.name

//    render() {
//        return (
//            <Navbar inverse fixedTop fluid collapseOnSelect>
//                <Navbar.Header>
//                    <Navbar.Brand>
//                        <Link to={'/'}>ReactWidgets</Link>
//                    </Navbar.Brand>
//                    <Navbar.Toggle />
//                </Navbar.Header>
//                <Navbar.Collapse>
//                    <Nav>
//                        <LinkContainer to={'/'} exact>
//                            <NavItem>
//                                <Glyphicon glyph='home' /> Home
//                            </NavItem>
//                        </LinkContainer>
//                        <LinkContainer to={'/counter'}>
//                            <NavItem>
//                                <Glyphicon glyph='education' /> Counter
//                            </NavItem>
//                        </LinkContainer>
//                        <LinkContainer to={'/fetchdata'}>
//                            <NavItem>
//                                <Glyphicon glyph='th-list' /> Fetch data
//                            </NavItem>
//                        </LinkContainer>
//                        <LinkContainer to={'/senddata'}>
//                            <NavItem>
//                                <Glyphicon glyph='th-list' /> Send data
//                            </NavItem>
//                        </LinkContainer>
//                    </Nav>
//                </Navbar.Collapse>
//            </Navbar>
//        );
//    }
//}
