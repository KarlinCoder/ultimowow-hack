import React, { useState } from "react";
import { FaKey, FaCoins, FaRedo } from "react-icons/fa";
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
    <div className="flex flex-col bg-black/50 items-center justify-center min-h-screen text-white relative">
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
      <div className="flex items-center mb-8">
        <img src="/logo.png" alt="UltimaWoW Logo" className="w-16 h-16 mr-4" />
        <div className="flex flex-col">
          <h1 className="text-5xl font-bold text-yellow-400">UltimoWoW</h1>
          <h2 className="text-lg text-gray-300">Farmea monedas con tu IP</h2>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="w-full max-w-md bg-gray-800/70 rounded-lg p-6 border border-gray-600">
        {step === 0 && (
          <div className="flex flex-col items-center">
            {!isLoading && !error && (
              <>
                <FaCoins className="text-yellow-400 text-5xl mb-4" />
                <h3 className="text-2xl font-bold text-center mb-6">
                  Comenzar farmeo
                </h3>
                <motion.button
                  onClick={startFarming}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition font-bold flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar Proceso
                </motion.button>
              </>
            )}

            {isLoading && (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mb-4"></div>
                <p className="text-center text-gray-300 mb-2">
                  {loaderMessage}
                </p>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mt-4">
                  <div
                    className="bg-yellow-500 h-2.5 rounded-full"
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
                <div className="text-red-400 text-5xl mb-4">✖</div>
                <h3 className="text-xl font-bold text-red-400 mb-2">
                  Error en la conexión
                </h3>
                <p className="text-gray-300 mb-6">
                  El servidor no respondió. Inténtalo de nuevo.
                </p>
                <motion.button
                  onClick={startFarming}
                  className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-500 transition font-bold flex items-center"
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
          <form className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              Acceso a UltimoWoW
            </h3>

            <input
              type="text"
              placeholder="Nombre de Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
              required
            />

            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 mb-2"></div>
                <p className="text-gray-300 text-sm">{loaderMessage}</p>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={handleLogin}
                className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition font-bold"
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
          <form className="flex flex-col space-y-4">
            <h3 className="text-xl font-bold text-yellow-400 mb-2">
              Solicitar monedas
            </h3>

            <input
              type="number"
              placeholder="Cantidad de monedas a agregar"
              value={coinAmount}
              onChange={(e) => setCoinAmount(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600"
              required
              min="1"
            />

            {isLoading ? (
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-yellow-500 mb-2"></div>
                <p className="text-gray-300 text-sm">{loaderMessage}</p>
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={requestCoins}
                className="w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition font-bold"
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
              className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-6 max-w-md w-full border border-yellow-400"
            >
              <div className="text-center">
                <div className="text-green-400 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">
                  ¡Solicitud completada!
                </h3>
                <p className="text-gray-300 mb-6">
                  Monedas solicitadas correctamente. Tu pedido aparecerá en el
                  buzón en aproximadamente {randomMinutes} minutos.
                </p>
                <motion.button
                  onClick={resetProcess}
                  className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-500 transition font-bold"
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
              className="bg-gray-800/95 backdrop-blur-sm rounded-lg p-6 max-w-md w-full border border-yellow-400 shadow-xl"
            >
              {!isAuthenticated ? (
                <>
                  <h3 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center">
                    <FaKey className="mr-2" /> Acceso Administrador
                  </h3>
                  <form onSubmit={handleAdminLogin}>
                    <input
                      type="password"
                      placeholder="Contraseña de administrador"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className="w-full px-4 py-2 rounded-md bg-gray-700/90 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 mb-4"
                      required
                      autoFocus
                    />
                    {passwordError && (
                      <p className="text-red-400 mb-4">Contraseña incorrecta</p>
                    )}
                    <div className="flex justify-end space-x-3">
                      <motion.button
                        type="button"
                        onClick={() => {
                          setShowAdminModal(false);
                          setPasswordError(false);
                          setAdminPassword("");
                        }}
                        className="px-4 py-2 bg-gray-600/90 rounded-md hover:bg-gray-500 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Cancelar
                      </motion.button>
                      <motion.button
                        type="submit"
                        className="px-4 py-2 bg-yellow-600/90 rounded-md hover:bg-yellow-500 transition font-bold"
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
                    <h3 className="text-2xl font-bold text-yellow-400">
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
                  <div className="bg-gray-700/80 p-4 rounded-md">
                    <p className="text-gray-300">
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
