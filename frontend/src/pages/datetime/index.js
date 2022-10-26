import { Row, Col, Form, Button, Alert, Card, DatePicker, Divider } from "antd";
import { useState } from "react";
import moment from "moment";
import "moment/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";

const DateTime = () => {
	const [form] = Form.useForm();
	const [difference, setDifference] = useState("");

	const onFinish = (values) => {
		console.log(values);
	};

	const onFieldsChange = (changedFields, allFields) => {
		allFields["date-real"]._d.setMilliseconds(0);
		allFields["date-nvr"]._d.setMilliseconds(0);
		
		const FORMAT = "YYYY-MM-DD HH:mm:ss";
		const ms = moment(allFields["date-nvr"], FORMAT).diff(moment(allFields["date-real"], FORMAT));
		const d = moment.duration(ms);
		setDifference(
			d._data.years +
				" años, " +
				d._data.months +
				" meses, " +
				d._data.days +
				" días, " +
				d._data.hours +
				" horas, " +
				d._data.minutes +
				" minutos, " +
				d._data.seconds +
				" segundos"
		);
		form.setFieldsValue({
			"date-start-nvr": moment(allFields["date-start-real"], FORMAT).add(d.asSeconds(), "seconds"),
			"date-end-nvr": moment(allFields["date-end-real"], FORMAT).add(d.asSeconds(), "seconds"),
		});
	};

	const onReset = () => {
		form.resetFields();
	};

	return (
		<>
			<Row type="flex" justify="space-between" gutter={16}>
				<Col md={8} xs={24}>
					<Card bordered={false} className="criclebox">
						<Form
							form={form}
							name="control-hooks"
							onFinish={onFinish}
							onValuesChange={onFieldsChange}
							layout="vertical"
							initialValues={{}}
						>
							<Row type="flex" justify="space-between" gutter={16}>
								<Col xs={24}>
									<Form.Item label="Real" name="date-real">
										<DatePicker
											showTime
											format="dddd, DD [de] MMMM [de] YYYY HH:mm:ss"
											locale={locale}
											style={{ width: "100%" }}
										/>
									</Form.Item>
								</Col>
								<Col xs={24}>
									<Form.Item label="NVR" name="date-nvr">
										<DatePicker
											showTime
											format="dddd, DD [de] MMMM [de] YYYY HH:mm:ss"
											locale={locale}
											style={{ width: "100%" }}
										/>
									</Form.Item>
								</Col>
								<Divider />
								<Col xs={24}>
									<Alert message={difference} type="info" showIcon />
								</Col>
								<Divider />
								<Col xs={24}>
									<Form.Item label="Inicio real" name="date-start-real">
										<DatePicker
											showTime
											format="dddd, DD [de] MMMM [de] YYYY HH:mm:ss"
											locale={locale}
											style={{ width: "100%" }}
										/>
									</Form.Item>
								</Col>
								<Col xs={24}>
									<Form.Item label="Inicio NVR" name="date-start-nvr">
										<DatePicker
											showTime
											format="dddd, DD [de] MMMM [de] YYYY HH:mm:ss"
											locale={locale}
											style={{ width: "100%" }}
											disabled
										/>
									</Form.Item>
								</Col>
								<Divider />
								<Col xs={24}>
									<Form.Item label="Fin real" name="date-end-real">
										<DatePicker
											showTime
											format="dddd, DD [de] MMMM [de] YYYY HH:mm:ss"
											locale={locale}
											style={{ width: "100%" }}
										/>
									</Form.Item>
								</Col>
								<Col xs={24}>
									<Form.Item label="Fin NVR" name="date-end-nvr">
										<DatePicker
											showTime
											format="dddd, DD [de] MMMM [de] YYYY HH:mm:ss"
											locale={locale}
											style={{ width: "100%" }}
											disabled
										/>
									</Form.Item>
								</Col>
								<Divider />
								<Col>
									<Form.Item>
										<Button htmlType="button" onClick={onReset}>
											Limpiar
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

export default DateTime;
