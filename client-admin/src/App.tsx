import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { UserProvider } from "./contexts/UserContext";
import { ProductsProvider } from "./contexts/ProductContext";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

import AppLayout from "./layouts/AppLayout";

import DashBoard from "./pages/dashboard/DashBoard";
import AdminPage from "./pages/admins/AdminPage";
import UserPage from "./pages/users/UserPage";
import SettingPage from "./pages/auth/SettingPage";
import ProductPage from "./pages/products/ProductPage";
import OrderPage from "./pages/orders/OrderPage";
import LogInPage from "./pages/auth/LoginPage";

import PageNotFound from "./pages/errors/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UserProvider>
          <ProductsProvider>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<DashBoard />} />
                <Route path="admins" element={<AdminPage />} />
                <Route path="users" element={<UserPage />} />
                <Route path="orders" element={<OrderPage />} />
                <Route path="order/:id" element={<OrderPage />} />
                <Route path="products" element={<ProductPage />} />
                <Route path="product/:id" element={<ProductPage />} />
                <Route path="setting" element={<SettingPage />} />
              </Route>

              <Route path="login" element={<LogInPage />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </ProductsProvider>
        </UserProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
