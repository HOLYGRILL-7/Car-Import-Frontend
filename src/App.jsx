import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/Admin/AdminRoute";
import PageLoader from "./components/PageLoader";
import Home from "./pages/PublicPages/Home/Home";

// Every page except Home is downloaded only when first visited, so the
// admin, login and wishlist code stays out of the first load. Layout and
// AdminLayout show a PageLoader in place of the page meanwhile.
const Login = lazy(() => import("./components/LoginForm/Login"));
const Register = lazy(() => import("./components/RegisterForm/Register"));
const UsedCars = lazy(() => import("./pages/PublicPages/UsedCars"));
const NewCars = lazy(() => import("./pages/PublicPages/NewCars"));
const Services = lazy(() => import("./pages/PublicPages/Services"));
const Reviews = lazy(() => import("./pages/PublicPages/Reviews"));
const FAQ = lazy(() => import("./pages/PublicPages/FAQ"));
const Contact = lazy(() => import("./pages/PublicPages/Contact"));
const NotFound = lazy(() => import("./pages/PublicPages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutPages/AboutUs"));
const About = lazy(() => import("./pages/AboutPages/About"));
const Team = lazy(() => import("./pages/AboutPages/Team"));
const Press = lazy(() => import("./pages/AboutPages/Press"));
const Wishlist = lazy(() => import("./pages/UserPages/Wishlist"));
const AdminLayout = lazy(() => import("./layout/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/AdminPages/AdminDashboard"));
const ManageCars = lazy(() => import("./pages/AdminPages/ManageCars"));
const ManageUsers = lazy(() => import("./pages/AdminPages/ManageUsers"));
const ManageTestimonials = lazy(
  () => import("./pages/AdminPages/ManageTestimonials"),
);
const CarDetails = lazy(
  () => import("./pages/PublicPages/CarDetails/CarDetails"),
);
const ResetPasswordAction = lazy(
  () => import("./pages/PublicPages/ResetPasswordAction"),
);

const App = () => {
  return (
    // Catches the pages outside Layout (login, register, the admin layout).
    <Suspense fallback={<PageLoader />}>
      <AppRoutes />
    </Suspense>
  );
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes WITH Layout (Navbar + Footer) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/newCars" element={<NewCars />} />
        <Route path="/usedCars" element={<UsedCars />} />
        <Route path="/services" element={<Services />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth/action" element={<ResetPasswordAction />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/carDetails/:id" element={<CarDetails />} />

        {/* About routes */}
        <Route path="/about" element={<AboutUs />}>
          <Route index element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="press" element={<Press />} />
        </Route>

        {/* Protected USER routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
      </Route>

      {/* Protected ADMIN routes (separate layout, no public navbar) */}
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="cars" element={<ManageCars />} />
          <Route path="testimonials" element={<ManageTestimonials />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
      </Route>

      {/* Auth routes WITHOUT Layout (no Navbar/Footer) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default App;
