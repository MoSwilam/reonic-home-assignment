import { useState, useEffect } from 'react';
import { getSimulation } from '../api/simulationApi';
import { SimulationResult } from '../types/types';

const useSimulations = () => {
  const [simulation, setSimulations] = useState<SimulationResult>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSimulations = async () => {
      try {
        const data = await getSimulation();
        setSimulations(data);
      } catch (err) {
        console.error(err);
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('Unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSimulations();
  }, []);

  return { simulation, loading, error };
};

export default useSimulations;