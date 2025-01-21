import AboutUsPage from "../pages/AboutUsPage";
import CheckOutPage from "../pages/CheckOutPage/CheckOutPage";
import ContactUsPage from "../pages/ContactUsPage";
import FaqsPage from "../pages/FaqsPage";
import HomePage from "../pages/HomePage";
import CategoryMobile from "../pages/MobilePages/CategoryMobile";
import ProfilePage from "../pages/MobilePages/ProfilePage";
import MyOrderPage from "../pages/OrderPages/MyOrderPage";
import OrderDetails from "../pages/OrderPages/OrderDetails";
import PrivancyPolicy from "../pages/PrivancyPolicy";
import ProductDetails from "../pages/ProductDetails";
import ProductPage from "../pages/ProductPage";
import TermAndConditionPage from "../pages/TermAndConditionPage";
import WishlistPage from "../pages/WishlistPage";

const publicRoutes = [
    { path: '/', element: <HomePage /> },
    { path: '/products-page', element: <ProductPage /> },
    { path: '/product/:id/:name', element: <ProductDetails /> },
    { path: '/my-order', element: <MyOrderPage /> },
    { path: '/wishlist', element: <WishlistPage /> },
    { path: '/checkout-page', element: <CheckOutPage /> },
    { path: '/my-order/order-details', element: <OrderDetails /> },
    { path: '/about-us', element: <AboutUsPage /> },
    { path: '/privacy-policy', element: <PrivancyPolicy /> },
    { path: '/term-condition', element: <TermAndConditionPage /> },
    { path: '/faq', element: <FaqsPage /> },
    { path: '/contact-us', element: <ContactUsPage /> },
    { path: '/profile', element: <ProfilePage /> },
    { path: '/mobile-category', element: <CategoryMobile /> },
    { path: "/orders-details/:orderId", element: <OrderDetails /> },

];


export { publicRoutes };