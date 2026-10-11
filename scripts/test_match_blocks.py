import os
import json
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAPEO_PATH = os.path.join(ROOT, "docs", "MAPEO_IMAGENES_SEO_537.json")
IMG_DIR = os.path.join(ROOT, "imagenes_generadas")

with open(MAPEO_PATH, "r", encoding="utf-8") as f:
    mapeo = json.load(f)

def clean_words(text):
    text = text.lower().replace("_", " ").replace("-", " ")
    text = re.sub(r"[^a-z0-9 ]", "", text)
    return [w for w in text.split() if len(w) > 2]

all_matches = []

for b_idx in range(1, 11):
    folder = f"bloque_{b_idx}_TL"
    folder_path = os.path.join(IMG_DIR, folder)
    if not os.path.exists(folder_path):
        print(f"No existe: {folder}")
        continue
        
    files = sorted(os.listdir(folder_path))
    block_mapeo = mapeo[(b_idx - 1) * 24 : b_idx * 24]
    
    # Matriz de afinidad
    # filas: files, columnas: prompts
    n = len(files)
    affinity = []
    for f in files:
        # remover timestamp al final ej. _20261010183928.jpg o _20261010183928_2.jpg
        name_clean = re.sub(r"_\d+(_\d+)?\.jpg$", "", f, flags=re.IGNORECASE)
        f_words = clean_words(name_clean)
        row = []
        for p_idx, item in enumerate(block_mapeo):
            p_words = set(clean_words(item["prompt"]))
            # puntaje: cuantas palabras del nombre estan en el prompt
            score = sum(1 for w in f_words if w in p_words)
            row.append(score)
        affinity.append(row)
        
    # Algoritmo de asignacion optima (Max Weight Bipartite Matching)
    # Busqueda con backtracking sobre los 24 elementos (ordenados por mayor diferencia de score)
    best_matching = None
    best_total_score = -1
    
    # Enfoque voraz optimizado
    # Para cada prompt, ver qué archivo tiene la mayor afinidad relativa
    matched_files = set()
    block_pairs = []
    
    # Ordenar prompts por especificidad (los que tienen pocas opciones fuertes primero)
    prompt_indices = list(range(len(block_mapeo)))
    
    # Matriz de puntuacion
    import itertools
    # Como n=24, usamos una asignacion voraz por maxima afinidad absoluta
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
            assigned[pi] = (fi, score)
            if len(used_f) == n:
                break
                
    # Verificar si todos los prompts fueron asignados
    missing_p = [p for p in range(len(block_mapeo)) if p not in assigned]
    if missing_p:
        print(f"Bloque {b_idx}: Faltan asignar {len(missing_p)} prompts!")
    else:
        # Verificar puntajes
        scores = [assigned[p][1] for p in range(len(block_mapeo))]
        min_score = min(scores)
        print(f"Bloque {b_idx}: 24/24 emparejados exitosamente. Puntaje min: {min_score}, promedio: {sum(scores)/len(scores):.1f}")
        for p_idx in range(len(block_mapeo)):
            f_idx, s = assigned[p_idx]
            all_matches.append({
                "bloque": b_idx,
                "folder": folder,
                "src_file": files[f_idx],
                "target_filename": block_mapeo[p_idx]["seo_filename"],
                "score": s
            })

print(f"\nTotal emparejamientos calculados: {len(all_matches)} de 240 requeridos.")

print("\n--- Inspección de emparejamientos con score <= 1 ---")
for m in all_matches:
    if m["score"] <= 1:
        print(f"Bloque {m['bloque']} | Score {m['score']} | {m['src_file']} -> {m['target_filename']}")
