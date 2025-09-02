export interface VideoConfig {
  mobileOptimization: boolean;
  autoplayFallback: boolean;
  retryAttempts: number;
  timeoutDuration: number;
  enableDebugLogging: boolean;
  youtubeSettings: {
    defaultQuality: string;
    mobileQuality: string;
    desktopQuality: string;
    enableAPI: boolean;
    enableControls: boolean;
  };
}

export const DEFAULT_VIDEO_CONFIG: VideoConfig = {
  mobileOptimization: true,
  autoplayFallback: true,
  retryAttempts: 3,
  timeoutDuration: 10000,
  enableDebugLogging: false,
  youtubeSettings: {
    defaultQuality: 'hd720',
    mobileQuality: 'hd720',
    desktopQuality: 'hd1080',
    enableAPI: true,
    enableControls: false,
  },
};

export const MOBILE_VIDEO_CONFIG: VideoConfig = {
  ...DEFAULT_VIDEO_CONFIG,
  mobileOptimization: true,
  autoplayFallback: true,
  retryAttempts: 5, // Más reintentos para móviles
  timeoutDuration: 15000, // Más tiempo de espera para móviles
  youtubeSettings: {
    ...DEFAULT_VIDEO_CONFIG.youtubeSettings,
    mobileQuality: 'hd720',
    enableAPI: true,
  },
};

export const PRODUCTION_VIDEO_CONFIG: VideoConfig = {
  ...DEFAULT_VIDEO_CONFIG,
  enableDebugLogging: false,
  retryAttempts: 3,
  timeoutDuration: 8000,
};
