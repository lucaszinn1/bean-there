import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.dabe7cae6b1249c09a0ae190f929ca24',
  appName: 'bean-there-work-there',
  webDir: 'dist',
  server: {
    url: "https://dabe7cae-6b12-49c0-9a0a-e190f929ca24.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  ios: {
    allowsLinkPreview: false
  },
  android: {
    allowMixedContent: true
  }
};

export default config;