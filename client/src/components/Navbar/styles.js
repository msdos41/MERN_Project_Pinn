import { makeStyles } from "@mui/styles";
import { deepPurple } from "@mui/material/colors";

//const theme = createTheme();
export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "20px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 5px 10px 5px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: "2em",
    fontWeight: 300,
  },
  image: {
    marginLeft: "20px",
    marginTop: "0px",
  },
  toolbar: {
    display: "flex",
    justifyContent: "flex-end",
    width: "300px",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
    },
    flexGrow:10,
  },
  profile: {
    display: "flex",
    //justifyContent: "space-between",
    width: "300px",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      marginTop: 20,
      justifyContent: "center",
    },
  },
  logout: {
    marginLeft: "20px",
    //flexGrow: 0,
  },
  userName: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    flexGrow: 1,
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow:1,
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    //flexGrow: 0,
    marginRight: "10px",
  },
}));
