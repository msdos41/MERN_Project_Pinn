import React, { useState, useEffect } from "react";
import { Avatar, Button, Paper, Grid, Typography, Container } from "@mui/material";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
//import {useHistory} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Icon from "./icon";
import LockOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import useStyles from "./styles";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";

const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  //const isSignup = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //attention
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    console.log(res);
    const result = res?.profileObj; //?.可以不用判断是否有这个属性，如果错误会给出 undefined
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half></Input>
                <Input name='lastName' label='Last Name' handleChange={handleChange} half></Input>
              </>
            )}
            <Input name='email' label='Email Address' handleChange={handleChange} type='email'></Input>
            <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} ></Input>
            {isSignup && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'></Input>}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId='642472970133-peeebm9ckrqd54mu6bhdnrggds4s51a3.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy='single_host_origin'
          ></GoogleLogin>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>{isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
