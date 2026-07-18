export const getComboAvailableStock = (combo: any): number => {
  if (!combo?.products?.length) return 0;

  const stocks = combo.products.map((item: any) => {
    const dbProduct = item.product;
    if (!dbProduct) return 0;

    let availableQty = dbProduct.quantity ?? 0;

    if (item.variantId) {
      const variant = dbProduct.variants?.find(
        (v: any) => v._id === item.variantId
      );
      availableQty = variant?.quantity ?? 0;
    }

    const requiredPerCombo = item.quantity || 1;

    return Math.floor(availableQty / requiredPerCombo);
  });

  return Math.min(...stocks);
};