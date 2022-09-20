import { useState, useEffect } from "react";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";

class UnauthorizedError extends Error {
	constructor(message) {
		super(message);
		this.name = "UnauthorizedError";
	}
}
class ForbiddenError extends Error {
	constructor(message) {
		super(message);
		this.name = "ForbiddenError";
	}
}

const useFetch = (url, options) => {
	const navigate = useNavigate();
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;
		const doFetch = async () => {
			setLoading(true);
			try {
				const res = await fetch(url, {
					credentials: "include",
					...options,
				});

				if (!res.ok) {
					if (res.status === 401) throw new UnauthorizedError("");
					else if (res.status === 403) throw new ForbiddenError("");
					else throw new Error("");
				}

				const json = await res.json();
				if (!signal.aborted) {
					setResponse(json);
				}
			} catch (e) {
				if (!signal.aborted) {
					setError(e);
					if (e instanceof UnauthorizedError) {
						notification.error({
							message: "No autentificado",
							description: "Sesión expirada, revocada o pérdida",
						});
						navigate("/sign-in");
					} else if (e instanceof ForbiddenError) {
						notification.error({
							message: "No autorizado",
							description: "No cuenta con el permiso para esta acción",
						});
					} else {
						notification.error({
							message: "Error desconocido",
							description:
								"Vuelva a intentarlo, si el error persiste, póngase en contacto con nosotros para obtener asistencia.",
						});
					}
				}
			} finally {
				if (!signal.aborted) {
					setLoading(false);
				}
			}
		};
		doFetch();
		return () => {
			abortController.abort();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return { response, error, loading };
};
export default useFetch;
