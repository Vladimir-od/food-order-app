import { useMutation, useQuery } from '@tanstack/react-query';

export const getMeals = () => {
  return useQuery({
    queryKey: ['meals'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/meals');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(response.statusText || 'Something went wrong!');
      }
      return data;
    },
  });
};

export const createOrder = () => {
  return useMutation({
    mutationFn: async (orderData) => {
      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: {
            items: orderData.items,
            customer: orderData.customerData,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(response.statusText || 'Something went wrong!');
      }
    },
  });
};
