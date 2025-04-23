import React, { useState } from "react";
import { FaKey } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const App: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [randomNumber, setRandomNumber] = useState<number>(0);
  const [showAdminModal, setShowAdminModal] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setRandomNumber(Math.floor(Math.random() * (15 - 10 + 1)) + 10);
    }, 3000);
  };

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

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 w-full max-w-xs"
      >
        <input
          type="text"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 bg-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 bg-opacity-70 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600"
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-blue-600 bg-opacity-90 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-gray-600 font-bold"
        >
          {isLoading ? "Cargando..." : "Enviar"}
        </button>
      </form>

      {/* Loader */}
      {isLoading && (
        <div className="mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {isSuccess && (
        <div className="mt-4 p-4 bg-green-900 bg-opacity-70 text-green-300 text-center rounded-md">
          <p className="font-bold text-green-400">¡Éxito!</p>
          <p>
            Sus monedas se han agregado a la cola de envíos. Por favor espere{" "}
            <strong className="text-yellow-300">{randomNumber} minutos</strong>.
          </p>
        </div>
      )}

      {/* Modal de administrador con animaciones */}
      <AnimatePresence>
        {showAdminModal && (
          <>
            {/* Fondo oscuro semitransparente */}
            <motion.div
              key="backdrop"
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              {/* Contenido del modal */}
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
                      <motion.div
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <input
                          type="password"
                          placeholder="Contraseña de administrador"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          className="w-full px-4 py-2 rounded-md bg-gray-700/90 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-gray-600 mb-4"
                          required
                          autoFocus
                        />
                      </motion.div>
                      {passwordError && (
                        <motion.p
                          className="text-red-400 mb-4"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          Contraseña incorrecta
                        </motion.p>
                      )}
                      <div className="flex justify-end space-x-3 mt-4">
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
                    <motion.div
                      className="bg-gray-700/80 p-4 rounded-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {/* Espacio para tu contenido */}
                      <p className="text-gray-300">
                        Este es el panel de administración. Aquí puedes poner la
                        información que necesites mostrar.
                      </p>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
