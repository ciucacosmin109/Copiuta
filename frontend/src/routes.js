import DemoPage from "./pages/DemoPage"; 

const routes = [
    {
        path: "/", 
        private: false,
        component: DemoPage
    },
    {
        path: "/demo", 
        private: false,
        component: DemoPage
    },
    {
        path: "/demo2",
        private: true, 
        component: DemoPage
    },
];

export default routes;
