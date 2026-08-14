/**
 * Application Logger for tracking events, test results, and error diagnostic traces.
 */

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
  details?: any;
}

class AppLogger {
  private logs: LogEntry[] = [];

  log(level: 'INFO' | 'WARN' | 'ERROR', message: string, details?: any) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      details,
    };
    this.logs.push(entry);
    
    // Output to console cleanly
    if (level === 'ERROR') {
      console.error(`[${entry.timestamp}] [${level}] ${message}`, details || '');
    } else if (level === 'WARN') {
      console.warn(`[${entry.timestamp}] [${level}] ${message}`, details || '');
    } else {
      console.log(`[${entry.timestamp}] [${level}] ${message}`, details || '');
    }

    // Persist logs to localStorage for offline error auditing
    try {
      const existing = JSON.parse(localStorage.getItem('kibersavodxonlik_logs') || '[]');
      existing.push(entry);
      // Keep last 100 entries
      if (existing.length > 100) existing.shift();
      localStorage.setItem('kibersavodxonlik_logs', JSON.stringify(existing));
    } catch (e) {
      // ignore localstorage quota errors
    }
  }

  info(message: string, details?: any) {
    this.log('INFO', message, details);
  }

  warn(message: string, details?: any) {
    this.log('WARN', message, details);
  }

  error(message: string, details?: any) {
    this.log('ERROR', message, details);
  }

  getLogs(): LogEntry[] {
    return this.logs;
  }
}

export const logger = new AppLogger();
