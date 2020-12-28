import DemoPage from "./pages/DemoPage"; 
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditNotePage from "./pages/EditNotePage";
import AddNotePage from "./pages/AddNotePage";
import ViewNotePage from "./pages/ViewNotePage";

const routes = [
    // Login
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
    // Notes
    {
        path: "/note/add/:courseId",
        private: false, 
        component: AddNotePage
    },
    {
        path: "/note/edit/:id",
        private: false, 
        component: EditNotePage
    },
    {
        path: "/note/view/:id",
        private: false, 
        component: ViewNotePage
    },
    // Demo
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
    // Etc ...
];

export default routes;
