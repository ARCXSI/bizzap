import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AxiosInstance from './AxiosInstance';


export default function Navbar() {
    const navigate = useNavigate()

    const logoutUser = () => {
        AxiosInstance.post(`logoutall/`, {}).then(() => {
            localStorage.removeItem('token')
            navigate('/')
        })
    }

    const location = useLocation()
    const path = location.pathname

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 200 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key={1} disablePadding>
                    <ListItemButton component={Link} to='/inicio' selected={'/inicio' === path}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Início'} />
                    </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem key={2} disablePadding>
                    <ListItemButton component={Link} to='/sobre' selected={'/sobre' === path}>
                        <ListItemIcon>
                            <InfoIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Sobre'} />
                    </ListItemButton>
                </ListItem>

                <Divider />

                <ListItem key={3} disablePadding>
                    <ListItemButton onClick={logoutUser}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Sair'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" sx={{ backgroundColor: 'midnightblue' }}>
                    <Toolbar>
                        <Button onClick={toggleDrawer(true)} style={{ color: 'white' }}><MenuIcon /></Button>
                        <Drawer open={open} onClose={toggleDrawer(false)}>
                            {DrawerList}
                        </Drawer>
                    </Toolbar>
                </AppBar>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Toolbar />
                </Box>
            </Box>
        </div>
    );
}