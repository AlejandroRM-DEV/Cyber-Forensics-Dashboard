import { notification } from "antd";

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

class API {
	static async get(url) {
		return await this.#run(url, null, "GET");
	}

	static async post(url, options) {
		return await this.#run(url, options, "POST");
	}

	static async put(url, options) {
		return await this.#run(url, options, "PUT");
	}

	static async #run(url, options, method) {
		let response = null;

		try {
			const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}${url}`, {
				headers: { "Content-Type": "application/json" },
				credentials: "include",
				method: method,
				...options,
			});
			if (!res.ok) {
				if (res.status === 401) throw new UnauthorizedError("");
				else if (res.status === 403) throw new ForbiddenError("");
				else throw new Error("");
			}
			response = await res.json();
		} catch (e) {
			response = { ok: false, error: e };
			if (e instanceof UnauthorizedError) {
				notification.error({
					message: "No autentificado",
					description: "Sesión expirada, revocada o pérdida",
				});
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
		return response;
	}
}

export default API;
