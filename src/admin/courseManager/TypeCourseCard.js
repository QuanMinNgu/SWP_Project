import axios from "axios";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isFailing, isLoading, isSuccess } from "../../redux/slice/auth";

const TypeCourseCard = ({ item }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleDeleteType = async () => {
    const check = window.confirm("Do you wanna delete this type?");
    if (check) {
      dispatch(isLoading());
      try {
        const data = await axios.post(
          `/api/type_course/delete?id=${item?.id}`,
          {
            token: auth.user?.accessToken,
          }
        );
        dispatch(isSuccess());
        toast.success(data?.data?.msg);
      } catch (err) {
        dispatch(isFailing());
        return toast.error(err?.response?.data?.msg);
      }
    }
  };

  const [edit, setEdit] = useState(false);

  const titleRef = useRef();
  const handleUpdateNewType = async () => {
    if (!titleRef.current.value) {
      return toast.error("Vui lòng điền thông tin.");
    }
    dispatch(isLoading());
    console.log({
      token: auth.user?.accessToken,
      courseTypeName: titleRef.current.value,
    });
    try {
      const data = await axios.post(`/api/type_course/update?id=${item?.id}`, {
        token: auth.user?.accessToken,
        courseTypeName: titleRef.current.value,
      });
      dispatch(isSuccess());
      toast.success(data?.data?.msg);
    } catch (err) {
      dispatch(isFailing());
      return toast.error(err?.response?.data?.msg);
    }
  };
  return (
    <div className="expertCourse_type_remain_card">
      {item?.courseTypeName}
      <div className="expertCourse_type_remain_card_abs">
        <button
          onClick={() => {
            setEdit(true);
          }}
          style={{ height: "3rem" }}
          className="button button_update"
        >
          Edit
        </button>
        <button
          onClick={handleDeleteType}
          style={{ height: "3rem" }}
          className="button button_delete"
        >
          Delete
        </button>
      </div>
      {edit && (
        <div className="edit_type_course">
          <div className="edit_type_course_form">
            <div className="expertCourse_close">
              <div
                onClick={() => {
                  setEdit(false);
                }}
                style={{ color: "black" }}
                className="expertCourse_close_icons"
              >
                &times;
              </div>
            </div>
            <textarea
              ref={titleRef}
              defaultValue={item?.courseTypeName}
              className="textArea_type"
              type="text"
              placeholder="Enter title of type"
            />
            <div className="button_type_container">
              <button
                onClick={handleUpdateNewType}
                style={{ height: "4rem" }}
                className="button"
              >
                Update This Type
              </button>
              <button
                onClick={() => {
                  setEdit(false);
                }}
                style={{ height: "4rem", marginLeft: "0.5rem" }}
                className="button button_cancel"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TypeCourseCard;
