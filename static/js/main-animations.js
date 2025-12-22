const config = {
    initialBlur: 5,
    blurDuration: 1,
    scaleStart: 1.14,
    scaleEnd: 1,
    scaleDuration: 2000
  };

  const bg = document.getElementById("bg");
  const svgBlurSmall = document.querySelector(".svg-blur-small");
  const svgBlurLarge = document.querySelector(".svg-blur-large");

  let scaleStartTime = performance.now();

  if (bg) {
      bg.style.filter = `blur(${config.initialBlur}px)`;
       setTimeout(() => {
         bg.style.transition = `filter ${config.blurDuration}s ease-out`;
         bg.style.filter = `blur(0px)`;
       }, 50);
  }

  document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
          if (svgBlurSmall) {
              svgBlurSmall.style.filter = 'blur(25px)';
              svgBlurSmall.style.opacity = '0.35';
          }
          if (svgBlurLarge) {
              svgBlurLarge.style.filter = 'blur(75px)';
              svgBlurLarge.style.opacity = '0.8';
          }
      }, 50);
  });
  
  (function animate() {
    const now = performance.now();
    const elapsed = now - scaleStartTime;
    const t = Math.min(elapsed / config.scaleDuration, 1);
    const easeOut = 1 - Math.pow(1 - t, 3);
    const scale = config.scaleStart + (config.scaleEnd - config.scaleStart) * easeOut;

    if (bg) {
        bg.style.transform = `
          translate(-50%, -50%) 
          rotate(-15deg)
          scale(${scale})
        `;
    }

    requestAnimationFrame(animate);
  })(); 