type ApiResponse = {
  name: string;
  pricePerDayTotal?: number;
  pricePerGrownupTotal?: number;
  pricePerChildTotal?: number;
  totalPrice: number;
  recommendedResult: boolean;
};