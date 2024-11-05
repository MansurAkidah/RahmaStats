import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconifyIcon from 'components/base/IconifyIcon';
import AvatarImage from 'assets/images/iPhone.png';

interface MenuItems {
  id: number;
  title: string;
  icon: string;
  action?: () => void;
}



const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const open = Boolean(anchorEl);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/authentication/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  const menuItems: MenuItems[] = [
    {
      id: 1,
      title: 'View Profile',
      icon: 'mingcute:user-2-fill',
    },
    {
      id: 2,
      title: 'Account Settings',
      icon: 'material-symbols:settings-account-box-rounded',
    },
    {
      id: 3,
      title: 'Notifications',
      icon: 'ion:notifications',
    },
    {
      id: 4,
      title: 'Switch Account',
      icon: 'material-symbols:switch-account',
    },
    {
      id: 5,
      title: 'Help Center',
      icon: 'material-symbols:live-help',
    },
    {
      id: 6,
      title: 'Logout',
      icon: 'material-symbols:logout',
      action: handleLogout
    },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Set the display name if available, otherwise use email
        setUserName(user.displayName || user.email?.split('@')[0] || 'User');
        setUserEmail(user.email || '');
      } else {
        setUserName('');
        setUserEmail('');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item: MenuItems) => {
    handleProfileMenuClose();
    if (item.action) {
      item.action();
    }
  };
  return (
    <>
      <Tooltip title="Profile">
        <ButtonBase onClick={handleProfileClick} disableRipple>
          <Stack
            spacing={1}
            alignItems="center"
            aria-controls={open ? 'account-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
          >
            <Avatar
              src={auth.currentUser?.photoURL || AvatarImage}
              sx={(theme) => ({
                ml: 0.8,
                height: 32,
                width: 32,
                bgcolor: theme.palette.primary.main,
              })}
            />
            <Typography variant="subtitle2">{userName}</Typography>
          </Stack>
        </ButtonBase>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        sx={{
          mt: 1.5,
          '& .MuiList-root': {
            width: 240,
            '& .MuiAvatar-root': {
              width: 36,
              height: 36,
              mr: 1.25,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileMenuClose} sx={{ '&:hover': { bgcolor: 'info.main' } }}>
          <Avatar
            src={auth.currentUser?.photoURL ||AvatarImage}
            sx={{
              bgcolor: 'primary.main',
            }}
          />
          <Stack direction="column">
            <Typography variant="body2" fontWeight={500}>
              {userName}
            </Typography>
            <Typography variant="caption" fontWeight={400} color="text.secondary">
              {userEmail}
            </Typography>
          </Stack>
        </MenuItem>

        <Divider />

        {menuItems.map((item) => {
          return (
            <MenuItem key={item.id} onClick={() => handleMenuItemClick(item)} sx={{ py: 1 }}>
              <ListItemIcon sx={{ mr: 2, fontSize: 'button.fontSize' }}>
                <IconifyIcon icon={item.icon} />
              </ListItemIcon>
              <Typography variant="body2" color="text.secondary">
                {item.title}
              </Typography>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default ProfileMenu;
