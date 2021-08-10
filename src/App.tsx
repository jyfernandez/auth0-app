import React from "react";
import "./App.css";
import * as auth0 from "auth0-js";
import params from "./auth0-param.json";
import { Result, Form, Input, Button, Typography, notification } from "antd";
const { Paragraph, Text } = Typography;

function App() {
  const [response, setResponse] = React.useState();

  const webAuth = new auth0.WebAuth({
    domain: params.domain,
    clientID: params.clientID,
    audience: params.audience,
    redirectUri: params.redirectUri,
    scope: params.scope,
    responseType: params.responseType,
  });

  const submitForm = (values: any) => {
    const { username, password } = values;
    webAuth.client.login(
      {
        realm: params.realm,
        username,
        password,
      },
      (err, authResult) => {
        if (err) {
          notification["error"]({
            message: "Login Error",
            description: err.description,
          });
          return;
        }
        if (authResult) {
          notification["success"]({
            message: "Login Success",
            description: "Successfully Login",
          });
          setResponse(authResult);
        }
      }
    );
  };
  const onFinish = (values: any) => {
    submitForm(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="App">
      {response ? (
        <Result
          status="success"
          title="Successfully Login!"
          subTitle="You have successfully login to Auth0. Here's the details of the response."
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 20,
                }}
              >
                Response:
              </Text>
            </Paragraph>
            <Paragraph>Access Token: {response!["accessToken"]}</Paragraph>
            <Paragraph>Expires in: {response!["expiresIn"]}</Paragraph>
            <Paragraph>ID Token: {response!["idToken"]}</Paragraph>
            <Paragraph>Scope: {response!["scope"]}</Paragraph>
            <Paragraph>Token Type: {response!["tokenType"]}</Paragraph>
          </div>
        </Result>
      ) : (
        <div className="App-form">
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}

export default App;
