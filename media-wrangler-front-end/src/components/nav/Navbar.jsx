import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // ✅ add useNavigate
import { Box, Tabs, Tab } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { useAuth } from "../../Services/AuthContext";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ initialize navigate
  const { user, logoutAction } = useAuth();
  const [value, setValue] = React.useState(0);

  const handleLogout = async () => {
    try {
      await logoutAction();
      navigate("/", { replace: true }); // ✅ redirect to home
    } catch (e) {
      console.error(e);
    }
  };

  const tabs = [
    { label: "Home", path: "/" },
    { label: "Discover", path: "/discover" },
    { label: "Search", path: "/search" },
    { label: "Discussions", path: "/questions" },
    ...(user
      ? [
          { label: "Profile", path: `/profile/${user.id}` },
          { label: "Log Out", onClick: handleLogout }, // ✅ uses the function above
        ]
      : [
          { label: "Log In", path: "/login" },
          { label: "Register", path: "/register" },
        ]),
  ];

  const computeIndex = React.useCallback(() => {
    const pathname = location.pathname;
    const matcher = (p) =>
      p === "/"
        ? pathname === "/"
        : pathname === p || pathname.startsWith(`${p}/`);
    const i = tabs.findIndex((t) => t.path && matcher(t.path));
    return i >= 0 ? i : 0;
  }, [location.pathname, tabs]);

  React.useEffect(() => {
    setValue(computeIndex());
  }, [computeIndex]);

  const handleTabChange = (_e, nv) => {
    const t = tabs[nv];
    if (t?.onClick) {
      t.onClick();
      return; // don’t set active tab
    }
    setValue(nv);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        background:
          "linear-gradient(180deg, rgba(0,0,0,.35), rgba(0,0,0,.25)), linear-gradient(90deg,#3a1f15,#9E5231,#b5643d)",
        borderBottom: "2px solid rgba(226,168,75,.35)",
        boxShadow: "0 6px 18px rgba(0,0,0,.35)",
        backdropFilter: "blur(4px)",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          m: "0 auto",
          px: 2,
          height: 64,
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          alignItems: "center",
          gap: { xs: 1, sm: 3 },
        }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "#fff",
          }}
        >
          <StarRateRoundedIcon
            sx={{ color: "#E2A84B", filter: "drop-shadow(0 0 6px rgba(0,0,0,.6))" }}
          />
          <Box sx={{ fontSize: { xs: 20, sm: 28 }, fontWeight: 800, letterSpacing: ".3px" }}>
            Media Wrangler
          </Box>
        </Box>

        <Tabs
          value={value}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            sx: { height: 4, borderRadius: 2, background: "linear-gradient(90deg,#E2A84B,#FFD87A)" },
          }}
          sx={{
            justifySelf: "end",
            "& .MuiTab-root": {
              mx: { xs: 1, sm: 2 },
              px: 0.5,
              color: "rgba(255,255,255,.9)",
              textTransform: "none",
              fontWeight: 700,
              letterSpacing: ".2px",
              minHeight: 48,
            },
            "& .MuiTab-root.Mui-selected": { color: "#fff" },
          }}
        >
          {tabs.map((tab) =>
            tab.path ? (
              <Tab
                key={tab.label}
                label={tab.label}
                component={Link}
                to={tab.path}
                disableRipple
              />
            ) : (
              <Tab
                key={tab.label}
                label={tab.label}
                onClick={tab.onClick}
                disableRipple
                sx={{ cursor: "pointer" }}
              />
            )
          )}
        </Tabs>
      </Box>
    </Box>
  );
}
