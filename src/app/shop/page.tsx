'use client';

import { useEffect, useState } from "react";
import { findAllProduct } from "@/services/products/productService";
import { Product } from "@/types/typeDefinition";
import ImagePresentation from "@/components/ui/shop/ImagePresentation";
import ProductGrid from "@/components/ui/shop/ProductGrid";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const fetchProduct = await findAllProduct();
        if (Array.isArray(fetchProduct)) {
          setProducts(fetchProduct);
        } else {
          console.log('Respuesta inesperada:', fetchProduct);
        }
      } catch (error) {
        console.log('Error cargando productos:', error);
      } finally {
        setLoading(false);
      }
    }

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
