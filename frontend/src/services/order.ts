import API from "@/src/lib/api";
import { OrderResponse } from "@/src/types/order";

export const getOrdersByUser = async (
  userId: string
): Promise<OrderResponse> => {
  try {
    const { data } = await API.get<OrderResponse>(
      `/orderbyuser/${userId}`
    );

    return data;
  } catch (error: any) {
    throw (
      error?.response?.data || {
        response: "failed",
        message: "Something went wrong",
      }
    );
  }
};

export const getAllOrders = async (): Promise<OrderResponse> => {
  try {
    const { data } = await API.get<OrderResponse>("/orders");

    return data;
  } catch (error: any) {
    throw (
      error?.response?.data || {
        response: "failed",
        message: "Something went wrong",
      }
    );
  }
};