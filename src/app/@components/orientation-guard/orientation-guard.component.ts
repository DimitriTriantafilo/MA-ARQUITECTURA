import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrientationService } from '../../orientation.service.js';

@Component({
  selector: 'app-orientation-guard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="shouldShowOverlay" class="orientation-overlay" [@fadeInOut]>
      <div class="orientation-content">
        <div class="orientation-icon">
          <div class="phone-icon">
            <div class="screen"></div>
          </div>
        </div>
        <h2 class="orientation-title">Gira tu dispositivo</h2>
        <p class="orientation-message">
          Para una mejor experiencia,<br />
          usa el dispositivo en modo vertical
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .orientation-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: #e3e2de;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        font-family: 'levenim', sans-serif;
        color: #756860;
        text-align: center;
        padding: 20px;
        box-sizing: border-box;
      }

      .orientation-content {
        max-width: 300px;
        width: 100%;
      }

      .orientation-icon {
        margin-bottom: 30px;
        display: flex;
        justify-content: center;
      }

      .phone-icon {
        width: 60px;
        height: 60px;
        border: 3px solid #756860;
        border-radius: 10px;
        position: relative;
        animation: rotate 2s infinite ease-in-out;
      }

      .screen {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        background: #756860;
        border-radius: 5px;
      }

      .orientation-title {
        font-size: 24px;
        margin: 0 0 20px 0;
        font-weight: 500;
        color: #756860;
      }

      .orientation-message {
        font-size: 16px;
        line-height: 1.5;
        margin: 0;
        color: #756860;
        font-family: 'modeco', sans-serif;
      }

      @keyframes rotate {
        0%,
        100% {
          transform: rotate(0deg);
        }
        50% {
          transform: rotate(90deg);
        }
      }

      /* Animación de entrada/salida */
      .orientation-overlay {
        animation: fadeIn 0.3s ease-in-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `,
  ],
  animations: [
    // Aquí podrías agregar animaciones si usas @angular/animations
  ],
})
export class OrientationGuardComponent implements OnInit, OnDestroy {
  isLandscape = false;
  isMobile = false;

  constructor(private orientationService: OrientationService) {}

  ngOnInit() {
    this.checkOrientation();
  }

  ngOnDestroy() {
    // Cleanup si es necesario
  }

  @HostListener('window:orientationchange')
  onOrientationChange() {
    this.checkOrientation();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkOrientation();
  }

  private checkOrientation() {
    this.isLandscape = this.orientationService.isLandscape();
    this.isMobile = this.orientationService.isMobileDevice();
  }

  // Getter para mostrar el overlay solo en móviles en landscape
  get shouldShowOverlay(): boolean {
    return this.isMobile && this.isLandscape;
  }
}
