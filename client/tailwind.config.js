/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
                'float': 'float 20s infinite ease-in-out',
                'float-signup': 'floatSignup 15s infinite ease-in-out',
                'pulse-slow': 'pulse 8s infinite',
                'shine': 'shine 1.5s ease-in-out',
                'gradient-shift': 'gradient-shift 3s ease infinite',
                'particle-float': 'particle-float linear infinite',
                'pulse-status': 'pulse-status 2s infinite',
                'grid-pulse': 'gridPulse 4s infinite',
                'float-random-1': 'floatRandom1 25s infinite ease-in-out',
                'float-random-2': 'floatRandom2 30s infinite ease-in-out',
                'pulse-ring': 'pulseRing 2s infinite',
                'glow': 'glow 3s infinite',
                'scale-in': 'scaleIn 0.6s ease-out backwards',
                'slide-in-down': 'slideInDown 0.3s ease-out',
                'slide-in-left': 'slideInLeft 0.4s ease-out backwards',
                'shimmer': 'shimmer 2s infinite',
                'progress-fill': 'progressFill 1s ease-out',
                'rotate': 'rotate 20s linear infinite',
                'fade-in': 'fadeIn 0.4s ease-out',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                float: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '33%': { transform: 'translate(30px, -30px) scale(1.1)' },
                    '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                },
                floatSignup: {
                    '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
                    '25%': { transform: 'translateY(-20px) translateX(10px)' },
                    '50%': { transform: 'translateY(-10px) translateX(-10px)' },
                    '75%': { transform: 'translateY(-30px) translateX(5px)' },
                },
                shine: {
                    '0%': { transform: 'translateX(-100%) skewX(-15deg)' },
                    '100%': { transform: 'translateX(200%) skewX(-15deg)' },
                },
                'gradient-shift': {
                    '0%, 100%': { 'background-position': '0% 50%' },
                    '50%': { 'background-position': '100% 50%' },
                },
                'particle-float': {
                    '0%, 100%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { transform: 'translateY(-100vh) rotate(360deg)', opacity: '0' },
                },
                'pulse-status': {
                    '0%, 100%': { transform: 'scale(1)', opacity: '1' },
                    '50%': { transform: 'scale(1.1)', opacity: '0.8' },
                },
                gridPulse: {
                    '0%, 100%': { opacity: '0.05' },
                    '50%': { opacity: '0.15' },
                },
                floatRandom1: {
                    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '25%': { transform: 'translate(30px, -30px) rotate(90deg)' },
                    '50%': { transform: 'translate(-20px, -50px) rotate(180deg)' },
                    '75%': { transform: 'translate(40px, -20px) rotate(270deg)' },
                },
                floatRandom2: {
                    '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
                    '25%': { transform: 'translate(-40px, 30px) rotate(-90deg)' },
                    '50%': { transform: 'translate(30px, 60px) rotate(-180deg)' },
                    '75%': { transform: 'translate(-30px, 20px) rotate(-270deg)' },
                },
                pulseRing: {
                    '0%': { transform: 'scale(0.8)', opacity: '1' },
                    '100%': { transform: 'scale(1.5)', opacity: '0' },
                },
                glow: {
                    '0%, 100%': { boxShadow: '0 0 20px rgba(102, 126, 234, 0.5), 0 0 40px rgba(102, 126, 234, 0.3), 0 0 60px rgba(102, 126, 234, 0.2)' },
                    '50%': { boxShadow: '0 0 30px rgba(102, 126, 234, 0.7), 0 0 60px rgba(102, 126, 234, 0.5), 0 0 90px rgba(102, 126, 234, 0.3)' },
                },
                scaleIn: {
                    '0%': { opacity: '0', transform: 'scale(0.9)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideInDown: {
                    '0%': { opacity: '0', transform: 'translateY(-20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                slideInLeft: {
                    '0%': { opacity: '0', transform: 'translateX(-30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '100% 0' },
                    '100%': { backgroundPosition: '-100% 0' },
                },
                progressFill: {
                    '0%': { width: '0' },
                },
                rotate: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
            }
        },
    },
    plugins: [],
}
