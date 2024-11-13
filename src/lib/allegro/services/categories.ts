import axios from "axios";
import { ICategoriesResponse } from "../types/categories";

export default async function getCategories() {
  const response = await axios.get<ICategoriesResponse>(
    "https://api.allegro.pl/sale/categories",
    {
      headers: {
        Accept: "application/vnd.allegro.public.v1+json",
      },
    }
  );

  return response.data?.categories || [];
}
