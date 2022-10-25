import { Row, Col, Form, Button, Upload, InputNumber, Card, notification } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ImageSequence = () => {
	const onFinish = (values) => {
		const formData = new FormData();
		formData.append("columnas", values.columnas);
		formData.append(
			"listas",
			JSON.stringify([
				{
					nombre: "imgsSecuencia",
					width: values.ancho,
				},
			])
		);
		values.imgsSecuencia.fileList
			.map((val) => val.originFileObj)
			.forEach((e) => formData.append("imgsSecuencia", e));

		fetch(`${process.env.REACT_APP_BACKEND_URL}/secuencia-imagenes`, { method: "POST", body: formData })
			.then((resp) => resp.json())
			.then((data) => {
				fetch(`${process.env.REACT_APP_BACKEND_URL}/file/${data.nombreArchivo}`)
					.then((res) => res.blob())
					.then((blob) => URL.createObjectURL(blob))
					.then((href) => {
						Object.assign(document.createElement("a"), {
							href,
							download: data.nombreArchivo,
						}).click();
					});
			})
			.catch((err) => console.err("Ocurrió un error", err));
	};

	const onFinishFailed = () => {
		notification["error"]({
			message: "Hacen falta datos válidos",
			placement: "bottomLeft",
		});
	};

	return (
		<>
			<Row type="flex" justify="space-between" gutter={16}>
				<Col md={8} xs={24}>
					<Card bordered={false} className="criclebox">
						<Form
							name="basic"
							onFinish={onFinish}
							onFinishFailed={onFinishFailed}
							layout="vertical"
							initialValues={{
								columnas: 1,
								ancho: 15,
							}}
						>
							<Row type="flex" justify="center" align="bottom" gutter={16}>
								<Col span={8}>
									<Form.Item label="Columnas" name="columnas" rules={[{ required: true }]}>
										<InputNumber addonAfter="#" min={1} max={4} />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label="Ancho" name="ancho" rules={[{ required: true }]}>
										<InputNumber addonAfter="cm" min={1} />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item>
										<Button type="primary" htmlType="submit">
											Generar archivo
										</Button>
									</Form.Item>
								</Col>
								<Col span={24}>
									<Form.Item
										label="Imágenes"
										name="imgsSecuencia"
										rules={[{ required: true }]}
										valuePropName="file"
									>
										<Upload multiple beforeUpload={() => false}>
											<Button icon={<UploadOutlined />}>Upload</Button>
										</Upload>
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

export default ImageSequence;
