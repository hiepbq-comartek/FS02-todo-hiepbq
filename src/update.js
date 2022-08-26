import { Button, Modal } from "antd";
import React, { useState } from "react";
import { deleteuser, putFrofile } from "./server/data";
import Imgtodolist from "./updateimg";
const Updateprofile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const [data, setdata] = useState();
  let datas = {
    age: data,
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        Sửa Thông tin
      </Button>
      <Modal
        title="Thay đổi thông tin"
        visible={isModalVisible}
        onCancel={handleCancel}
      >             
        <div>
          <span>Age</span>
          <input
            value={data}
            onChange={(e) => setdata(e.target.value)}
            className="inpt_jobsss"
          />
        </div>
        <Imgtodolist />
        <button onClick={() => putFrofile(datas)} id="butupdat">
          submit
        </button>
        <button onClick={() => deleteuser()} id="butupdat">
          Xóa tài khoản
        </button>
        {/* <button onClick={uploadimg(img)}></button> */}
      </Modal>
    </>
  );
};

export default Updateprofile;
