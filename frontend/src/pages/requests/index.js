import { Row, Col, Button, Card, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns = [
	{
		title: "TIPO",
		dataIndex: "type",
		key: "type",
	},
	{
		title: "AGENCIA",
		dataIndex: "agency",
		key: "agency",
	},
	{
		title: "CI NÚMERO",
		dataIndex: "ci_num",
		key: "ci_num",
	},
	{
		title: "CI AÑO",
		dataIndex: "ci_year",
		key: "ci_year",
	},
	{
		title: "OFICIO NÚMERO",
		dataIndex: "o_num",
		key: "o_num",
	},
	{
		title: "OFICIO AÑO",
		dataIndex: "o_year",
		key: "o_year",
	},
	{
		title: "OFICIO FECHA",
		dataIndex: "o_date",
		key: "o_date",
	},
	{
		title: "FECHA",
		dataIndex: "date",
		key: "date",
	},
	{
		title: "CIUDADANO(A)",
		dataIndex: "citizen",
		key: "citizen",
	},
];

const Request = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetch(`${process.env.REACT_APP_BACKEND_URL}/requests`, {
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
						title="Solicitudes"
						extra={
							<Link to="/requests/create">
								<Button type="primary">Registrar</Button>
							</Link>
						}
					>
						<div className="table-responsive">
							<Table
								columns={columns}
								dataSource={data}
								pagination={false}
								className="ant-border-space"
								rowKey="request_id"
							/>
						</div>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default Request;
