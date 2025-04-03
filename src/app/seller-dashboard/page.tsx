'use client';
import { AuthRoute } from '@/components/AuthRoute';

export default function SellerDashboard() {
  return (
    <>
      <AuthRoute allowedRoles={['SELLER']} />
      {/* Contenido del dashboard del vendedor */}
      <p>Gestión de los productos y perfil de los vendedores</p>
    </>
  );
}