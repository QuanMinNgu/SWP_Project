import React, { useEffect, useRef, useState, useCallback } from "react";
import Select from "react-select";
import CourseTypeVoucher from "./CourseTypeVoucher";
import CourseVoucher from "./CourseVoucher";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";
import axios from "axios";
import { useLocation } from "react-router-dom";

function UpdateVoucher() {
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
  const [voucher, setVoucher] = useState();
  const { search } = useLocation();
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
      return toast.error("Please fill duration and apply");
    }
    if (!chooseCourse || chooseCourse.length === 0) {
      return toast.error("Please choose type of voucher");
    }
    try {
      let data;
      if (typeVoucher?.value === "course") {
        data = {
          voucherID: voucher?.voucherID,
          name: title,
          description: des,
          amount: value,
          duration: duration,
          startApply: apply,
          type: typeVoucher.value,
          courseID: chooseCourse[0]?.courseID,
        };
        console.log({
          voucherID: voucher?.voucherID,
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
          voucherID: voucher?.voucherID,
          name: title,
          description: des,
          amount: value,
          duration: duration,
          startApply: apply,
          type: typeVoucher.value,
          courseTypeID: chooseCourse?.courseTypeID,
        };
        console.log({
          voucherID: voucher?.voucherID,
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
      console.log(res?.data);
      return toast.success(res?.data?.msg);
    } catch (error) {
      dispatch(isFailing());
      return toast.error(error?.response?.data?.msg);
    }
  };
  useEffect(() => {
    dispatch(isLoading());
    axios
      .get(`/api/voucher/update${search}`, {
        headers: { token: auth?.user?.token },
      })
      .then((res) => {
        console.log(res?.data);
        setVoucher(res?.data?.voucher);
        setTitle(res?.data?.voucher?.name);
        setDes(res?.data?.voucher?.description);
        setValue(res?.data?.voucher?.amount);
        setDuration(res?.data?.voucher?.duration);
        setApply(res?.data?.voucher?.startApply);
        if (res?.data?.voucher?.type === "course") {
          setTypeVoucher({
            value: res?.data?.voucher?.type,
            label: "Course",
          });
          setChooseCourse([
            {
              courseID: res?.data?.voucher?.courseDTO?.courseID,
              image: res?.data?.voucher?.courseDTO?.image,
              courseName: res?.data?.voucher?.courseDTO?.courseName,
            },
          ]);
        } else {
          setTypeVoucher({
            value: res?.data?.voucher?.type,
            label: "TypeOfCourse",
          });
          setChooseCourse({
            courseTypeID: res?.data?.voucher?.courseTypeDTO?.courseTypeID,
            courseTypeName: res?.data?.voucher?.courseTypeDTO?.courseTypeName,
          });
        }
        return dispatch(isSuccess());
      })
      .catch((error) => {
        dispatch(isFailing());
        return toast.error(error?.response?.data?.msg);
      });
  }, []);
  useEffect(() => {
    console.log(typeVoucher);
  }, [typeVoucher]);
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
              type="text"
              value={des}
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

export default UpdateVoucher;
