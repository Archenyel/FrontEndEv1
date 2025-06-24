import api from './api';

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
    const response = await api.post("/requisitos", values);
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al agregar requisitos:", error);
    throw error.response?.data?.message || "Error al agregar requisitos";
  }
};

export const AgregarTipoRequisito = async (values) => {
  try {
    const response = await api.post("/tipo-requisitos", values);
    console.log("Respuesta del backend:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al agregar tipo-requisitos:", error);
    throw error.response?.data?.message || "Error al agregar tipo-requisitos";
  }
};

export const obtenerCategoria = async (soloActivos = false) => {
  const res = await api.get(`/obtener-categoria`, {
    params: { soloActivos },
  });
  return res.data;
};

export const obtenerRequisitos = async (soloActivos = false) => {
  const res = await api.get(`/obtener-requisito`, {
    params: { soloActivos },
  });
  return res.data;
};

export const obtenerTipoRequisitos = async (soloActivos = false) => {
  const res = await api.get(`/obtener-Tiporequisito`, {
    params: { soloActivos },
  });
  return res.data;
};