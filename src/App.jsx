// import './App.css'
import { Box, Button } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "react-oauth2-code-pkce"
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation  } from "react-router"
import { logout, setCredentials } from "./Store/authSlice";
import { ActivityForm } from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import { ActivityDetail } from "./components/ActivityDetail";


const ActivityPage = () => {
  return(
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
             <ActivityForm onActivityAdded = {()=> window.location.reload()}/>
             <ActivityList/>

             
    </Box>
  );
}

function App() {

const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
const dispatch = useDispatch();
const [authReady, setAuthReady] = useState(false);

useEffect(()=>{
  if (token && tokenData ) {
    console.log("token =", token);
    console.log("tokenData =", tokenData);
    dispatch(setCredentials({token, user: tokenData}));
    setAuthReady(true);
  }
},[ token, tokenData, dispatch ]);

  return (
    <Router>
      {!token ? ( 
      <Button variant="contained" 
        onClick={() => {logIn();}}
         >
        LOGIN
      </Button>
       ) : (
        <div>
         <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
             <Button variant="contained" 
                onClick={logout}
               >
                   LOG OUT
             </Button>
             <Routes>
              <Route path="/activities" element={<ActivityPage/>}/>
              <Route path="/activities/:id" element={<ActivityDetail/>}/>
              <Route path="/" element={token ? <Navigate to="/activities" replace/> :
                         <div>Welcome! Please Login </div>  }/>

             </Routes>
          </Box>
         </div>
      )} 
    </Router> 
  )
}

export default App
