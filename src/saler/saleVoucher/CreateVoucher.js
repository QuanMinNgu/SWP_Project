import React, { useEffect, useRef, useState, useCallback } from "react";
import Select from "react-select";
import CourseTypeVoucher from "./CourseTypeVoucher";
import CourseVoucher from "./CourseVoucher";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";

function CreateVoucher() {
  const valueRef = useRef();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [value, setValue] = useState("");
  const [typeVoucher, setTypeVoucher] = useState("course");
  const [chooseCourse, setChooseCourse] = useState([]);
  const [duration, setDuration] = useState();
  const [apply, setApply] = useState();
  const [msg, setMsg] = useState({});
  const type = [
    { value: "course", label: "Course" },
    { value: "typeCourse", label: "TypeOfCourse" },
  ];
  const handleSelectType = (choice) => {
    console.log(typeVoucher);
    setChooseCourse([]);
    setTypeVoucher(choice);
  };
  const handleCreateNewVoucher = async () => {
    if (title === "") {
      window.scrollTo({
        top: 0,
        left: 100,
        behavior: "smooth",
      });
      return toast.error("Enter title before create a voucher");
    }
    if (value === "") {
      valueRef.current.focus();
      return toast.error("Plese remeber enter value");
    }
    if (!duration || !apply) {
      return toast.error("Please fill all");
    }
    if (!chooseCourse || chooseCourse.length === 0) {
      return toast.error("Please fill all");
    }
    try {
      let data;
      if (typeVoucher?.value === "course") {
        data = {
          name: title,
          description: des,
          amount: value,
          duration: duration,
          startApply: apply,
          type: typeVoucher.value,
          courseID: chooseCourse[0]?.courseID,
        };
        console.log({
          name: title,
          description: des,
          amount: value,
          duration: duration,
          startApply: apply,
          type: typeVoucher.value,
          courseID: chooseCourse[0]?.courseID,
        });
      }
      if (typeVoucher?.value === "typeCourse") {
        data = {
          name: title,
          description: des,
          amount: value,
          duration: duration,
          startApply: apply,
          type: typeVoucher.value,
          courseTypeID: chooseCourse?.courseTypeID,
        };
        console.log({
          name: title,
          description: des,
          amount: value,
          duration: duration,
          startApply: apply,
          type: typeVoucher.value,
          courseTypeID: chooseCourse?.courseTypeID,
        });
      }
      dispatch(isLoading());
      const res = await axios.post("/api/voucher/create", data, {
        headers: {
          token: auth?.user?.token,
        },
      });
      dispatch(isSuccess());
      setTitle("");
      setDes("");
      setValue("");
      setChooseCourse([]);
      setDuration("");
      setApply("");
      setMsg({});
      console.log(res?.data);
      return toast.success(res?.data?.msg);
    } catch (err) {
      dispatch(isFailing());
      let msg = {};
      if (err?.response?.data?.msgProgress) {
        err?.response?.data?.msgProgress?.forEach((item) => {
          msg[item?.errorName] = item?.message;
        });
      }
      if (err?.response?.data?.msg) {
        return toast.error(err?.response?.data?.msg);
      }
      setMsg({ ...msg });
      return;
    }
  };
  useEffect(() => {
    setMsg({});
  }, [title, des]);
  return (
    <div className="create_voucher">
      <div className="voucher_left">
        <div className="voucher_left_header">
          <div className="voucher_left_header_title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter Name of Voucher"
            />
            {msg["name"] && (
              <div className="title_blog_msg">* {msg["name"]}</div>
            )}
          </div>

          <div className="voucher_left_header_des">
            <input
              value={des}
              type="text"
              onChange={(e) => setDes(e.target.value)}
              placeholder="Enter description"
            />
            {msg["description"] && (
              <div className="des_blog_msg">* {msg["description"]}</div>
            )}
          </div>
        </div>
        <div className="voucher_left_body">
          <div className="voucher_left_body_value">
            <label>Value of Voucher:</label>
            <input
              type="number"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder="Enter a number"
              ref={valueRef}
            />
          </div>
          <div className="voucher_left_body_type">
            <div>
              <label>Type:</label>
              <Select
                options={type}
                value={typeVoucher}
                onChange={(choice) => handleSelectType(choice)}
                className="select_option"
              />
            </div>
            {typeVoucher?.value === "course" && (
              <CourseVoucher
                chooseCourse={chooseCourse}
                setChooseCourse={setChooseCourse}
              />
            )}
            {typeVoucher?.value === "typeCourse" && (
              <CourseTypeVoucher
                chooseCourse={chooseCourse}
                setChooseCourse={setChooseCourse}
              />
            )}
          </div>
        </div>
        <div className="voucher_left_bottom">
          <label>Duration :</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Đơn vị : Ngày"
          />
          <label>Apply :</label>
          <input
            type="number"
            value={apply}
            onChange={(e) => setApply(e.target.value)}
            placeholder="Đơn vị : Ngày"
          />
        </div>
        <div className="voucher_bottom">
          <button
            className="button"
            style={{
              marginTop: "2rem",
              padding: "1rem 2rem",
            }}
            onClick={handleCreateNewVoucher}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateVoucher;
