import { useCallback } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

const MyParticles = () => {

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: {
                        value: "#000000",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "bubble",
                        },
                        resize: true,
                    },
                    modes: {
                        bubble: {
                            distance: 300,
                            duration: 5,
                            opacity: 1,
                            size: 30,
                            speed: 30,
                            color: {
                                value: ["#5bc0eb", "#fde74c", "#9bc53d", "#0000FF", "#FF0000"]
                            }
                        },
                        push: {
                            quantity: 4,
                        },
                        remove: {
                            particles_nb: 2
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#40E0D0",
                        animation: {
                            count: 1,
                            enable: true,
                            speed: 60,
                            sync: true,
                        },
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 150,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 3, max: 10 },
                    },
                },
                detectRetina: true,
            }}
        />
    )
}

export default MyParticles