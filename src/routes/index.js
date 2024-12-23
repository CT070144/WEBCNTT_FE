import Home from "~/pages/Home";
import Events from "~/pages/Events";
import Posts from "~/pages/Posts";
import Profile from "~/pages/Profile";
import StudyRoad from "~/pages/StudyRoad";
import { HeaderOnly } from "~/components/Layouts";
import PostDetail from "~/pages/Posts/components/PostDetail";
import CreatePost from "~/pages/CreatePost";
import Login from "~/pages/Login";
import EventDetail from "~/pages/Events/components/EventDetail";
import Notifications from "~/pages/Notifications";
import StudentManagement from "~/pages/StudentManagement";
import EmployeeManagement from "~/pages/EmployeeManagement";
import CourseDocument from "~/pages/CourseDocument";
import Forum from "~/pages/Forum";

const publicRoutes = [
    { path: '', component: Home },
    { path: '/events', component: Events },
    { path: '/posts', component: Posts },
    { path: '/profile', component: Profile },
    { path: '/studyRoad', component: StudyRoad },
    { path: '/posts/:slug', component: PostDetail },
    // { path: '/subjectsDoc', component: SubjectsDo, layout: HeaderOnly },
    { path: '/login', component: Login, layout: HeaderOnly },
    { path: 'events/:slug', component: EventDetail },
    { path: '/notification', component: Notifications }
]

const privateRoutes = [
    { path: '/admin', component: Home, allowedRole: ['ROLE_ADMIN'] },
    { path: '/createPost', component: CreatePost, allowedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] },
    { path: '/student', component: Home, allowedRole: ['ROLE_STUDENT'] },
    { path: '/employee', component: Home, allowedRole: ['ROLE_EMPLOYEE'] },
    { path: '/studentmanagement', component: StudentManagement, allowedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] },
    { path: '/employeemanagement', component: EmployeeManagement, allowedRole: ['ROLE_ADMIN'] },
    { path: '/coursedocument', component: CourseDocument, allowedRole: ['ROLE_ADMIN'] },
    { path: '/kmaforum', component: Forum, allowedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_STUDENT'] }
]

export { publicRoutes, privateRoutes }