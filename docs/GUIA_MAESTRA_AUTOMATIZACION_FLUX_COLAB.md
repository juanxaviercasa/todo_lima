# Guía Maestra: Automatización y Generación Masiva con FLUX.1 en Google Colab

Esta guía técnica documenta el flujo de trabajo optimizado para generar cientos de imágenes en lote con **FLUX.1-schnell** en Google Colab, guardándolas directamente en Google Drive en formato **WebP (calidad 85)** listo para SEO. Incluye todas las prevenciones contra errores de memoria (CUDA OOM) y dependencias.

---

## 1. Arquitectura del Flujo (Solo 2 Archivos)

Para mantener el sistema simple, ágil y replicable en cualquier proyecto, el pipeline se alimenta únicamente de **dos archivos de texto plano**:

```text
Google Drive / Carpeta del Proyecto /
│
├── 📄 prompts.txt        ---> Un prompt visual por línea (en inglés, estilo descriptivo)
├── 📄 nombres.txt        ---> Un nombre de archivo por línea (sin extensión, formato slug)
│
├── 📁 FLUX.1-schnell /   ---> Pesos del modelo (descargados o compartidos)
│
└── 📁 imagenes_generadas / ---> Salida automática con imágenes .webp
```

> [!NOTE] ¿Por qué NO usamos el archivo `text_alt` en el código de Colab?
> El texto ALT (`alt="..."`) es un atributo semántico de accesibilidad y SEO para el código HTML de la web (`<img src="foto.webp" alt="Descripción para ciegos y Google">`).
> Al motor de inferencia de FLUX solo le importan dos cosas:
> 1. **Qué dibujar:** El prompt visual (`prompts.txt`).
> 2. **Cómo nombrar el archivo:** El slug del archivo (`nombres.txt`).
>
> Inyectar el texto ALT en el código de generación añade complejidad innecesaria. El texto ALT se conserva en tu base de datos de contenidos (`docs/MAPEO_IMAGENES_SEO_537.json` o tu CMS) para asociarlo automáticamente cuando publiques los artículos en la web.
>
> **Cuaderno listo para usar:** Tienes disponible el archivo `docs/AUTOMATIZACION_FLUX_COLAB_PRO.ipynb` para subirlo directamente a Google Colab sin necesidad de copiar y pegar celda por celda.

---

## 2. Preparación del Modelo: Elige Método A o Método B

### Método A: Descarga Propia e Independiente (Solo 1 vez en la vida)
Si deseas que tu cuenta de Google Drive tenga su propio modelo sin depender de nadie:

```python
# ========================================================
# CELDA A: DESCARGA DE FLUX.1-schnell A TU PROPIO DRIVE
# ========================================================
import os
from google.colab import drive
drive.mount('/content/drive')

# 1. Definir carpeta en tu Drive
MI_CARPETA = "/content/drive/MyDrive/Todo_Lima_Flux"
DESTINO_MODELO = os.path.join(MI_CARPETA, "FLUX.1-schnell")
os.makedirs(DESTINO_MODELO, exist_ok=True)

# 2. Instalar herramienta oficial de Hugging Face
!pip install -q --upgrade huggingface_hub

# 3. Token de Hugging Face (tipo Read desde huggingface.co/settings/tokens)
HF_TOKEN = "PEGA_AQUI_TU_TOKEN_HF"

from huggingface_hub import snapshot_download

print("Iniciando descarga completa de FLUX.1-schnell a tu Drive...")
# REGLA DE ORO: NO ignorar archivos *.json para no romper los índices de los shards
snapshot_download(
    repo_id="black-forest-labs/FLUX.1-schnell",
    local_dir=DESTINO_MODELO,
    token=HF_TOKEN,
    max_workers=4,
    ignore_patterns=["*.onnx"] # Solo ignoramos ONNX para ahorrar espacio innecesario
)

print("✓ ¡Descarga finalizada! Modelo guardado permanentemente en tu Drive.")
```

---

### Método B: Reutilizar Modelo Compartido desde otra Cuenta (0 Segundos, 0 GB)
Si ya tienes el modelo descargado en otra cuenta de Google Drive:

1. En la cuenta dueña del modelo, dale clic derecho a la carpeta `Modelos_IA` (o donde esté `FLUX.1-schnell`) y elige **Compartir**.
2. Dale acceso a tu cuenta secundaria.
3. En tu cuenta secundaria, ve a la sección **"Compartido conmigo"** en Google Drive.
4. Haz clic derecho sobre la carpeta compartida y selecciona:  
   👉 **Organizar ➔ Añadir acceso directo** (en "Mi unidad").
5. En Colab, la ruta será directamente:  
   `MODELO_LOCAL = "/content/drive/MyDrive/Modelos_IA/FLUX.1-schnell"`  
   *(¡No ocupa almacenamiento en tu cuenta secundaria y carga al instante!)*

---

## 3. Celda 1: Instalación de Dependencias Compatibles

Ejecutar al iniciar la sesión de Colab. Previene conflictos entre `diffusers` y `huggingface-hub`:

```python
# ========================================================
# CELDA 1: DEPENDENCIAS Y ENTORNO LIMPIO
# ========================================================
from google.colab import drive
drive.mount('/content/drive')

# Fijar versiones armónicas para evitar fallos de resolución de pip
!pip install -q "huggingface-hub<2.0,>=0.25.0" "diffusers>=0.30.0" transformers accelerate sentencepiece protobuf
print("✓ Entorno configurado correctamente.")
```

---

## 4. Celda 2: Generación Masiva Ultrarrápida (GPU A100 en Colab Pro)

Esta celda está optimizada para la **GPU NVIDIA A100 (40GB / 80GB)** disponible en Colab Pro.  
* **Velocidad Extrema:** Genera cada imagen en **2 a 3 segundos** (el lote entero de 537 imágenes toma ~25-30 minutos).
* **Calidad Anatómica (Guidance 0.0):** En FLUX-schnell, `guidance_scale=0.0` evita la saturación artificial de contrastes y previene dedos o rostros deformados.
* **Sistema Anti-Interrupción (Resume & Selective Regeneration):** Si borras de Drive alguna imagen que no te gustó, al volver a correr el código **solo regenerará las que falten**.

```python
# ========================================================
# CELDA 2: GENERADOR MASIVO EN GPU A100 (~2.5s POR FOTO)
# ========================================================
import os
import torch
from diffusers import FluxPipeline
from PIL import Image

# 1. Evitar fragmentación de memoria en CUDA
os.environ['PYTORCH_CUDA_ALLOC_CONF'] = 'expandable_segments:True'

# ==========================================
# RUTAS DE ENTRADA Y SALIDA
# ==========================================
CARPETA_PROYECTO = "/content/drive/MyDrive/Todo_Lima_Flux"
MODELO_LOCAL = os.path.join(CARPETA_PROYECTO, "FLUX.1-schnell")

OUTPUT_DIR = os.path.join(CARPETA_PROYECTO, "imagenes_generadas")
os.makedirs(OUTPUT_DIR, exist_ok=True)

PROMPTS_FILE = os.path.join(CARPETA_PROYECTO, "prompts.txt")
NAMES_FILE = os.path.join(CARPETA_PROYECTO, "nombres.txt")

# ==========================================
# VALIDACIÓN DE LOS 2 ARCHIVOS
# ==========================================
for ruta, desc in [(PROMPTS_FILE, "prompts.txt"), (NAMES_FILE, "nombres.txt")]:
    if not os.path.exists(ruta):
        raise FileNotFoundError(f"No se encontró el archivo {desc} en: {ruta}")

with open(PROMPTS_FILE, "r", encoding="utf-8") as f:
    prompts = [line.strip() for line in f if line.strip()]

with open(NAMES_FILE, "r", encoding="utf-8") as f:
    nombres = [line.strip() for line in f if line.strip()]

total = len(prompts)
assert len(prompts) == len(nombres), f"Desalineación: Hay {len(prompts)} prompts y {len(nombres)} nombres."
print(f"✓ Verificado: {total} imágenes listas para procesar.")

# ==========================================
# CARGA DEL MODELO (MÁXIMA VELOCIDAD EN A100)
# ==========================================
print("Cargando FLUX.1-schnell en GPU A100...")
pipe = FluxPipeline.from_pretrained(
    MODELO_LOCAL,
    torch_dtype=torch.bfloat16
)

# En la A100 con 40GB/80GB VRAM, model_cpu_offload vuela a máxima velocidad
pipe.enable_model_cpu_offload()
pipe.vae.enable_slicing()
pipe.vae.enable_tiling()
print("✓ Pipeline listo y acelerado al 100%.")

# ==========================================
# BUCLE DE GENERACIÓN MASIVA CONTINUA
# ==========================================
for i, (prompt, nombre_raw) in enumerate(zip(prompts, nombres)):
    nombre_limpio = nombre_raw.replace(".webp", "").replace(".png", "").replace(".jpg", "")
    nombre_seguro = "".join(c for c in nombre_limpio if c.isalnum() or c in (' ', '_', '-')).strip()
    
    archivo_final = f"{nombre_seguro}.webp"
    ruta_guardado = os.path.join(OUTPUT_DIR, archivo_final)
    
    # CHECKPOINT: Si la imagen ya existe, saltar para no gastar GPU
    if os.path.exists(ruta_guardado):
        print(f"[{i+1}/{total}] Ya existe, saltando: {archivo_final}")
        continue

    print(f"[{i+1}/{total}] Generando (A100 ~2.5s): {archivo_final}...")
    
    # Inferencia en formato 16:9 optimizado (1024x576) en 4 pasos con guidance 0.0 nativo
    image = pipe(
        prompt=prompt,
        num_inference_steps=4,
        guidance_scale=0.0,
        width=1024,
        height=576
    ).images[0]
    
    # Guardado nativo en WebP calidad 85 directo para SEO web
    image.save(ruta_guardado, format="WEBP", quality=85)

print("\n🎉 ¡Generación completada exitosamente! Todas las imágenes están en formato .webp en tu Drive.")
```

---

## 5. Prevención de Errores Comunes y Lecciones Técnicas

| Problema / Síntoma | Causa Técnica | Solución Preventiva |
| :--- | :--- | :--- |
| **Lentitud extrema (80s por foto en T4)** | La GPU T4 (15 GB) no soporta el modelo de 24 GB y traslada pesos por el bus PCIe. | **Cambiar el entorno a GPU A100** en Colab Pro (*Entorno de ejecución ➔ Cambiar tipo ➔ A100*). La velocidad pasa de 80s a **2.5 segundos por foto**. |
| **Piel plástica y dedos en garra** | Usar `guidance_scale=3.5` en un modelo destilado (*schnell*). | **Configurar `guidance_scale=0.0`** (nativo de schnell) y usar planos fotográficos sin poses forzadas de manos. |
| **`Error no file named diffusion_pytorch_model.safetensors`** | Se ignoraron los archivos `.safetensors.index.json` al descargar. | El Transformer está dividido en partes (*shards*). El archivo `.index.json` es obligatorio para que Diffusers sepa cómo unirlas. |
| **Conflicto de versiones pip (`huggingface-hub`)** | Colab actualiza librerías que entran en conflicto con `diffusers`. | Fijar la instalación con `!pip install "huggingface-hub<2.0,>=0.25.0" "diffusers>=0.30.0"`. |
| **Regenerar solo imágenes puntuales** | Quieres cambiar solo 5 imágenes sin rehacer las 500 restantes. | **Borra únicamente esas 5 en tu Drive** y vuelve a dar Play. El script salta las existentes y solo regenera las que faltan. |

