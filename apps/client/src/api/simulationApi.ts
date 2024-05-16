import axios from 'axios';
import { SimulationResult } from 'types/types';

// Set the base URL for axios
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

// Define API functions
export const getSimulation = async (): Promise<SimulationResult> => {
  const response = (await api.get('/simulation/mock/run')).data;
  return response;
};

export const createSimulation = async (simulation: SimulationResult): Promise<SimulationResult> => {
  const response = await api.post('/simulation', simulation);
  return response.data;
};
