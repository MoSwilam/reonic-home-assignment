import axios from 'axios';
import { SimulationResult } from 'types/types';


// Set the base URL for axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Define API functions
export const getSimulation = async (): Promise<SimulationResult> => {
  const response = await api.get('/simulation/mock/run');
  return response.data;
};

export const createSimulation = async (simulation: SimulationResult): Promise<SimulationResult> => {
  const response = await api.post('/simulation', simulation);
  return response.data;
};

// Add more API functions as needed