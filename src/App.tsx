import { useEffect } from 'react';
import Phaser from 'phaser';
import MainScene from './game/MainScene';

export default function App() {

  useEffect(() => {
    let game: Phaser.Game | null = null;
    const debugEl = document.getElementById('app-debug');

    const init = async () => {
      const isNarrow = window.innerWidth / window.innerHeight < 0.5 || window.innerWidth < 500;
      const gameWidth = isNarrow ? 400 : 540;
      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: 'phaser-container',
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: gameWidth,
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

    init().catch(err => {
      if (debugEl) {
        debugEl.textContent = 'Init error: ' + (err?.message || String(err));
        debugEl.style.display = 'block';
      }
    });

    if (debugEl) debugEl.style.display = 'none';

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
      className="w-screen h-screen touch-none select-none overflow-hidden flex items-center justify-center relative z-10"
    >
      <div id="phaser-container" className="w-full h-full" />
      <div id="app-debug" style={{display:'none',position:'fixed',bottom:0,left:0,right:0,zIndex:9999,background:'red',color:'white',fontSize:'14px',padding:'8px',fontFamily:'monospace',whiteSpace:'pre-wrap',wordBreak:'break-all'}} />
    </div>
  );
}
