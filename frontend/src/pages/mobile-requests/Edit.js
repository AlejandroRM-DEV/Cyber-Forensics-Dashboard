import { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, DatePicker, Select, Card, Switch } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import API from "../../util/api";

const { Option } = Select;

const Request = () => {
	const params = useParams();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [agencies, setAgencies] = useState([]);

	useEffect(() => {
		API.get("/agencies").then((response) => {
			if (response.ok) setAgencies(response.data);
		});

		API.get(`/requests/${params.id}`).then((response) => {
			if (response.ok) {
				form.setFieldsValue({
					...response.data,
					letter_date: moment(response.data.letter_date),
					submission_date: moment(response.data.submission_date),
				});
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onFinish = (values) => {
		API.put(`/requests/${params.id}`, {
			body: JSON.stringify(values),
		}).then((response) => {
			if (response.ok) redirect();
		});
	};

	const redirect = () => navigate("/mobile-requests");

	return (
		<>
			<Row type="flex" justify="space-between" gutter={16}>
				<Col lg={12} xs={24}>
					<Card bordered={false} className="criclebox">
						<Form form={form} name="control-hooks" onFinish={onFinish} layout="vertical">
							<Row type="flex" justify="space-between" gutter={16}>
								<Col xs={24}>
									<Form.Item label="Tipo" name="type" rules={[{ required: true }]}>
										<Select
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.children.toLowerCase().includes(input.toLowerCase())
											}
										>
											<Option value="ADQUISICION DE DATOS DE TELEFONO CELULAR (DISPOSITIVOS MOVILES)">
												ADQUISICION DE DATOS DE TELEFONO CELULAR (DISPOSITIVOS MOVILES)
											</Option>
											<Option value="EXTRACCION DE INFORMACION DE DISPOSITIVOS DE ALMACENAMIENTO DIGITAL">
												EXTRACCION DE INFORMACION DE DISPOSITIVOS DE ALMACENAMIENTO DIGITAL
											</Option>
											<Option value="EXTRACCIÓN DE INFORMACIÓN DE SISTEMAS DE GRABACIÓN DE VIDEO">
												EXTRACCIÓN DE INFORMACIÓN DE SISTEMAS DE GRABACIÓN DE VIDEO
											</Option>
											<Option value="IDENTIFICACION DE EQUIPOS">IDENTIFICACION DE EQUIPOS</Option>
											<Option value="INFORMES">INFORMES</Option>
											<Option value="INVESTIGACION DE SISTEMAS">INVESTIGACION DE SISTEMAS</Option>
											<Option value="INVESTIGACION SOBRE SERVICIOS Y APLICACIONES DE INTERNET">
												INVESTIGACION SOBRE SERVICIOS Y APLICACIONES DE INTERNET
											</Option>
											<Option value="VALORACIÓN DE DAÑOS EN EQUIPOS">
												VALORACIÓN DE DAÑOS EN EQUIPOS
											</Option>
										</Select>
									</Form.Item>
								</Col>
								<Col xs={24}>
									<Form.Item label="Agencia" name="agency_id" rules={[{ required: true }]}>
										<Select
											showSearch
											optionFilterProp="children"
											filterOption={(input, option) =>
												option.children.toLowerCase().includes(input.toLowerCase())
											}
										>
											{agencies.map((value) => (
												<Option key={value.agency_id} value={value.agency_id}>
													{value.name}
												</Option>
											))}
										</Select>
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="C.I. número" name="ci_num" rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="C.I. año" name="ci_year" rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="Oficio número" name="letter_num">
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="Oficio año" name="letter_year">
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="Fecha de oficio" name="letter_date" rules={[{ required: true }]}>
										<DatePicker />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item
										label="Fecha de presentación"
										name="submission_date"
										rules={[{ required: true }]}
									>
										<DatePicker />
									</Form.Item>
								</Col>
								<Col md={12} xs={24}>
									<Form.Item label="Autorizado por (nombre)" name="authorized_by">
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24}>
									<Form.Item label="Estado ¿cerrada?" name="closed" valuePropName="checked">
										<Switch checkedChildren="SI" unCheckedChildren="NO"/>
									</Form.Item>
								</Col>
								<Col>
									<Form.Item>
										<Button htmlType="button" type="danger" onClick={redirect}>
											Cancelar
										</Button>
									</Form.Item>
								</Col>
								<Col>
									<Form.Item>
										<Button type="primary" htmlType="submit">
											Actualizar
										</Button>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Request;
