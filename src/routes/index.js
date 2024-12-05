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
    { path: '', component: Home, layout: HeaderOnly },
    { path: '/events', component: Events },
    { path: '/posts', component: Posts, layout: HeaderOnly },
    { path: '/profile', component: Profile, layout: HeaderOnly },
    { path: '/studyRoad', component: StudyRoad, layout: HeaderOnly },
    { path: '/posts/:slug', component: PostDetail, layout: HeaderOnly },
    // { path: '/subjectsDoc', component: SubjectsDo, layout: HeaderOnly c},
    { path: '/login', component: Login, layout: HeaderOnly },
]

const privateRoutes = [
    { path: '/admin', component: Home, allowedRole: ['admin'] },
    { path: '/createPost', component: CreatePost, allowedRole: ['admin', 'staff'] },
    { path: '/student', component: Home, allowedRole: ['student'] },
    { path: '/staff', component: Home, allowedRole: ['staff'] }
]

export { publicRoutes, privateRoutes }