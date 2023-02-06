import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { adminRouter, publicRouter } from "./routers/route";
import "./style.css";
import { ToastContainer } from "react-toastify";
import { createContext, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./loading/Loading";
export const UserContext = createContext();
function App() {
    const [store, setStore] = useState({ rule: "admin" });
    const auth = useSelector((state) => state.auth);
    return (
        <UserContext.Provider value={{ store, setStore }}>
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
                        {store.rule === "admin" &&
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
                    </Routes>
                    <ToastContainer
                        autoClose={1500}
                        style={{ fontSize: "1.5rem" }}
                    />
                    {auth.loading && <Loading />}
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;
