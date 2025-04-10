'use client';

import { useEffect, useState } from "react";
import { findAllProduct } from "@/services/products/productService";
import { Product } from "@/services/products/productService";
import ImagePresentation from "@/components/ui/shop/ImagePresentation"
import ProductGrid from "@/components/ui/shop/ProductGrid"

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await findAllProduct();
        setProducts(response.products ?? []);
      } catch (error) {
        console.error('Error obteniendo los productos:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <section>
      <ImagePresentation />
      {loading ? (
        <div className="text-center py-10">Cargando productos...</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </section>
  );
};

export default ShopPage;
