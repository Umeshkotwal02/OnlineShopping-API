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

const authProtectedRoutes = [
];

const publicRoutes = [
    { path: '/home', component: HomePage },
    // { path: "/products/:category", component: ProductPage },
    // { path: "/products/details/:productId", component: ProductDetails },
    { path: "/products-page", component: ProductPage },
    { path: "/products/details", component: ProductDetails },
    { path: "/my-order", component: MyOrderPage },
    { path: "/wishlist", component: WishlistPage },
    { path: "/checkout-page", component: CheckOutPage },
    { path: "/my-order/order-details", component: OrderDetails },
    { path: "/about-us", component: AboutUsPage },
    { path: "/privacy-policy", component: PrivancyPolicy },
    { path: "/term-condition", component: TermAndConditionPage },
    { path: "/faq", component: FaqsPage },
    { path: "/contact-us", component: ContactUsPage },
    { path: "/profile", component: ProfilePage },
    { path: "/mobile-category", component: CategoryMobile },
];

export { authProtectedRoutes, publicRoutes };