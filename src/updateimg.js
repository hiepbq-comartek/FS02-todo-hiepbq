// post img
import { uploadimg } from "./server/data";
function Imgtodolist() {
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
