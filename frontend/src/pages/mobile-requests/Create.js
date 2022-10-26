import { useEffect, useState } from "react";
import { Row, Col, Form, Input, Button, DatePicker, Select, Card, AutoComplete, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import API from "../../util/api";

const { Option } = Select;

const Request = () => {
	const navigate = useNavigate();
	const CURRENT_YEAR = new Date().getFullYear();
	const [form] = Form.useForm();

	const [agencies, setAgencies] = useState([]);
	useEffect(() => {
		API.get("/agencies").then((response) => {
			if (response.ok) setAgencies(response.data);
		});
	}, []);

	const onFinish = (values) => {
		API.post("/requests", {
			body: JSON.stringify(values),
		}).then((response) => {
			if (response.ok) redirect();
		});
	};

	const onReset = () => {
		form.resetFields();
	};

	const redirect = () => navigate("/mobile-requests");

	return (
		<>
			<Row type="flex" justify="space-between" gutter={16}>
				<Col lg={12} xs={24}>
					<Card bordered={false} className="criclebox">
						<Form
							form={form}
							name="control-hooks"
							onFinish={onFinish}
							layout="vertical"
							initialValues={{
								type: "ADQUISICIÓN DE DATOS DE TELÉFONO CELULAR (DISPOSITIVOS MÓVILES)",
								ci_year: CURRENT_YEAR,
								status: "COMPLETO",
								unlocked: "1",
							}}
						>
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
											<Option value="ADQUISICIÓN DE DATOS DE TELÉFONO CELULAR (DISPOSITIVOS MÓVILES)">
											ADQUISICIÓN DE DATOS DE TELÉFONO CELULAR (DISPOSITIVOS MÓVILES)
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
								<Col xs={24} md={12}>
									<Form.Item label="Tipo" name="type_extraction" rules={[{ required: true }]}>
										<AutoComplete
											allowClear
											filterOption={(inputValue, option) =>
												option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
											}
											options={[
												{ value: "Física" },
												{ value: "Sistema de archivos" },
												{ value: "Lógica" },
											]}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Método" name="method_extraction" rules={[{ required: true }]}>
										<AutoComplete
											allowClear
											filterOption={(inputValue, option) =>
												option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
											}
											options={[{ value: "APK Downgrade" }]}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Software" name="software" rules={[{ required: true }]}>
										<AutoComplete
											allowClear
											filterOption={(inputValue, option) =>
												option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
											}
											options={[{ value: "Cellebrite UFED" }, { value: "MOBILedit" }]}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Software versión" name="software_version">
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Marca" name="brand" rules={[{ required: true }]}>
										<AutoComplete
											allowClear
											filterOption={(inputValue, option) =>
												option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
											}
											options={[{ value: "SAMSUNG" }, { value: "HUAWEI" }]}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Modelo" name="model" rules={[{ required: true }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Sistema operativo" name="os_version">
										<Input />
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Desbloqueado" name="unlocked">
										<Radio.Group buttonStyle="solid">
											<Radio.Button value="1">SI</Radio.Button>
											<Radio.Button value="0">NO</Radio.Button>
										</Radio.Group>
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Apps" name="apps">
										<Select mode="multiple">
											<Option value="WhatsApp">WhatsApp</Option>
											<Option value="Telegram">Telegram</Option>
											<Option value="Signal">Signal</Option>
										</Select>
									</Form.Item>
								</Col>
								<Col xs={24} md={12}>
									<Form.Item label="Estatus" name="status" rules={[{ required: true }]}>
										<Radio.Group buttonStyle="solid">
											<Radio.Button value="COMPLETO">COMPLETO</Radio.Button>
											<Radio.Button value="PARCIAL">PARCIAL</Radio.Button>
											<Radio.Button value="FALLIDO">FALLIDO</Radio.Button>
										</Radio.Group>
									</Form.Item>
								</Col>
								<Col xs={24}>
									<Form.Item label="Notas" name="notes">
										<Input.TextArea />
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
