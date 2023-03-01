import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import "../style.scss";
import { UserContext } from "../../App";
import BlogAdminCard from "./BlogAdminCard";
import "./main.scss";
import Pagination from "../../paginating/Pagination";
import { useLocation } from "react-router-dom";
import Select from "react-select";

const BlogManager = () => {
  const { search } = useLocation();
  const page = new URLSearchParams(search).get("page") || 1;

  const [types, setTypes] = useState([]);
  const { cache } = useContext(UserContext);
  const dispatch = useDispatch();
  const [listBlog, setListBlog] = useState([]);
  const [update, setUpdate] = useState(false);
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
  const [selectedOption, setSelectedOption] = useState(null);

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
  useEffect(() => {
    let here = true;
    const url = `/api/common/blog?page=${page}&limit=20`;
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return dispatch(isSuccess());
        }
        setListBlog(res?.data);
        cache.current[url] = res?.data;
        console.log(res?.data);
        dispatch(isSuccess());
      })
      .catch((err) => {
        if (!here) {
          return dispatch(isFailing());
        }
        dispatch(isFailing());
        toast.error(err?.response?.data?.msg);
      });
    return () => {
      here = false;
    };
  }, [update]);
  console.log(cache);

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
              <th className="b_tstt">STT</th>
              <th className="b_tuser">User</th>
              <th className="b_tblog">Name</th>
              <th className="b_tbars"></th>
            </tr>
          </thead>
          <tbody>
            {listBlog?.blogs?.map((item, index) => {
              return (
                <BlogAdminCard
                  item={item}
                  index={index}
                  setUpdate={setUpdate}
                  update={update}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <Pagination count={listBlog?.numPage} />
      </div>
    </div>
  );
};

export default BlogManager;
