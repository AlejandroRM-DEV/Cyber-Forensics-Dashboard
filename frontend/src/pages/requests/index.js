import { Row, Col, Button, Card, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const columns = [
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
		dataIndex: "letter_num",
		key: "letter_num",
	},
	{
		title: "OFICIO AÑO",
		dataIndex: "letter_year",
		key: "letter_year",
	},
	{
		title: "OFICIO FECHA",
		dataIndex: "letter_date",
		key: "letter_date",
	},
	{
		title: "FECHA PRESENTACIÓN",
		dataIndex: "submission_date",
		key: "submission_date",
	},
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
		title: "AUTORIZADO POR",
		dataIndex: "authorized_by",
		key: "authorized_by",
	},
];

const Request = () => {
	const [data, setData] = useState([]);
	const { response: requests } = useFetch(`${process.env.REACT_APP_BACKEND_URL}/requests`);

	useEffect(() => requests && setData(requests.data), [requests]);

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
