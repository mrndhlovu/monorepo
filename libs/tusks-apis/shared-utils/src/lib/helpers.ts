import { IRequestError } from './types';

export const formattedErrorMessage = (data: IRequestError) => {
  let message: string | string[];

  const isArrayList = Array.isArray(data?.errors);

  if (isArrayList) {
    return (message = data?.errors.map((error) => error.message));
  }

  message = 'Something went wrong';

  return message;
};
