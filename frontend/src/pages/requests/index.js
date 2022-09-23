import { Row, Col, Button, Card, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../util/api";

const columns = [
	{
		title: "ESTADO",
		dataIndex: "closed",
		key: "closed",
		render: (_, { closed }) =>
			closed ? (
				<Tag color="green" key={closed}>
					Cerrada
				</Tag>
			) : (
				<Tag color="red" key={closed}>
					Pendiente
				</Tag>
			),
		filters: [
			{
				text: "Cerrada",
				value: true,
			},
			{
				text: "Pendiente",
				value: false,
			},
		],
		onFilter: (value, record) => record.closed === value,
	},
	{
		title: "C.I.",
		dataIndex: "ci_num",
		key: "ci_num",
		render: (_, record) => `${record.ci_num}/${record.ci_year}`,
	},
	{
		title: "OFICIO",
		dataIndex: "letter_num",
		key: "letter_num",
		render: (_, record) => `${record.letter_num}/${record.letter_year}`,
	},
	{
		title: "FECHA DE OFICIO",
		dataIndex: "letter_date",
		key: "letter_date",
	},
	{
		title: "FECHA DE PRESENTACIÓN",
		dataIndex: "submission_date",
		key: "submission_date",
	},
	{
		title: "AGENCIA",
		dataIndex: ["agency", "name"],
		key: "agency.name",
	},
	{
		title: "ACCIÓN",
		key: "action",
		render: (_, record) => (
			<Link to={`/requests/${record.request_id}`}>
				<Button type="dashed">VER</Button>
			</Link>
		),
	},
];

const Request = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		API.get("/requests").then((response) => {
			if (response.ok) setData(response.data);
		});
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
								pagination={true}
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
