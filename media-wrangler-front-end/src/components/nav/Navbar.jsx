import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../Services/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const { user, logoutAction } = useAuth();
  const [value, setValue] = React.useState(0);

  const tabs = [
    { label: "Home", path: "/" },
    { label: "Discover", path: "/discover" },
    { label: "Search", path: "/search" },
    { label: "Discussions", path: "/questions" },
    ...(user
      ? [
          { label: "Profile", path: `/profile/${user.id}` },
          { label: "Log Out", onClick: () => handleLogout() },
        ]
      : [
          { label: "Log In", path: "/login" },
          { label: "Register", path: "/register" },
        ]),
  ];

  React.useEffect(() => {
    const currentIndex = tabs.findIndex((tab) =>
      tab.path ? tab.path === location.pathname : false
    );
    setValue(currentIndex >= 0 ? currentIndex : 0);
  }, [location.pathname, user, tabs]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleLogout = async () => {
    try {
      await logoutAction();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Box 
      sx={{ 
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        bgcolor: "background.paper",
        padding: 2, 
      }}
    >
      <Box
        component={Link}
        to="/"
        sx={{
          fontSize: { xs: 24, sm: 36 },
          fontWeight: "bold",
          fontFamily: "sans-serif",
          textAlign: { xs: "center", sm: "left" },
          textDecoration: "none",
          color: "grey",
          width: { xs: "100%", sm: "auto" },
        }}
      >
        Media Wrangler
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          maxWidth: "100%",
          minWidth: 0,
          bgcolor: "background.paper",
          padding: 2,
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{ style: { transition: "none" } }} 
        >
          {tabs.map((tab, index) =>
            tab.path ? (
              <Tab
                key={index}
                label={tab.label}
                component={Link}
                to={tab.path}
                sx={{ marginX: 3 }}
              />
            ) : (
              <Tab
                key={index}
                label={tab.label}
                onClick={tab.onClick}
                sx={{ marginX: 3, cursor: "pointer" }}
              />
            )
          )}
        </Tabs>
      </Box>
    </Box>
  );
}