import axios from 'axios';
import { SimulationInputDto, SimulationResult, apiUrl } from 'types/types';

// Set the base URL for axios
const api = axios.create({
  baseURL: apiUrl
});

// Define API functions
export const getSimulation = async (): Promise<SimulationResult> => {
  const response = (await api.get('/simulation/mock/run')).data;
  return response;
};

export const createSimulation = async (simulation: SimulationInputDto): Promise<SimulationResult> => {
  const response = await api.post('/simulation/create', simulation);
  return response.data.output;
};
