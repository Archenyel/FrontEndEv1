import api from "./api";

export const Agregarcategoria = async (values) => {
  try {
    const response = await api.post("/categoria", values);
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al agregar categoria:", error);
    throw error.response?.data?.message || "Error al agregar categoria";
  }
};

export const Agregarrequisitos = async (values) => {
  try {
    const idTipo = values.tipo;
    const body = {
      descripcion: values.descripcion,
    };
    const response = await api.post(`/requisitos/${idTipo}`, body);
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al agregar requisitos:", error);
    throw error.response?.data?.message || "Error al agregar requisitos";
  }
};

export const AgregarTipoRequisito = async (values) => {
  try {
    const response = await api.post("/tipos", values);
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al agregar tipo-requisitos:", error);
    throw error.response?.data?.message || "Error al agregar tipo-requisitos";
  }
};

export const obtenerCategorias = async (soloActivos = false) => {
  const res = await api.get(`/categoria`, {});
  return res.data;
};

export const obtenerRequisitos = async (soloActivos = false) => {
  const res = await api.get(`/requisitos`, {});
  return res.data;
};

export const obtenerTipoRequisitos = async () => {
  try {
    const res = await api.get(`/tipos`);
    return res.data;
  } catch (error) {
    console.error("Error fetching tipos from API:", error.response || error);
    throw error;
  }
};

export const editarCategoria = async (id, values) => {
  try {
    const response = await api.put(`/categoria/${id}`, values);
    console.log("Categoría editada:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al editar categoría:", error);
    throw error.response?.data?.message || "Error al editar categoría";
  }
};

export const eliminarCategoria = async (id) => {
  try {
    const response = await api.delete(`/categoria/${id}`);
    console.log("Categoría eliminada");
    return response.data;
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    throw error.response?.data?.message || "Error al eliminar categoría";
  }
};

export const editarTipoRequisito = async (id, data) => {
  const response = await api.put(`/tipos/${id}`, data);
  return response.data;
};

export const eliminarTipoRequisito = async (id) => {
  const response = await api.delete(`/tipos/${id}`);
  return response.data;
};

export const editarRequisito = async (idRequisito, data) => {
  const body = {
    ...data,
    tipo: { id: data.tipo },
  };

  try {
    const res = await api.put(
      `/requisitos/${idRequisito}?idRequisito=${idRequisito}`,
      body
    );
    return res.data;
  } catch (error) {
    console.error("Error al editar requisito:", error.response || error);
    throw error;
  }
};

export const eliminarRequisito = async (idRequisito) => {
  try {
    const res = await api.delete(`/requisitos/${idRequisito}`);
    return res.status === 204;
  } catch (error) {
    console.error("Error al eliminar requisito:", error.response || error);
    throw error;
  }
};

export const asignarTipoACategoria = async (idCategoria, idTipo) => {
  try {
    const res = await api.post("/categoria/categoria-tipo", null, {
      params: {
        idCategoria,
        idTipo,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error al asignar tipo a categoría:", error.response || error);
    throw error;
  }
};