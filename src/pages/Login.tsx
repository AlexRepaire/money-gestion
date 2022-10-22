import { Col, Form, message, Row } from "antd";
import FormItem from "antd/lib/form/FormItem";
import Input from "antd/lib/input/Input";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moneyInvestement from "../assets/money-investment.json";
import Spinner from "../components/Spinner";
import { loginModel } from "../models/userModel";
import userService from "../services/userService";
import "../styles/authentication.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("budgetApp-user")) {
      navigate("/");
    }
  }, []);

  const onFinish = async (values: loginModel) => {
    try {
      setLoading(true);
      const result = await userService.loginUser(values);
      localStorage.setItem(
        "budgetApp-user",
        JSON.stringify({ ...result.data, password: "" })
      );
      setLoading(false);
      navigate("/");
    } catch (error: any) {
      setLoading(false);
      message.error(error.response.data);
    }
  };

  return (
    <div className="register">
      {loading && <Spinner />}
      <Row justify="space-evenly" align="middle">
        <Col span={10}>
          <Form layout="vertical" onFinish={onFinish}>
            <h1>Budget Tracker Connexion</h1>
            <hr />
            <FormItem label="mail" name="mail">
              <Input />
            </FormItem>
            <FormItem label="password" name="password">
              <Input type={"password"} />
            </FormItem>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={"/register"}>
                Pas de compte ? Clique ici pour t'inscrire
              </Link>
              <button className="primary" type="submit">
                CONNEXION
              </button>
            </div>
          </Form>
        </Col>
        <Col span={14}>
          <div className="lottie">
            <Lottie
              animationData={moneyInvestement}
              loop
              autoplay
              allowTransparency
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
