import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  adminRouter,
  courseExpertRouter,
  publicRouter,
  saleRouter,
} from "./routers/route";
import "./style.css";
import { ToastContainer } from "react-toastify";
import { createContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading/Loading";
import { isSuccess } from "./redux/slice/auth";
import jwt_decode from "jwt-decode";
import NotFound from "./notfound/NotFound";
import { w3cwebsocket } from "websocket";
export const UserContext = createContext();
function App() {
  const [store, setStore] = useState({ rule: "[ROLE_SALE]" });

  const [retype, setReType] = useState("home");

  useEffect(() => {
    setReType("home");
  }, []);

  const [socket, setSocket] = useState("");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.user?.token) {
      const decoded = jwt_decode(auth.user?.token);
      setStore({ rule: decoded.sub });
    } else {
      setStore({ rule: "user" });
    }
  }, [auth.user?.token]);
  useEffect(() => {
    dispatch(isSuccess());
  }, []);
  const cacheRef = useRef({});
  useEffect(() => {
    const socket = new w3cwebsocket("ws://localhost:8080/websocket");
    setSocket(socket);
    socket.onopen = () => {
      console.log("WebSocket connection opened");
      socket.send("Hello, WebSocket server!");
    };
    socket.onerror((err) => {
      console.log(err);
    });
  }, []);
  return (
    <UserContext.Provider
      value={{ store, setStore, cache: cacheRef, socket, setReType, retype }}
    >
      <Router>
        <div className="App">
          <Routes>
            {publicRouter.map((item, index) => {
              const Page = item.element;
              return item.layout ? (
                <Route
                  key={index + "routerpriva"}
                  path={item.path}
                  element={
                    <item.layout type={item?.type}>
                      <Page />
                    </item.layout>
                  }
                />
              ) : (
                <Route
                  key={item?.path + index}
                  path={item?.path}
                  element={<Page />}
                />
              );
            })}
            {store.rule === "ROLE_ADMIN" &&
              adminRouter.map((item, index) => {
                const Page = item.element;
                return item.layout ? (
                  <Route
                    key={index + "adminrouter"}
                    path={item.path}
                    element={
                      <item.layout type={item?.type}>
                        <Page />
                      </item.layout>
                    }
                  />
                ) : (
                  <Route
                    key={item?.path + index}
                    path={item?.path}
                    element={<Page />}
                  />
                );
              })}
            {store.rule === "ROLE_SALE" &&
              saleRouter.map((item, index) => {
                const Page = item.element;
                return item.layout ? (
                  <Route
                    key={index + "saleRouter"}
                    path={item.path}
                    element={
                      <item.layout type={item?.type}>
                        <Page />
                      </item.layout>
                    }
                  />
                ) : (
                  <Route
                    key={item?.path + index}
                    path={item?.path}
                    element={<Page />}
                  />
                );
              })}
            {store.rule === "ROLE_COURSE_EXPERT" &&
              courseExpertRouter.map((item, index) => {
                const Page = item.element;
                return item.layout ? (
                  <Route
                    key={index + "courseExpert"}
                    path={item.path}
                    element={
                      <item.layout type={item?.type}>
                        <Page />
                      </item.layout>
                    }
                  />
                ) : (
                  <Route
                    key={item?.path + index}
                    path={item?.path}
                    element={<Page />}
                  />
                );
              })}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <ToastContainer
            autoClose={10000}
            style={{ fontSize: "1.5rem", zIndex: "100002" }}
          />
          {auth.loading && <Loading />}
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
