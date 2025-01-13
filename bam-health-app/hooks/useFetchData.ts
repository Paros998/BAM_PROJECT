import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Axios from "axios";

interface UseFetchDataConfig<T> {
  dataMapper?: (data: any) => T;
  params?: any;
  shouldFetch?: boolean;
}

type UseFetchDataReturnModel<T> = [T, () => Promise<void>, boolean];

export const useFetchData = <T>(
  endpoint: string,
  config?: UseFetchDataConfig<T>,
): UseFetchDataReturnModel<T> => {
  const [data, setData] = useState<T>();
  const [isPending, setIsPending] = useState(false);

  const { params, dataMapper, shouldFetch = true } = config || {};

  const fetchData = useCallback(async () => {
    if (!shouldFetch) {
      return;
    }
    setIsPending(true);
    try {
      const { data: fetchedData } = await Axios.get<T>(endpoint, { params });
      const resultData = dataMapper?.(fetchedData) || fetchedData;
      setData(resultData);
    } catch (e) {
      toast.error("Couldn't fetch data");
    } finally {
      setIsPending(false);
    }
  }, [setData, dataMapper, endpoint, params, shouldFetch]);

  useEffect(() => {
    fetchData().catch();
  }, [fetchData]);

  return [data as T, fetchData, isPending];
};
