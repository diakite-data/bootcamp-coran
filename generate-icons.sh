#!/bin/bash

# Script pour générer les icônes PNG pour la PWA
# Prérequis : ImageMagick ou Inkscape installé

# Dossier des icônes
ICONS_DIR="assets/icons"

# Tailles requises pour la PWA
SIZES="72 96 128 144 152 192 384 512"

echo "🎨 Génération des icônes PWA..."

# Vérifier si Inkscape est installé
if command -v inkscape &> /dev/null; then
    echo "Utilisation d'Inkscape..."
    for size in $SIZES; do
        inkscape -w $size -h $size "$ICONS_DIR/icon.svg" -o "$ICONS_DIR/icon-${size}x${size}.png"
        echo "✅ icon-${size}x${size}.png créée"
    done

# Sinon, vérifier si ImageMagick (convert) est installé
elif command -v convert &> /dev/null; then
    echo "Utilisation d'ImageMagick..."
    for size in $SIZES; do
        convert -background none -resize ${size}x${size} "$ICONS_DIR/icon.svg" "$ICONS_DIR/icon-${size}x${size}.png"
        echo "✅ icon-${size}x${size}.png créée"
    done

# Sinon, donner des instructions
else
    echo "❌ Ni Inkscape ni ImageMagick n'est installé."
    echo ""
    echo "Pour installer sur Ubuntu/Debian :"
    echo "  sudo apt install inkscape"
    echo "  # ou"
    echo "  sudo apt install imagemagick"
    echo ""
    echo "Pour installer sur macOS :"
    echo "  brew install inkscape"
    echo "  # ou"
    echo "  brew install imagemagick"
    echo ""
    echo "Alternative : utilisez un outil en ligne comme https://realfavicongenerator.net"
    exit 1
fi

echo ""
echo "🎉 Toutes les icônes ont été générées !"
echo "📁 Emplacement : $ICONS_DIR/"
