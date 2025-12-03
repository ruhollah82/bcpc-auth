import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const BCPC404Page = () => {
  // Balloon configurations
  const balloons = [
    {
      id: 1,
      color: "text-red-500",
      x: "10%",
      y: "5%",
      size: "text-4xl",
      delay: 0,
    },
    {
      id: 2,
      color: "text-blue-500",
      x: "85%",
      y: "10%",
      size: "text-5xl",
      delay: 0.3,
    },
    {
      id: 3,
      color: "text-yellow-500",
      x: "15%",
      y: "25%",
      size: "text-6xl",
      delay: 0.6,
    },
    {
      id: 4,
      color: "text-green-500",
      x: "75%",
      y: "30%",
      size: "text-4xl",
      delay: 0.9,
    },
    {
      id: 5,
      color: "text-purple-500",
      x: "40%",
      y: "15%",
      size: "text-5xl",
      delay: 1.2,
    },
    {
      id: 6,
      color: "text-pink-500",
      x: "60%",
      y: "20%",
      size: "text-4xl",
      delay: 1.5,
    },
    {
      id: 7,
      color: "text-cyan-500",
      x: "90%",
      y: "35%",
      size: "text-6xl",
      delay: 1.8,
    },
    {
      id: 8,
      color: "text-orange-500",
      x: "25%",
      y: "40%",
      size: "text-5xl",
      delay: 2.1,
    },
  ];

  return (
    <div
      className="min-h-screen bg-gray-950 text-white font-mono overflow-hidden relative"
      dir="ltr"
    >
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/10"></div>

      {/* Floating balloons */}
      {balloons.map((balloon) => (
        <motion.div
          key={balloon.id}
          className="absolute"
          style={{ left: balloon.x, top: balloon.y }}
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: [null, -50, -100, -150, -200],
            opacity: 1,
            rotate: [0, 5, -5, 5, 0],
          }}
          transition={{
            duration: 15,
            delay: balloon.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <Icon
            icon="mdi:balloon"
            className={`${balloon.color} ${balloon.size} opacity-80 hover:opacity-100 transition-opacity`}
          />
        </motion.div>
      ))}

      {/* Astronaut */}
      <motion.div
        className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <Icon
          icon="mdi:astronaut"
          className="text-8xl md:text-9xl text-white drop-shadow-lg hover:scale-110 transition-transform"
        />
      </motion.div>

      <div className="container mx-auto px-4 py-12 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          {/* <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              BCPC 2025
            </h1>
            <p className="text-gray-300 mt-2 text-lg">
              Birjand University Collegiate Programming Contest
            </p>
            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="px-3 py-1 bg-blue-900/30 rounded-full text-sm border border-blue-700/50">
                ICPC Style
              </span>
              <span className="px-3 py-1 bg-purple-900/30 rounded-full text-sm border border-purple-700/50">
                ACM Certified
              </span>
            </div>
          </motion.header> */}

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 min-h-[50vh]">
            {/* Terminal Section */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-2xl"
            >
              <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
                {/* Terminal header */}
                <div className="bg-gray-800/90 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors"></div>
                  </div>
                  <span className="text-sm ml-3 text-gray-300">
                    bcpc@terminal:~
                  </span>
                  <div className="ml-auto flex items-center gap-2">
                    <Icon icon="mdi:server" className="text-gray-400 text-sm" />
                    <span className="text-xs text-gray-400">v2025.1</span>
                  </div>
                </div>

                {/* Terminal content */}
                <div className="p-4 md:p-6 font-mono">
                  {/* Command history */}
                  <div className="space-y-3 mb-6">
                    <div className="flex flex-wrap items-baseline">
                      <span className="text-green-400">user@bcpc:~$</span>
                      <span className="ml-2 text-gray-300">
                        find /contest/pages -name "*.tsx"
                      </span>
                    </div>

                    <div className="text-red-400 animate-pulse">
                      ERROR 404: Resource not found in contest directory
                    </div>

                    <div className="flex flex-wrap items-baseline">
                      <span className="text-green-400">user@bcpc:~$</span>
                      <span className="ml-2 text-gray-300">
                        status --contest-info
                      </span>
                    </div>

                    <div className="text-cyan-400 space-y-1 pl-4">
                      <div>CONTEST: BCPC 2025</div>
                      <div>DATE: October 2025</div>
                      <div>PROBLEMS: 10 (A-J)</div>
                      <div>DURATION: 5 hours</div>
                      <div>TEAMS: 200+</div>
                    </div>
                  </div>

                  {/* Error display */}
                  <div className="border-t border-gray-700 pt-6">
                    <div className="text-center">
                      <motion.div
                        className="text-7xl md:text-8xl font-bold mb-4 tracking-tighter"
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 1, -1, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <span className="text-red-500">4</span>
                        <span className="text-blue-500">0</span>
                        <span className="text-green-500">4</span>
                      </motion.div>

                      <p className="text-xl text-gray-300 mb-2">
                        Page Not Found
                      </p>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto">
                        The page you're looking for has been lost in the binary
                        cosmos. Return to known coordinates.
                      </p>

                      {/* Navigation buttons */}
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                          href="https://bircpc.ir"
                          className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-3 transition-all"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon
                            icon="mdi:home"
                            className="text-xl text-white"
                          />
                          <span className="text-white">Return to Home</span>
                          <Icon
                            icon="mdi:rocket-launch"
                            className="text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </motion.a>

                        <motion.a
                          href="/"
                          className="group bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-3 transition-all border border-gray-700"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Icon icon="mdi:trophy" className="text-xl" />
                          <span>Register for BCPC 2025</span>
                          <Icon
                            icon="mdi:arrow-right"
                            className="text-xl opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </motion.a>
                      </div>
                    </div>
                  </div>

                  {/* Live status */}
                  <div className="mt-6 pt-4 border-t border-gray-700">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-green-500"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      ></motion.div>
                      <span>SYSTEM STATUS: OPERATIONAL</span>
                      <span className="mx-2">•</span>
                      <span>CONTEST: UPCOMING</span>
                      <span className="mx-2">•</span>
                      <span>REGISTRATION: OPEN</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contest info footer */}
              {/* <div className="mt-6 text-center">
                <div className="inline-flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 bg-gray-900/50 rounded-lg px-6 py-3">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:calendar" className="text-blue-400" />
                    <span>October 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:clock-outline" className="text-green-400" />
                    <span>5 Hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon
                      icon="mdi:account-multiple"
                      className="text-purple-400"
                    />
                    <span>3 per team</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:laptop" className="text-yellow-400" />
                    <span>10 Problems</span>
                  </div>
                </div>
              </div> */}
            </motion.div>
          </div>

          {/* Footer */}
          {/* <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center text-gray-500 text-sm pt-6 border-t border-gray-800/50"
          >
            <p className="mb-2">
              Birjand University Collegiate Programming Contest • Since 2008
            </p>
            <p className="text-gray-600">
              Official ACM-ICPC Regional Contest • Hosted by Department of
              Computer Engineering
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Icon
                icon="mdi:github"
                className="text-xl hover:text-gray-300 cursor-pointer transition-colors"
              />
              <Icon
                icon="mdi:discord"
                className="text-xl hover:text-gray-300 cursor-pointer transition-colors"
              />
              <Icon
                icon="mdi:twitter"
                className="text-xl hover:text-gray-300 cursor-pointer transition-colors"
              />
              <Icon
                icon="mdi:email"
                className="text-xl hover:text-gray-300 cursor-pointer transition-colors"
              />
            </div>
          </motion.footer> */}
        </div>
      </div>

      {/* Floating code particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-cyan-400 font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 20 + 10}px`,
            }}
            initial={{ y: -100, rotate: 0 }}
            animate={{
              y: "100vh",
              rotate: 360,
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          >
            {
              ["{", "}", "<", ">", ";", "=", "(", ")", "[", "]"][
                Math.floor(Math.random() * 10)
              ]
            }
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BCPC404Page;
