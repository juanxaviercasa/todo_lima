import os
import json
import re
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAPEO_PATH = os.path.join(ROOT, "docs", "MAPEO_IMAGENES_SEO_537.json")
IMG_DIR = os.path.join(ROOT, "imagenes_generadas")
AUDIT_PATH = os.path.join(ROOT, "docs", "bloques_google_flow", "PROCESAMIENTO_BLOQUES_CONSOLIDADOS.json")

with open(MAPEO_PATH, "r", encoding="utf-8") as f:
    mapeo = json.load(f)

def clean_words(text):
    text = text.lower().replace("_", " ").replace("-", " ")
    text = re.sub(r"[^a-z0-9 ]", "", text)
    return [w for w in text.split() if len(w) > 2]

# Cargar registros previos si existen para no sobreescribir bloques anteriores
record_dict = {}
if os.path.exists(AUDIT_PATH):
    try:
        with open(AUDIT_PATH, "r", encoding="utf-8") as f:
            for r in json.load(f):
                record_dict[r["target_webp"]] = r
    except Exception as e:
        print(f"Aviso al cargar auditoria previa: {e}")

total_converted_session = 0

for b_idx in range(1, 24):
    folder = f"bloque_{b_idx}_TL"
    folder_path = os.path.join(IMG_DIR, folder)
    if not os.path.exists(folder_path):
        continue
        
    files = sorted(os.listdir(folder_path))
    block_mapeo = mapeo[(b_idx - 1) * 24 : b_idx * 24]
    n = len(files)
    
    # Matriz de afinidad
    affinity = []
    for f in files:
        name_clean = re.sub(r"_\d+(_\d+)?\.jpg$", "", f, flags=re.IGNORECASE)
        f_words = clean_words(name_clean)
        row = []
        for item in block_mapeo:
            p_words = set(clean_words(item["prompt"]))
            # puntaje por superposicion de palabras clave
            score = sum(1 for w in f_words if w in p_words)
            row.append(score)
        affinity.append(row)
        
    # Asignacion de pares por maxima similitud
    pair_scores = []
    for fi in range(n):
        for pi in range(len(block_mapeo)):
            pair_scores.append((affinity[fi][pi], fi, pi))
    pair_scores.sort(key=lambda x: x[0], reverse=True)
    
    used_f = set()
    used_p = set()
    assigned = {}
    
    for score, fi, pi in pair_scores:
        if fi not in used_f and pi not in used_p:
            used_f.add(fi)
            used_p.add(pi)
            assigned[pi] = fi
            if len(used_f) == n:
                break
                
    # Fallback si algun prompt no fue tomado
    remaining_f = list(set(range(n)) - used_f)
    remaining_p = list(set(range(len(block_mapeo))) - used_p)
    for p_idx, f_idx in zip(remaining_p, remaining_f):
        assigned[p_idx] = f_idx
        
    print(f"\n>>> Procesando Bloque {b_idx} ({len(block_mapeo)} imagenes)...")
    
    for p_idx in range(len(block_mapeo)):
        f_idx = assigned[p_idx]
        src_filename = files[f_idx]
        src_path = os.path.join(folder_path, src_filename)
        
        target_seo_name = block_mapeo[p_idx]["seo_filename"]
        out_webp_path = os.path.join(IMG_DIR, target_seo_name)
        
        # Abrir y convertir a WebP
        with Image.open(src_path) as img:
            # Asegurar modo RGB para WebP
            if img.mode != "RGB":
                img = img.convert("RGB")
            img.save(out_webp_path, format="WEBP", quality=85, method=6)
            
        src_size = os.path.getsize(src_path)
        out_size = os.path.getsize(out_webp_path)
        
        record_dict[target_seo_name] = {
            "bloque": b_idx,
            "article_id": block_mapeo[p_idx]["article_id"],
            "image_role": block_mapeo[p_idx]["image_role"],
            "source_file": src_filename,
            "target_webp": target_seo_name,
            "original_kb": round(src_size / 1024, 1),
            "webp_kb": round(out_size / 1024, 1)
        }
        total_converted_session += 1

# Guardar auditoria JSON consolidada ordenada por bloque
all_records = sorted(record_dict.values(), key=lambda r: (r.get("bloque", 0), r.get("article_id", "")))
with open(AUDIT_PATH, "w", encoding="utf-8") as f:
    json.dump(all_records, f, indent=2, ensure_ascii=False)

print(f"\n=======================================================")
print(f"[OK] Imagenes convertidas en esta sesion: {total_converted_session}")
print(f"[OK] Total historico consolidado en auditoria: {len(all_records)} imagenes")
print(f"[OK] Archivo de auditoria guardado en: {AUDIT_PATH}")
print(f"=======================================================")
