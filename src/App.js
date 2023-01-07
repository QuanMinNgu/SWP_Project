import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRouter } from "./routers/route";
import "./style.css";

function App() {
    return (
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
                                    <item.layout>
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
            </div>
        </Router>
    );
}

export default App;
