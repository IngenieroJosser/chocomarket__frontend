'use client';
import { AuthRoute } from '@/lib/AuthRoute'
import Header from '@/components/ui/home/Header';
import { CartProvider } from '@/context/CartContext';

export default function AdminDashboard() {
  return (
    <>
      <CartProvider>
        <AuthRoute allowedRoles={['ADMIN']} />
        {/* Contenido del dashboard para el administrador*/}
        <Header />
        <p>Gestión del administrador</p>
      </CartProvider>
    </>
  );
}