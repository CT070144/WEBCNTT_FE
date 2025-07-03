import Home from "~/pages/Home";
import Events from "~/pages/Events";
import Posts from "~/pages/Posts";
import Profile from "~/pages/Profile";
import StudyRoad from "~/pages/StudyRoad";
import { DefaultLayout, HeaderOnly } from "~/components/Layouts";
import PostDetail from "~/pages/Posts/components/PostDetail";
import CreatePost from "~/pages/CreatePost";
import Login from "~/pages/Login";
import EventDetail from "~/pages/Events/components/EventDetail";
import StudentManagement from "~/pages/StudentManagement";
import EmployeeManagement from "~/pages/EmployeeManagement";
import CourseDocument from "~/pages/CourseDocument";
import Forum from "~/pages/Forum";
import CreateEvent from "~/pages/Events/components/CreateEvent";
import CreateLayout from "~/pages/Posts/components/createLayout";
import Introduce from "~/pages/Introduce";
import EmployeeDetail from "~/pages/Introduce/components/IntroduceDetail";
import MenuItemDetail from "~/pages/MenuItemDetail";
import CRUDNavbar from "~/pages/CRUDNavbar";
import AddLMI from "~/pages/CRUDNavbar/components/AddLMI";
import CreateDiscussion from "~/pages/Forum/components/CreateDiscussion";
import PendingDiscussions from "~/pages/Forum/components/PendingDiscussion";
import TrainingProgram from "~/pages/TrainingProgram";
import ProgramDetail from "~/pages/TrainingProgram/ProgramDetail";
import General from "~/pages/Introduce/General";
import PostsAdmin from "~/pages/Posts/PostsAdmin";
import EventAdmin from "~/pages/Events/EventAdmin";

const allowAll = ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_STUDENT'];
const allowStaff = ['ROLE_ADMIN', 'ROLE_EMPLOYEE'];

const publicRoutes = [
    { path: '', component: Home },
    { path: '/events', component: Events },
    { path: '/posts', component: Posts, layout: DefaultLayout },
    { path: '/studyRoad', component: StudyRoad },
    { path: '/posts/:slug', component: PostDetail, layout: DefaultLayout },
    // { path: '/subjectsDoc', component: SubjectsDo, layout: HeaderOnly },
    { path: '/login', component: Login },
    { path: 'events/:slug', component: EventDetail },
    { path: '/introEmployee', component: Introduce },
    { path: '/introducedetail/:slug', component: EmployeeDetail },
    { path: '/:slug', component: MenuItemDetail },
    { path: '/training-program', component: TrainingProgram },
    { path: '/training-program/:id', component: ProgramDetail },
    { path: '/gioi-thieu-chung', component: General }
]

const privateRoutes = [
    { path: '/admin', component: Home, allowedRole: ['ROLE_ADMIN'] },
    { path: '/createPost', component: CreatePost, allowedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] },
   
    { path: '/student', component: Home, allowedRole: ['ROLE_STUDENT'], layout: DefaultLayout },
    { path: '/employee', component: Home, allowedRole: ['ROLE_EMPLOYEE'] },
    { path: '/studentmanagement', component: StudentManagement, allowedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] },
    { path: '/employeemanagement', component: EmployeeManagement, allowedRole: ['ROLE_ADMIN'] },
    { path: '/coursedocument', component: CourseDocument, allowedRole: ['ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_STUDENT'] },
    { path: '/kmaforum', component: Forum, allowedRole: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_STUDENT'] },
    { path: '/profile', component: Profile, allowedRole: allowAll },
    { path: '/events/user', component: EventAdmin, allowedRole: allowAll },
    { path: '/createEvent/user', component: CreateEvent, allowedRole: ['ROLE_ADMIN'] },
    { path: '/createLayout/user', component: CreateLayout, allowedRole: allowStaff },
    { path: '/crud-navbar', component: CRUDNavbar, allowedRole: ['ROLE_ADMIN'] },
    { path: '/create-layout-for-menuitem/:slug', component: AddLMI, allowedRole: allowStaff },
    { path: '/createDiscussion', component: CreateDiscussion, allowedRole: allowAll },
    { path: '/pending', component: PendingDiscussions, allowedRole:['ROLE_ADMIN'] },
    { path: '/posts/admin', component: PostsAdmin, allowedRole: ['ROLE_ADMIN','ROLE_EMPLOYEE','ROLE_STUDENT'] }
]

export { publicRoutes, privateRoutes }