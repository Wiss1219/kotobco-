import bcrypt from 'bcryptjs';

// Password hashing utilities
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Password validation
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limit length
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Phone validation
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[\d\s\-()]{8,20}$/;
  return phoneRegex.test(phone);
};

// Price validation
export const validatePrice = (price: string): boolean => {
  const priceRegex = /^\d+(\.\d{1,2})?$/;
  return priceRegex.test(price) && parseFloat(price) >= 0;
};

// Session timeout utilities
export const SESSION_TIMEOUT_HOURS = parseInt(import.meta.env.VITE_SESSION_TIMEOUT_HOURS || '8');

export const isSessionExpired = (loginTime: number): boolean => {
  const timeoutMs = SESSION_TIMEOUT_HOURS * 60 * 60 * 1000;
  return Date.now() - loginTime > timeoutMs;
};

export const getSessionExpiryTime = (loginTime: number): number => {
  const timeoutMs = SESSION_TIMEOUT_HOURS * 60 * 60 * 1000;
  return loginTime + timeoutMs;
};

// Rate limiting utilities
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  isAllowed(key: string, limit: number = 5, windowMs: number = 300000): boolean { // 5 attempts per 5 minutes
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(key)) {
      this.requests.set(key, []);
    }
    
    const keyRequests = this.requests.get(key)!;
    
    // Remove old requests outside the window
    const validRequests = keyRequests.filter(time => time > windowStart);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    
    return true;
  }
  
  getRemainingAttempts(key: string, limit: number = 5, windowMs: number = 300000): number {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    if (!this.requests.has(key)) {
      return limit;
    }
    
    const keyRequests = this.requests.get(key)!;
    const validRequests = keyRequests.filter(time => time > windowStart);
    
    return Math.max(0, limit - validRequests.length);
  }
}

export const rateLimiter = new RateLimiter();
