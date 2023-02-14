import React from "react";
import Select from "react-select";
function CourseTypeVoucher({ chooseCourse, setChooseCourse }) {
  const arr = [
    {
      id: 1,
      name: "Software",
    },
    {
      id: 2,
      name: "Life",
    },
    {
      id: 3,
      name: "Soft Skill",
    },
  ];
  const options = arr.map((item) => {
    return {
      value: `${item.id}`,
      label: `${item.name}`,
    };
  });
  const handleChangeCourse = (choice) => {
    setChooseCourse({
      CourseTypeId: choice.value,
    });
  };
  console.log(chooseCourse);
  return (
    <div className="course_type_voucher">
      <label>Course Type :</label>
      <Select
        options={options}
        onChange={(choice) => handleChangeCourse(choice)}
      />
    </div>
  );
}

export default CourseTypeVoucher;
