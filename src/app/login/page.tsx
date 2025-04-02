"use client";

import Image from "next/image";
import { Input } from "@/components/Input";
import { Alert } from "@/components/Alert";
import { userAuthenticated } from "@/services/auth/authService";
import {
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "@/services/auth/authService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import toast from 'react-hot-toast';

const LoginPage = () => {
  const router = useRouter();

  const [formDataLogin, setFormDataLogin] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [modalForgotPassword, setModalForgotPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [modalVerifyOtp, setModalVerifyOtp] = useState<boolean>(false);
  const [modalUpdatePassword, setModalUpdatePassword] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>('info');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const { email, password } = formDataLogin;
  
    if (!email || !password) {
      toast.error('Todos los campos son obligatorios');
      setLoading(false);
      return;
    }
  
    if (!email.includes('@')) {
      toast.error('El correo electrónico debe tener un formato válido');
      setLoading(false);
      return;
    }
  
    try {
      const response = await userAuthenticated(formDataLogin);
    
      // Guardo el token
      localStorage.setItem('token', response.token);
    
      toast.success(`Bienvenid@, ${response.name}`);
      router.push('/shop');
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
    setLoading(false);
  };  

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await forgotPassword({ email }); //  Es un objeto porque tengo una interface que está validando los datos
      toast.success("OTP enviada al correo");
      setModalForgotPassword(false);
      setModalVerifyOtp(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await verifyOtp({ email, otp });
      setModalVerifyOtp(false);
      setModalUpdatePassword(true); // Abrir modal para cambiar contraseña
    } catch (error: any) {
      setError(error.message || "Error al verificar la OTP");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await resetPassword({ email, newPassword });
      if (newPassword.length < 6) {
        setAlertMessage("La contraseña debe tener al menos 6 caracteres");
        setAlertType("error");
        return;
      }
      
      setModalUpdatePassword(false);
      alert("Contraseña actualizada exitosamente");
      // Puedes redirigir al login si quieres:
      router.push("/login");
    } catch (error: any) {
      setError(error.message || "Error al reestablecer la contraseña");
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

          {/* Para mostrar alerta de error */}
          {alertMessage && 
            <Alert type={alertType} message={alertMessage} />
          }

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#008060] text-white py-3 rounded cursor-pointer font-semibold shadow-md transition duration-300 ease-in-out hover:bg-[#00694d] hover:shadow-xl"
          >
            {loading ? "Validando datos..." : "Iniciar sesión"}
          </button>
          <div className="flex flex-col md:flex-row justify-between gap-3">
            <p
              className="text-sm cursor-pointer border-b-2 border-transparent hover:border-[#ff0000] transition-all duration-300"
              onClick={() => setModalForgotPassword(true)}
            >
              ¿Olvidaste contraseña?
            </p>
            <Link
              href="/register"
              className="text-sm border-b-2 border-transparent hover:border-[#5A3E29] transition-all duration-300"
            >
              ¿No tienes una cuenta?.
            </Link>
          </div>
        </form>

        {/* Modal para enviar la OTP para correo */}
        {modalForgotPassword && (
          <section className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
            <div className="bg-white p-6 shadow-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-center uppercase text-emerald-700">
                Restablecer contraseña
              </h2>
              <form onSubmit={handleForgotPassword}>
                <label className="block text-sm font-medium text-gray-700">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  required
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setModalForgotPassword(false)}
                    className="text-sm text-gray-500 cursor-pointer hover:text-red-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-900 cursor-pointer text-white px-4 py-2 rounded hover:bg-emerald-950 text-sm"
                  >
                    Enviar OTP
                  </button>
                </div>
              </form>
              {error && (
                <p className="text-red-500 text-sm text-center animate-pulse">
                  {error}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Modal para verificar el OTP */}
        {modalVerifyOtp && (
          <section className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
            <div className="bg-white p-6 shadow-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-center uppercase text-emerald-700">
                Verificar código OTP
              </h2>
              <form onSubmit={handleVerifyOtp}>
                <label className="block text-sm font-medium text-gray-700">
                  Código OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  required
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setModalVerifyOtp(false)}
                    className="text-sm text-gray-500 cursor-pointer hover:text-red-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-900 text-white px-4 py-2 rounded hover:bg-emerald-950 text-sm"
                  >
                    Verificar
                  </button>
                </div>
              </form>
              {error && (
                <p className="text-red-500 text-sm text-center animate-pulse">
                  {error}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Modal para cambiar contraseña */}
        {modalUpdatePassword && (
          <section className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)] z-50">
            <div className="bg-white p-6 shadow-md w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-center uppercase text-emerald-700">
                Cambiar contraseña
              </h2>
              <form onSubmit={handleUpdatePassword}>
                <label className="block text-sm font-medium text-gray-700">
                  Nueva contraseña
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  required
                />

                <label className="block text-sm font-medium text-gray-700">
                  Confirmar contraseña
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-800"
                  required
                />

                <div className="flex justify-between mt-4">
                  <button
                    type="button"
                    onClick={() => setModalUpdatePassword(false)}
                    className="text-sm text-gray-500 cursor-pointer hover:text-red-500"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-emerald-900 text-white px-4 py-2 rounded hover:bg-emerald-950 text-sm"
                  >
                    Actualizar contraseña
                  </button>
                </div>
              </form>
              {error && (
                <p className="text-red-500 text-sm text-center animate-pulse mt-4">
                  {error}
                </p>
              )}
            </div>
          </section>
        )}
      </section>
    </>
  );
};

export default LoginPage;
