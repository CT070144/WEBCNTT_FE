import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { publicRoutes, privateRoutes } from "~/routes";
import { DefaultLayout } from "~/components/Layouts";
import { Fragment } from "react";
import ScrollToTop from "~/components/ScrollToTop";
import { AuthProvider } from "./Authentication/AuthContext";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered', registration);
        })
        .catch((error) => {
          console.error('Service Worker registration failed', error);
        });
    }
  }, [])
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
              const userString = localStorage.getItem('user');
              const user = JSON.parse(userString);
              const userRole = user ? user.roles : null;
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
                    userString ? (
                      userRole.some(role => (route.allowedRole.includes(role))) ? (
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