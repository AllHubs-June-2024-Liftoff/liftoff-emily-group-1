import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Services/AuthContext.jsx'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn, signOut } = useContext(AuthContext);

  const [value, setValue] = React.useState(0);
  const tabRoutes = ['/', '/movies', '/search', '/login', '/register'];

  React.useEffect(() => {
    const currentTab = tabRoutes.indexOf(location.pathname);
    if (currentTab !== -1) {
      setValue(currentTab);
    }
  }, [location.pathname]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  }

  return (
    <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'comumn', sm: 'row' },
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'background.paper',
        padding: 2
      }}>
        <Box sx={{ 
          fontSize: { xs: 24, sm: 36 }, 
          fontWeight: 'bold', 
          fontFamily: 'sans-serif', 
          textAlign: { sx: 'center', sm: 'left'},
          width: { xs: '100%', sm: 'auto'},
          }}>
          Media Wrangler
        </Box>
        <Box sx={{
          flexGrow: 1,
          maxWidth: '100%',
          minWidth: 0,
          bgcolor: 'Background.paper',
          padding: 2
        }}>
        <Tabs 
          value={value} 
          onChange={handleChange} 
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Home" component={Link} to="/" sx={{ marginX: 3 }} />
          <Tab label="Movies" component={Link} to="/movies" sx={{ marginX: 3 }} />
          <Tab label="Search" component={Link} to="/search" sx={{ marginX: 3 }} />

          {!isSignedIn ? (
            <>
              <Tab label="Log In" component={Link} to="/login" sx={{ marginX: 3 }} />
              <Tab label="Register" component={Link} to="/register" sx={{ marginX: 3 }} />
            </>
          ) : (
            <>
              <Tab label="Profile" component={Link} to="/profile" sx={{ marginX: 3}} />
              <Tab
                label="Log out"
                onClick={handleSignOut}
                sx={{ marginX: 3, cursor: 'pointer' }}
              />
            </>
          )}
        </Tabs>
        </Box>
      </Box>
  );
}