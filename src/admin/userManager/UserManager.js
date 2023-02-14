import React, { useContext, useEffect, useState } from "react";
import "../style.scss";
import Select from "react-select";
import Pagination from "../../paginating/Pagination";
import UserManagerCard from "./UserManagerCard";
import { UserContext } from "../../App";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import { toast } from "react-toastify";
const UserManager = () => {
    const options = [
        { value: "free", label: "Free" },
        { value: "no-free", label: "Not Free" },
    ];

    const optionsKind = [
        { value: "ha-noi", label: "Software" },
        { value: "strawberry", label: "Financial" },
        { value: "vanilla", label: "Marketing" },
    ];

    const optionsSort = [
        { value: "vanilla", label: "Stars Increased" },
        { value: "asd", label: "Stars Decreased" },
        { value: "vaniasdlla", label: "Newest" },
        { value: "vanilsla", label: "Oldest" },
    ];

    const auth = useSelector((state) => state.auth);
    const { cache } = useContext(UserContext);

    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        let here = true;
        const url = `/api/account?limit=20&token=${auth.user?.accessToken}`;
        if (cache.current[url]) {
            return setUsers(cache.current[url]);
        }
        dispatch(isLoading());
        axios
            .get(url)
            .then((res) => {
                if (!here) {
                    return dispatch(isSuccess());
                }
                setUsers(res?.data?.users);
                dispatch(isSuccess());
            })
            .catch((err) => {
                if (here) {
                    toast.error(err?.response?.data?.msg);
                }
                dispatch(isFailing());
            });
        return () => {
            here = false;
        };
    }, []);

    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div className="managerCourse">
            <div className="managerCourse_navbar">
                <Select
                    className="search_wrap_select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={options}
                    placeholder="Price"
                />
                <Select
                    className="search_wrap_select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={optionsKind}
                    placeholder="Kind"
                />
                <Select
                    className="search_wrap_select"
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={optionsSort}
                    placeholder="Sort"
                />
                <button>Tìm Kiếm</button>
            </div>
            <div className="manageCourse_table">
                <table className="s_table">
                    <thead className="s_thead">
                        <tr className="s_trow">
                            <th className="u_tstt">STT</th>
                            <th className="u_tuser">User</th>
                            <th className="u_trule">Role</th>
                            <th className="u_tbars"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((item) => (
                            <UserManagerCard key={item?.gmail} item={item} />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <Pagination />
            </div>
        </div>
    );
};

export default UserManager;
