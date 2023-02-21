import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
function CreateMarketing() {
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const url = URL.createObjectURL(acceptedFiles[0]);
    if (image) {
      URL.revokeObjectURL(image);
    }
    setImage(url);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const handleCreate = () => {
    const newMarket = {
      name,
      image,
    };
    console.log(newMarket);
  };
  return (
    <div className="create_market">
      <div className="create_market_name">
        <h3>Name :</h3>
        <div className="create_market_name_input">
          <input type="text" onChange={(e) => setName(e.target.value)} />
        </div>
      </div>
      <div className="create_market_img">
        <h3>Market :</h3>
        <div className="create_market_img_dropzone">
          <div className="create_market_img_dropzone_wrap" {...getRootProps()}>
            <input {...getInputProps()} />
            <i className="fa-solid fa-image"></i>
            <div className="img_market">
              <img src={image} />
            </div>
          </div>
        </div>
      </div>
      <div className="create_market_footer">
        <button
          className="button"
          style={{
            height: "40px",
          }}
          onClick={handleCreate}
        >
          Create new Market
        </button>
      </div>
    </div>
  );
}

export default CreateMarketing;
