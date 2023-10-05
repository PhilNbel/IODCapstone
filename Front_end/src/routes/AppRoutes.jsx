import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import BrowsePage from "../pages/BrowsePage";
import ProtectedRoute from "../routes/ProtectedRoute";
import SignPage from "../pages/SignPage";
import LookUpPage from "../pages/LookUpPage";
import UserProjectsPage from "../pages/UserProjectsPage";
import CreateProjectPage from "../pages/CreateProjectPage";
import CreateStepPage from "../pages/CreateStepPage";
import PageNotFound from "../pages/PageNotFound";

// special component containing all the possible routes for this app
// any props passed into AppRoutes will also be passed onto
// child components using {...props}
function AppRoutes(props) {

  return (
    <Routes>
      <Route index element={<HomePage {...props} />} />
      <Route path="about" element={<AboutPage {...props} />} />
      <Route path="browse" element={<ProtectedRoute redirectPath="/sign-in"><BrowsePage {...props} /></ProtectedRoute>} />
      <Route path="projects" element={<ProtectedRoute redirectPath="/sign-in"><UserProjectsPage {...props} /></ProtectedRoute>} />
      <Route path="create" element={<ProtectedRoute redirectPath="/sign-in"><CreateProjectPage {...props} /></ProtectedRoute>} />
      <Route path="sign-in" element={<SignPage {...props} />} />
      <Route path="sign-up" element={<SignPage {...props} />} />
      <Route path="log-in" element={<SignPage {...props} />} />
      <Route path="/:user" element={<LookUpPage type="user"/>}/>
      <Route path="/:user/:project" element={<LookUpPage type="project"/>}/>
      <Route path="/:user/:project/create" element={<CreateStepPage type="step"/>}/>
      <Route path="/:user/:project/:step" element={<LookUpPage type="step"/>}/>
      <Route path="*" element={<PageNotFound/>}/> 
      </Routes>    
  );
}

export default AppRoutes;
// Name this file AppRoutes.jsx and store in new folder 'routes'
