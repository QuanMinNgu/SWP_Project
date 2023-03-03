import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../../App";
import CourseVoucherCard from "./CourseVoucherCard";
import { isSuccess, isLoading, isFailing } from "../../redux/slice/auth";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Pagination from "../../paginating/Pagination";

function CourseVoucher({ chooseCourse, setChooseCourse }) {
  const [choose, setChoose] = useState(false);
  const { cache } = useContext(UserContext);
  const [course, setCourse] = useState([]);
  const [searchText, setSearchText] = useState("");
  const auth = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const handleDelete = (index) => {
    chooseCourse.splice(index, 1);
    setChooseCourse([...chooseCourse]);
  };
  const { search } = useLocation();
  const page = new URLSearchParams(search).get("page") || 1;

  useEffect(() => {
    let here = true;
    const url = `/api/common/course/getAllCourse?page=${page}&limit=20`;
    if (cache.current[url]) {
      console.log(cache.current[url]);
      return setCourse(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url, {
        headers: {
          token: auth?.user?.token,
        },
      })
      .then((res) => {
        if (!here) {
          return;
        }
        setCourse(res?.data);
        console.log(res?.data);
        cache.current[url] = res?.data;
        dispatch(isSuccess());
      })
      .catch((err) => {
        dispatch(isFailing());
      });
    return () => {
      here = false;
    };
  }, []);
  return (
    <div className="course_voucher">
      <label>Course:</label>
      <div className="course_voucher_choose">
        <button className="button" onClick={() => setChoose(true)}>
          Choose
        </button>
      </div>
      {chooseCourse.map((item, index) => {
        return (
          <div
            style={{
              width: "100%",
              marginTop: "1rem",
              display: "flex",
            }}
          >
            <CourseVoucherCard item={item} index={index} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <button
                onClick={handleDelete}
                className="button"
                style={{
                  height: "30px",
                  backgroundColor: "#e7c340",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
      {choose && (
        <div className="course_modal">
          <div className="course_modal_warper">
            <div className="modal_header">
              <h3>Course</h3>
              <i
                className="fa-solid fa-xmark"
                onClick={() => setChoose(false)}
              ></i>
            </div>
            <div className="modal_search">
              <input
                value={search}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="modal_body">
              {course?.courses?.map((item, index) => {
                return (
                  <CourseVoucherCard
                    item={item}
                    index={index}
                    setChoose={setChoose}
                    setChooseCourse={setChooseCourse}
                    chooseCourse={chooseCourse}
                  />
                );
              })}
              <div className="pagination">
                <Pagination count={course?.numPage} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseVoucher;
