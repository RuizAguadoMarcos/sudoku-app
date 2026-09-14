# 🎮 Sudoku Game

Juego de Sudoku interactivo implementado con Vanilla JavaScript.

## ✨ Características

- ✅ Grid 9x9 interactivo
- ✅ 3 niveles de dificultad (Fácil, Medio, Difícil)
- ✅ Validación en tiempo real
- ✅ Resaltado de errores
- ✅ Botón "Resolver" automático
- ✅ Timer
- ✅ Diseño responsive
- ✅ Interfaz moderna con gradiente

## 🚀 Cómo usar

1. Abre `index.html` en tu navegador
2. Selecciona dificultad
3. Haz clic en "Nuevo Juego"
4. ¡Juega!

## 🛠️ Tecnologías

- **HTML5** - Estructura
- **CSS3** - Estilos con Grid y gradientes
- **JavaScript (Vanilla)** - Lógica del juego
  - `solver.js` - Algoritmo backtracking
  - `generator.js` - Generador de puzzles
  - `sudoku.js` - Controlador principal

## 🎯 Arquitectura

Este proyecto fue desarrollado usando una arquitectura multi-modelo:
- **Arquitecto**: Claude Sonnet 4.5 (diseño y revisión)
- **Implementador**: OpenRouter DeepSeek V4.1-Flash (generación de código)
- **Orquestador**: Hermes Agent

### Coste de desarrollo
- Tokens usados: ~3,300
- Coste: $0.000004 (~0.0004 céntimos)

## 📝 Algoritmos

### Solver (Backtracking)
Resuelve cualquier Sudoku válido usando backtracking recursivo con validación de filas, columnas y cajas 3x3.

### Generator
Genera puzzles válidos con solución única, removiendo celdas según dificultad:
- Fácil: 30-35 celdas
- Medio: 40-45 celdas
- Difícil: 50-55 celdas

## 📄 Licencia

MIT

---

Desarrollado con ❤️ usando IA multi-modelo
