import DemoPage from "./pages/DemoPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EditNotePage from "./pages/EditNotePage";
import AddNotePage from "./pages/AddNotePage";
import ViewNotePage from "./pages/ViewNotePage";
import CoursesPage from "./pages/CoursesPage";
import GroupsPage from "./pages/GroupsPage";
import GroupPage from "./pages/GroupPage";

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
    // Note
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
    // Pages
    {
        path: "/",
        navbar: true,
        private: true,
        component: CoursesPage
    },
    {
        path: "/courses",
        navbar: true,
        private: true,
        component: CoursesPage
    },
    {
        path: "/groups",
        navbar: true,
        private: true,
        component: GroupsPage
    },
    // Group
    {
        path: "/group/:id",
        navbar: true,
        private: true,
        component: GroupPage
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
