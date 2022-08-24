// post img
import { uploadimg } from "./data";
import { useState } from "react";
function Imgtodolist() {
  const fileField = document.querySelector('input[type="file"]');

  return (
    <input
      placeholder="thêm ảnh"
      id="test"
      type="file"
      className="custom-file-input"
      onChange={(e) => uploadimg(e.target.files[0], e.target.files[0].name)}
    />
  );
}
export default Imgtodolist;
