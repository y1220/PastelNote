const isBrowser = typeof window !== 'undefined';

// Simple logger that works in both browser and server
const logger = {
  info: (message: string) => {
    if (isBrowser) {
      console.log(`[INFO] ${message}`);
    } else {
      // On server we could use a more sophisticated logging solution
      console.log(`[INFO] ${new Date().toISOString()} - ${message}`);
    }
  },

  error: (message: string) => {
    if (isBrowser) {
      console.error(`[ERROR] ${message}`);
    } else {
      console.error(`[ERROR] ${new Date().toISOString()} - ${message}`);
    }
  },

  debug: (message: string) => {
    if (isBrowser) {
      console.debug(`[DEBUG] ${message}`);
    } else {
      console.debug(`[DEBUG] ${new Date().toISOString()} - ${message}`);
    }
  },

  warn: (message: string) => {
    if (isBrowser) {
      console.warn(`[WARN] ${message}`);
    } else {
      console.warn(`[WARN] ${new Date().toISOString()} - ${message}`);
    }
  }
};

export default logger;
