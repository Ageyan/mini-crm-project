import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy } from "react";

const Login = lazy(() => import("../pages/Login"));
const Clients = lazy(() => import("../pages/Clients"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Tasks = lazy(() => import("../pages/Tasks"));
const ProtectedRoute = lazy(() => import("../routes/ProtectedRoute"));
const MainLayout = lazy(() => import("../layouts/MainLayout"));

function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>}/>

              <Route path="/" element={
                  <ProtectedRoute>
                    <MainLayout/>
                  </ProtectedRoute>
              }>
              <Route index element={<Navigate to="/dashboard"/>}/>
              <Route path="dashboard" element={<Dashboard/>}/>
              <Route path="clients" element={<Clients/>}/>
              <Route path="tasks" element={<Tasks/>}/>
              <Route path="*" element={<Navigate to="/login"/>}/>
            </Route>
            
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter;