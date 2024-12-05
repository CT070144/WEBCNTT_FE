import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { publicRoutes, privateRoutes } from "~/routes";
import { DefaultLayout } from "~/components/Layouts";
import { Fragment } from "react";
import ScrollToTop from "~/components/ScrollToTop";
import { AuthProvider } from "./Authentication/AuthContext";
import NAVIGATION from "./routes/navigation";
import { AppProvider } from "@toolpad/core";


function App() {
  return (
    <AuthProvider>
      <AppProvider
        navigation={NAVIGATION}>
        <div className="App">
          <Router>
            <Routes>
              <Route element={<DefaultLayout></DefaultLayout>}>
                {publicRoutes.map((route, index) => {
                  const Element = route.component
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={<Element />}
                    ></Route>
                  );
                })}
                {privateRoutes.map((route, index) => {
                  const authToken = JSON.parse(localStorage.getItem('auth_token'));
                  const userRole = authToken ? authToken.role : null;
                  const Element = route.component
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      element={(
                        userRole ? (
                          route.allowedRole.includes(userRole) ? (<Element />) : (
                            <div>
                              <h2>Không có quyền truy cập</h2>
                              <p>Xin lỗi, bạn không có quyền truy cập vào trang này.</p>
                            </div>
                          )
                        ) : (
                          <Navigate to="/login" />
                        )
                      )}>
                    </Route>
                  );
                })}
              </Route>
            </Routes>
          </Router>
        </div>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
