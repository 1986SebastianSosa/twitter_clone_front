import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Access from "./routes/auth/Access";
import Follow from "./routes/follow/Follow";
import Home from "./routes/home/Home";
import TweetPage from "./routes/tweetPage/TweetPage";
import RequireAuth from "./components/requireAuth/RequireAuth";
import Layout from "./components/Layout/Layout";
import ErrorPage from "./components/error/ErrorPage";

function App() {
  console.log("app");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Access />} />
        <Route element={<RequireAuth />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="tweet/:id" element={<TweetPage />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="follow/:id" element={<Follow />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

export default App;
