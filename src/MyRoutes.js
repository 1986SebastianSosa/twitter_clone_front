import { Routes, Route } from "react-router-dom";
import Success from "./components/Success";
import Failure from "./components/Failure";
import FreeRoute from "./components/authTest/FreeRoute";
import ProtectedRoute from "./components/authTest/ProtectedRoute";

import Home from "./routes/home/Home";
import Access from "./routes/auth/Access";
import Follow from "./routes/follow/Follow";
import TweetPage from "./routes/tweetPage/TweetPage";

const MyRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Access />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tweet/:id" element={<TweetPage />} />
        <Route path="/follow/:id" element={<Follow />} />
      </Routes>
    </>
  );
};

export default MyRoutes;
