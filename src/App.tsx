import { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from './game/MainScene';

export default function App() {

  useEffect(() => {
    let game: Phaser.Game | null = null;

    const init = async () => {
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: 'phaser-container',
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 400,
          height: 800
        },
        physics: {
          default: 'arcade',
          arcade: {
            debug: false,
            gravity: { y: 1500, x: 0 }
          }
        },
        scene: MainScene,
        backgroundColor: '#0a0a0f'
      };

      try {
        if (typeof (window as any).CrazyGames !== 'undefined') {
          await Promise.race([
            (window as any).CrazyGames.SDK.init(),
            new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
          ]);
        }
      } catch (e) {
        // SDK not available, init failed, or timeout
      }

      const parentContainer = document.getElementById('phaser-container');
      if (parentContainer) {
        parentContainer.innerHTML = '';
      }

      game = new Phaser.Game(config);
    };

    init();

    return () => {
      if (game) {
        game.destroy(true);
      }
      const parentContainer = document.getElementById('phaser-container');
      if (parentContainer) {
        parentContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div
      className="w-screen h-dvh bg-[#0a0a0f] touch-none select-none overflow-hidden flex items-center justify-center"
    >
      <div id="phaser-container" className="w-full h-full" />
    </div>
  );
}
