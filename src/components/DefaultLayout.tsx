import { Button, Dropdown, Menu, MenuProps, Space } from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/default-layout.css";

const DefaultLayout = (props: any) => {
  const user = JSON.parse(localStorage.getItem("budgetApp-user") as string);
  const navigate = useNavigate();
  const menu: any = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <li
              onClick={() => {
                localStorage.removeItem("budgetApp-user");
                navigate("/login");
              }}
              className="primary"
            >
              Logout
            </li>
          ),
        },
      ]}
    />
  );
  return (
    <div className="layout">
      <div className="header d-flex justify-content-between align-items-center">
        <div>
          <h1 className="logo">Budget Gestion</h1>
        </div>
        <div>
          <Dropdown overlay={menu} placement="bottomLeft">
            <Button>{user.name}</Button>
          </Dropdown>
        </div>
      </div>
      <div className="content">{props.children}</div>
    </div>
  );
};

export default DefaultLayout;
