import React from "react";
import { useState } from "react";
import { Space, Table, Tag } from "antd";

const { Column, ColumnGroup } = Table;

import { IUser } from "../../types/UserType";
import useUser from "../../hooks/useUser";
import ConfirmDeleteModal from "../../components/ui/ConfirmDeleteModal";
import UpdateUserModal from "../../components/ui/UpdateUserModal";

const UserList: React.FC = () => {
  let [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
  let [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { users, deleteUser, fetchSelectedAdmin, fetchUsers } = useUser();

  function handleDeleteModal(id: number) {
    setIsOpenDeleteModal(true);
    setSelectedId(id);
    fetchUsers();
  }

  async function handleUpdateModel(id: number) {
    await fetchSelectedAdmin(id);
    setIsOpenUpdateModal(true);
  }

  function handleDelete(id: number) {
    deleteUser(selectedId);
    setIsOpenDeleteModal(false);
  }

  return (
    <>
      <Table dataSource={users}>
        <Column title="No." dataIndex="id" key="id" />
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="first_name" key="first_name" />
          <Column title="Last Name" dataIndex="last_name" key="last_name" />
        </ColumnGroup>
        <Column title="Email" dataIndex="email" key="email" />
        <Column
          title="Phone Number"
          dataIndex="phone_number"
          key="phone_number"
        />
        <Column title="Status" dataIndex="status" key="status" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Action"
          key="action"
          render={(_: any, user: IUser) => (
            <Space size="middle" key={crypto.randomUUID()}>
              <button
                className="w-[100px]  rounded-md bg-lime-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-lime-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime-600"
                onClick={() => handleUpdateModel(user.id)}
              >
                Update
              </button>
              <button
                className="w-[100px]  rounded-md bg-rose-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                onClick={() => handleDeleteModal(user.id)}
              >
                Delete
              </button>
            </Space>
          )}
        />
      </Table>
      <ConfirmDeleteModal
        id={selectedId}
        setIsOpenDeleteModal={setIsOpenDeleteModal}
        isOpenDeleteModal={isOpenDeleteModal}
        handleClick={handleDelete}
      />
      <UpdateUserModal
        setIsOpenUpdateModal={setIsOpenUpdateModal}
        isOpenUpdateModal={isOpenUpdateModal}
      />
    </>
  );
};

export default UserList;
