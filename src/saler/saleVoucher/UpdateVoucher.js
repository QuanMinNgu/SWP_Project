import React, { useEffect, useRef, useState, useCallback } from "react";
import Select from "react-select";
import CourseTypeVoucher from "./CourseTypeVoucher";
import CourseVoucher from "./CourseVoucher";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function UpdateVoucher() {
  let { slug } = useParams();
  console.log(slug);
  const valueRef = useRef();
  const [image, setImage] = useState("");
  const startRef = useRef();
  const toRef = useRef();
  const titleRef = useRef();
  const desRef = useRef("");
  const [value, setValue] = useState("");
  const [typeVoucher, setTypeVoucher] = useState("course");
  const [chooseCourse, setChooseCourse] = useState([1, 2, 3]);
  let startDate = format(new Date(), "yyyy-MM-dd");
  const type = [
    { value: "course", label: "Course" },
    { value: "typeCourse", label: "TypeOfCourse" },
  ];
  useEffect(() => {
    console.log(titleRef.current.value);
  }, [titleRef]);
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
  const handleCreateNewVoucher = () => {
    if (value === "") {
      valueRef.current.focus();
      return toast.error("Plese remeber enter value");
    }
    const data = {
      Name: titleRef.current.innerHTML,
      Description: desRef.current.innerHTML,
      Price: value,
      StartDate: startRef.current.value,
      ToDate: toRef.current.value,
      type: chooseCourse,
    };
    console.log(data);
  };
  return (
    <div className="create_voucher">
      <div className="voucher_left">
        <div className="voucher_left_header">
          <h3 contentEditable ref={titleRef}>
            Name of voucher (can edit)
          </h3>
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

export default UpdateVoucher;
