import AdminList from "./AdminList";
const AdminPage = (props) => {
  return (
    <div className="pt-[90px]">
      <h1 className="pl-[90px] text-4xl">Admin List</h1>
      <hr className="my-[30px] ml-[90px] h-1 w-[900px]" />
      <div className="mx-[50px]">
        <AdminList />
      </div>
    </div>
  );
};

export default AdminPage;
