import json
import os
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PROMPTS_PATH = ROOT / "docs" / "PROMPTS_IMAGENES_BLOG_179_ARTICULOS.txt"
BANCO_PATH = ROOT / "docs" / "BANCO_EDITORIAL_180_TITULARES.json"
MAPEO_PATH = ROOT / "docs" / "MAPEO_IMAGENES_SEO_537.json"
OUT_DIR = ROOT / "docs" / "bloques_google_flow"

os.makedirs(OUT_DIR, exist_ok=True)

with open(PROMPTS_PATH, "r", encoding="utf-8") as f:
    prompts = [line.strip() for line in f if line.strip()]

with open(MAPEO_PATH, "r", encoding="utf-8") as f:
    mapeo = json.load(f)

with open(BANCO_PATH, "r", encoding="utf-8") as f:
    banco = json.load(f)
articulos = banco["articulos"][1:] # TLB-002 a TLB-180 (179 articulos)

total_prompts = len(prompts)
assert total_prompts == 537, f"Se esperaban 537 prompts, se encontraron {total_prompts}"
assert len(mapeo) == 537, f"Se esperaban 537 mapeos, se encontraron {len(mapeo)}"
assert len(articulos) == 179, f"Se esperaban 179 articulos, se encontraron {len(articulos)}"

PROMPTS_PER_BLOCK = 24

bloques_info = []

current_prompt_idx = 0
block_num = 1

while current_prompt_idx < total_prompts:
    end_prompt_idx = min(current_prompt_idx + PROMPTS_PER_BLOCK, total_prompts)
    block_prompts = prompts[current_prompt_idx:end_prompt_idx]
    block_mapeo = mapeo[current_prompt_idx:end_prompt_idx]
    
    start_art_idx = current_prompt_idx // 3
    end_art_idx = (end_prompt_idx + 2) // 3
    block_arts = articulos[start_art_idx:end_art_idx]
    
    filename = f"bloque_{block_num:02d}.txt"
    filepath = OUT_DIR / filename
    
    # Escribir con un salto de línea en blanco entre cada prompt (formato Google Flow)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n\n".join(block_prompts) + "\n")
        
    bloques_info.append({
        "bloque": block_num,
        "archivo": filename,
        "total_prompts": len(block_prompts),
        "articulos_rango": f"{block_arts[0]['id']} a {block_arts[-1]['id']}",
        "articulos": block_arts,
        "items_mapeo": block_mapeo
    })
    
    current_prompt_idx = end_prompt_idx
    block_num += 1

total_bloques = len(bloques_info)

# Crear archivo de índice maestro en Markdown
indice_md_path = OUT_DIR / "INDICE_BLOQUES_GOOGLE_FLOW.md"
with open(indice_md_path, "w", encoding="utf-8") as f:
    f.write("# Índice Maestro de Bloques para Google Flow (537 Prompts en 23 Bloques)\n\n")
    f.write("Cada bloque contiene hasta **24 prompts** (8 artículos x 3 imágenes cada uno), separados por un **salto de línea en blanco** (`\\n\\n`) tal como lo requiere Google Flow.\n\n")
    f.write("### Tabla Resumen de Bloques:\n\n")
    f.write("| Bloque | Archivo | Prompts | Rango de Artículos | Total Artículos |\n")
    f.write("| :--- | :--- | :---: | :--- | :---: |\n")
    for b in bloques_info:
        f.write(f"| **Bloque {b['bloque']:02d}** | [`{b['archivo']}`](./{b['archivo']}) | {b['total_prompts']} | {b['articulos_rango']} | {len(b['articulos'])} |\n")
    f.write(f"\n**Total General:** {total_prompts} prompts distribuidos en {total_bloques} bloques.\n\n")
    f.write("---\n\n")
    f.write("## Detalle de Archivos de Salida por Bloque (Para Nombrar las Imágenes Generadas)\n\n")
    for b in bloques_info:
        f.write(f"### Bloque {b['bloque']:02d} ({b['archivo']}) - {b['total_prompts']} Prompts ({b['articulos_rango']})\n\n")
        for idx, item in enumerate(b['items_mapeo']):
            f.write(f"- **Prompt {idx+1}:** `{item['seo_filename']}` ({item['article_id']} - {item['image_role']})\n")
        f.write("\n")

print(f"[OK] Generados con exito {total_bloques} bloques en: {OUT_DIR}")
print(f"[OK] Indice maestro creado en: {indice_md_path}")
