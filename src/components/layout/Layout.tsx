import {NavLink, Outlet} from "react-router-dom";
import './layout.scss'

export const Layout = () => {
    return (
        <>
            <div className={'nav-block'}>
                <NavLink to={'participants'}>Участники</NavLink>
                <NavLink to={"companies"}>Компании</NavLink>
            </div>
            <Outlet/>
        </>
    );
};