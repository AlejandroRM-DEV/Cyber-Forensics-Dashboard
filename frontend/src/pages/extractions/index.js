import { Row, Col, Button, Card, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns = [
	{
		title: "ESTATUS",
		dataIndex: "status",
		key: "status",
	},
	{
		title: "TIPO",
		dataIndex: "type",
		key: "type",
	},
	{
		title: "MÉTODO",
		dataIndex: "method",
		key: "method",
	},
	{
		title: "SOFTWARE",
		dataIndex: "software",
		key: "software",
	},
	{
		title: "MARCA",
		dataIndex: "brand",
		key: "brand",
	},
	{
		title: "MODELO",
		dataIndex: "model",
		key: "model",
	},
];

const Extractions = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/extractions`, {
			credentials: "include",
		})
			.then((res) => res.json())
			.then((res) => setData(res.data))
			.catch((error) => console.error(error));
	}, []);

	return (
		<>
			<Row gutter={[24, 0]}>
				<Col xs="24" xl={24}>
					<Card
						bordered={false}
						className="criclebox tablespace mb-24"
						title="Extracciones de dispositivos móviles"
						extra={
							<Link to="/extractions/create">
								<Button type="primary">Registrar</Button>
							</Link>
						}
					>
						<div className="table-responsive">
							<Table
								columns={columns}
								dataSource={data}
								className="ant-border-space"
								rowKey="id"
							/>
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Extractions;
