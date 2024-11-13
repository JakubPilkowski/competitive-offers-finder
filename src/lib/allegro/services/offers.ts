import axios from "axios";

export default async function getOffersByEAN(ean: string, categoryId: number) {
  const response = await axios.get("https://api.allegro.pl/offers/listing", {
    headers: {
      Accept: "application/vnd.allegro.public.v1+json",
    },
    params: {
      phrase: ean,
      "category.id": categoryId,
      sort: "+price",
    },
  });

  return response.data;
}
