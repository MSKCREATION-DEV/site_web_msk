#!/usr/bin/env bash
# Sync sélectif addyosmani/agent-skills → .cursor/skills + .cursor/references
# Ne jamais écraser les skills MSK ni une skill déjà présente localement.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DEST="${ROOT}/.cursor/skills"
REFS_DEST="${ROOT}/.cursor/references"
REPO_URL="${ADDY_SKILLS_REPO:-https://github.com/addyosmani/agent-skills.git}"
SRC="${ADDY_SKILLS_SRC:-}"
TMP_CLONE=""

WHITELIST=(
  using-agent-skills
  performance-optimization
  security-and-hardening
  frontend-ui-engineering
  shipping-and-launch
  code-review-and-quality
  constraint-driven-development
  browser-testing-with-devtools
  incremental-implementation
  source-driven-development
  ci-cd-and-automation
)

MSK_PROTECT=(
  msk-figma-implementation
  react-router-ssr
  seo-review
  responsive-qa
  visual-regression
)

cleanup() {
  if [[ -n "${TMP_CLONE}" && -d "${TMP_CLONE}" ]]; then
    rm -rf "${TMP_CLONE}"
  fi
}
trap cleanup EXIT

resolve_src() {
  if [[ -n "${SRC}" && -d "${SRC}/skills" ]]; then
    echo "Using ADDY_SKILLS_SRC=${SRC}"
    return
  fi
  if [[ -d /tmp/addyosmani-agent-skills/skills ]]; then
    SRC=/tmp/addyosmani-agent-skills
    echo "Using existing clone ${SRC}"
    return
  fi
  TMP_CLONE="$(mktemp -d /tmp/addyosmani-agent-skills-XXXXXX)"
  echo "Shallow clone ${REPO_URL} → ${TMP_CLONE}"
  git clone --depth 1 "${REPO_URL}" "${TMP_CLONE}"
  SRC="${TMP_CLONE}"
}

is_protected() {
  local name="$1"
  local p
  for p in "${MSK_PROTECT[@]}"; do
    [[ "${p}" == "${name}" ]] && return 0
  done
  return 1
}

main() {
  resolve_src
  mkdir -p "${SKILLS_DEST}" "${REFS_DEST}"

  local skill src_dir dest_dir
  echo "=== Skills (whitelist, --ignore-existing semantics) ==="
  for skill in "${WHITELIST[@]}"; do
    if is_protected "${skill}"; then
      echo "SKIP (MSK protect): ${skill}"
      continue
    fi
    src_dir="${SRC}/skills/${skill}"
    dest_dir="${SKILLS_DEST}/${skill}"
    if [[ ! -d "${src_dir}" ]]; then
      echo "MISSING upstream: ${skill}"
      continue
    fi
    if [[ -d "${dest_dir}" ]]; then
      echo "EXISTS (leave): ${skill}"
      continue
    fi
    rsync -a "${src_dir}/" "${dest_dir}/"
    echo "COPIED: ${skill}"
  done

  echo "=== References → .cursor/references ==="
  if [[ -d "${SRC}/references" ]]; then
    # References : sync contenu (rafraîchir checklists), préserver README MSK local si présent
    rsync -a --exclude 'README.md' "${SRC}/references/" "${REFS_DEST}/"
    if [[ ! -f "${REFS_DEST}/README.md" ]]; then
      cat > "${REFS_DEST}/README.md" << 'EOF'
# References agent-skills (Addy Osmani)

Source : https://github.com/addyosmani/agent-skills (`references/`).

Chemins relatifs depuis `.cursor/skills/*/SKILL.md` : `../../references/<file>.md`.

Voir `docs/architecture/CURSOR_GOVERNANCE.md` et `scripts/sync-agent-skills.sh`.
EOF
    fi
    echo "OK references synced"
  else
    echo "WARN: no references/ in source"
  fi

  echo "=== MSK protect check ==="
  for skill in "${MSK_PROTECT[@]}"; do
    if [[ -f "${SKILLS_DEST}/${skill}/SKILL.md" ]]; then
      echo "OK MSK: ${skill}"
    else
      echo "MISSING MSK: ${skill}" >&2
      exit 1
    fi
  done

  if [[ -d "${SRC}/.git" ]]; then
    echo "=== Upstream tip ==="
    git -C "${SRC}" rev-parse --short HEAD 2>/dev/null || true
  fi

  echo "Done."
}

main "$@"
