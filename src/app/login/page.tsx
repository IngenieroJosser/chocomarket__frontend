"use client";

import Image from "next/image";
import { Input } from "@/components/Input";
import { Alert } from "@/components/Alert";
import {
  userAuthenticated,
  forgotPassword,
  verifyOtp,
  resetPassword,
} from "@/services/auth/authService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

const LoginPage = () => {
  const router = useRouter();

  const [formDataLogin, setFormDataLogin] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [modalForgotPassword, setModalForgotPassword] =
    useState<boolean>(false);
  const [modalVerifyOtp, setModalVerifyOtp] = useState<boolean>(false);
  const [modalUpdatePassword, setModalUpdatePassword] =
    useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "error" | "info">(
    "info"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { email, password } = formDataLogin;

    if (!email || !password) {
      toast.error("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      toast.error("El correo electrónico debe tener un formato válido");
      setLoading(false);
      return;
    }

    try {
      const response = await userAuthenticated({ email, password });

      localStorage.setItem("token", response.token);
      localStorage.setItem("userRole", response.user.role);
      localStorage.setItem("userName", response.user.name);
      toast.success(`Hola, ${response.user.name || "Usuario"}`);

      const userRole = response.user.role.toUpperCase();
      switch (userRole) {
        case "SELLER":
          router.push("/seller-dashboard");
          break;
        case "ADMIN":
          router.push("/admin-dashboard");
          break;
        case "BUYER":
        default:
          router.push("/shop");
          break;
      }
    } catch (err: any) {
      toast.error(err.message);
      setError(err.message);
    }

    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await forgotPassword({ email });
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
      setModalUpdatePassword(true);
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

    if (newPassword.length < 6) {
      setAlertMessage("La contraseña debe tener al menos 6 caracteres");
      setAlertType("error");
      return;
    }

    try {
      await resetPassword({ email, newPassword });
      toast.success("Contraseña actualizada exitosamente");
      setModalUpdatePassword(false);
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
            alt="Imagen login"
            width={410}
            height={410}
            className="object-cover"
          />
        </div>

        <form
          onSubmit={handleSubmitLogin}
          className="w-full max-w-md p-8 md:p-8 space-y-4 transition-all duration-700 ease-in-out transform hover:scale-[1.01]"
        >
          <h2 className="text-3xl font-extrabold text-[#008060] cursor-pointer text-center uppercase">
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

          {error && <Alert type="error" message={error} />}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#008060] text-white px-4 cursor-pointer py-2 rounded hover:bg-[#006748]"
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
            <button
              type="button"
              onClick={() => setModalForgotPassword(true)}
              className="text-sm text-[#075743] cursor-pointer hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <p className="text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="text-[#004736] hover:underline">
              Regístrate
            </Link>
          </p>
        </form>
      </section>

      {/* Modal para recuperación de contraseña */}
      {modalForgotPassword && (
        <div className="modal flex flex-col justify-center items-center h-64 text-gray-500">
          <form onSubmit={handleForgotPassword}>
            <h3>Recuperar contraseña</h3>
            <Input
              label="Correo electrónico"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Enviar OTP</button>
          </form>
        </div>
      )}

      {/* Modal para verificar OTP */}
      {modalVerifyOtp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 animate-fadeIn">
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-6">
              Verificar OTP
            </h3>
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Código OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition duration-300"
              >
                Verificar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para actualizar contraseña */}
      {modalUpdatePassword && (
        <div className="modal flex flex-col justify-center items-center h-64 text-gray-500">
          <form onSubmit={handleUpdatePassword}>
            <h3>Actualizar Contraseña</h3>
            <Input
              label="Nueva contraseña"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
              label="Confirmar contraseña"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Cambiar contraseña</button>
          </form>
        </div>
      )}
    </>
  );
};

export default LoginPage;
