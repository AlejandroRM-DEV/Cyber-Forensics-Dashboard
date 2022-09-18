import React, { Component } from "react";
import { Layout, Button, Row, Col, Typography } from "antd";
import signinbg from "../assets/images/img-signin.jpg";
const { Title } = Typography;
const { Content } = Layout;

export default class SignIn extends Component {
	render() {
		const login = async () => {
			window.location =
				`https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?` +
				`audience=${process.env.REACT_APP_AUTH0_AUDIENCE}&` +
				`response_type=code&` +
				`scope=openid profile&` +
				`client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&` +
				`redirect_uri=${process.env.REACT_APP_FRONTEND_URL}/continue`;
		};
		return (
			<>
				<Layout className="layout-default layout-signin">
					<Content className="signin">
						<Row gutter={[24, 0]} justify="space-between" align="middle">
							<Col xs={{ span: 24, offset: 0 }} lg={{ span: 6, offset: 2 }} md={{ span: 12 }}>
								<Title className="mb-15">BIENVENIDO</Title>
								<Title className="font-regular text-muted" level={5}>
									Cyber Forensics Dashboard for a better world.
								</Title>
								<Button type="primary" onClick={() => login()} style={{ width: "100%" }}>
									ACCEDER
								</Button>
							</Col>
							<Col
								className="sign-img"
								style={{ padding: 12 }}
								xs={{ span: 24 }}
								lg={{ span: 12 }}
								md={{ span: 12 }}
							>
								<img src={signinbg} alt="" />
							</Col>
						</Row>
					</Content>
				</Layout>
			</>
		);
	}
}
