import json

notebook = {
    "nbformat": 4,
    "nbformat_minor": 0,
    "metadata": {
        "accelerator": "GPU",
        "colab": {
            "gpuType": "T4",
            "provenance": []
        },
        "kernelspec": {
            "display_name": "Python 3",
            "name": "python3"
        },
        "language_info": {
            "name": "python"
        }
    },
    "cells": [
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "# 🚀 Automatización Masiva de Imágenes con FLUX.1 en Google Colab\n",
                "### Guía Maestra de Producción Profesional (Formato WebP 16:9 SEO-Ready)\n",
                "\n",
                "Este cuaderno permite generar cientos o miles de imágenes de alta fidelidad fotográfica utilizando **FLUX.1-schnell** sobre la GPU gratuita **Tesla T4 (15 GB)** de Google Colab sin sufrir errores de memoria (*CUDA Out of Memory*).\n",
                "\n",
                "---\n",
                "### 📋 Arquitectura de Trabajo (Solo 2 Archivos)\n",
                "Solo necesitas subir a tu Google Drive:\n",
                "1. **`prompts.txt`**: Un prompt descriptivo por línea.\n",
                "2. **`nombres.txt`**: El nombre del archivo correspondiente por línea (ej: `museo-portada-principal`).\n",
                "\n",
                "---\n",
                "### 🛠️ Estructura del Cuaderno:\n",
                "* **Paso 0:** Elegir cómo obtener el modelo (Descargar en tu Drive o Enlazar desde otra cuenta).\n",
                "* **Paso 1:** Instalar librerías con versiones compatibles.\n",
                "* **Paso 2:** Ejecutar el motor de generación continua con autoguardado en WebP y reanudación automática."
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "---\n",
                "## 📦 Paso 0: Obtención del Modelo (Elige Opción A o B)\n",
                "\n",
                "### 🔵 Opción A: Descargar por primera vez a tu propio Google Drive (Autónomo)\n",
                "* **Espacio requerido:** ~33 GB libres en Google Drive.\n",
                "* **Tiempo de descarga:** ~3 a 5 minutos (conexión interna de Google a ~200 MB/s).\n",
                "* **Requisito:** Un Token gratuito de Hugging Face (tipo *Read* desde [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens))."
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "# =====================================================================\n",
                "# OPCIÓN A: DESCARGA DE FLUX.1-schnell A TU PROPIO DRIVE (SOLO SE CORRE 1 VEZ)\n",
                "# =====================================================================\n",
                "import os\n",
                "from google.colab import drive\n",
                "drive.mount('/content/drive')\n",
                "\n",
                "# 1. Configurar la carpeta en tu Drive\n",
                "CARPETA_DRIVE = '/content/drive/MyDrive/Todo_Lima_Flux'\n",
                "DESTINO_MODELO = os.path.join(CARPETA_DRIVE, 'FLUX.1-schnell')\n",
                "os.makedirs(DESTINO_MODELO, exist_ok=True)\n",
                "\n",
                "# 2. Instalar herramienta oficial de Hugging Face\n",
                "!pip install -q --upgrade huggingface_hub\n",
                "\n",
                "# 3. Colocar tu Token de lectura de Hugging Face\n",
                "HF_TOKEN = 'PEGA_AQUI_TU_TOKEN_HF'\n",
                "\n",
                "from huggingface_hub import snapshot_download\n",
                "\n",
                "print('Iniciando descarga completa de FLUX.1-schnell hacia tu Google Drive...')\n",
                "# IMPORTANTE: No excluir archivos *.json para garantizar que los índices de los shards estén intactos\n",
                "snapshot_download(\n",
                "    repo_id='black-forest-labs/FLUX.1-schnell',\n",
                "    local_dir=DESTINO_MODELO,\n",
                "    token=HF_TOKEN,\n",
                "    max_workers=4,\n",
                "    ignore_patterns=['*.onnx'] # Opcional: solo descartamos ONNX para optimizar espacio\n",
                ")\n",
                "\n",
                "print('\\n✓ ¡Descarga completada! El modelo ya está guardado en tu Google Drive.')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "### 🟢 Opción B: Utilizar el modelo descargado en OTRA cuenta (0 GB, Instantáneo)\n",
                "Si ya tienes el modelo descargado en otra cuenta de Google (o te lo compartió un colega):\n",
                "1. Desde la cuenta propietaria, haz **clic derecho** sobre la carpeta que contiene `FLUX.1-schnell` ➔ **Compartir** ➔ Comparte con tu cuenta secundaria.\n",
                "2. En tu cuenta secundaria, entra a Google Drive y ve a **\"Compartido conmigo\"**.\n",
                "3. Haz clic derecho sobre la carpeta compartida ➔ **Organizar** ➔ **Añadir acceso directo** (en \"Mi unidad\").\n",
                "4. ¡Listo! En el código simplemente apuntarás al acceso directo. **No gasta ni 1 MB** de tu cuota de Google Drive."
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "---\n",
                "## ⚙️ Paso 1: Instalación de Dependencias Armónicas\n",
                "Ejecuta esta celda al iniciar tu entorno de Google Colab. Fija las versiones de las librerías para evitar incompatibilidades entre `diffusers` y `huggingface-hub`."
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "# =====================================================================\n",
                "# PASO 1: MONTAJE DE DRIVE E INSTALACIÓN DE LIBRERÍAS COMPATIBLES\n",
                "# =====================================================================\n",
                "from google.colab import drive\n",
                "drive.mount('/content/drive')\n",
                "\n",
                "# Instalación fijada para evitar advertencias y conflictos de dependencias\n",
                "!pip install -q \"huggingface-hub<2.0,>=0.25.0\" \"diffusers>=0.30.0\" transformers accelerate sentencepiece protobuf pillow\n",
                "print('✓ Entorno de ejecución listo y librerías verificadas.')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "---\n",
                "## 🎨 Paso 2: Generación Masiva Continua (Anti-OOM + WebP Nativo)\n",
                "Esta celda lee `prompts.txt` y `nombres.txt`, y procesa las imágenes secuencialmente con las siguientes garantías:\n",
                "* **Sequential CPU Offload:** Permite que un modelo de ~24 GB corra en la GPU T4 de 15 GB consumiendo solo 4–6 GB de VRAM.\n",
                "* **Formato 16:9 (`1024x576`):** Resolución óptima cinematográfica que no desborda la memoria.\n",
                "* **WebP Calidad 85:** Convierte directamente a formato web ultra ligero (~100 KB) con máxima nitidez.\n",
                "* **Sistema Anti-Interrupción (Resume):** Si Colab se corta o tú lo detienes, al volver a correr salta las imágenes ya creadas."
            ]
        },
        {
            "cell_type": "code",
            "execution_count": None,
            "metadata": {},
            "outputs": [],
            "source": [
                "# =====================================================================\n",
                "# PASO 2: GENERADOR MASIVO AUTOMATIZADO CON TOLERANCIA A FALLOS\n",
                "# =====================================================================\n",
                "import os\n",
                "import torch\n",
                "from diffusers import FluxPipeline\n",
                "from PIL import Image\n",
                "\n",
                "# 1. Configuración de memoria para evitar fragmentación en CUDA\n",
                "os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'expandable_segments:True'\n",
                "\n",
                "# ==========================================\n",
                "# CONFIGURACIÓN DE RUTAS EN GOOGLE DRIVE\n",
                "# ==========================================\n",
                "# Modifica esta ruta a la carpeta donde tengas tus archivos\n",
                "CARPETA_PROYECTO = '/content/drive/MyDrive/Todo_Lima_Flux'\n",
                "\n",
                "# Ruta donde está alojado el modelo FLUX.1-schnell (propio o por acceso directo)\n",
                "MODELO_LOCAL = os.path.join(CARPETA_PROYECTO, 'FLUX.1-schnell')\n",
                "\n",
                "# Carpeta donde se guardarán las imágenes finales\n",
                "OUTPUT_DIR = os.path.join(CARPETA_PROYECTO, 'imagenes_generadas')\n",
                "os.makedirs(OUTPUT_DIR, exist_ok=True)\n",
                "\n",
                "# Archivos de entrada (deben estar dentro de CARPETA_PROYECTO)\n",
                "PROMPTS_FILE = os.path.join(CARPETA_PROYECTO, 'prompts.txt')\n",
                "NAMES_FILE = os.path.join(CARPETA_PROYECTO, 'nombres.txt')\n",
                "\n",
                "# ==========================================\n",
                "# VALIDACIÓN Y CARGA DE LISTAS\n",
                "# ==========================================\n",
                "for ruta, desc in [(PROMPTS_FILE, 'prompts'), (NAMES_FILE, 'nombres')]:\n",
                "    if not os.path.exists(ruta):\n",
                "        raise FileNotFoundError(f'No se encontró el archivo de {desc} en: {ruta}')\n",
                "\n",
                "with open(PROMPTS_FILE, 'r', encoding='utf-8') as f:\n",
                "    prompts = [line.strip() for line in f if line.strip()]\n",
                "\n",
                "with open(NAMES_FILE, 'r', encoding='utf-8') as f:\n",
                "    nombres = [line.strip() for line in f if line.strip()]\n",
                "\n",
                "total = len(prompts)\n",
                "assert len(prompts) == len(nombres), f'Error de alineación: Hay {len(prompts)} prompts y {len(nombres)} nombres.'\n",
                "print(f'✓ Verificado: {total} imágenes en la lista de procesamiento.')\n",
                "\n",
                "# ==========================================\n",
                "# CARGA DE FLUX.1-schnell (OPTIMIZADO PARA T4)\n",
                "# ==========================================\n",
                "print('Cargando FLUX.1-schnell con Sequential Offload...')\n",
                "pipe = FluxPipeline.from_pretrained(\n",
                "    MODELO_LOCAL,\n",
                "    dtype=torch.bfloat16\n",
                ")\n",
                "\n",
                "# TÉCNICAS CLAVE PARA EVITAR CUDA OUT OF MEMORY (OOM):\n",
                "pipe.enable_sequential_cpu_offload()  # Carga capa por capa a la GPU en lugar de todo a la vez\n",
                "pipe.vae.enable_slicing()             # Decodifica el VAE en rebanadas para ahorrar RAM\n",
                "pipe.vae.enable_tiling()              # Decodifica en mosaicos\n",
                "print('✓ Pipeline de FLUX inicializado con protecciones de memoria activas.')\n",
                "\n",
                "# ==========================================\n",
                "# BUCLE DE GENERACIÓN MASIVA\n",
                "# ==========================================\n",
                "for i, (prompt, nombre_raw) in enumerate(zip(prompts, nombres)):\n",
                "    # Limpiar cualquier extensión previa para no duplicar (.png, .webp)\n",
                "    nombre_limpio = nombre_raw.replace('.webp', '').replace('.png', '').replace('.jpg', '')\n",
                "    nombre_seguro = ''.join(c for c in nombre_limpio if c.isalnum() or c in (' ', '_', '-')).strip()\n",
                "    \n",
                "    archivo_final = f'{nombre_seguro}.webp'\n",
                "    ruta_guardado = os.path.join(OUTPUT_DIR, archivo_final)\n",
                "    \n",
                "    # PROTECCIÓN: Si la imagen ya existe, saltar para ahorrar tiempo y recursos\n",
                "    if os.path.exists(ruta_guardado):\n",
                "        print(f'[{i+1}/{total}] Ya existe, saltando: {archivo_final}')\n",
                "        continue\n",
                "\n",
                "    print(f'[{i+1}/{total}] Generando: {archivo_final}...')\n",
                "    \n",
                "    # Inferencia en formato 16:9 con FLUX schnell (4 pasos rápidos)\n",
                "    image = pipe(\n",
                "        prompt=prompt,\n",
                "        num_inference_steps=4,\n",
                "        guidance_scale=3.5,\n",
                "        width=1024,\n",
                "        height=576\n",
                "    ).images[0]\n",
                "    \n",
                "    # Guardado nativo en formato WebP con compresión de alta calidad (calidad 85)\n",
                "    image.save(ruta_guardado, format='WEBP', quality=85)\n",
                "\n",
                "print('\\n🎉 ¡Generación completada exitosamente! Todas las imágenes están listas en tu Drive.')"
            ]
        },
        {
            "cell_type": "markdown",
            "metadata": {},
            "source": [
                "---\n",
                "## 🛡️ Guía Rápida de Prevención de Errores (Para Enseñar a Otros)\n",
                "\n",
                "| Síntoma / Error | Causa Técnica | Solución Incorporada en este Cuaderno |\n",
                "| :--- | :--- | :--- |\n",
                "| **`CUDA Out of Memory` (OOM)** | El modelo pesa 24 GB y la GPU T4 tiene 15 GB. `model_cpu_offload` intenta meter todo el transformer a la vez. | Se implementó `enable_sequential_cpu_offload()` + `vae.enable_slicing()` + resolución 1024x576. El consumo baja a 4-6 GB de VRAM. |\n",
                "| **`Error no file named diffusion_pytorch_model.safetensors`** | El transformer viene dividido en partes (shards) y faltaban los índices `.json`. | Al descargar con `snapshot_download`, **nunca** ignorar archivos `.json`. |\n",
                "| **Conflictos de pip (`huggingface-hub`)** | Incompatibilidad de versiones entre la API de Hugging Face y Diffusers. | Se instalan versiones estables controladas: `huggingface-hub<2.0,>=0.25.0` y `diffusers>=0.30.0`. |\n",
                "| **Reinicio de Colab por límite de tiempo** | Desconexión normal de Google Colab tras varias horas. | El script verifica `if os.path.exists(ruta): continue`. Al volver a darle Play, retoma exactamente en la que faltaba. |\n",
                "| **¿Por qué WebP directo a calidad 85?** | Un archivo PNG pesa ~2.5 MB (537 imágenes = 1.3 GB). En WebP pesa ~100 KB (537 imágenes = 50 MB) con idéntica calidad visual para web. | El guardado se hace nativamente con `image.save(..., format='WEBP', quality=85)`. |"
            ]
        }
    ]
}

with open('docs/AUTOMATIZACION_FLUX_COLAB_PRO.ipynb', 'w', encoding='utf-8') as f:
    json.dump(notebook, f, indent=2, ensure_ascii=False)

print('Notebook creado con éxito: docs/AUTOMATIZACION_FLUX_COLAB_PRO.ipynb')
