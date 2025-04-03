'use client';
import { AuthRoute } from '@/components/AuthRoute';

export default function AdminDashboard() {
  return (
    <>
      <AuthRoute allowedRoles={['ADMIN']} />
      {/* Contenido del dashboard para el administrador*/}
      <p>Gestión del administrador</p>
    </>
  );
}