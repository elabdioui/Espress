'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion,  } from 'framer-motion';
import { ArrowRight, Play, Camera, Mic, Tv, Share2, Rss, FileText, Youtube, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

// Configuration fixe des particules pour éviter les problèmes d'hydratation
const FIXED_PARTICLES = [
  { left: "10%", top: "20%", delay: 0.1, duration: 5 },
  { left: "85%", top: "40%", delay: 0.2, duration: 6 },
  { left: "50%", top: "10%", delay: 0.3, duration: 7 },
  { left: "70%", top: "5%", delay: 0.4, duration: 5.5 },
  { left: "15%", top: "30%", delay: 0.5, duration: 6.5 },
  { left: "80%", top: "60%", delay: 0.6, duration: 7.5 },
  { left: "30%", top: "70%", delay: 0.7, duration: 5.2 },
  { left: "60%", top: "80%", delay: 0.8, duration: 6.2 },
  { left: "20%", top: "50%", delay: 0.9, duration: 7.2 },
  { left: "40%", top: "15%", delay: 1.0, duration: 5.7 },
  { left: "90%", top: "25%", delay: 1.1, duration: 6.7 },
  { left: "25%", top: "85%", delay: 1.2, duration: 7.7 },
  { left: "75%", top: "45%", delay: 1.3, duration: 5.3 },
  { left: "35%", top: "65%", delay: 1.4, duration: 6.3 },
  { left: "65%", top: "35%", delay: 1.5, duration: 7.3 },
  { left: "5%", top: "55%", delay: 1.6, duration: 5.8 },
  { left: "55%", top: "75%", delay: 1.7, duration: 6.8 },
  { left: "45%", top: "25%", delay: 1.8, duration: 7.8 },
  { left: "95%", top: "90%", delay: 1.9, duration: 5.4 },
  { left: "15%", top: "40%", delay: 2.0, duration: 6.4 },
  { left: "85%", top: "70%", delay: 2.1, duration: 7.4 },
  { left: "50%", top: "30%", delay: 2.2, duration: 5.9 },
  { left: "25%", top: "20%", delay: 2.3, duration: 6.9 },
  { left: "75%", top: "60%", delay: 2.4, duration: 7.9 },
  { left: "35%", top: "95%", delay: 2.5, duration: 5.5 },
  { left: "60%", top: "10%", delay: 2.6, duration: 6.5 },
  { left: "10%", top: "80%", delay: 2.7, duration: 7.5 },
  { left: "90%", top: "50%", delay: 2.8, duration: 5.1 },
  { left: "20%", top: "75%", delay: 2.9, duration: 6.1 },
  { left: "80%", top: "15%", delay: 3.0, duration: 7.1 }
];

// Configuration fixe des icônes média
const MEDIA_ICONS = [
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

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // N'activez les animations côté client qu'après le montage du composant
  useEffect(() => {
    setIsMounted(true);
    
    // Simulation de démarrage de vidéo après chargement
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        // Gestion silencieuse des erreurs d'autoplay
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-900">
      {/* Vidéo d'arrière-plan avec filtre de couleur */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef} 
          className="absolute w-full h-full object-cover"
          autoPlay={false} // Important: désactivé par défaut pour éviter les problèmes d'hydratation
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
          {isMounted && Array.from({ length: 10 }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="absolute w-full" style={{ top: `${rowIndex * 10}%` }}>
              <motion.div 
                className="h-px bg-white/5 w-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.1 * rowIndex }}
              />
            </div>
          ))}
          {isMounted && Array.from({ length: 10 }).map((_, colIndex) => (
            <div key={`col-${colIndex}`} className="absolute h-full" style={{ left: `${colIndex * 10}%` }}>
              <motion.div 
                className="w-px bg-white/5 h-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.5, delay: 0.1 * colIndex }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Particules et icônes média avec positions fixes */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {/* Particules brillantes avec positions prédéfinies */}
        {isMounted && FIXED_PARTICLES.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-blue-400/40"
            style={{
              left: particle.left,
              top: particle.top,
            }}
            animate={{
              y: [0, 10, 0],
              x: [0, 5, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          />
        ))}

        {/* Icônes média flottantes avec positions prédéfinies */}
        {isMounted && MEDIA_ICONS.map((item, index) => (
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
              y: [0, 10, 0],
              x: [0, 5, 0]
            }}
            transition={{
              delay: item.delay,
              opacity: { duration: 1 },
              scale: { duration: 0.8 },
              y: { 
                duration: 3 + (index % 2), 
                repeat: Infinity,
                repeatType: "mirror" 
              },
              x: { 
                duration: 4 + (index % 3), 
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
            initial={isMounted ? { opacity: 0, x: -50 } : { opacity: 1, x: 0 }}
            animate={isMounted ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white"
          >
            <motion.div 
              className="inline-block mb-3 px-4 py-1 bg-blue-600/30 backdrop-blur-md border border-blue-500/30 rounded-full"
              initial={isMounted ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="text-sm font-medium text-blue-200">Club Média ENCG Settat</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl lg:text-6xl font-bold mb-6 leading-tight"
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              <span className="block">Racontez votre histoire</span>
              <span className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">avec Espress</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg lg:text-xl text-blue-100 mb-8 max-w-xl"
              initial={isMounted ? { opacity: 0 } : { opacity: 1 }}
              animate={isMounted ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              Produisez, créez et diffusez du contenu audiovisuel de qualité professionnelle. Rejoignez le club média qui transforme les étudiants en créateurs daujourdhui et en professionnels de demain.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
              animate={isMounted ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Link href="/rejoindre">
                <motion.div
                  className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full shadow-lg flex items-center group cursor-pointer"
                  whileHover={isMounted ? { 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)"
                  } : {}}
                  whileTap={isMounted ? { scale: 0.98 } : {}}
                >
                  {/* Effet de brillance */}
                  {isMounted && (
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
                  )}
                  
                  Rejoindre le Club
                  <motion.div
                    className="ml-2"
                    whileHover={isMounted ? { x: 5 } : {}}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.div>
              </Link>
              
              <Link href="/showreel">
                <motion.div
                  className="px-6 py-3 border border-blue-500/50 bg-blue-900/20 backdrop-blur-sm text-white font-medium rounded-full flex items-center group cursor-pointer"
                  whileHover={isMounted ? { 
                    backgroundColor: "rgba(30, 58, 138, 0.3)",
                    borderColor: "rgba(59, 130, 246, 0.7)"
                  } : {}}
                  whileTap={isMounted ? { scale: 0.98 } : {}}
                >
                  <motion.div
                    className="mr-2 bg-white/20 p-1 rounded-full"
                    whileHover={isMounted ? { scale: 1.1 } : {}}
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
            initial={isMounted ? { opacity: 0, rotateY: 30, z: -100 } : { opacity: 1, rotateY: 0, z: 0 }}
            animate={isMounted ? { opacity: 1, rotateY: 0, z: 0 } : {}}
            transition={{ duration: 1.2, delay: 1 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Caméra 3D */}
              <motion.div 
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                animate={isMounted ? { 
                  y: [0, 10, 0],
                  rotateY: [0, 10, 0],
                  rotateZ: [0, 5, 0]
                } : {}}
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
                animate={isMounted ? { 
                  rotateY: [0, 5, 0],
                  rotateZ: [0, 2, 0]
                } : {}}
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
                animate={isMounted ? { 
                  y: [0, -5, 0],
                  rotate: [0, 3, 0]
                } : {}}
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
                animate={isMounted ? { 
                  y: [0, 3, 0],
                  rotate: [-12, -10, -12]
                } : {}}
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
          initial={isMounted ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
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
              whileHover={isMounted ? { y: -5 } : {}}
            >
              <motion.div
                className="w-10 h-10 rounded-full bg-blue-900/50 backdrop-blur-md border border-blue-500/30 flex items-center justify-center text-white"
                whileHover={isMounted ? { 
                  scale: 1.1,
                  backgroundColor: "rgba(30, 64, 175, 0.7)",
                  borderColor: "rgba(59, 130, 246, 0.7)"
                } : {}}
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
          opacity: isMounted ? 0.8 : 0
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