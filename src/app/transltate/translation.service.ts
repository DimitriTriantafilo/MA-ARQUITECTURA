import { Injectable, Signal, computed, signal } from '@angular/core';
import { AvailableLanguages, TRANSLATIONS } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang = signal<AvailableLanguages>('es');
  private translations = TRANSLATIONS;

  public readonly currentLanguage: Signal<AvailableLanguages> =
    this.currentLang.asReadonly();

  setLanguage(lang: AvailableLanguages): void {
    this.currentLang.set(lang);
  }
  changeLanguage(): void {
    console.log(this.currentLang());
    this.currentLang() == 'es'
      ? this.currentLang.set('en')
      : this.currentLang.set('es');
  }
  translate(key: string, params: Record<string, string> = {}): string {
    const lang = this.currentLang();
    let translation = this.translations[lang][key] || key;

    // Reemplaza parámetros dinámicos
    Object.keys(params).forEach((param) => {
      translation = translation.replace(`{{${param}}}`, params[param]);
    });

    return translation;
  }

  getAvailableLanguages(): AvailableLanguages[] {
    return Object.keys(this.translations) as AvailableLanguages[];
  }
}
