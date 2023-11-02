import { useState } from "react";

interface Options<T> {
  fn: (...args: any) => Promise<any>;
  onSuccess?: (response: T) => void;
  onError?: (error: any) => void;
}

interface IResult<T> {
  data?: T;
  error?: any;
  isLoading?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
}

type ReturnType<T> = [sendRequest: Options<T>["fn"], result: IResult<T>];

export const useSendRequest = <T>({
  fn,
  onSuccess,
  onError,
}: Options<T>): ReturnType<T> => {
  const [result, setResult] = useState<IResult<T>>({
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: undefined,
  });

  const sendRequest = async (...args: any): Promise<void> => {
    try {
      setResult((prev) => ({
        ...prev,
        isLoading: true,
        isError: false,
        isSuccess: false,
      }));

      const response = await fn(...args);

      setResult((prev) => ({
        ...prev,
        data: response,
        isSuccess: true,
        isLoading: false,
      }));

      onSuccess?.(response);
    } catch (error) {
      setResult((prev) => ({
        ...prev,
        error: error,
        isError: true,
        isLoading: false,
      }));
      onError?.(error);
    }
  };

  return [sendRequest, result];
};
