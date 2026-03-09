# Chalmers TDA362/DIT223 – Computer Graphics Labs

This repository contains skeleton code and resources for the **TDA362/DIT223 Computer Graphics** course at Chalmers University of Technology. Students fill in the implementations across six lab assignments, a bonus path-tracer, and a larger capstone project.

Course web page: http://www.cse.chalmers.se/edu/course/TDA362/tutorials/index.html  
Getting-started guide: http://www.cse.chalmers.se/edu/course/TDA362/tutorials/start.html

---

## Repository Structure

| Directory | Description |
|-----------|-------------|
| `lab1-rasterization` | Introduction to OpenGL: vertex buffers, VAOs, and the basic shader pipeline |
| `lab2-textures` | Texture mapping: UV coordinates, texture filtering, and image loading |
| `lab3-camera` | Camera systems: view/projection matrices and interactive camera control |
| `lab4-shading` | Lighting and shading: Phong/Blinn-Phong model, normal mapping, and material properties |
| `lab5-rendertotexture` | Framebuffer Objects (FBO) and post-processing effects (bloom, Gaussian blur) |
| `lab6-shadowmaps` | Shadow mapping and Screen-Space Ambient Occlusion (SSAO) |
| `pathtracer` | Bonus: Monte Carlo path tracer using Intel Embree for acceleration |
| `project` | Capstone project combining heightfield terrain, particle systems, IBL, and advanced SSAO |
| `labhelper` | Shared utility library: OpenGL helpers, model loader, shader compiler, ImGui integration |
| `scenes` | 3D assets: `.obj`/`.mtl` models, textures, and HDR environment maps |
| `external` | Pre-built Windows binaries for SDL2, GLEW, GLM, and Embree2 |
| `external_src` | Header-only/source libraries: ImGui, STB Image, TinyOBJLoader |

---

## Lab Progression

1. **Lab 1 – Rasterization**: Set up an OpenGL window and render basic geometry through the rasterization pipeline.
2. **Lab 2 – Textures**: Apply 2-D textures to geometry using UV coordinates and explore filtering modes.
3. **Lab 3 – Camera**: Build view and projection matrices and implement an interactive fly/orbit camera.
4. **Lab 4 – Shading**: Implement per-pixel Phong/Blinn-Phong shading with normal maps and multiple light sources.
5. **Lab 5 – Render to Texture**: Use FBOs to render into textures and chain post-processing passes (bloom/blur).
6. **Lab 6 – Shadow Maps**: Generate depth maps from a light's perspective and apply SSAO for ambient occlusion.
7. **Path Tracer** *(bonus)*: Implement a Monte Carlo path tracer with importance sampling and HDR output.
8. **Project**: Integrate terrain rendering (heightfields), a GPU particle system, image-based lighting, and SSAO into a single scene.

---

## Technology Stack

| Category | Library / Tool |
|----------|---------------|
| Graphics API | OpenGL 3.0+ (via GLEW) |
| Math | GLM (header-only) |
| Windowing & Input | SDL2 |
| Ray Tracing | Intel Embree 2 |
| UI | Dear ImGui 1.51 |
| Model Loading | TinyOBJLoader |
| Image Loading | STB Image |
| Build System | CMake 3.0.2+ |
| Language | C++11 |
| Platforms | Windows (MSVC), Linux, macOS |

---

## Building

### Windows
Open the root `CMakeLists.txt` with Visual Studio (2015 or later) or use CMake-GUI to generate a solution, then build the desired target.

### Linux / macOS
Install dependencies (`SDL2`, `GLEW`, `GLM`, `Mesa`/OpenGL, `Embree2`), then:

```bash
mkdir build && cd build
cmake ..                        # add -DCMAKE_BUILD_TYPE=Release for optimized build
make
```

Executables are placed inside their respective build subdirectories (e.g., `build/lab2-textures/lab2`).

> **Note:** Building on StuDAT lab computers is not supported on Linux due to missing system libraries; use Windows there instead. See [README_LINUX.md](README_LINUX.md) for details.
