// authHelpers.ts
import { RecaptchaVerifier } from 'firebase/auth';

declare global {
  interface Window {
    confirmationResult: any;
    recaptchaVerifier: RecaptchaVerifier;
  }
}

export {};
