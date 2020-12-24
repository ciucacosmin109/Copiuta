import DemoPage from "./pages/DemoPage"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const routes = [
    {
        path: "/login",
        private: false, 
        component: LoginPage
    },
    {
        path: "/register",
        private: false, 
        component: RegisterPage
    },
    {
        path: "/", 
        private: true,
        component: DemoPage
    }, 
    {
        path: "/demo",
        private: true, 
        component: DemoPage
    },
    {
        path: "/pub",
        private: false, 
        component: DemoPage
    },
];

export default routes;
