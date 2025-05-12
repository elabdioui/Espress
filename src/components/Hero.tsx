'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Camera, Mic, Tv, Share2, Rss, FileText, Youtube, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

interface MediaIcon {
  icon: React.ReactNode;
  delay: number;
  position: {
    top: string;
    left: string;
  };
}

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaIcons, setMediaIcons] = useState<MediaIcon[]>([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Simulation de démarrage de vidéo après chargement
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 1000);

    // Configuration des icônes média flottantes
    const icons: MediaIcon[] = [
      { icon: <Camera size={24} />, delay: 0, position: { top: '20%', left: '10%' } },
      { icon: <Mic size={24} />, delay: 0.2, position: { top: '70%', left: '15%' } },
      { icon: <Tv size={24} />, delay: 0.4, position: { top: '30%', left: '85%' } },
      { icon: <Share2 size={24} />, delay: 0.6, position: { top: '60%', left: '80%' } },
      { icon: <Rss size={24} />, delay: 0.8, position: { top: '40%', left: '20%' } },
      { icon: <FileText size={24} />, delay: 1, position: { top: '80%', left: '70%' } },
      { icon: <Youtube size={28} />, delay: 1.2, position: { top: '25%', left: '75%' } },
      { icon: <Instagram size={28} />, delay: 1.4, position: { top: '65%', left: '25%' } },
      { icon: <Twitter size={28} />, delay: 1.6, position: { top: '50%', left: '50%' } },
    ];
    setMediaIcons(icons);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900">
      {/* Vidéo d'arrière-plan avec filtre de couleur */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef} 
          className="absolute w-full h-full object-cover"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="/api/placeholder/1200/600" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-black/80"></div>
      </div>

      {/* Grille dynamique en arrière-plan */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          {Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="absolute w-full" style={{ top: `${rowIndex * 10}%` }}>
              <motion.div 
                className="h-px bg-white/5 w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.1 * rowIndex }}
              />
            </div>
          ))}
          {Array.from({ length: 10 }).map((_, colIndex) => (
            <div key={`col-${colIndex}`} className="absolute h-full" style={{ left: `${colIndex * 10}%` }}>
              <motion.div 
                className="w-px bg-white/5 h-full"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, delay: 0.1 * colIndex }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Particules et icônes média */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Particules brillantes */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 30 - 15],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, Math.random() * 1.5 + 1, 1],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}

        {/* Icônes média flottantes */}
        {mediaIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute text-white/30 z-10"
            style={{ 
              top: item.position.top, 
              left: item.position.left 
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 0.4, 
              scale: 1,
              y: [0, Math.random() * 20 - 10],
              x: [0, Math.random() * 20 - 10]
            }}
            transition={{
              delay: item.delay,
              opacity: { duration: 1 },
              scale: { duration: 0.8 },
              y: { 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity,
                repeatType: "mirror" 
              },
              x: { 
                duration: 4 + Math.random() * 2, 
                repeat: Infinity,
                repeatType: "mirror" 
              }
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* Contenu principal */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Texte et appels à l'action */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white"
          >
            <motion.div 
              className="inline-block mb-3 px-4 py-1 bg-blue-600/30 backdrop-blur-md border border-blue-500/30 rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="text-sm font-medium text-blue-200">Club Média ENCG Settat</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <span className="block">Racontez votre histoire</span>
              <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">avec Espress</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl text-blue-100 mb-8 max-w-xl"
              initial={{ opacity: 0 }}
              animate={isVisible ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Produisez, créez et diffusez du contenu audiovisuel de qualité professionnelle. Rejoignez le club média qui transforme les étudiants en créateurs daujourdhui et en professionnels de demain.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Link href="/rejoindre">
                <motion.div
                  className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full shadow-lg flex items-center group cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Effet de brillance */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                    initial={{ x: "100%" }}
                    animate={{ x: "-100%" }}
                    transition={{ 
                      repeat: Infinity, 
                      repeatType: "loop", 
                      duration: 2,
                      ease: "linear",
                      repeatDelay: 0.5
                    }}
                  />
                  
                  Rejoindre le Club
                  <motion.div
                    className="ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.div>
              </Link>
              
              <Link href="/showreel">
                <motion.div
                  className="px-6 py-3 border border-blue-500/50 bg-blue-900/20 backdrop-blur-sm text-white font-medium rounded-full flex items-center group cursor-pointer"
                  whileHover={{ 
                    backgroundColor: "rgba(30, 58, 138, 0.3)",
                    borderColor: "rgba(59, 130, 246, 0.7)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="mr-2 bg-white/20 p-1 rounded-full"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Play size={16} className="text-white" />
                  </motion.div>
                  Voir nos réalisations
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Élément visuel 3D */}
          <motion.div
            initial={{ opacity: 0, rotateY: 30, z: -100 }}
            animate={isVisible ? { opacity: 1, rotateY: 0, z: 0 } : {}}
            transition={{ duration: 1.2, delay: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Caméra 3D */}
              <motion.div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                animate={{ 
                  y: [0, 10, 0],
                  rotateY: [0, 10, 0],
                  rotateZ: [0, 5, 0]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  repeatType: "mirror" 
                }}
              >
                <div className="w-32 h-32 bg-gradient-to-b from-gray-700 to-gray-900 rounded-lg shadow-2xl relative">
                  {/* Objectif caméra */}
                  <div className="absolute top-5 left-5 w-10 h-10 bg-gradient-to-br from-black to-gray-800 rounded-full">
                    <div className="absolute inset-1 bg-gradient-to-br from-blue-900 to-blue-700 rounded-full">
                      <div className="absolute inset-2 bg-black rounded-full">
                        <div className="absolute inset-[40%] bg-blue-400/30 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  {/* Flash */}
                  <div className="absolute top-5 right-5 w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full"></div>
                  {/* Bouton d'enregistrement */}
                  <div className="absolute bottom-5 right-5 w-6 h-6 bg-gradient-to-br from-red-500 to-red-700 rounded-full animate-pulse"></div>
                </div>
              </motion.div>

              {/* Écran de smartphone */}
              <motion.div
                className="w-56 h-96 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border-4 border-gray-700 p-2 mx-auto relative z-20"
                animate={{ 
                  rotateY: [0, 5, 0],
                  rotateZ: [0, 2, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "mirror" 
                }}
              >
                <div className="bg-blue-900 h-full w-full rounded-2xl overflow-hidden relative">
                  {/* Simuler un écran avec du contenu média */}
                  <div className="absolute inset-0 opacity-80 flex flex-col overflow-hidden">
                    <div className="h-1/2 bg-gradient-to-b from-blue-800 to-blue-900 p-3">
                      <div className="w-full h-6 bg-white/10 rounded-full mb-2"></div>
                      <div className="w-3/4 h-4 bg-white/10 rounded-full mb-4"></div>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white/20"></div>
                        <div className="w-1/2 h-4 bg-white/20 rounded-full"></div>
                      </div>
                      <div className="w-full h-32 bg-white/10 rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 flex items-center justify-center">
                          <Play size={24} className="text-white/60" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 bg-black/30 p-3">
                      <div className="w-full h-4 bg-white/10 rounded-full mb-2"></div>
                      <div className="w-3/4 h-4 bg-white/10 rounded-full mb-4"></div>
                      <div className="flex space-x-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                        <div className="w-8 h-8 rounded-full bg-white/10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Micro professionnel */}
              <motion.div
                className="absolute -bottom-10 -right-10 z-10"
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 3, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "mirror" 
                }}
              >
                <div className="w-6 h-32 bg-gradient-to-t from-gray-700 to-gray-800 rounded-t-full relative">
                  {/* Tête de micro */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg -translate-y-full">
                    <div className="absolute inset-1 bg-black/50 rounded-lg grid grid-cols-3 grid-rows-3 gap-1 p-1">
                      {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-black rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Feuilles de script */}
              <motion.div
                className="absolute -left-16 -bottom-10 z-10 transform -rotate-12"
                animate={{ 
                  y: [0, 3, 0],
                  rotate: [-12, -10, -12]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                  repeatType: "mirror" 
                }}
              >
                <div className="w-32 h-40 bg-white/90 shadow-lg rounded-sm p-2">
                  <div className="w-full h-2 bg-blue-500/70 rounded-full mb-1"></div>
                  <div className="w-3/4 h-2 bg-blue-500/70 rounded-full mb-1"></div>
                  <div className="w-full h-2 bg-blue-500/70 rounded-full mb-1"></div>
                  <div className="w-2/3 h-2 bg-blue-500/70 rounded-full mb-1"></div>
                  <div className="w-full h-2 bg-blue-500/70 rounded-full mb-1"></div>
                  <div className="w-full h-2 bg-blue-500/70 rounded-full mb-3"></div>
                  <div className="w-full h-2 bg-blue-500/70 rounded-full mb-1"></div>
                  <div className="w-4/5 h-2 bg-blue-500/70 rounded-full mb-1"></div>
                  <div className="w-full h-2 bg-blue-500/70 rounded-full mb-1"></div>
                </div>
                <div className="w-32 h-40 bg-white/80 shadow-lg rounded-sm absolute -bottom-2 -right-2 -z-10 transform rotate-3"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Indicateurs sociaux flottants */}
      <div className="absolute bottom-10 left-0 right-0 z-20">
        <motion.div 
          className="flex justify-center items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.3 }}
        >
          {[
            { icon: <Camera size={20} />, label: "Production" },
            { icon: <Mic size={20} />, label: "Audio" },
            { icon: <Youtube size={20} />, label: "Diffusion" },
            { icon: <FileText size={20} />, label: "Rédaction" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2"
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-blue-900/50 backdrop-blur-md border border-blue-500/30 flex items-center justify-center text-white"
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: "rgba(30, 64, 175, 0.7)",
                  borderColor: "rgba(59, 130, 246, 0.7)"
                }}
              >
                {item.icon}
              </motion.div>
              <span className="text-xs text-white/70">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
       <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0 }}
        animate={{ 
          y: [0, 8, 0],
          opacity: isVisible ? 0.8 : 0
        }}
        transition={{ 
          y: { duration: 1.5, repeat: Infinity },
          opacity: { duration: 0.5, delay: 1.5 }
        }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
          <motion.div 
            className="w-1.5 h-1.5 bg-white/70 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};
export default HeroSection;