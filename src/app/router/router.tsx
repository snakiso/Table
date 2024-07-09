import {createBrowserRouter, RouterProvider, useNavigate,} from "react-router-dom";
import {TableParticipants} from "../../components/table/TableParticipants.tsx";
import {TableCompanies} from "../../components/table/TableCompanies.tsx";
import {Layout} from "../../components/layout/Layout.tsx";
import {useEffect} from "react";


const RootRedirect = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/admin/participants');
    }, [navigate]);

    return null;
};

export const router = createBrowserRouter([
    {
        children: [
            {
                element: <TableParticipants/>,
                path: "/admin/participants",
            },
            {
                element: <TableCompanies/>,
                path: "/admin/companies",
            },
            {
                element: <RootRedirect/>,
                path: '/admin',
            },
        ],
        element: <Layout/>,
        path: '/admin',

    },

],);

export const Router = () => {
    return <RouterProvider router={router}/>;
};

