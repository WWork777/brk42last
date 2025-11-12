export const isDevicePowerful = () => {
    let isPowerful = true;


    // 2. Проверка поддержки WebGL
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
        // Устройство не поддерживает WebGL
        isPowerful = false;
    }

    // 3. Проверка уровня графического контекста WebGL
    const debugInfo = gl?.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : "Unknown";

    // Если GPU старое (примерно)
    const lowPowerGPUs = ["Mali", "Adreno", "PowerVR", "Tegra"];
    if (lowPowerGPUs.some((gpu) => renderer.includes(gpu))) {
        isPowerful = false;
    }

    // 4. Проверка FPS
    const startTime = performance.now();
    let frameCount = 0;

    function checkFPS() {
        frameCount++;
        if (performance.now() - startTime >= 1000) {
            const fps = frameCount; // FPS за 1 секунду
            if (fps < 30) {
                // Если FPS ниже 30, считаем устройство слабым
                isPowerful = false;
            }
        } else {
            requestAnimationFrame(checkFPS);
        }
    }
    checkFPS();

    return isPowerful;
};
