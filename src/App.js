import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "~/routes";
import { DefaultLayout } from "~/components/Layouts";
import { Fragment } from "react";
import ScrollToTop from "~/components/ScrollToTop";
import { AuthProvider } from "./Authentication/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <ScrollToTop></ScrollToTop>
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Element = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Element />
                    </Layout>
                  }
                ></Route>
              );
            })}

            {privateRoutes.map((route, index) => {
              const authToken = JSON.parse(localStorage.getItem('auth_token'));
              const userRole = authToken ? authToken.role : null;

              let Layout = DefaultLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Element = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={(
                    authToken ? (
                      route.allowedRole.includes(userRole) ? (
                        <Layout>
                          <Element />
                        </Layout>
                      ) : (
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
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;