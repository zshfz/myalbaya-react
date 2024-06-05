import style from './styles/App.module.scss';
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Footer from "./components/Footer"
import Header from "./components/Header"
import Gallery from "./pages/Gallery"
import Home from "./pages/Home"
import Register from "./pages/Register"
import RegisterIntro from "./pages/RegisterIntro"
import Single from "./pages/Single"
import Write from "./pages/Write"

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/gallery/:id",
                element: <Gallery />,
            },
            {
                path: "/single/:id",
                element: <Single />,
            },
            {
                path: "/write/:id",
                element: <Write />,
            },
        ],
    },
    {
        path: "/registerintro",
        element: <RegisterIntro />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

function App() {
    return (
        <div className={style.App}>
            <div className={style.container}>
                <RouterProvider router={router} />
            </div>
        </div>
    );
}

export default App;
