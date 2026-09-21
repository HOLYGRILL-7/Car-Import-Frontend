import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/Admin/AdminRoute";
import Home from "./pages/PublicPages/Home/Home";
import Login from "./components/LoginForm/Login";
import Register from "./components/RegisterForm/Register";
import UsedCars from "./pages/PublicPages/UsedCars";
import NewCars from "./pages/PublicPages/NewCars";
import Services from "./pages/PublicPages/Services";
import Reviews from "./pages/PublicPages/Reviews";
import FAQ from "./pages/PublicPages/FAQ";
import Contact from "./pages/PublicPages/Contact";
import NotFound from "./pages/PublicPages/NotFound";
import AboutUs from "./pages/AboutPages/AboutUs";
import About from "./pages/AboutPages/About";
import Team from "./pages/AboutPages/Team";
import Press from "./pages/AboutPages/Press";
import Dashboard from "./pages/UserPages/Dashboard";
import TrackMyOrder from "./pages/UserPages/TrackMyOrder";
import MyProfile from "./pages/UserPages/MyProfile";
import MyOrder from "./pages/UserPages/MyOrder";
import Wishlist from "./pages/UserPages/Wishlist";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/AdminPages/AdminDashboard";
import ManageCars from "./pages/AdminPages/ManageCars";
import ManageUsers from "./pages/AdminPages/ManageUsers";
import ManageTestimonials from "./pages/AdminPages/ManageTestimonials";
import CarDetails from "./pages/PublicPages/CarDetails/CarDetails";

const App = () => {
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
          <Route path="/users/dashboard" element={<Dashboard />} />
          <Route path="/trackOrder" element={<TrackMyOrder />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/myOrders" element={<MyOrder />} />
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
