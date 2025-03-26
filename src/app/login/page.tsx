"use client";

import Image from "next/image";
import { Input } from "@/components/Input";
import { userAuthenticated } from "@/services/auth/authService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await userAuthenticated(formDataLogin);
      router.push("/shop");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-br px-4 animate-fade-in">
        <div className="mb-6 md:mb-0 md:mr-12 transition-all duration-700 ease-in-out transform hover:scale-105">
          <Image
            src="/presentation-img4.webp"
            alt="Imagen de sillas para la páginas de iniciar sesión"
            width={410}
            height={410}
            className="object-cover"
          />
        </div>

        {/* Formulario de iniciar de sesión */}
        <form
          onSubmit={handleSubmitLogin}
          className="w-full max-w-md p-8 md:p-8 space-y-4 transition-all duration-700 ease-in-out transform hover:scale-[1.01]"
        >
          <h2 className="text-3xl font-extrabold text-[#008060] text-center uppercase">
            Inicia sesión
          </h2>
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            value={formDataLogin.email}
            onChange={handleChange}
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            value={formDataLogin.password}
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
            {loading ? "Validando datos..." : "Iniciar sesión"}
          </button>
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <p className="text-sm cursor-pointer border-b-2 border-transparent hover:border-[#ff0000] transition-all duration-300">¿Olvidaste contraseña?</p>
            <Link href='/login' className="text-sm border-b-2 border-transparent hover:border-[#5A3E29] transition-all duration-300">¿No tienes una cuenta?.</Link>
          </div>
        </form>          
      </section>
    </>
  );
};

export default LoginPage;
