// PWA - Installation et gestion du Service Worker
// Bootcamp Coran

(function() {
  'use strict';

  // Vérifier si les Service Workers sont supportés
  if (!('serviceWorker' in navigator)) {
    console.log('[PWA] Service Workers non supportés');
    return;
  }

  // Variable pour stocker l'événement d'installation
  let deferredPrompt = null;
  let installButton = null;

  // Enregistrer le Service Worker
  window.addEventListener('load', () => {
    registerServiceWorker();
    setupInstallButton();
    checkOnlineStatus();
  });

  // Enregistrement du Service Worker
  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });

      console.log('[PWA] Service Worker enregistré:', registration.scope);

      // Vérifier les mises à jour
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        console.log('[PWA] Nouvelle version détectée');

        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            showUpdateNotification();
          }
        });
      });

      // Vérifier les mises à jour périodiquement (toutes les heures)
      setInterval(() => {
        registration.update();
      }, 60 * 60 * 1000);

    } catch (error) {
      console.error('[PWA] Erreur lors de l\'enregistrement:', error);
    }
  }

  // Configurer le bouton d'installation
  function setupInstallButton() {
    // Créer le bouton d'installation flottant
    installButton = document.createElement('button');
    installButton.id = 'pwa-install-btn';
    installButton.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
        <polyline points="7 10 12 15 17 10"/>
        <line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      <span>Installer l'app</span>
    `;
    installButton.style.cssText = `
      display: none;
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 12px 20px;
      background: linear-gradient(135deg, #1F4E79 0%, #2E74B5 100%);
      color: white;
      border: none;
      border-radius: 50px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(31, 78, 121, 0.4);
      z-index: 9999;
      transition: all 0.3s ease;
      align-items: center;
      gap: 8px;
    `;
    document.body.appendChild(installButton);

    // Gérer le clic sur le bouton
    installButton.addEventListener('click', handleInstallClick);

    // Écouter l'événement beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('[PWA] beforeinstallprompt déclenché');
      e.preventDefault();
      deferredPrompt = e;
      showInstallButton();
    });

    // Écouter quand l'app est installée
    window.addEventListener('appinstalled', () => {
      console.log('[PWA] Application installée');
      hideInstallButton();
      deferredPrompt = null;
      showNotification('✅ Application installée avec succès !', 'success');
    });
  }

  // Afficher le bouton d'installation
  function showInstallButton() {
    if (installButton) {
      installButton.style.display = 'flex';
      // Animation d'entrée
      setTimeout(() => {
        installButton.style.transform = 'translateY(0)';
        installButton.style.opacity = '1';
      }, 100);
    }
  }

  // Cacher le bouton d'installation
  function hideInstallButton() {
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  // Gérer le clic sur le bouton d'installation
  async function handleInstallClick() {
    if (!deferredPrompt) {
      console.log('[PWA] Pas de prompt disponible');
      return;
    }

    // Afficher le prompt d'installation
    deferredPrompt.prompt();

    // Attendre la réponse de l'utilisateur
    const { outcome } = await deferredPrompt.userChoice;
    console.log('[PWA] Choix utilisateur:', outcome);

    // Réinitialiser le prompt
    deferredPrompt = null;
    hideInstallButton();
  }

  // Vérifier le statut en ligne/hors-ligne
  function checkOnlineStatus() {
    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  }

  // Mettre à jour l'indicateur de statut
  function updateOnlineStatus() {
    const isOnline = navigator.onLine;
    
    // Créer ou mettre à jour l'indicateur
    let statusIndicator = document.getElementById('pwa-status');
    
    if (!statusIndicator) {
      statusIndicator = document.createElement('div');
      statusIndicator.id = 'pwa-status';
      statusIndicator.style.cssText = `
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
        z-index: 9999;
        transition: all 0.3s ease;
        display: none;
      `;
      document.body.appendChild(statusIndicator);
    }

    if (!isOnline) {
      statusIndicator.innerHTML = '📴 Mode hors-ligne';
      statusIndicator.style.background = '#FFF3E0';
      statusIndicator.style.color = '#E65100';
      statusIndicator.style.border = '1px solid #FFB74D';
      statusIndicator.style.display = 'block';
      
      // Cacher après 5 secondes
      setTimeout(() => {
        if (!navigator.onLine) {
          statusIndicator.style.opacity = '0.7';
        }
      }, 5000);
    } else {
      // Afficher brièvement "En ligne" si on était hors-ligne
      if (statusIndicator.style.display === 'block') {
        statusIndicator.innerHTML = '✅ Connexion rétablie';
        statusIndicator.style.background = '#E8F5E9';
        statusIndicator.style.color = '#2E7D32';
        statusIndicator.style.border = '1px solid #81C784';
        
        setTimeout(() => {
          statusIndicator.style.display = 'none';
        }, 3000);
      }
    }
  }

  // Afficher une notification de mise à jour
  function showUpdateNotification() {
    const notification = document.createElement('div');
    notification.id = 'pwa-update';
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 12px;">
        <span>🔄 Nouvelle version disponible !</span>
        <button id="pwa-update-btn" style="
          padding: 6px 12px;
          background: white;
          color: #1F4E79;
          border: none;
          border-radius: 4px;
          font-weight: 600;
          cursor: pointer;
        ">Mettre à jour</button>
        <button id="pwa-update-close" style="
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 0 4px;
        ">×</button>
      </div>
    `;
    notification.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      padding: 12px 16px;
      background: linear-gradient(135deg, #1F4E79 0%, #2E74B5 100%);
      color: white;
      border-radius: 8px;
      font-size: 14px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      z-index: 9999;
    `;
    document.body.appendChild(notification);

    // Bouton de mise à jour
    document.getElementById('pwa-update-btn').addEventListener('click', () => {
      window.location.reload();
    });

    // Bouton de fermeture
    document.getElementById('pwa-update-close').addEventListener('click', () => {
      notification.remove();
    });
  }

  // Afficher une notification générique
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'pwa-notification';
    notification.textContent = message;
    
    const colors = {
      success: { bg: '#E8F5E9', color: '#2E7D32', border: '#81C784' },
      error: { bg: '#FFEBEE', color: '#C62828', border: '#EF9A9A' },
      info: { bg: '#E3F2FD', color: '#1565C0', border: '#64B5F6' }
    };
    
    const style = colors[type] || colors.info;
    
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 12px 24px;
      background: ${style.bg};
      color: ${style.color};
      border: 1px solid ${style.border};
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

})();
