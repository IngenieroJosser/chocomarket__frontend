'use client';
import { AuthRoute } from '@/components/AuthRoute';
import Header from '@/components/ui/home/Header';

export default function AdminDashboard() {
  return (
    <>
      <AuthRoute allowedRoles={['ADMIN']} />
      {/* Contenido del dashboard para el administrador*/}
      <Header />
      <p>Gestión del administrador</p>
    </>
  );
}