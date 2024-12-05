import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';


const NAVIGATION = [
    {
        kind: 'header',
        title: 'Main items',
    },
    {
        segment: '',
        title: 'Trang chủ',
        icon: <DashboardIcon />,
    },
    {
        segment: 'posts',
        title: 'Bài viết',
        icon: <DashboardIcon />,
    },
    {
        segment: 'events',
        title: 'Sự kiện',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'studyRoad',
        title: 'Chương trình học',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'subjects',
                title: 'Môn học',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    }
];

export default NAVIGATION;