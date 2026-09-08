import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

/**
 * Ejecuta comandos de Git de manera segura y retorna la salida o null en caso de fallo
 */
function runGit(command) {
  try {
    return execSync(command, { cwd: rootDir, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  } catch (error) {
    return null;
  }
}

/**
 * Sincroniza automáticamente los archivos JSON y el estado con Git y GitHub
 * @param {string} slug Categoría actualizada (ej. "doctores")
 * @returns {boolean} Retorna true si se hizo commit y push con éxito
 */
export async function syncWithGit(slug) {
  console.log(`\n🐙 [GitSync] Verificando cambios para "${slug}"...`);

  // 1. Verificar si estamos dentro de un repositorio Git
  const isGitRepo = runGit('git rev-parse --is-inside-work-tree');
  if (isGitRepo !== 'true') {
    console.warn('⚠️ [GitSync] No se detectó un repositorio Git en la raíz. Inicializando git init...');
    runGit('git init');
  }

  // 2. Verificar estado de los archivos modificados
  const status = runGit(`git status --porcelain data/${slug}.json scraper/state.json`);
  if (!status) {
    console.log(`ℹ️ [GitSync] No hay cambios pendientes en data/${slug}.json ni en scraper/state.json. Omitiendo commit.`);
    return false;
  }

  // 3. Stage de los archivos específicos
  console.log(`📦 [GitSync] Agregando archivos al staging: data/${slug}.json y scraper/state.json`);
  runGit(`git add "data/${slug}.json" "scraper/state.json"`);

  // 4. Commit semántico
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
  const commitMsg = `data(${slug}): update directory listings in Lima (${timestamp})`;
  
  try {
    const commitOutput = execSync(`git commit -m "${commitMsg}"`, {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    console.log(`✅ [GitSync] Commit exitoso:\n   "${commitMsg}"`);
  } catch (err) {
    console.warn('⚠️ [GitSync] No se pudo crear el commit:', err.message);
    return false;
  }

  // 5. Verificar si hay un repositorio remoto configurado
  const remoteUrl = runGit('git remote get-url origin');
  if (!remoteUrl) {
    console.log('ℹ️ [GitSync] Repositorio remoto (origin) no configurado aún.');
    console.log('👉 Tip: Cuando vincules tu repo en GitHub (git remote add origin <url>), el push se realizará automáticamente aquí.');
    return true;
  }

  // 6. Push a GitHub para detonar despliegue en Vercel/Cloudflare
  console.log(`🚀 [GitSync] Enviando cambios a GitHub (origin)...`);
  try {
    // Detectamos la rama actual (main o master)
    const currentBranch = runGit('git branch --show-current') || 'main';
    execSync(`git push origin ${currentBranch}`, {
      cwd: rootDir,
      encoding: 'utf-8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    console.log(`🎉 [GitSync] Push completado exitosamente a la rama "${currentBranch}". Despliegue CI/CD activado.`);
    return true;
  } catch (pushErr) {
    console.warn(`⚠️ [GitSync] Push a remoto falló (verificar credenciales o conectividad):`, pushErr.message);
    return false;
  }
}
