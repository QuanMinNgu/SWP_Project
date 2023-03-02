import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UserContext } from "../../App";
import CourseVoucherCard from "./CourseVoucherCard";
import { isSuccess, isLoading, isFailing } from "../../redux/slice/auth";
import axios from "axios";

function CourseVoucher({ chooseCourse, setChooseCourse }) {
  const [choose, setChoose] = useState(false);
  const { cache } = useContext(UserContext);
  const [course, setCourse] = useState([]);
  const dispatch = useDispatch();
  const handleDelete = (index) => {
    chooseCourse.splice(index, 1);
    setChooseCourse([...chooseCourse]);
  };
  useEffect(() => {
    let here = true;
    const url = "/api/common/courses";
    if (cache.current[url]) {
      console.log(cache.current[url]);
      return setCourse(cache.current[url]);
    }
    dispatch(isLoading());
    axios
      .get(url)
      .then((res) => {
        if (!here) {
          return;
        }
        setCourse(res?.data?.courses);
        console.log(res?.data);
        cache.current[url] = res?.data?.courses;
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
          <div className="course_voucher_img" key={index}>
            <label>{index + 1}</label>
            <img src="https://i.pinimg.com/564x/2f/43/f0/2f43f073029d048aabf31c314ddb3037.jpg" />
            <div>
              <button className="button" onClick={() => handleDelete(index)}>
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
            <div className="modal_body">
              {course.map((item, index) => {
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseVoucher;
