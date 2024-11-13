export type IOffersResponse = IOffer;

export type IOffer = {
  items: IOfferItems;
};

export type IOfferItems = {
  promoted: IOfferItem[];
  regular: IOfferItem[];
};

export type IOfferItem = {
  delivery: IOfferDelivery;
};

export type IOfferDelivery = {
  lowestPrice: IOfferLowestPrice;
};

export type IOfferLowestPrice = {
  amount: number;
  currency: string;
};
