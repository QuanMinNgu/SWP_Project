import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { isSuccess, isLoading, isFailing } from "../../redux/slice/auth";
import { UserContext } from "../../App";
import axios from "axios";
function CourseTypeVoucher({ chooseCourse, setChooseCourse }) {
  const [types, setTypes] = useState([]);
  const { cache } = useContext(UserContext);
  const dispatch = useDispatch();
  const [optionsKind, setOptionKind] = useState({});
  useEffect(() => {
    if (types) {
      const arr = types?.map((item) => {
        return {
          value: item?.courseTypeID,
          label: item?.courseTypeName,
        };
      });
      setOptionKind([...arr]);
    }
  }, [types]);
  const handleChangeCourse = (choice) => {
    setChooseCourse({
      courseTypeID: choice.value,
      courseTypeName: choice.label,
    });
  };
  useEffect(() => {
    let here = true;
    const url = "/api/type_course";
    if (cache.current[url]) {
      console.log(cache.current[url]);
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

  return (
    <div className="course_type_voucher">
      <label>Course Type :</label>
      <Select
        options={optionsKind}
        onChange={(choice) => handleChangeCourse(choice)}
        value={{
          value: chooseCourse?.courseTypeID,
          label: chooseCourse?.courseTypeName,
        }}
      />
    </div>
  );
}

export default CourseTypeVoucher;
