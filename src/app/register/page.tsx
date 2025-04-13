'use client';

import { useState } from "react";
import { Input } from "@/components/Input";
import { registerUser } from "@/services/auth/authService";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await registerUser(formData);
      localStorage.setItem('userRole', formData.name);
      toast.success(`Registro exitoso. ¡Bienvenid@! ${formData.name}`);
      router.push('/login');
    } catch (err: any) {
      toast.error(err.message || 'Error al registrarse.');
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  

  return (
    <>
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br px-4 animate-fade-in">
        {/* Logo animado */}
        <div className="mb-6 md:mb-0 md:mr-12 transition-all duration-700 ease-in-out transform hover:scale-105">
          <Image
            src="/presentation-img4.webp"
            alt="Imagen de sillas para la páginas de registro"
            width={410}
            height={410}
            className="object-cover"
          />
        </div>

        {/* Formulario de registro */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 md:p-8 space-y-2.5 transition-all duration-700 ease-in-out transform hover:scale-[1.01]"
        >
          <h2 className="text-3xl font-extrabold text-[#008060] text-center uppercase">
            Crear mi cuenta
          </h2>

          <Input
            label="Nombre completo"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Teléfono"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            label="Dirección"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          {error && (
            <p className="text-red-500 text-sm text-center animate-pulse">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008060] text-white py-3 rounded cursor-pointer font-semibold shadow-md transition duration-300 ease-in-out hover:bg-[#00694d] hover:shadow-xl"
          >
            {loading ? "Registrando..." : "Registrarse"}
          </button>
          <Link 
            href='/login' 
            className="text-sm text-end cursor-pointer border-b-2 border-transparent hover:border-[#ff0000] transition-all duration-300"
          >
            ¿Ya tienes cuenta?, inicia sesión
          </Link>
        </form>
      </section>
    </>
  );
};

export default RegisterPage;
