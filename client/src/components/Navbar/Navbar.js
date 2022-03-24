import React, { useState, useEffect } from "react";
import { Toolbar, Avatar, AppBar, Button, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./styles";
import pinnLogo from "../../images/pinnLogo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";

const Navbar = () => {
  //const classes = useStyles();
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  //const user = null;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("jwttest")));

  //console.log(user);

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      //验证token是否过期，过期的话就执行logout
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("jwttest")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <Link to='/' className={classes.brandContainer}>
        {/* <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>
          Pin
        </Typography> */}
        <img className={classes.image} src={pinnLogo} alt='Memories' height='60px'></img>
        {/* <img className={classes.image} src={memoriesLogo} alt='Memories' height='40px'></img> */}
      </Link>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            {/* 文字设置fontWeight fontSize等用typography没效果，换用box */}
            <Box className={classes.userName} variant='subtitle1' fontWeight={700}>
                {user.result.name}
            </Box>
            <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant='contained' color='primary'>
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
