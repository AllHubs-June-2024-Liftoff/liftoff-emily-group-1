import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Box, Tabs, Tab } from "@mui/material";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { useAuth } from "../../Services/AuthContext";

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
          { label: "Log Out", onClick: async () => { try { await logoutAction(); } catch(e){ console.error(e);} } },
        ]
      : [
          { label: "Log In", path: "/login" },
          { label: "Register", path: "/register" },
        ]),
  ];

  // Robust active-tab calc (handles routes like /profile/123 and /questions/abc)
  const computeIndex = React.useCallback(() => {
    const pathname = location.pathname;
    const matcher = (p) =>
      p === "/"
        ? pathname === "/"
        : pathname === p || pathname.startsWith(`${p}/`);
    const i = tabs.findIndex((t) => t.path && matcher(t.path));
    return i >= 0 ? i : 0;
  }, [location.pathname, tabs]);

  React.useEffect(() => { setValue(computeIndex()); }, [computeIndex]);

  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        // warm “desert” gradient + subtle overlay
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
        {/* Brand */}
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
          <Box
            sx={{
              fontSize: { xs: 20, sm: 28 },
              fontWeight: 800,
              letterSpacing: ".3px",
            }}
          >
            Media Wrangler
          </Box>
        </Box>

        {/* Tabs */}
        <Tabs
          value={value}
          onChange={(_, nv) => setValue(nv)}
          variant="scrollable"
          scrollButtons="auto"
          TabIndicatorProps={{
            sx: {
              height: 4,
              borderRadius: 2,
              background:
                "linear-gradient(90deg,#E2A84B,#FFD87A)",
            },
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
            "& .MuiTab-root.Mui-selected": {
              color: "#fff",
            },
          }}
        >
          {tabs.map((tab, i) =>
            tab.path ? (
              <Tab
                key={tab.label}
                label={tab.label}
                component={Link}
                to={tab.path}
                disableRipple
                sx={{
                  "&:hover::after": { transform: "scaleX(.5)" },
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: -8,
                    height: 4,
                    borderRadius: 6,
                    background:
                      "linear-gradient(90deg,#E2A84B,#FFD87A)",
                    transform: "scaleX(0)",
                    transformOrigin: "left",
                    transition: "transform .18s ease-out",
                  },
                }}
              />
            ) : (
              <Tab
                key={tab.label}
                label={tab.label}
                onClick={tab.onClick}
                // keep the indicator from “sticking” to Log Out
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
