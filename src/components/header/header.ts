function setupMenu() {
  if (typeof document === 'undefined') return;

  const button = document.querySelector('#button-menu');
  const menu = document.querySelector('#menu') as HTMLDivElement;

  if (!button || !menu) return;

  const newButton = button.cloneNode(true);
  button.parentNode?.replaceChild(newButton, button);

  newButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.style.transform === 'translateX(0px)';
    menu.style.transform = isOpen ? 'translateX(100%)' : 'translateX(0px)';
  });

  document.addEventListener('click', function onClick(e) {
    if (
      menu.style.transform === 'translateX(0px)' &&
      e.target instanceof Node &&
      !menu.contains(e.target) &&
      e.target !== newButton
    ) {
      menu.style.transform = 'translateX(100%)';
    }
  });
}

function animateHeaderOnGo() {
  const headerTitle = document.querySelector('[data-header-title]');
  if (!headerTitle) return;

  if (window.location.pathname === '/go') {
    headerTitle.setAttribute('data-animate', 'true');
  }
}

if (typeof window !== 'undefined') {
  if (!window.__audioManager) {
    window.__audioManager = {
      audio: null as HTMLAudioElement | null,
      isSoundOn: true,
      isInitialized: false,

      getSoundStateFromStorage(): boolean {
        if (typeof localStorage === 'undefined') return true;
        return localStorage.getItem('soundState') !== 'false';
      },

      setSoundStateToStorage(value: boolean): void {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem('soundState', String(value));
      },

      getAudioTimeFromStorage(): number | null {
        if (typeof localStorage === 'undefined') return null;
        const time = localStorage.getItem('audioTime');
        return time ? parseFloat(time) : null;
      },

      setAudioTimeToStorage(value: number): void {
        if (typeof localStorage === 'undefined') return;
        localStorage.setItem('audioTime', String(value));
      },

      init(): void {
        if (this.isInitialized) return;
        if (typeof document === 'undefined') return;

        this.audio = new Audio('/assets/audio/music.mp3');
        this.audio.loop = true;
        this.audio.volume = 0.01;

        this.isSoundOn = this.getSoundStateFromStorage();

        const savedTime = this.getAudioTimeFromStorage();
        if (savedTime) {
          this.audio.currentTime = savedTime;
        }

        if (this.isSoundOn) {
          this.audio.play().catch(() => {});
        }

        setInterval(() => {
          if (this.audio && !this.audio.paused) {
            this.setAudioTimeToStorage(this.audio.currentTime);
          }
        }, 1000);

        this.isInitialized = true;
      },

      toggle(): void {
        if (!this.audio) return;

        this.isSoundOn = !this.isSoundOn;
        this.setSoundStateToStorage(this.isSoundOn);

        if (this.isSoundOn) {
          this.audio.volume = 0.01;
          this.audio.play().catch(() => {});
        } else {
          this.audio.pause();
        }
      },

      getState(): boolean {
        return this.isSoundOn;
      },

      update(): void {
        if (!this.audio) return;

        this.isSoundOn = this.getSoundStateFromStorage();

        if (this.isSoundOn && this.audio.paused) {
          this.audio.volume = 0.01; // ← добавил
          this.audio.play().catch(() => {});
        } else if (!this.isSoundOn && !this.audio.paused) {
          this.audio.pause();
        }
      },

      resume(): void {
        if (!this.audio) return;

        this.isSoundOn = this.getSoundStateFromStorage();

        if (this.isSoundOn && this.audio.paused) {
          this.audio.volume = 0.01;
          this.audio.play().catch(() => {});
        }
      },

      forcePlay(): void {
        if (!this.audio) return;

        this.isSoundOn = this.getSoundStateFromStorage();

        if (this.isSoundOn) {
          if (this.audio.paused || this.audio.currentTime === 0) {
            this.audio.volume = 0.01;
            this.audio.play().catch(() => {});
          }
        }
      },
    };
  }
}

if (typeof document !== 'undefined') {
  function initMusic() {
    if (typeof window !== 'undefined' && window.__audioManager) {
      if (!window.__audioManager.isInitialized) {
        window.__audioManager.init();
      }
    }
  }

  function restoreMusic() {
    if (typeof window !== 'undefined' && window.__audioManager) {
      window.__audioManager.forcePlay();
    }
  }

  if (
    document.readyState === 'complete' ||
    document.readyState === 'interactive'
  ) {
    initMusic();
    animateHeaderOnGo();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      initMusic();
      animateHeaderOnGo();
    });
  }

  document.addEventListener('astro:page-load', () => {
    setTimeout(restoreMusic, 50);
    animateHeaderOnGo();
  });

  window.addEventListener('pageshow', () => {
    setTimeout(restoreMusic, 50);
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      setTimeout(restoreMusic, 50);
    }
  });

  window.addEventListener('focus', () => {
    setTimeout(restoreMusic, 50);
  });

  setInterval(() => {
    if (typeof window !== 'undefined' && window.__audioManager) {
      window.__audioManager.forcePlay();
    }
  }, 2000);

  document.addEventListener('DOMContentLoaded', setupMenu);
  document.addEventListener('astro:page-load', setupMenu);
}

export function toggleAudio(): void {
  if (typeof window !== 'undefined' && window.__audioManager) {
    window.__audioManager.toggle();
  }
}

export function getSoundState(): boolean {
  if (typeof window !== 'undefined' && window.__audioManager) {
    return window.__audioManager.getState();
  }
  return true;
}

export function updateAudioState(): void {
  if (typeof window !== 'undefined' && window.__audioManager) {
    window.__audioManager.update();
  }
}
