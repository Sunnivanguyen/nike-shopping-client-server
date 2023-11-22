import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProductsProvider } from "./contexts/ProductContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { RoutesProvider } from "./contexts/RouteContext";
import { SoundsProvider } from "./contexts/SoundContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/auth/ProtectedRoute";

import AppLayout from "./layouts/AppLayout";

import HomePage from "./pages/home/HomePage";

import NewArrivalsPage from "./pages/products/NewArrivalsPage";
import BestSellerPage from "./pages/products/BestSellerPage";
import ShopIconsPage from "./pages/products/ShopIconsPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import ContactPage from "./pages/contacts/ContactPage";
import SettingPage from "./pages/auth/SettingPage";
import RegisterPage from "./pages/auth/RegisterPage";
import LogInPage from "./pages/auth/LoginPage";
import CartPage from "./pages/cart/CartPage";
import FavoritePage from "./pages/favorites/FavoritePage";
import OrderStatusPage from "./pages/orders/OrderStatusPage";
import MainComponent from "./components/partials/MainComponent";

import PageNotFound from "./pages/errors/PageNotFound";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <SoundsProvider>
            <RoutesProvider>
              <ProductsProvider>
                <Routes>
                  <Route element={<AppLayout />}>
                    <Route
                      element={
                        <ProtectedRoute>
                          <CartPage />
                          <FavoritePage />
                          <SettingPage />
                          <OrderStatusPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route index element={<Navigate replace to="home" />} />
                    <Route path="home" element={<HomePage />} />
                    <Route path="carts" element={<CartPage />} />
                    <Route path="favorites" element={<FavoritePage />} />
                    <Route path="setting" element={<SettingPage />} />
                    <Route path="order" element={<OrderStatusPage />} />
                    <Route path="nike" element={<MainComponent />}>
                      <Route
                        index
                        element={<Navigate replace to="best-sellers" />}
                      />
                      <Route
                        path="new-arrivals"
                        element={<NewArrivalsPage />}
                      />
                      <Route
                        path="new-arrivals/:product_code"
                        element={<ProductDetailPage />}
                      />
                      <Route path="best-sellers" element={<BestSellerPage />} />
                      <Route
                        path="best-sellers/:product_code"
                        element={<ProductDetailPage />}
                      />
                      <Route path="shop-icons" element={<ShopIconsPage />} />
                      <Route
                        path="shop-icons/:product_code"
                        element={<ProductDetailPage />}
                      />
                    </Route>
                    <Route path="login" element={<LogInPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="contact" element={<ContactPage />} />
                  </Route>
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </ProductsProvider>
            </RoutesProvider>
          </SoundsProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
