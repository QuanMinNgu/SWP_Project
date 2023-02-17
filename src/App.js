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
export const UserContext = createContext();
function App() {
	const [store, setStore] = useState({ rule: "[ROLE_ADMIN]" });

	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	// useEffect(() => {
	// 	if (auth.user?.token) {
	// 		const decoded = jwt_decode(auth.user?.token);
	// 		setStore({ rule: decoded.sub });
	// 		console.log(decoded);
	// 	}
	// }, [auth.user?.token]);
	useEffect(() => {
		dispatch(isSuccess());
	}, []);
	const cacheRef = useRef({});

	return (
		<UserContext.Provider value={{ store, setStore, cache: cacheRef }}>
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
						{store.rule === "[ROLE_ADMIN]" &&
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
						{store.rule === "[ROLE_SALE]" &&
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
						{store.rule === "[ROLE_COURSE_EXPERT]" &&
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
					</Routes>
					<ToastContainer autoClose={2000} style={{ fontSize: "1.5rem" }} />
					{auth.loading && <Loading />}
				</div>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
