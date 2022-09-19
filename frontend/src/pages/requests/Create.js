import { Row, Col, Form, Input, Button, AutoComplete, DatePicker, Select, Card } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const Request = () => {
	const navigate = useNavigate();
	const CURRENT_YEAR = new Date().getFullYear();
	const [form] = Form.useForm();

	const onFinish = (values) => {
		console.log(values);
		fetch(`${process.env.REACT_APP_BACKEND_URL}/requests`, {
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			method: "POST",
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then(() => redirect())
			.catch((error) => console.error(error));
	};

	const onReset = () => {
		form.resetFields();
	};

	const redirect = () => navigate("/requests");

	return (
		<>
			<Row type="flex" justify="space-between" gutter={16}>
				<Col md={12} xs={24}>
					<Card bordered={false} className="criclebox">
						<Form
							form={form}
							name="control-hooks"
							onFinish={onFinish}
							layout="vertical"
							initialValues={{
								ci_year: CURRENT_YEAR,
							}}
						>
							<Row type="flex" justify="space-between" gutter={16}>
								<Col xs={24}>
									<Form.Item label="Tipo" name="type" rules={[{ required: true }]}>
										<Select>
											<Option value="ADQUISICIÓN DE DATOS DE TELÉFONO CELULAR (DISPOSITIVOS MOVILES)">
												ADQUISICIÓN DE DATOS DE TELÉFONO CELULAR (DISPOSITIVOS MOVILES)
											</Option>
											<Option value="EXTRACCIÓN DE INFORMACIÓN DE EQUIPOS DE GRABACIÓN DE VIDEO">
												EXTRACCIÓN DE INFORMACIÓN DE EQUIPOS DE GRABACIÓN DE VIDEO
											</Option>
											<Option value="EXTRACCIÓN DE INFORMACIÓN DE DISPOSITIVOS DE ALMACENAMIENTO DIGITAL">
												EXTRACCIÓN DE INFORMACIÓN DE DISPOSITIVOS DE ALMACENAMIENTO DIGITAL
											</Option>
											<Option value="IDENTIFICACIÓN DE EQUIPOS">IDENTIFICACIÓN DE EQUIPOS</Option>
											<Option value="INVESTIGACION DE SERVICIOS DE INTERNET">
												INVESTIGACION DE SERVICIOS DE INTERNET
											</Option>
											<Option value="INVESTIGACIÓN DE SISTEMAS">INVESTIGACIÓN DE SISTEMAS</Option>
										</Select>
									</Form.Item>
								</Col>
								<Col xs={24}>
									<Form.Item label="Agencia" name="agency" rules={[{ required: true }]}>
										<AutoComplete
											allowClear
											filterOption={(inputValue, option) =>
												option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
											}
											options={[
												{
													value: "Centro de Justicia para las Mujeres",
													label: "Centro de Justicia para las Mujeres",
												},
											]}
										/>
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="C.I." name="ci_num" rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="C.I. año" name="ci_year" rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="Oficio" name="o_num">
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="Oficio año" name="o_year">
										<Input />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="Fecha oficio" name="o_date" rules={[{ required: true }]}>
										<DatePicker />
									</Form.Item>
								</Col>
								<Col md={6} xs={24}>
									<Form.Item label="Fecha presentación" name="date" rules={[{ required: true }]}>
										<DatePicker />
									</Form.Item>
								</Col>
								<Col md={12} xs={24}>
									<Form.Item label="Ciudadano" name="citizen">
										<Input />
									</Form.Item>
								</Col>
								<Col>
									<Form.Item>
										<Button htmlType="button" type="danger" onClick={redirect}>
											Cancelar
										</Button>
										<Button htmlType="button" onClick={onReset}>
											Limpiar
										</Button>
									</Form.Item>
								</Col>
								<Col>
									<Form.Item>
										<Button type="primary" htmlType="submit">
											Registrar
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
