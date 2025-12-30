# 📖 Bootcamp « Lire le Coran vocalisé en 7 jours »

Un curriculum intensif pour apprendre à **lire** l'arabe coranique vocalisé, conçu pour les francophones débutants complets.

---

## 🎯 Objectif

Permettre à un **débutant absolu** de lire la **sourate Al-Fatiha** en 7 jours, en maîtrisant :

- Les **28 lettres** de l'alphabet arabe
- Les **signes de vocalisation** (ḥarakāt)
- Les **règles de lecture** essentielles

> ⚠️ **Important** : Ce bootcamp enseigne à **LIRE** (déchiffrer), pas à **COMPRENDRE** l'arabe. La compréhension du sens est une étape ultérieure.

---

## 📚 Structure du Bootcamp

| Jour | Titre | Lettres | Signes / Règles | Durée |
|:----:|-------|:-------:|-----------------|:-----:|
| 0 | **Accueil & Introduction** | — | Vue d'ensemble, méthode | 15 min |
| 1 | **Premiers sons** | ب ت م ن (4) | Fatha + Kasra | 25 min |
| 2 | **Lecture fluide** | ل ك ف س ه (5) | Damma + Sukūn | 30 min |
| 3 | **Lecture renforcée** | ج ش ي ق ع غ (6) | ī long + Shadda | 30 min |
| 4 | **Exceptions graphiques** | ا د ذ ر ز و (6) | ā / ū + Lām-Alif (لا) | 30 min |
| 5 | **Alphabet complet** | ث ح خ ص ض ط ظ (7) | Article ال (lunaires/solaires) | 30 min |
| 6 | **Signes coraniques** | — | Tanwīn, Hamza, ة, ى, آ, Waṣla | 35 min |
| 7 | **Application** | — | Lecture de la sourate Al-Fatiha | 35 min |

**Durée totale : ~3h30** réparties sur 7 jours

---

## 📊 Progression des lettres

| Jour | Lettres apprises | Total |
|:----:|------------------|:-----:|
| 1 | ب ت م ن | 4 |
| 2 | ل ك ف س ه | 9 |
| 3 | ج ش ي ق ع غ | 15 |
| 4 | ا د ذ ر ز و | 21 |
| 5 | ث ح خ ص ض ط ظ | **28** ✅ |

---

## 📊 Progression des signes

| Jour | Signes appris |
|:----:|---------------|
| 1 | Fatha (◌َ = a), Kasra (◌ِ = i) |
| 2 | Damma (◌ُ = ou), Sukūn (◌ْ = muet) |
| 3 | Voyelle longue ī, Shadda (◌ّ) |
| 4 | Voyelles longues ā / ū, Lām-Alif (لا) |
| 5 | Article ال (lunaires/solaires) |
| 6 | Tanwīn (◌ً ◌ٍ ◌ٌ), Hamza, Tā' Marbūṭa (ة), Alif Maqṣūra (ى), Madda (آ), Liaison |
| 7 | Application finale |

---

## ✅ Ce que vous saurez faire après le bootcamp

| Compétence | Acquis |
|------------|:------:|
| Reconnaître les 28 lettres arabes | ✅ |
| Identifier les 4 formes de chaque lettre | ✅ |
| Lire les voyelles courtes (Fatha, Kasra, Damma) | ✅ |
| Lire les voyelles longues (ā, ī, ū) | ✅ |
| Reconnaître le Sukūn et la Shadda | ✅ |
| Lire le Tanwīn (-an, -in, -oun) | ✅ |
| Distinguer lettres lunaires et solaires | ✅ |
| Appliquer les règles de liaison | ✅ |
| Lire la sourate Al-Fatiha | ✅ |

---

## ⚠️ Limitations

Ce bootcamp **ne couvre pas** :

- 🔇 **La prononciation audio** — Complétez avec des ressources audio
- 📖 **Le Tajwīd avancé** — Règles de récitation mélodique
- 🧠 **La compréhension** — Le sens des mots et la grammaire
- ✍️ **L'écriture** — Comment écrire les lettres

---

## 🔊 Ressources audio recommandées

### Récitateurs pour débutants
- **Mishary Rashid Alafasy** — Récitation claire et lente
- **Abdul Rahman Al-Sudais** — Prononciation distincte
- **Saad Al-Ghamdi** — Rythme accessible

### Sites et applications
- [Quran.com](https://quran.com) — Récitations avec suivi mot par mot
- **Quran Companion** (app) — Récitation guidée
- **Learn Quran Tajwid** (app) — Apprentissage du Tajwīd

---

## 🚀 Installation et utilisation

### Prérequis

- [Quarto](https://quarto.org/docs/get-started/) installé sur votre machine
- Un navigateur web moderne

### Commandes

```bash
# Prévisualiser le site localement
quarto preview

# Générer le site statique
quarto render

# Publier sur Quarto Pub
quarto publish quarto-pub
```

### Structure des fichiers

```
bootcamp-coran/
├── _quarto.yml          # Configuration Quarto
├── index.qmd            # Accueil + Introduction
├── styles.css           # Styles CSS personnalisés
├── manifest.json        # PWA - Métadonnées
├── service-worker.js    # PWA - Cache offline
├── pwa.js               # PWA - Script installation
├── README.md            # Ce fichier
├── assets/
│   └── icons/           # Icônes PWA
└── notebooks/
    ├── notebook-1.qmd   # Jour 1 - Premiers sons
    ├── notebook-2.qmd   # Jour 2 - Lecture fluide
    ├── notebook-3.qmd   # Jour 3 - Lecture renforcée
    ├── notebook-4.qmd   # Jour 4 - Exceptions graphiques
    ├── notebook-5.qmd   # Jour 5 - Alphabet complet
    ├── notebook-6.qmd   # Jour 6 - Signes coraniques
    └── notebook-7.qmd   # Jour 7 - Al-Fatiha
```

---

## 📱 Mode Offline (PWA)

Le bootcamp fonctionne comme une **Progressive Web App** (PWA) :

- 📲 **Installable** sur mobile et desktop
- 📴 **Fonctionne hors-ligne** une fois les pages visitées
- 🔄 **Mise à jour automatique** quand vous êtes en ligne

### Installation

1. Ouvrez le site dans votre navigateur
2. Cliquez sur le bouton **"Installer l'app"**
3. L'app apparaît sur votre écran d'accueil

---

## 🎓 Après le bootcamp

### Prochaines étapes recommandées

1. **Pratiquez quotidiennement** — Relisez Al-Fatiha chaque jour
2. **Apprenez les sourates courtes** — Al-Ikhlāṣ (112), Al-Falaq (113), An-Nās (114)
3. **Écoutez des récitations** — Familiarisez-vous avec la prononciation
4. **Étudiez le Tajwīd** — Les règles de récitation mélodique
5. **Apprenez le vocabulaire** — Commencez à comprendre ce que vous lisez

---

## 📄 Licence

Ce contenu pédagogique est fourni à des fins éducatives.

---

## 🤲 Invocation

بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ

**Au nom d'Allah, le Tout-Miséricordieux, le Très-Miséricordieux**

اللَّهُمَّ عَلِّمْنَا مَا يَنْفَعُنَا

**Ô Allah, enseigne-nous ce qui nous est bénéfique**
