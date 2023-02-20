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
  const optionsKind = [
    {
      value: "",
      label: "Course Expert",
    },
    {
      value: "",
      label: "Sale",
    },
    {
      value: "",
      label: "Admin",
    },
    {
      value: "",
      label: "User",
    },
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
  const [types, setTypes] = useState([]);

  const [userUpdate, setUserUpdate] = useState(false);

<<<<<<< HEAD
  useEffect(() => {
    let here = true;
    const url = "/api/type_course";
    if (cache.current[url]) {
      return setTypes(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setTypes(res?.data?.types);
        cache.current[url] = res?.data?.types;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
=======
	useEffect(() => {
		let here = true;
		const url = "/api/type_course";
		if (cache.current[url]) {
			return setTypes(cache.current[url]);
		}
		dispatch(isLoading());
		axios
			.get(url, {
				headers: {
					token: auth.user?.token,
				},
			})
			.then((res) => {
				if (!here) {
					return;
				}
				setTypes(res?.data?.types);
				cache.current[url] = res?.data?.types;
				dispatch(isSuccess());
			})
			.catch((err) => {
				dispatch(isFailing());
			});
		return () => {
			here = false;
		};
	}, []);
>>>>>>> d47920b8fb7b515f035607788c9ae70cd35b9ce9

  useEffect(() => {
    let here = true;
    const url = `/api/account?page=1&limit=20`;
    dispatch(isLoading());
    axios
      .get(url, {
        headers: {
          token: `${auth.user?.token}`,
        },
      })
      .then((res) => {
        if (!here) {
          return dispatch(isSuccess());
        }
        setUsers(res?.data?.users);
        cache.current[url] = res?.data?.users;
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
  }, [userUpdate]);

  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div className="managerCourse">
      <div className="managerCourse_navbar">
        <Select
          className="search_wrap_select"
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={optionsKind}
          placeholder="Role"
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
              <UserManagerCard
                userUpdate={userUpdate}
                setUserUpdate={setUserUpdate}
                key={item?.gmail}
                item={item}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination limit={20} />
      </div>
    </div>
  );
};

export default UserManager;
