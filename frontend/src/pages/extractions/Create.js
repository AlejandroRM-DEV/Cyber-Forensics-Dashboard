import { Row, Col, Form, Input, Button, AutoComplete, Radio, Select, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const { Option } = Select;

const Extraction = () => {
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const [requests, setRequests] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/requests`, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((res) =>
				setRequests(
					res.data.map((value) => {
						let str = `${value.id}: C.I. ${value.ci_num}/${value.ci_year}`;
						if (value.o_num) str += `, Oficio ${value.o_num}/${value.o_year}`;
						if (value.o_date) str += `, ${value.o_date}`;
						if (value.citizen) str += `, ${value.citizen}`;
						return { value: str };
					})
				)
			)
	}, []);

	const onFinish = (values) => {
		values.request_id = values.request_id.split(":")[0];
		console.log(values);
		fetch(`${process.env.REACT_APP_BACKEND_URL}/extractions`, {
			headers: { "Content-Type": "application/json" },
			credentials: "include",
			method: "POST",
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then(() => redirect())
	};

	const onReset = () => {
		form.resetFields();
	};

	const redirect = () => navigate("/extractions");

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
								status: "COMPLETO",
								request_close: "1",
								unlocked: "1",
							}}
						>
							<Row type="flex" justify="space-between" gutter={16}>
								<Col xs={24} md={12}>
									<Form.Item label="Tipo" name="type" rules={[{ required: true }]}>
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
									<Form.Item label="Método" name="method" rules={[{ required: true }]}>
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
								<Col xs={24} md={18}>
									<Form.Item label="Solicitud" name="request_id">
										<AutoComplete
											allowClear
											filterOption={(inputValue, option) =>
												option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
											}
											options={requests}
										/>
									</Form.Item>
								</Col>
								<Col xs={24} md={6}>
									<Form.Item label="Cerrar solicitud" name="request_close">
										<Radio.Group buttonStyle="solid">
											<Radio.Button value="1">SI</Radio.Button>
											<Radio.Button value="0">NO</Radio.Button>
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

export default Extraction;
