import React, { useState } from "react";
import { Button, Form, Input, Layout, theme } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    // Example authentication logic
    if (values.username === "admin" && values.password === "admin") {
      localStorage.setItem("authToken", "your-auth-token");
      navigate("/");
    } else {
      // Handle authentication failure
      console.error("Invalid username or password");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: theme.useToken().token.colorBgContainer,
        }}
      >
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
          style={{ width: 300 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default Login;
