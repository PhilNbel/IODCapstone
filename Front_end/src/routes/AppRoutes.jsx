import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import BrowsePage from "../pages/BrowsePage";
import ProtectedRoute from "../routes/ProtectedRoute";
import SignPage from "../pages/SignPage";
import UserPage from "../pages/UserPage";
import ProjectPage from "../pages/ProjectPage";
import StepPage from "../pages/StepPage";

// special component containing all the possible routes for this app
// any props passed into AppRoutes will also be passed onto
// child components using {...props}
function AppRoutes(props) {

  return (
    <Routes>
      <Route index element={<HomePage {...props} />} />
      <Route path="about" element={<AboutPage {...props} />} />
      <Route path="browse" element={<ProtectedRoute redirectPath="/sign-in"><BrowsePage {...props} /></ProtectedRoute>} />
      <Route path="sign-in" element={<SignPage {...props} />} />
      <Route path="sign-up" element={<SignPage {...props} />} />
      <Route path="log-in" element={<SignPage {...props} />} />
      <Route path="/:user" element={<UserPage {...props} />}/>
      <Route path="/:user/:project" element={<ProjectPage {...props} />}/>
      <Route path="/:user/:project/:step" element={<StepPage {...props} />}/>        
      </Routes>    
  );
}

export default AppRoutes;
// Name this file AppRoutes.jsx and store in new folder 'routes'
