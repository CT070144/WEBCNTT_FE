import Home from "~/pages/Home";
import Events from "~/pages/Events";
import Posts from "~/pages/Posts";
import Profile from "~/pages/Profile";
import StudyRoad from "~/pages/StudyRoad";
import { HeaderOnly } from "~/components/Layouts";
import PostDetail from "~/pages/Posts/components/PostDetail";
import CreatePost from "~/pages/CreatePost";
import Login from "~/pages/Login";

const publicRoutes = [
    { path: '', component: Home },
    { path: '/events', component: Events },
    { path: '/posts', component: Posts },
    { path: '/profile', component: Profile },
    { path: '/studyRoad', component: StudyRoad },
    { path: '/posts/:slug', component: PostDetail },
    // { path: '/subjectsDoc', component: SubjectsDo c},
    { path: '/login', component: Login },
]

const privateRoutes = [
    { path: '/admin', component: Home, allowedRole: ['admin'] },
    { path: '/createPost', component: CreatePost, allowedRole: ['admin', 'staff'] },
    { path: '/student', component: Home, allowedRole: ['student'] },
    { path: '/staff', component: Home, allowedRole: ['staff'] }
]

export { publicRoutes, privateRoutes }