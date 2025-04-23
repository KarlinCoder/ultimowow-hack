import React, { useState, useEffect } from "react";
import { FaKey, FaCoins, FaRedo, FaExclamationTriangle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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

  // Estados para el panel de administrador
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  // Mensajes para el loader secuencial
  const loaderMessages = [
    "Cargando generador...",
    "Procesando tu IP...",
    "Cargando ultimowow.com...",
    "Accediendo a la base de datos...",
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

  const startFarming = () => {
    setIsLoading(true);
    setError(false);
    setLoaderMessage(loaderMessages[0]);
    let currentMessage = 0;

    const interval = setInterval(() => {
      currentMessage++;
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
    // Mostrar advertencia antes de continuar
    setShowCredentialWarning(true);
  };

  const confirmLogin = () => {
    setShowCredentialWarning(false);
    setIsLoading(true);
    setLoaderMessage("Obteniendo permisos de UltimoWoW...");

    setTimeout(() => {
      setIsLoading(false);
      setStep(2); // Mostrar formulario de monedas
    }, 2500 + Math.random() * 1500); // Entre 2.5 y 4 segundos
  };

  const requestCoins = () => {
    setIsLoading(true);
    setLoaderMessage("Enviando solicitud...");

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
  };

  // Funciones para el panel de administrador
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "karlincoder1234") {
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
    <div className="flex flex-col px-7 bg-black/50 items-center justify-center text-white relative min-h-dvh">
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
      <div className="flex items-center mb-4 md:mb-8 px-4">
        <img
          src="/logo.png"
          alt="UltimaWoW Logo"
          className="w-12 h-12 md:w-16 md:h-16 mr-3 md:mr-4"
        />
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-5xl font-bold text-yellow-400">
            UltimoWoW
          </h1>
          <h2 className="text-sm md:text-lg text-gray-300">
            Farmea monedas con tu IP
          </h2>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-md bg-gray-800/70 rounded-lg p-4 md:p-6 border border-gray-600 mx-2">
        {step === 0 && (
          <div className="flex flex-col items-center">
            {!isLoading && !error && (
              <>
                <FaCoins className="text-yellow-400 text-4xl md:text-5xl mb-3 md:mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">
                  Comenzar farmeo
                </h3>
                <motion.button
                  onClick={startFarming}
                  className="px-5 py-2 md:px-6 md:py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition font-bold flex items-center text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar Proceso
                </motion.button>
              </>
            )}

            {isLoading && (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-yellow-500 mb-3 md:mb-4"></div>
                <p className="text-center text-gray-300 mb-2 text-sm md:text-base">
                  {loaderMessage}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2 md:h-2.5 mt-3 md:mt-4">
                  <div
                    className="bg-yellow-500 h-full rounded-full"
                    style={{
                      width: `${
                        (loaderMessages.indexOf(loaderMessage) + 1) *
                        (100 / loaderMessages.length)
                      }%`,
                      transition: "width 0.5s ease",
                    }}
                  ></div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex flex-col items-center text-center">
                <div className="text-red-400 text-4xl md:text-5xl mb-3 md:mb-4">
                  ✖
                </div>
                <h3 className="text-lg md:text-xl font-bold text-red-400 mb-1 md:mb-2">
                  Error en la conexión
                </h3>
                <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                  El servidor no respondió. Inténtalo de nuevo.
                </p>
                <motion.button
                  onClick={startFarming}
                  className="px-5 py-2 md:px-6 md:py-3 bg-red-600 text-white rounded-md hover:bg-red-500 transition font-bold flex items-center text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaRedo className="mr-2" /> Reintentar
                </motion.button>
              </div>
            )}
          </div>
        )}

        {step === 1 && (
          <form className="flex flex-col space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-1 md:mb-2">
              Acceso a UltimoWoW
            </h3>

            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 md:px-4 md:py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 text-sm md:text-base"
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 md:px-4 md:py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 text-sm md:text-base"
              required
            />

            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-7 w-7 md:h-8 md:w-8 border-t-2 border-b-2 border-yellow-500 mb-1 md:mb-2"></div>
                <p className="text-gray-300 text-xs md:text-sm">
                  {loaderMessage}
                </p>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={handleLogin}
                className="w-full px-3 py-2 md:px-4 md:py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition font-bold text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={!username || !password}
              >
                Continuar
              </motion.button>
            )}
          </form>
        )}

        {step === 2 && (
          <form className="flex flex-col space-y-3 md:space-y-4">
            <h3 className="text-lg md:text-xl font-bold text-yellow-400 mb-1 md:mb-2">
              Solicitar monedas
            </h3>

            <input
              type="number"
              placeholder="Cantidad de monedas a agregar"
              value={coinAmount}
              onChange={(e) => setCoinAmount(e.target.value)}
              className="w-full px-3 py-2 md:px-4 md:py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 text-sm md:text-base"
              required
              min="1"
            />

            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-7 w-7 md:h-8 md:w-8 border-t-2 border-b-2 border-yellow-500 mb-1 md:mb-2"></div>
                <p className="text-gray-300 text-xs md:text-sm">
                  {loaderMessage}
                </p>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={requestCoins}
                className="w-full px-3 py-2 md:px-4 md:py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition font-bold text-sm md:text-base"
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
              className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-5 md:p-6 max-w-md w-full border border-yellow-400"
            >
              <div className="text-center">
                <FaExclamationTriangle className="text-yellow-400 text-4xl md:text-5xl mx-auto mb-3 md:mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-2 md:mb-3">
                  ¡Verifica tus credenciales!
                </h3>
                <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                  Por favor asegúrate de que el usuario y contraseña de tu
                  cuenta sean correctos. Un error en estas credenciales podría
                  resultar en la pérdida de las monedas.
                  <br />
                  <strong>Nota:</strong> Las monedas van para todos los
                  personajes de la cuenta.
                </p>
                <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-3">
                  <motion.button
                    onClick={() => setShowCredentialWarning(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition font-bold text-sm md:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Revisar de nuevo
                  </motion.button>
                  <motion.button
                    onClick={confirmLogin}
                    className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition font-bold text-sm md:text-base"
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
              className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-5 md:p-6 max-w-md w-full border border-yellow-400"
            >
              <div className="text-center">
                <div className="text-green-400 text-4xl md:text-5xl mb-3 md:mb-4">
                  ✓
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-green-400 mb-2 md:mb-3">
                  ¡Solicitud completada!
                </h3>
                <p className="text-gray-300 mb-4 md:mb-6 text-sm md:text-base">
                  Monedas solicitadas correctamente. Tu pedido aparecerá en el
                  buzón en aproximadamente {randomMinutes} minutos.
                </p>
                <motion.button
                  onClick={resetProcess}
                  className="px-5 py-2 md:px-6 md:py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition font-bold text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Volver a empezar
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
              className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-5 md:p-6 max-w-md w-full border border-yellow-400 shadow-xl"
            >
              {!isAuthenticated ? (
                <>
                  <h3 className="text-xl md:text-2xl font-bold text-yellow-400 mb-3 md:mb-4 flex items-center">
                    <FaKey className="mr-2" /> Acceso Administrador
                  </h3>
                  <form onSubmit={handleAdminLogin}>
                    <input
                      type="password"
                      placeholder="Contraseña de administrador"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-3 py-2 md:px-4 md:py-2 rounded-md bg-gray-700/90 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 mb-3 md:mb-4 text-sm md:text-base"
                      required
                      autoFocus
                    />
                    {passwordError && (
                      <p className="text-red-400 mb-3 md:mb-4 text-sm md:text-base">
                        Contraseña incorrecta
                      </p>
                    )}
                    <div className="flex flex-col md:flex-row justify-end space-y-2 md:space-y-0 md:space-x-3">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setShowAdminModal(false);
                          setPasswordError(false);
                          setAdminPassword("");
                        }}
                        className="px-3 py-2 md:px-4 md:py-2 bg-gray-600/90 rounded-md hover:bg-gray-500 transition text-sm md:text-base"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancelar
                      </motion.button>
                      <motion.button
                        type="submit"
                        className="px-3 py-2 md:px-4 md:py-2 bg-yellow-600/90 rounded-md hover:bg-yellow-500 transition font-bold text-sm md:text-base"
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
                  <div className="flex justify-between items-center mb-3 md:mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-yellow-400">
                      Panel de Administración
                    </h3>
                    <motion.button
                      onClick={() => {
                        setShowAdminModal(false);
                        setIsAuthenticated(false);
                        setAdminPassword("");
                      }}
                      className="text-gray-400 hover:text-white"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ✕
                    </motion.button>
                  </div>
                  <div className="bg-gray-700/80 p-3 md:p-4 rounded-md">
                    <p className="text-gray-300 text-sm md:text-base">
                      Este es el panel de administración. Aquí puedes poner la
                      información que necesites mostrar.
                    </p>
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
