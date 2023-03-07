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
  const type = [
    { value: "course", label: "Course" },
    { value: "typeCourse", label: "TypeOfCourse" },
  ];
  const handleSelectType = (choice) => {
    console.log(typeVoucher);
    setChooseCourse([]);
    setTypeVoucher(choice.value);
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
      if (typeVoucher === "course") {
        data = {
          name: title,
          description: des,
          amount: value,
          duration: duration,
          StartApply: apply,
          type: typeVoucher,
          courseID: chooseCourse[0]?.courseID,
        };
      }
      if (typeVoucher === "typeCourse") {
        data = {
          name: title,
          description: des,
          amount: value,
          duration: duration,
          StartApply: apply,
          type: typeVoucher,
          courseTypeID: chooseCourse,
        };
      }
      console.log({
        name: title,
        Description: des,
        Price: value,
        Duration: duration,
        StartApply: apply,
        type: typeVoucher,
        courseID: chooseCourse[0]?.courseID,
      });
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
      console.log(res?.data);
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
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
          </div>

          <div className="voucher_left_header_des">
            <input
              value={des}
              type="text"
              onChange={(e) => setDes(e.target.value)}
              placeholder="Enter description"
            />
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
                defaultValue={type[0]}
                onChange={(choice) => handleSelectType(choice)}
                className="select_option"
              />
            </div>
            {typeVoucher === "course" && (
              <CourseVoucher
                chooseCourse={chooseCourse}
                setChooseCourse={setChooseCourse}
              />
            )}
            {typeVoucher === "typeCourse" && (
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
