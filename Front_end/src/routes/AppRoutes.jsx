import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import BrowsePage from "../pages/BrowsePage";
import PageNotFound from "../pages/PageNotFound";
import SignPage from "../pages/SignPage";

// special component containing all the possible routes for this app
// any props passed into AppRoutes will also be passed onto
// child components using {...props}
function AppRoutes(props) {

  return (
    <Routes>
      <Route index element={<HomePage {...props} />} />
      <Route path="about" element={<AboutPage {...props} />} />
      <Route path="browse" element={<BrowsePage {...props} />} />
      <Route path="sign-in" element={<SignPage {...props} />} />
      <Route path="sign-up" element={<SignPage {...props} />} />
      <Route path="log-in" element={<SignPage {...props} />} />

      {/* nested routes, matches on /dash/tasks etc
      <Route path="dash" element={<ProtectedRoute><DashboardPage {...props} /></ProtectedRoute>}>
        <Route path="messages" element={<DashboardMessages />} />
        <Route path="tasks" element={<DashboardTasks />} />
      </Route>

      <Route path="/places" element={<PlaceList {...props} />} />
      <Route path="/posts" element={<PostListReducer {...props} />} />
      <Route path="/activities" element={<ActivityFinder {...props} />} />\
      <Route path="/mui" element={<MUIPage {...props} />} />

      <Route path="/posts" element={<PostsPage {...props} />}>
        <Route index element={<PostList />} />
        {/* dynamic param taken from route, stored in variable called id }
        <Route path=":id" element={<Post />} />
      </Route>

    <Route path='/students' element={<Students {...props} />}>
        <Route index element={<StudentList />} />
        <Route path=":studentid" element={<StudentDetails />}/>
    </Route>  
    {/* */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default AppRoutes;
// Name this file AppRoutes.jsx and store in new folder 'routes'
