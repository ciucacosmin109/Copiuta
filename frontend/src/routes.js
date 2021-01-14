import DemoPage from "./pages/DemoPage"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditNotePage from "./pages/EditNotePage";
import AddNotePage from "./pages/AddNotePage";
import ViewNotePage from "./pages/ViewNotePage";
import HomePage from "./pages/HomePage";

const routes = [
    // Login
    {
        path: "/login",
        navbar: false, 
        private: false,
        component: LoginPage
    },
    {
        path: "/register",
        navbar: false, 
        private: false, 
        component: RegisterPage
    },
    // Notes
    {
        path: "/note/add/:courseId",
        navbar: true, 
        private: false, 
        component: AddNotePage
    },
    {
        path: "/note/edit/:id",
        navbar: true, 
        private: false, 
        component: EditNotePage
    },
    {
        path: "/note/view/:id",
        navbar: true, 
        private: false, 
        component: ViewNotePage
    },
    // Home
    {
        path: "/", 
        navbar: true, 
        private: true,
        component: HomePage
    }, 
    // Demo
    {
        path: "/demo",
        navbar: true, 
        private: true, 
        component: DemoPage
    },
    {
        path: "/pub",
        navbar: true, 
        private: false, 
        component: DemoPage
    },
    // Etc ...
];

export default routes;
