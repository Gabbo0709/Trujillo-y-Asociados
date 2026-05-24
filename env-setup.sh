#!/bin/bash

# Terminar la ejecución si ocurre un error grave
set -e

CONTAINER_NAME="astro-lab"
IMAGE="fedora:latest"

echo "==================================================================="
echo "   Setup interactivo del entorno para Trujillo y Asociados"
echo "==================================================================="

# 1. Verificar si distrobox está instalado
if ! command -v distrobox &> /dev/null; then
    echo "❌ Error: 'distrobox' no está instalado."
    echo "Por favor, instálalo antes de ejecutar este script."
    exit 1
fi

# 2. Creación del Contenedor
read -p "📦 ¿Deseas crear el contenedor distrobox '$CONTAINER_NAME' con la imagen '$IMAGE'? [s/N]: " create_container
if [[ "$create_container" =~ ^[sS]$ ]]; then
    echo "⏳ Creando el contenedor..."
    distrobox create -n "$CONTAINER_NAME" -i "$IMAGE"
else
    echo "⏭️ Omitiendo la creación del contenedor..."
fi

# 3. Instalación de dependencias
read -p "🛠️ ¿Deseas instalar las dependencias (Node.js, libatomic, pnpm) en '$CONTAINER_NAME'? [s/N]: " install_deps
if [[ "$install_deps" =~ ^[sS]$ ]]; then
    echo "⏳ Instalando dependencias... Esto puede tardar algunos minutos."
    
    echo "-> Actualizando paquetes del sistema..."
    distrobox enter "$CONTAINER_NAME" -- sudo dnf update -y
    
    echo "-> Instalando libatomic y nodejs..."
    distrobox enter "$CONTAINER_NAME" -- sudo dnf install -y libatomic nodejs
    
    echo "-> Instalando pnpm..."
    distrobox enter "$CONTAINER_NAME" -- bash -c 'curl -fsSL https://get.pnpm.io/install.sh | sh -'
    
    echo "✅ Dependencias instaladas exitosamente."
else
    echo "⏭️ Omitiendo la instalación de dependencias..."
fi

echo "==================================================================="
echo "🎉 Setup completado. Para entrar al entorno, ejecuta:"
echo ""
echo "    distrobox enter $CONTAINER_NAME"
echo "==================================================================="
