export const headingAnimation = {
  container: {
    hidden: { 
      opacity: 0,
      y: -20,
      scale: 0.98,
      filter: "blur(4px)",
      transformOrigin: "50% 50%"
    },
    visible: (custom: number = 0) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 40,
        stiffness: 90,
        mass: 1.2,
        delay: custom * 0.4,
        duration: 1.8
      }
    })
  }
}; 