import { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import Navbar from "./Navbar";
import Search from "./Search";
import Posts from "./Posts";
import Messages from "./Messages";
import Notifications from "./Notifications";

import useAuth from "../../hooks/useAuth";

const Home = () => {
    const { auth } = useAuth();
    const [active, setActive] = useState({
        name: 'home',
        component: null
    });

    const Render = () => active.component ? active.component : <Posts auth={auth}/>;
    
    const handleClickMenu = (e, { name, component } ) => {
        setActive({
            name,
            component
        });
    }

    return (
        <>
        <Navbar/>
        <Render/>
        <div className="items--container">
            <Menu attached='bottom' tabular widths='4'>
                <Menu.Item
                    component={<Posts auth={auth}/>}
                    name='home'
                    active={active.name === 'home'}
                    onClick={handleClickMenu}
                >
                    <Icon name='home'/>
                </Menu.Item>

                <Menu.Item
                    component={<Search/>}
                    name='search'
                    active={active.name === 'search'}
                    onClick={handleClickMenu}
                >
                    <Icon name='search'/>
                </Menu.Item>

                <Menu.Item
                    component={<Notifications/>}
                    name='notifications'
                    active={active.name === 'notifications'}
                    onClick={handleClickMenu}
                >
                    <Icon name='bell'/>
                </Menu.Item>

                <Menu.Item
                    component={<Messages/>}
                    name='messages'
                    active={active.name === 'messages'}
                    onClick={handleClickMenu}
                >
                    <Icon name='mail'/>
                </Menu.Item>
            </Menu>
        </div>
        </>
    )
};

export default Home;