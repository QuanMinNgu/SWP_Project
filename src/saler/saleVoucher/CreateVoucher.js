import React, { useEffect, useRef, useState, useCallback } from "react";
import Select from "react-select";
import CourseTypeVoucher from "./CourseTypeVoucher";
import CourseVoucher from "./CourseVoucher";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";

function CreateVoucher() {
  const valueRef = useRef();
  const startRef = useRef();
  const toRef = useRef();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth);
  const [title, setTitle] = useState("");
  const desRef = useRef("");
  const [value, setValue] = useState("");
  const [typeVoucher, setTypeVoucher] = useState("course");
  const [chooseCourse, setChooseCourse] = useState([]);
  let startDate = format(new Date(), "yyyy-MM-dd");
  const type = [
    { value: "course", label: "Course" },
    { value: "typeCourse", label: "TypeOfCourse" },
  ];
  const handleSelectType = (choice) => {
    console.log(typeVoucher);
    setChooseCourse([]);
    setTypeVoucher(choice.value);
  };
  const handleChangeTime = (e) => {
    if (startRef.current.value < startDate) {
      startRef.current.value = startDate;
      return toast.error("Only equal or more time current");
    }
    if (startRef.current.value > e.target.value) {
      toRef.current.value = startRef.current.value;
      return toast.error("Please enter to date more than start");
    }
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
    if (!chooseCourse || chooseCourse.length === 0) {
      return toast.error("Please fill all");
    }
    console.log({
      Name: title,
      Description: desRef.current.innerHTML,
      Price: value,
      StartDate: startRef.current.value,
      ToDate: toRef.current.value,
      type: typeVoucher,
      id: chooseCourse,
    });
    try {
      dispatch(isLoading());
      const res = await axios.post("/api/voucher/create", {
        Name: title,
        Description: desRef.current.innerHTML,
        Price: value,
        StartDate: startRef.current.value,
        ToDate: toRef.current.value,
        type: typeVoucher,
        id: chooseCourse,
        token: auth?.user?.token,
      });
      dispatch(isSuccess());
      console.log(res?.data);
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.responese?.data?.msg);
    }
  };
  return (
    <div className="create_voucher">
      <div className="voucher_left">
        <div className="voucher_left_header">
          <div
            className="voucher_left_header_title"
            contentEditable
            onInput={(e) => setTitle(e.target.innerHTML)}
          ></div>
          {!title && <div className="title_voucher">Title of Voucher</div>}
          <div className="voucher_left_header_des">
            <p contentEditable ref={desRef}>
              Description of voucher
            </p>
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
          <label>Time Apply :</label>
          <input
            type="date"
            ref={startRef}
            defaultValue={startDate}
            onChange={(e) => handleChangeTime(e)}
          />
          <label>To :</label>
          <input
            type="date"
            ref={toRef}
            defaultValue={startDate}
            onChange={(e) => handleChangeTime(e)}
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
