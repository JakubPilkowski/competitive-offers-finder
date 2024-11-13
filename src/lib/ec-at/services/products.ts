import { IProduct } from "../../../types/IProduct";

function getEcatProductListFromJson(name: string) {
  const productList = require(`./${name}.json`);
  return productList;
}

function getEcatProductList(name: string) {
  const productList = getEcatProductListFromJson(name);
  return productList;
}

export function parseEcatProductList(productList: any): IProduct[] {
  const trimProduct = productList.products;
  const productVariations = trimProduct.map(
    (product: any) => product.productVariation
  );

  return productVariations.map((productVariation: any) => ({
    ean: productVariation[0].ean,
    price: productVariation[0].priceMarginTaxIncluded,
  }));
}
