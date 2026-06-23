import Phaser from 'phaser';
import { Colors, Dose } from './Colors';
import * as Audio from './audio';

interface ShopItem {
  id: string;
  name: string;
  color: number;
  price: number;
  sellPrice: number;
  isBase: boolean;
}

interface SkinData {
  id: string;
  name: string;
  desc: string;
  drawBody: (g: Phaser.GameObjects.Graphics, c: number, a: number) => void;
  drawFace: (g: Phaser.GameObjects.Graphics) => void;
}

const SKINS: SkinData[] = [
  { id: 'classic', name: 'Classic Bottle', desc: 'Standard chemistry flask',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-18,-45); g.lineTo(18,-45); g.lineTo(18,-15); g.lineTo(40,25); g.arc(0,25,40,0,Math.PI,false); g.lineTo(-18,-15); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(6,0x2f3542,1); g.beginPath(); g.moveTo(-18,-45); g.lineTo(18,-45); g.lineTo(18,-15); g.lineTo(40,25); g.arc(0,25,40,0,Math.PI,false); g.lineTo(-18,-15); g.closePath(); g.strokePath(); g.fillStyle(0x2f3542,1); g.fillCircle(-10,15,5); g.fillCircle(10,15,5); g.fillStyle(0xffffff,1); g.fillCircle(-11,13,2); g.fillCircle(9,13,2); g.fillStyle(0xff88aa,1); g.fillCircle(-18,20,5); g.fillCircle(18,20,5); g.lineStyle(3,0x2f3542,1); g.beginPath(); g.arc(0,18,5,0,Math.PI,false); g.strokePath(); }
  },
  { id: 'round', name: 'Ballon', desc: 'Round-bottom flask',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-10,-50); g.lineTo(10,-50); g.lineTo(10,-20); g.arc(0,2,30,0,Math.PI*2,false); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(6,0x2f3542,1); g.beginPath(); g.moveTo(-10,-50); g.lineTo(10,-50); g.lineTo(10,-20); g.arc(0,2,30,0,Math.PI*2,false); g.closePath(); g.strokePath(); g.fillStyle(0x2f3542,1); g.fillCircle(-8,0,4); g.fillCircle(8,0,4); g.fillStyle(0xffffff,1); g.fillCircle(-9,-2,2); g.fillCircle(7,-2,2); g.lineStyle(3,0x2f3542,1); g.beginPath(); g.arc(0,6,4,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'tube', name: 'Éprouvette', desc: 'Tall test tube',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-12,-55); g.lineTo(12,-55); g.lineTo(12,5); g.arc(0,5,12,0,Math.PI,false); g.lineTo(-12,-55); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(6,0x2f3542,1); g.beginPath(); g.moveTo(-12,-55); g.lineTo(12,-55); g.lineTo(12,5); g.arc(0,5,12,0,Math.PI,false); g.lineTo(-12,-55); g.closePath(); g.strokePath(); g.fillStyle(0x2f3542,1); g.fillCircle(-5,-10,3); g.fillCircle(5,-10,3); g.fillStyle(0xffffff,1); g.fillCircle(-6,-12,1.5); g.fillCircle(4,-12,1.5); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,-4,3,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'beaker', name: 'Bécher', desc: 'Wide glass beaker',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.fillRoundedRect(-28,-35,56,70,4); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.strokeRoundedRect(-28,-35,56,70,4); g.lineStyle(3,0x2f3542,1); g.lineBetween(-28,-35,-20,-45); g.lineBetween(28,-35,20,-45); g.fillStyle(0x2f3542,1); g.fillCircle(-8,5,4); g.fillCircle(8,5,4); g.fillStyle(0xffffff,1); g.fillCircle(-9,3,2); g.fillCircle(7,3,2); g.lineStyle(3,0x2f3542,1); g.beginPath(); g.arc(0,10,5,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'pear', name: 'Fiole Jaugée', desc: 'Pear-shaped flask',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-8,-55); g.lineTo(8,-55); g.lineTo(8,-25); g.lineTo(28,-5); g.arc(0,15,28,0,Math.PI,false); g.lineTo(-8,-25); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(-8,-55); g.lineTo(8,-55); g.lineTo(8,-25); g.lineTo(28,-5); g.arc(0,15,28,0,Math.PI,false); g.lineTo(-8,-25); g.closePath(); g.strokePath(); g.fillStyle(0x2f3542,1); g.fillCircle(-7,8,3.5); g.fillCircle(7,8,3.5); g.fillStyle(0xffffff,1); g.fillCircle(-8,6,1.5); g.fillCircle(6,6,1.5); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,13,3,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'pot', name: 'Bocal', desc: 'Mason jar',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-22,-50); g.lineTo(22,-50); g.lineTo(22,-35); g.lineTo(24,-35); g.lineTo(24,30); g.lineTo(-24,30); g.lineTo(-24,-35); g.lineTo(-22,-35); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.strokeRect(-24,28,48,4); g.beginPath(); g.moveTo(-22,-50); g.lineTo(22,-50); g.lineTo(22,-35); g.lineTo(24,-35); g.lineTo(24,32); g.lineTo(-24,32); g.lineTo(-24,-35); g.lineTo(-22,-35); g.closePath(); g.strokePath(); g.fillStyle(0x2f3542,1); g.fillCircle(-7,0,4); g.fillCircle(7,0,4); g.fillStyle(0xffffff,1); g.fillCircle(-8,-2,2); g.fillCircle(6,-2,2); g.lineStyle(3,0x2f3542,1); g.beginPath(); g.arc(0,8,5,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'crystal', name: 'Cristal', desc: 'Faceted perfume bottle',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(0,-55); g.lineTo(10,-55); g.lineTo(10,-40); g.lineTo(30,-15); g.lineTo(28,25); g.lineTo(0,35); g.lineTo(-28,25); g.lineTo(-30,-15); g.lineTo(-10,-40); g.lineTo(-10,-55); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(0,-55); g.lineTo(10,-55); g.lineTo(10,-40); g.lineTo(30,-15); g.lineTo(28,25); g.lineTo(0,35); g.lineTo(-28,25); g.lineTo(-30,-15); g.lineTo(-10,-40); g.lineTo(-10,-55); g.closePath(); g.strokePath(); g.lineStyle(2,0xffffff,0.2); g.lineBetween(0,-55,0,35); g.lineBetween(-15,0,15,0); g.fillStyle(0x2f3542,1); g.fillCircle(-8,-5,3); g.fillCircle(8,-5,3); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,3,3,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'ampoule', name: 'Ampoule', desc: 'Vintage light bulb',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-8,-55); g.lineTo(8,-55); g.lineTo(8,-40); g.arc(0,10,25,0.3,Math.PI-0.3,false); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(-8,-55); g.lineTo(8,-55); g.lineTo(8,-40); g.arc(0,10,25,0.3,Math.PI-0.3,false); g.closePath(); g.strokePath(); g.lineStyle(2,0xffffff,0.2); g.lineBetween(-4,-55,-4,-40); g.lineBetween(4,-55,4,-40); g.lineBetween(-6,-48,-2,-48); g.lineBetween(2,-48,6,-48); g.fillStyle(0x2f3542,1); g.fillCircle(-6,0,3); g.fillCircle(6,0,3); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,5,3,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'wine', name: 'Bouteille Vin', desc: 'Elegant wine bottle',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-8,-58); g.lineTo(8,-58); g.lineTo(8,-30); g.lineTo(22,-30); g.lineTo(22,20); g.arc(0,20,22,0,Math.PI,false); g.lineTo(-22,-30); g.lineTo(-8,-30); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(-8,-58); g.lineTo(8,-58); g.lineTo(8,-30); g.lineTo(22,-30); g.lineTo(22,20); g.arc(0,20,22,0,Math.PI,false); g.lineTo(-22,-30); g.lineTo(-8,-30); g.closePath(); g.strokePath(); g.fillStyle(0x2f3542,1); g.fillCircle(-6,2,3); g.fillCircle(6,2,3); g.fillStyle(0xffffff,1); g.fillCircle(-7,0,1.5); g.fillCircle(5,0,1.5); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,7,3,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'jar', name: 'Amphore', desc: 'Ancient potion jar',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-14,-40); g.lineTo(14,-40); g.lineTo(18,-25); g.lineTo(28,5); g.arc(0,20,28,0.2,Math.PI-0.2,false); g.lineTo(-18,-25); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(-14,-40); g.lineTo(14,-40); g.lineTo(18,-25); g.lineTo(28,5); g.arc(0,20,28,0.2,Math.PI-0.2,false); g.lineTo(-18,-25); g.closePath(); g.strokePath(); g.fillStyle(0xd35400,0.4); g.fillCircle(-20,10,5); g.fillCircle(20,10,5); g.fillStyle(0x2f3542,1); g.fillCircle(-8,10,3); g.fillCircle(8,10,3); g.fillStyle(0xffffff,1); g.fillCircle(-9,8,1.5); g.fillCircle(7,8,1.5); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,15,3,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'erlenmeyer', name: 'Erlenmeyer', desc: 'Conical science flask',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-6,-55); g.lineTo(6,-55); g.lineTo(6,-25); g.lineTo(30,30); g.lineTo(30,35); g.lineTo(-30,35); g.lineTo(-30,30); g.lineTo(-6,-25); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(-6,-55); g.lineTo(6,-55); g.lineTo(6,-25); g.lineTo(30,30); g.lineTo(30,35); g.lineTo(-30,35); g.lineTo(-30,30); g.lineTo(-6,-25); g.closePath(); g.strokePath(); g.fillStyle(0x2f3542,1); g.fillCircle(-8,10,3.5); g.fillCircle(8,10,3.5); g.fillStyle(0xffffff,1); g.fillCircle(-9,8,1.5); g.fillCircle(7,8,1.5); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,15,3,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'teardrop', name: 'Larme', desc: 'Elegant teardrop vial',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-6,-60); g.lineTo(6,-60); g.lineTo(6,-40); g.arc(0,5,24,0.35,Math.PI-0.35,false); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(-6,-60); g.lineTo(6,-60); g.lineTo(6,-40); g.arc(0,5,24,0.35,Math.PI-0.35,false); g.closePath(); g.strokePath(); g.fillStyle(0x2f3542,1); g.fillCircle(-5,0,3); g.fillCircle(5,0,3); g.fillStyle(0xffffff,1); g.fillCircle(-6,-2,1.5); g.fillCircle(4,-2,1.5); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,5,2.5,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'diamond', name: 'Diamant', desc: 'Faceted diamond bottle',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(0,-60); g.lineTo(8,-60); g.lineTo(8,-45); g.lineTo(25,-15); g.lineTo(32,5); g.lineTo(30,20); g.lineTo(0,35); g.lineTo(-30,20); g.lineTo(-32,5); g.lineTo(-25,-15); g.lineTo(-8,-45); g.lineTo(-8,-60); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(0,-60); g.lineTo(8,-60); g.lineTo(8,-45); g.lineTo(25,-15); g.lineTo(32,5); g.lineTo(30,20); g.lineTo(0,35); g.lineTo(-30,20); g.lineTo(-32,5); g.lineTo(-25,-15); g.lineTo(-8,-45); g.lineTo(-8,-60); g.closePath(); g.strokePath(); g.lineStyle(1.5,0xffffff,0.15); g.lineBetween(0,-60,0,35); g.lineBetween(-20,-5,20,-5); g.lineBetween(-12,15,12,15); g.fillStyle(0x2f3542,1); g.fillCircle(-6,-8,2.5); g.fillCircle(6,-8,2.5); g.fillStyle(0xffffff,1); g.fillCircle(-7,-10,1.2); g.fillCircle(5,-10,1.2); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,-3,2.5,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'skull', name: 'Calice', desc: 'Mysterious gothic chalice',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-10,-55); g.lineTo(10,-55); g.lineTo(14,-50); g.arc(0,15,30,0.4,Math.PI-0.4,false); g.lineTo(-14,-50); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(-10,-55); g.lineTo(10,-55); g.lineTo(14,-50); g.arc(0,15,30,0.4,Math.PI-0.4,false); g.lineTo(-14,-50); g.closePath(); g.strokePath(); g.fillStyle(0x2f3542,1); g.fillCircle(-9,8,4); g.fillCircle(9,8,4); g.fillStyle(0xffffff,1); g.fillCircle(-10,6,2); g.fillCircle(8,6,2); g.fillStyle(0x2f3542,1); g.fillTriangle(-4,16,4,16,0,20); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,5,3,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
  { id: 'kettle', name: 'Bouilloire', desc: 'Round-bottom boiling flask',
    drawBody: (g, c, a) => { g.fillStyle(c, a); g.beginPath(); g.moveTo(-6,-60); g.lineTo(6,-60); g.lineTo(8,-45); g.arc(0,-10,32,0.25,Math.PI-0.25,false); g.lineTo(-8,-45); g.closePath(); g.fillPath(); },
    drawFace: (g) => { g.lineStyle(5,0x2f3542,1); g.beginPath(); g.moveTo(-6,-60); g.lineTo(6,-60); g.lineTo(8,-45); g.arc(0,-10,32,0.25,Math.PI-0.25,false); g.lineTo(-8,-45); g.closePath(); g.strokePath(); g.lineStyle(2,0xffffff,0.15); g.lineBetween(-10,-35,-8,-25); g.lineBetween(10,-35,8,-25); g.fillStyle(0x2f3542,1); g.fillCircle(-7,-12,3); g.fillCircle(7,-12,3); g.fillStyle(0xffffff,1); g.fillCircle(-8,-14,1.5); g.fillCircle(6,-14,1.5); g.lineStyle(2,0x2f3542,1); g.beginPath(); g.arc(0,-7,2.5,0.1,Math.PI-0.1,false); g.strokePath(); }
  },
];

const SHOP_ITEMS: ShopItem[] = [
  { id: 'r', name: 'RED', color: Colors.RYB.R, price: 0, sellPrice: 0, isBase: true },
  { id: 'b', name: 'BLUE', color: Colors.RYB.B, price: 0, sellPrice: 0, isBase: true },
  { id: 'y', name: 'YELLOW', color: Colors.RYB.Y, price: 0, sellPrice: 0, isBase: true },
  { id: 'orange', name: 'ORANGE', color: 0xff8800, price: 160, sellPrice: 80, isBase: false },
  { id: 'green', name: 'GREEN', color: 0x22cc44, price: 160, sellPrice: 80, isBase: false },
  { id: 'purple', name: 'PURPLE', color: 0x9933cc, price: 160, sellPrice: 80, isBase: false },
  { id: 'brown', name: 'BROWN', color: 0x664422, price: 240, sellPrice: 120, isBase: false },
  { id: 'cyan', name: 'CYAN', color: 0x00f3ff, price: 300, sellPrice: 150, isBase: false },
  { id: 'magenta', name: 'MAGENTA', color: 0xff00b7, price: 300, sellPrice: 150, isBase: false },
  { id: 'white', name: 'WHITE', color: 0xffffff, price: 400, sellPrice: 200, isBase: false }
];

export default class MainScene extends Phaser.Scene {
  private flasksGroup!: Phaser.Physics.Arcade.Group;
  private dropsGroup!: Phaser.Physics.Arcade.Group;
  
  private targetSignText!: Phaser.GameObjects.Text;
  private targetUIFlaskLiq!: Phaser.GameObjects.Graphics;
  private targetUIOutline!: Phaser.GameObjects.Graphics;
  private targetFlaskCont!: Phaser.GameObjects.Container;
  private targetLabelText!: Phaser.GameObjects.Text;
  private targetRecipeText!: Phaser.GameObjects.Text;
  private targetMonitorBg!: Phaser.GameObjects.Graphics;
  private targetCoinsText!: Phaser.GameObjects.Text;
  
  private scoreText!: Phaser.GameObjects.Text; // Displays HUD coins only!
  private timerText!: Phaser.GameObjects.Text;
  private beltGraphics!: Phaser.GameObjects.Graphics;
  private beltScrollX: number = 0;
  
  private scannerGroup!: Phaser.GameObjects.Container;
  private scannerLight!: Phaser.GameObjects.Shape;
  
  private currentFlask: Phaser.GameObjects.Container | null = null;
  private score = 0;
  private level = 1;
  private streak = 0;
  private timeLeft = 30;
  private coins = 200; // Starting budget for buying colors
  private pendingRewardCoins = 50;
  private activePanelElements: Phaser.GameObjects.GameObject[] = [];
  private isValidating = false;

  // Level queue, difficulty and dopamine states
  private undosRemaining = 3;
  private totalFlasksInLevel = 1;
  private completedFlasksInLevel = 0;
  private isLevelSuccessPopupOpen = false;
  private levelCoinsEarnedInSession = 0;
  private currentChallengeModifier: string | null = null;
  private challengeModifiers = [
    { id: 'speed', name: '⚡ SPEED', desc: 'Fast completion = 2x coins!', color: '#ffeb3b', rewardMult: 2, timeMult: 0.7, speedMult: 1.5 },
    { id: 'precision', name: '🎯 PRECISION', desc: 'Must be >95% match!', color: '#ff6b81', rewardMult: 1.5, timeMult: 1.2, speedMult: 1 },
    { id: 'bonus', name: '💰 BONUS', desc: '2x coins!', color: '#ffd700', rewardMult: 2, timeMult: 1, speedMult: 1 },
  ];
  private levelTimerBase = 0;
  private challengeModifierText: Phaser.GameObjects.Text | null = null;
  private activeConfettiGroup!: Phaser.GameObjects.Group;
  private undoIndicatorText!: Phaser.GameObjects.Text;
  private victoryPopupContainer: Phaser.GameObjects.Container | null = null;
  
  // Stacking & Coin burst states
  private completedCount = 0;
  private stackedBoxes: Phaser.GameObjects.Container[] = [];
  private coinsGroup!: Phaser.Physics.Arcade.Group;
  
  // Faucet & Color Market States
  private skinPage = 0;
  private themePage = 0;
  private isShopOpen = false;
  private isHintOpen = false;
  private isTutorialOpen = false;
  private activeShopTapIndex = 0;
  private shopLayer: Phaser.GameObjects.Container | null = null;
  private hintLayer: Phaser.GameObjects.Container | null = null;
  private isAdRunning = false;
  private wasRevivedThisLevel = false;
  private static levelResults: { won: boolean; timeLeftPct: number }[] = [];
  private static consecutiveWins = 0;
  private static consecutiveLosses = 0;
  private currentTargetColor = 0xffffff;
  private ownedColors: { [key: string]: boolean } = {
    r: true,
    b: true,
    y: true,
    orange: false,
    green: false,
    purple: false,
    brown: false,
    cyan: false,
    magenta: false,
    white: false
  };
  private tapColors = ['r', 'b', 'y'];
  private taps: Phaser.GameObjects.Container[] = [];
  private tapHandles: Phaser.GameObjects.Graphics[] = [];
  private tapIndicators: Phaser.GameObjects.Arc[] = [];
  private tapData: Array<{ color: number, type: string, x: number, cont: Phaser.GameObjects.Container, handle: Phaser.GameObjects.Graphics, spout: Phaser.GameObjects.Graphics }> = [];
  private xRatio = 1;
  
  private tapXList = [80, 200, 320];
  private tapColorsOriginal = [Colors.RYB.R, Colors.RYB.B, Colors.RYB.Y];
  private beltY = 380;
  private maxCapacity = 5;

  // Custom Faucet Elevation & Upgrades (Dopamine & Customization)
  private pipeY = 145; // Elevated to hover beautifully higher above the flasks!
  private currentFlaskSkin = 'classic';
  private currentTheme = 'classic';
  private ownedSkins: { [key: string]: boolean } = { classic: true, round: false, tube: false, beaker: false, pear: false, pot: false, crystal: false, ampoule: false, wine: false, jar: false, erlenmeyer: false, teardrop: false, diamond: false, skull: false, kettle: false };
  private ownedThemes: { [key: string]: boolean } = { classic: true, neon: false, toxic: false, treasury: false, candy: false, ocean: false, sunset: false, forest: false, space: false, lavender: false, volcano: false, arctic: false, pixel: false, japan: false, egypt: false, cyberpunk: false };
  private mixedColorsCounts: { [key: string]: number } = { r: 1, b: 1, y: 1, orange: 0, green: 0, purple: 0, brown: 0, cyan: 0, magenta: 0, white: 0 };
  private activeShopTab = 'colors';
  private backgroundGraphics: Phaser.GameObjects.Graphics | null = null;

  // Limited droplet stocks and beautiful cosmetic droplet skin upgrades
  private health = 100;
  private dropletStocks: { [key: string]: number } = { r: 3, b: 3, y: 3 };
  private ownedDropSkins: { [key: string]: boolean } = {
     classic_r: true, ruby_r: false, magma_r: false,
     classic_b: true, sapphire_b: false, plasma_b: false,
     classic_y: true, topaz_y: false, solar_y: false
  };
  private activeDropSkins: { [key: string]: string } = {
     r: 'classic_r',
     b: 'classic_b',
     y: 'classic_y'
  };
  private healthBarBg!: Phaser.GameObjects.Rectangle;
  private healthBarFill!: Phaser.GameObjects.Rectangle;
  private healthBarText!: Phaser.GameObjects.Text;
  private headerLevelText!: Phaser.GameObjects.Text;

  constructor() {
    super('MainScene');
  }

  saveGameState() {
     try {
         const state = {
             level: this.level,
             coins: this.coins,
             ownedColors: this.ownedColors,
             currentFlaskSkin: this.currentFlaskSkin,
             currentTheme: this.currentTheme,
             ownedSkins: this.ownedSkins,
             ownedThemes: this.ownedThemes,
             mixedColorsCounts: this.mixedColorsCounts,
             dropletStocks: this.dropletStocks,
             ownedDropSkins: this.ownedDropSkins,
             activeDropSkins: this.activeDropSkins
         };
         localStorage.setItem('chemical_blend_game_save', JSON.stringify(state));
     } catch (e) {
         console.warn("Could not save to localStorage", e);
     }
  }

  loadGameState() {
     try {
         const raw = localStorage.getItem('chemical_blend_game_save');
         if (raw) {
             const state = JSON.parse(raw);
             if (state.level !== undefined) this.level = state.level;
             if (state.coins !== undefined) this.coins = state.coins;
             if (state.ownedColors !== undefined) this.ownedColors = { ...this.ownedColors, ...state.ownedColors };
             if (state.currentFlaskSkin !== undefined) this.currentFlaskSkin = state.currentFlaskSkin;
             if (state.currentTheme !== undefined) this.currentTheme = state.currentTheme;
             if (state.ownedSkins !== undefined) this.ownedSkins = { ...this.ownedSkins, ...state.ownedSkins };
             if (state.ownedThemes !== undefined) this.ownedThemes = { ...this.ownedThemes, ...state.ownedThemes };
             if (state.mixedColorsCounts !== undefined) this.mixedColorsCounts = { ...this.mixedColorsCounts, ...state.mixedColorsCounts };
             if (state.dropletStocks !== undefined) this.dropletStocks = { ...this.dropletStocks, ...state.dropletStocks };
             if (state.ownedDropSkins !== undefined) this.ownedDropSkins = { ...this.ownedDropSkins, ...state.ownedDropSkins };
             if (state.activeDropSkins !== undefined) this.activeDropSkins = { ...this.activeDropSkins, ...state.activeDropSkins };
         }
     } catch (e) {
         console.warn("Could not load from localStorage", e);
     }
  }

  checkDailyReward() {
    const now = new Date();
    const todayStr = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
    const lastClaim = localStorage.getItem('daily_reward_last_claim');
    if (lastClaim !== todayStr) {
      const streakRaw = localStorage.getItem('daily_reward_streak');
      let streak = streakRaw ? parseInt(streakRaw) : 0;
      if (!lastClaim) {
        streak = 0;
      } else {
        const yesterday = new Date(now);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = `${yesterday.getFullYear()}-${yesterday.getMonth()}-${yesterday.getDate()}`;
        if (lastClaim !== yesterdayStr) streak = 0;
      }
      streak++;
      localStorage.setItem('daily_reward_streak', streak.toString());
      localStorage.setItem('daily_reward_last_claim', todayStr);
      const coinsAmount = 50 + streak * 25;
      this.time.delayedCall(600, () => this.showDailyRewardPopup(coinsAmount, streak));
    }
  }

  showDailyRewardPopup(coinsAmount: number, streak: number) {
    this.isShopOpen = true;
    const w = this.scale.width;
    const h = this.scale.height;
    this.coins += coinsAmount;
    this.saveGameState();

    const cont = this.add.container(w/2, h/2).setDepth(1500).setScale(0.5).setAlpha(0);
    const bg = this.add.rectangle(0, 0, w - 40, 300, 0x0e0f1d, 0.95).setStrokeStyle(3, 0xffd700);
    const title = this.add.text(0, -100, '🎁 DAILY REWARD! 🎁', { fontSize: '26px', color: '#ffd700', fontStyle: 'bold', stroke: '#000', strokeThickness: 4 }).setOrigin(0.5);
    const streakTxt = this.add.text(0, -50, `🔥 ${streak} day streak!`, { fontSize: '16px', color: '#ff6b81', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
    const coinIcon = this.add.text(0, -10, '🪙', { fontSize: '42px' }).setOrigin(0.5);
    const amountTxt = this.add.text(0, 40, `+${coinsAmount} COINS`, { fontSize: '22px', color: '#ffd700', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
    const claimBtn = this.add.rectangle(0, 95, 160, 40, 0x10ac84).setStrokeStyle(2, 0x0d7a5e);
    const claimTxt = this.add.text(0, 95, 'CLAIM ✅', { fontSize: '16px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
    const claimHit = this.add.rectangle(0, 95, 160, 40).setInteractive({ useHandCursor: true });
    claimHit.on('pointerdown', () => {
      Audio.initAudio();
      Audio.playClick();
      Audio.playCashRegister();
      Audio.haptic(20);
      this.isShopOpen = false;
      this.spawnCoinRain(15);
      this.flashScreen(0xffd700, 200);
      this.tweens.add({ targets: cont, scale: 0.5, alpha: 0, duration: 250, onComplete: () => cont.destroy() });
      this.updateScoreHUD();
    });

    cont.add([bg, title, streakTxt, coinIcon, amountTxt, claimBtn, claimTxt, claimHit]);
    this.tweens.add({ targets: cont, scale: 1, alpha: 1, duration: 400, ease: 'Back.easeOut' });
    this.tweens.add({ targets: coinIcon, y: -20, duration: 800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.spawnSparkleBurst(w/2, h/2, 16, 0xffd700);
    Audio.initAudio();
    Audio.playCelebration();
  }

  achievements: { [key: string]: boolean } = {};
  achievementDefs = [
    { id: 'first_level', name: 'First Steps', desc: 'Complete level 1', icon: '👶' },
    { id: 'level_10', name: 'Alchemist', desc: 'Complete level 10', icon: '🧙' },
    { id: 'perfect_10', name: 'Perfect Mixer', desc: '10 perfect matches', icon: '🎯' },
    { id: 'spent_5000', name: 'Big Spender', desc: 'Spend 5000 coins', icon: '💰' },
    { id: 'skins_5', name: 'Collector', desc: 'Own 5 flask skins', icon: '🔮' },
    { id: 'themes_5', name: 'Interior Designer', desc: 'Own 5 themes', icon: '🎨' },
    { id: 'coins_10000', name: 'Broke the Bank', desc: 'Earn 10000 coins', icon: '🏦' },
    { id: 'undos_50', name: 'Undo King', desc: 'Use 50 undos', icon: '↩️' },
    { id: 'flasks_100', name: 'Dedicated', desc: 'Play 100 flasks', icon: '⚗️' },
    { id: 'streak_7', name: 'Loyal Player', desc: '7-day login streak', icon: '🔥' },
  ];
  achievementStats = { perfectMatches: 0, totalSpent: 0, totalUndosUsed: 0, totalFlasksPlayed: 0 };
  totalSpentAcrossSessions = 0;

  loadAchievements() {
    try {
      const raw = localStorage.getItem('achievements_data');
      if (raw) {
        const data = JSON.parse(raw);
        if (data.achievements) this.achievements = data.achievements;
        if (data.stats) this.achievementStats = { ...this.achievementStats, ...data.stats };
        if (data.totalSpent) this.totalSpentAcrossSessions = data.totalSpent;
      }
    } catch (e) {}
  }

  saveAchievements() {
    try {
      localStorage.setItem('achievements_data', JSON.stringify({
        achievements: this.achievements,
        stats: this.achievementStats,
        totalSpent: this.totalSpentAcrossSessions
      }));
    } catch (e) {}
  }

  checkAchievements() {
    const unlocked: Array<{ id: string; name: string; icon: string }> = [];
    this.achievementDefs.forEach(def => {
      if (this.achievements[def.id]) return;
      let earned = false;
      switch (def.id) {
        case 'first_level': earned = this.level > 1; break;
        case 'level_10': earned = this.level >= 10; break;
        case 'perfect_10': earned = this.achievementStats.perfectMatches >= 10; break;
        case 'spent_5000': earned = this.totalSpentAcrossSessions >= 5000; break;
        case 'skins_5': earned = Object.values(this.ownedSkins).filter(v => v).length >= 5; break;
        case 'themes_5': earned = Object.values(this.ownedThemes).filter(v => v).length >= 5; break;
        case 'coins_10000': earned = this.coins >= 10000; break;
        case 'undos_50': earned = this.achievementStats.totalUndosUsed >= 50; break;
        case 'flasks_100': earned = this.achievementStats.totalFlasksPlayed >= 100; break;
        case 'streak_7': earned = parseInt(localStorage.getItem('daily_reward_streak') || '0') >= 7; break;
      }
      if (earned) {
        this.achievements[def.id] = true;
        unlocked.push({ id: def.id, name: def.name, icon: def.icon });
      }
    });
    if (unlocked.length > 0) {
      this.saveAchievements();
      this.time.delayedCall(300, () => this.showAchievementPopup(unlocked));
    }
  }

  showAchievementPopup(unlocked: Array<{ id: string; name: string; icon: string }>) {
    const w = this.scale.width;
    const h = this.scale.height;
    unlocked.forEach((ach, idx) => {
      this.time.delayedCall(idx * 800, () => {
        const cont = this.add.container(w/2, h/2).setDepth(1600).setScale(0.3).setAlpha(0);
        const bg = this.add.rectangle(0, 0, 260, 90, 0x1a1a2e, 0.95).setStrokeStyle(3, 0xffd700);
        const glow = this.add.rectangle(0, 0, 264, 94, 0xffd700, 0.15);
        const icon = this.add.text(0, -20, ach.icon, { fontSize: '32px' }).setOrigin(0.5);
        const nameTxt = this.add.text(0, 14, ach.name, { fontSize: '18px', color: '#ffd700', fontStyle: 'bold' }).setOrigin(0.5);
        const descTxt = this.add.text(0, 32, ach.desc, { fontSize: '10px', color: '#ced6e0', fontFamily: 'monospace' }).setOrigin(0.5);
        cont.add([bg, glow, icon, nameTxt, descTxt]);
        this.tweens.add({ targets: cont, scale: 1, alpha: 1, duration: 500, ease: 'Back.easeOut' });
        this.tweens.add({ targets: glow, scaleX: 1.05, scaleY: 1.05, alpha: 0, duration: 600, yoyo: true, repeat: -1 });
        this.tweens.add({ targets: cont, delay: 2500, alpha: 0, scale: 0.5, duration: 400, onComplete: () => cont.destroy() });
        this.flashScreen(0xffd700, 200);
        Audio.initAudio();
        Audio.playSparkle();
        Audio.playCashRegister();
        this.spawnSparkleBurst(w/2, h/2, 20, 0xffd700);
      });
    });
  }

  init(data?: { level?: number; coins?: number }) {
    this.loadGameState();
    if (data) {
      if (data.level !== undefined) this.level = data.level;
      if (data.coins !== undefined) this.coins = data.coins;
    }
  }

  create() {
    this.score = 0;
    this.streak = 0;

    const w = this.scale.width;
    this.xRatio = w / 400;
    this.tapXList = [Math.round(80 * this.xRatio), Math.round(200 * this.xRatio), Math.round(320 * this.xRatio)];

    // Reset transient refs cleanly
    this.currentFlask = null;
    this.isShopOpen = false;
    this.isHintOpen = false;
    this.activeShopTapIndex = 0;
    this.shopLayer = null;
    this.hintLayer = null;
    this.isAdRunning = false;
    this.currentTargetColor = 0xffffff;
     this.victoryPopupContainer = null;
     this.isValidating = false;
     this.levelTimerBase = 0;
     this.currentChallengeModifier = null;
      this.isLevelSuccessPopupOpen = false;
      this.wasRevivedThisLevel = false;
      
      this.dropletStocks = { r: 3, b: 3, y: 3 };
    this.activePanelElements = [];
    this.completedCount = 0;
    this.stackedBoxes = [];
    this.undosRemaining = 3;
     this.completedFlasksInLevel = 0;
     this.levelCoinsEarnedInSession = 0;
    this.activeConfettiGroup = this.add.group();

    // Default faucet configurations
    this.tapColors = ['r', 'b', 'y'];
    this.ownedColors = {
      r: true,
      b: true,
      y: true,
      orange: false,
      green: false,
      purple: false,
      brown: false,
      cyan: false,
      magenta: false,
      white: false
    };

    this.loadGameState();
    this.dropletStocks = { r: 3, b: 3, y: 3 };
    this.loadAchievements();
    this.checkDailyReward();

    this.input.on('pointerdown', () => {
      Audio.initAudio();
    });

    this.input.keyboard!.on('keydown-F', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });

    // Determine total flasks for this level dynamically based on actual loaded/reset level
    if (this.level <= 1) {
        this.totalFlasksInLevel = 1;
    } else if (this.level <= 4) {
        this.totalFlasksInLevel = (Math.random() < 0.6) ? 1 : 2;
    } else {
        const dVal = Math.random();
        this.totalFlasksInLevel = (dVal < 0.25) ? 1 : (dVal < 0.75) ? 2 : 3;
    }

    this.cameras.main.setBackgroundColor('#a0e0ff');
    
    const h = this.scale.height;
    const beltH = 80;

    // Draw the active background theme
    this.drawBackgroundAndTheme();
    
    // Floor Base
    this.add.rectangle(0, this.beltY + beltH/2, w, h - this.beltY, 0xffa436).setOrigin(0,0).setDepth(0);
    
    // Target wooden blackboard chalkboard at top
    this.targetMonitorBg = this.add.graphics().setDepth(5);
    const targetLabelX = Math.round(140 * this.xRatio);
    this.targetLabelText = this.add.text(targetLabelX, 52, 'REQUIRED INGREDIENTS:', { fontSize: '10px', color: '#ffeaad', fontStyle: 'bold', fontFamily: 'monospace' }).setDepth(6);
    this.targetSignText = this.add.text(targetLabelX, 64, 'TARGET', { fontSize: '24px', color: '#fff', fontStyle: 'bold', fontFamily: 'sans-serif' }).setDepth(6).setOrigin(0, 0);
    this.targetRecipeText = this.add.text(targetLabelX, 96, 'RECIPE', { fontSize: '11px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'monospace' }).setDepth(6);
    this.targetCoinsText = this.add.text(w - 30 * this.xRatio, 50, '$+50', { fontSize: '14px', color: '#ffd700', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(1, 0).setDepth(6);
    
    const targetX = Math.round(80 * this.xRatio);
    const targetY = 82;
    const targetScale = 0.55;

    this.targetFlaskCont = this.add.container(targetX, targetY).setScale(targetScale).setDepth(6);
    this.targetUIFlaskLiq = this.add.graphics();
    this.drawFlaskGeometry(this.targetUIFlaskLiq, 0xffffff, 1);
    this.targetUIOutline = this.add.graphics();
    this.drawFlaskOutlineAndFace(this.targetFlaskCont, this.targetUIOutline);
    this.targetFlaskCont.add([this.targetUIFlaskLiq, this.targetUIOutline]);
    
    // Industrial Main Pipe
    const pipeY = this.pipeY;
    this.add.rectangle(w/2, pipeY, w, 32, 0xa4b0be).setStrokeStyle(4, 0x2f3542).setDepth(5);
    this.add.rectangle(w/2, pipeY - 6, w, 8, 0xffffff, 0.4).setBlendMode(Phaser.BlendModes.ADD).setDepth(6);

    // Call physical faucets drawing
    this.drawTaps(pipeY);

    // Scanner Crane (starts hidden above)
    this.scannerGroup = this.add.container(0, -200).setDepth(40);
    const arm = this.add.rectangle(0, -50, 20, 100, 0xa4b0be).setStrokeStyle(4, 0x2f3542);
    const head = this.add.rectangle(0, 20, 70, 70, 0x414856).setStrokeStyle(4, 0x2f3542);
    this.scannerLight = this.add.circle(0, 20, 15, 0x747d8c).setStrokeStyle(2, 0x111111);
    this.scannerGroup.add([arm, head, this.scannerLight]);

    // Convey Belt Shadow / Base
    this.add.rectangle(w/2, this.beltY + beltH/2 + 6, w, beltH, 0x414856).setDepth(12);
    this.add.rectangle(w/2, this.beltY + beltH/2, w, beltH, 0x57606f).setStrokeStyle(6, 0x2f3542).setDepth(12);
    
    // Dynamic Belt Pattern using safe graphics drawing
    this.beltGraphics = this.add.graphics().setDepth(13);
    this.beltScrollX = 0;
    this.drawBeltPattern();

    // Draw shipping pallet / delivery platform on the right side
    const pallet = this.add.graphics().setDepth(14);
    const rp = this.xRatio;
    // Darker wooden frame for pallet feet
    pallet.fillStyle(0x3d2314, 1);
    pallet.fillRect(Math.round(320 * rp), 336, Math.round(10 * rp), 8);
    pallet.fillRect(Math.round(350 * rp), 336, Math.round(10 * rp), 8);
    pallet.fillRect(Math.round(380 * rp), 336, Math.round(10 * rp), 8);
    // Lighter slats for top of pallet
    pallet.fillStyle(0xa0522d, 1);
    pallet.fillRect(Math.round(315 * rp), 332, Math.round(80 * rp), 5);
    pallet.lineStyle(1.5, 0x221105, 1);
    pallet.strokeRect(Math.round(315 * rp), 332, Math.round(80 * rp), 5);
    pallet.strokeRect(Math.round(320 * rp), 336, Math.round(10 * rp), 8);
    pallet.strokeRect(Math.round(350 * rp), 336, Math.round(10 * rp), 8);
    pallet.strokeRect(Math.round(380 * rp), 336, Math.round(10 * rp), 8);

    // Groups
    this.dropsGroup = this.physics.add.group();
    this.flasksGroup = this.physics.add.group();
    this.coinsGroup = this.physics.add.group();

    // UI Header
    this.add.rectangle(w/2, 12, w, 24, 0x111111, 0.5).setOrigin(0.5, 0.5).setDepth(100);
    this.scoreText = this.add.text(Math.round(10 * this.xRatio), 12, `💵 $ ${this.coins}`, { fontSize: '15px', color: '#2ecc71', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0, 0.5).setDepth(101);
    
    this.health = 100;
    
    // Dynamic Level display right in the center-left of header
    this.headerLevelText = this.add.text(w * 0.45, 12, `LVL ${this.level}`, { fontSize: '12px', color: '#38bdf8', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5).setDepth(101);

    // LEADERBOARD toggle button in header
    const lbBg = this.add.rectangle(w * 0.65, 12, 34, 26, 0x000000, 0.5).setDepth(100).setStrokeStyle(1.5, 0xffd700, 0.5);
    const lbBtn = this.add.text(w * 0.65, 12, '🏆', { fontSize: '18px' }).setOrigin(0.5).setDepth(101).setInteractive({ useHandCursor: true });
    lbBtn.on('pointerdown', () => {
        Audio.initAudio();
        this.showLeaderboardPopup();
    });
    
    // Real-time second countdown register
    this.timerText = this.add.text(w - 10, 12, `⏱️ ${this.timeLeft}s`, {
       fontSize: '14px',
       color: '#ffd700',
       fontStyle: 'bold',
       fontFamily: 'monospace'
    }).setOrigin(1, 0.5).setDepth(101);

    // Dynamic timer event decaying timeLeft every second
    this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
          if (!this.isValidating && this.timeLeft > 0 && !this.isLevelSuccessPopupOpen && this.currentFlask && !this.isShopOpen && !this.isAdRunning && !this.isHintOpen && !this.isTutorialOpen) {
             if (this.timeLeft > 0) {
                this.timeLeft--;
                this.timerText.setText(`⏱️ ${this.timeLeft}s`);
                this.updateHealthBar();

                if (this.timeLeft <= 10 && this.timeLeft > 0) {
                   this.timerText.setColor(this.timeLeft <= 5 ? '#ff4757' : '#ffa502');
                   if (this.timeLeft <= 5) {
                      this.tweens.add({
                         targets: this.timerText,
                         scale: 1.25,
                         duration: 100,
                         yoyo: true,
                         ease: 'Quad.easeOut'
                      });
                   }
                }

                if (this.timeLeft <= 5 && this.timeLeft > 0) {
                   Audio.playBuzzer();
                   this.cameras.main.flash(180, 255, 100, 100, false);
                }

                if (this.timeLeft <= 0) {
                   // Revert text so 0s is never shown
                   this.timerText.setText(`⏱️ 1s`);
                   this.gameOver();
                }
             } else {
                this.gameOver();
             }
         }
      }
    });

    this.createPanel();
    this.input.keyboard!.on('keydown', (event: KeyboardEvent) => {
      if (this.isShopOpen || this.isHintOpen || this.isAdRunning || this.isLevelSuccessPopupOpen || this.isValidating) return;
      if (event.key === '1' && this.tapData[0]) this.animateAndDispense(this.tapData[0]);
      else if (event.key === '2' && this.tapData[1]) this.animateAndDispense(this.tapData[1]);
      else if (event.key === '3' && this.tapData[2]) this.animateAndDispense(this.tapData[2]);
    });
    this.spawnNextFlask();

    if (!localStorage.getItem('tutorial_shown_v2')) {
       this.time.delayedCall(800, () => this.showTutorial());
    }
  }

  showTutorial() {
    this.isTutorialOpen = true;
    localStorage.setItem('tutorial_shown_v2', '1');
    const w = this.scale.width;
    const h = this.scale.height;
    const r = this.xRatio;
    let step = 0;
    const steps = [
      { title: '🎯 MATCH THE COLOR', desc: 'Mix red, blue & yellow drops to match the target color on the chalkboard above!', arrow: '↓ TARGET' },
      { title: '🔄 TAP TO DISPENSE', desc: 'Tap buttons 1, 2, or 3 (or press 1/2/3 keys) to drop colors into the flask.', arrow: '↓ TAP HERE' },
      { title: '⚗️ MIX & MATCH', desc: 'Each drop mixes inside the flask. Watch the % meter climb as you get closer!', arrow: '' },
      { title: '✅ PERFECT = AUTO-SCORE!', desc: '100% match? The scanner auto-validates! Get coins & a reward multiplier with ads.', arrow: '' },
    ];

    const tutorialCont = this.add.container(0, 0).setDepth(3000);

    const veil = this.add.rectangle(w/2, h/2, w * 2, h * 2, 0x000000, 0.75).setInteractive();
    veil.on('pointerdown', (p: any) => p.event.stopPropagation());
    tutorialCont.add(veil);

    const box = this.add.graphics();
    const boxW = Math.min(300, w - 60);
    const boxH = 240;
    box.fillStyle(0x1a1a2e, 0.98);
    box.fillRoundedRect(w/2 - boxW/2, h/2 - boxH/2, boxW, boxH, 16);
    box.lineStyle(3, 0x00f3ff, 1);
    box.strokeRoundedRect(w/2 - boxW/2, h/2 - boxH/2, boxW, boxH, 16);
    tutorialCont.add(box);

    const titleText = this.add.text(w/2, h/2 - 80, steps[0].title, {
      fontSize: '22px', color: '#00f3ff', fontStyle: 'bold', fontFamily: 'sans-serif',
      stroke: '#000', strokeThickness: 4
    }).setOrigin(0.5);
    tutorialCont.add(titleText);

    const descText = this.add.text(w/2, h/2 - 25, steps[0].desc, {
      fontSize: '13px', color: '#ffffff', fontFamily: 'sans-serif',
      wordWrap: { width: boxW - 40 }, align: 'center',
      stroke: '#000', strokeThickness: 2
    }).setOrigin(0.5);
    tutorialCont.add(descText);

    const pageText = this.add.text(w/2, h/2 + 35, '1 / ' + steps.length, {
      fontSize: '11px', color: '#a4b0be', fontFamily: 'monospace'
    }).setOrigin(0.5);
    tutorialCont.add(pageText);

    const nextBtnCont = this.add.container(w/2, h/2 + 75);
    const nextBtnBase = this.add.rectangle(0, 3, 160, 40, 0x0a5f8a).setStrokeStyle(2, 0x000);
    const nextBtnBody = this.add.rectangle(0, 0, 160, 40, 0x0b8fd6).setStrokeStyle(2, 0x000);
    const nextBtnText = this.add.text(0, 0, 'NEXT →', {
      fontSize: '15px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'sans-serif'
    }).setOrigin(0.5);
    nextBtnCont.add([nextBtnBase, nextBtnBody, nextBtnText]);

    const advanceStep = () => {
      step++;
      if (step >= steps.length) {
        this.isTutorialOpen = false;
        this.tweens.add({ targets: tutorialCont, alpha: 0, scale: 0.9, duration: 200, onComplete: () => tutorialCont.destroy() });
        return;
      }
      this.tweens.add({
        targets: [titleText, descText, pageText],
        alpha: 0, duration: 100,
        onComplete: () => {
          titleText.setText(steps[step].title);
          descText.setText(steps[step].desc);
          pageText.setText((step + 1) + ' / ' + steps.length);
          nextBtnText.setText(step === steps.length - 1 ? 'START! 🎮' : 'NEXT →');
          this.tweens.add({ targets: [titleText, descText, pageText], alpha: 1, duration: 200 });
        }
      });
    };

    const nextHit = this.add.rectangle(w/2, h/2 + 75, 160, 40).setInteractive({ useHandCursor: true });
    nextHit.on('pointerdown', () => { nextBtnBody.y = 3; nextBtnText.y = 2; advanceStep(); });
    nextHit.on('pointerup', () => { nextBtnBody.y = 0; nextBtnText.y = 0; });
    nextHit.on('pointerout', () => { nextBtnBody.y = 0; nextBtnText.y = 0; });

    tutorialCont.add([nextBtnCont, nextHit]);

    tutorialCont.setScale(0.9).setAlpha(0);
    this.tweens.add({ targets: tutorialCont, scale: 1, alpha: 1, duration: 350, ease: 'Back.easeOut' });
  }

  drawTaps(pipeY: number) {
    // Clear any existing tap objects
    this.taps.forEach(t => t.destroy());
    this.taps = [];
    this.tapData = [];
    this.tapIndicators.forEach(ti => ti.destroy());
    this.tapIndicators = [];
    this.tapHandles = [];

    const tapY = pipeY + 16; // Just below the pipe

    this.tapXList.forEach((tx, idx) => {
      // Faucet parent container
      const tapCont = this.add.container(tx, tapY).setDepth(22);

      // Get current faucet color configuration (R, B, Y)
      const colorId = this.tapColors[idx];
      const shopItem = SHOP_ITEMS.find(item => item.id === colorId);
      const colorVal = shopItem ? shopItem.color : 0xcccccc;
      const colorName = shopItem ? shopItem.name : 'Color';

      // DETERMINE METAL ACCENT (NO brass/yellow for red & blue taps!)
      // Red tap gets clean Silver, Blue tap gets clean Silver, Yellow tap gets Gold brass!
      const metalCol = (idx === 2) ? 0xd4af37 : 0xa4b0be; // Gold/Brass vs Chrome/Steel
      const metalColDark = (idx === 2) ? 0x9a7d0a : 0x57606f;
      const snoutRingCol = (idx === 2) ? 0xffca28 : 0xced6e0;
      const badgeBorderCol = (idx === 2) ? 0xd4af37 : 0x57606f;

      // 1. BACK PIPE ANCHOR (Steampunk heavy metal collar around main pipe)
      const anchor = this.add.graphics();
      anchor.fillStyle(0x1e272e, 1); // Dark metal base ring
      anchor.fillRoundedRect(-18, -12, 36, 16, 4);
      anchor.fillStyle(metalCol, 1); // Specific metal collar
      anchor.fillRect(-14, -10, 28, 12);
      anchor.lineStyle(2.5, 0x1e272e, 1);
      anchor.strokeRect(-14, -10, 28, 12);
      // Small horizontal ridge lines for grip/texture
      anchor.fillStyle(metalColDark, 1);
      anchor.fillRect(-10, -8, 20, 2);
      anchor.fillRect(-10, -2, 20, 2);
      tapCont.add(anchor);

      // 2. MAIN CHROMED UPPER NECK
      const verticalNeck = this.add.graphics();
      // Stainless steel 3D pipe effect
      verticalNeck.fillStyle(0x57606f, 1); // Steel shadow
      verticalNeck.fillRect(-10, 0, 20, 22);
      verticalNeck.fillStyle(0xa4b0be, 1); // Polished steel highlight
      verticalNeck.fillRect(-5, 0, 12, 22);
      verticalNeck.fillStyle(0xffffff, 0.4); // Shine line
      verticalNeck.fillRect(-2, 0, 4, 22);
      verticalNeck.lineStyle(2, 0x1e272e, 1);
      verticalNeck.strokeRect(-10, 0, 20, 22);
      tapCont.add(verticalNeck);

      // 3. COLOR ALCHEMY GLASS CHAMBER (Liquids bubbling inside glass laboratory jar)
      const glassChamber = this.add.graphics();
      
      // Upper clamp collar (Silver/Brass)
      glassChamber.fillStyle(metalCol, 1);
      glassChamber.fillRoundedRect(-14, 20, 28, 6, 2);
      glassChamber.lineStyle(2, 0x1e272e, 1);
      glassChamber.strokeRoundedRect(-14, 20, 28, 6, 2);

      // Glass Chamber body background (void)
      glassChamber.fillStyle(0x1e272e, 0.9);
      glassChamber.fillRoundedRect(-14, 26, 28, 38, 8);
      glassChamber.lineStyle(2.5, 0x1e272e, 1);
      glassChamber.strokeRoundedRect(-14, 26, 28, 38, 8);

      // Active Chemical paint liquid filling
      glassChamber.fillStyle(colorVal, 1);
      glassChamber.fillRoundedRect(-12, 32, 24, 30, 6);
      
      // Reactive science bubbling particles!
      glassChamber.fillStyle(0xffffff, 0.5);
      glassChamber.fillCircle(-6, 38, 2);
      glassChamber.fillCircle(4, 46, 1.5);
      glassChamber.fillCircle(-3, 54, 2);

      // Gloss reflections
      glassChamber.fillStyle(0xffffff, 0.25);
      glassChamber.fillRoundedRect(-11, 28, 6, 33, 4);
      
      // Lower clamp collar (Silver/Brass)
      glassChamber.fillStyle(metalCol, 1);
      glassChamber.fillRoundedRect(-14, 64, 28, 6, 2);
      glassChamber.strokeRoundedRect(-14, 64, 28, 6, 2);

      tapCont.add(glassChamber);

      // 4. DISCHARGE SPOUT CONE
      const spout = this.add.graphics();
      spout.fillStyle(0x57606f, 1);
      spout.beginPath();
      spout.moveTo(-10, 70);
      spout.lineTo(10, 70);
      spout.lineTo(5, 84);
      spout.lineTo(-5, 84);
      spout.closePath();
      spout.fillPath();
      
      spout.lineStyle(2, 0x1e272e, 1);
      spout.beginPath();
      spout.moveTo(-10, 70);
      spout.lineTo(10, 70);
      spout.lineTo(5, 84);
      spout.lineTo(-5, 84);
      spout.closePath();
      spout.strokePath();

      // Shiny spout lip ring (Silver/Brass)
      spout.fillStyle(snoutRingCol, 1);
      spout.fillRoundedRect(-6, 84, 12, 5, 2);
      spout.strokeRoundedRect(-6, 84, 12, 5, 2);
      tapCont.add(spout);

      // 5. ROTATING HEAVY METAL VALVE HANDLE
      const handle = this.add.graphics();
      handle.y = 8;
      
      const drawValveWheel = (g: Phaser.GameObjects.Graphics) => {
          g.lineStyle(2.5, 0x1e272e, 1);
          // Spoke rods
          g.fillStyle(0x57606f, 1);
          g.fillRect(-18, -3, 36, 6);
          g.fillRect(-3, -18, 6, 36);
          g.strokeRect(-18, -3, 36, 6);
          g.strokeRect(-3, -18, 6, 36);

          // Dark exterior heavy copper grip ring
          g.fillStyle(0xc0392b, 1);
          g.lineStyle(3, 0x1e272e, 1);
          g.strokeCircle(0, 0, 18);
          g.fillCircle(0, 0, 18);
          
          g.lineStyle(1.5, 0xff7675, 0.7); // Highlights
          g.strokeCircle(0, 0, 16);

          // Central cap screw
          g.fillStyle(snoutRingCol, 1);
          g.lineStyle(2, 0x1e272e, 1);
          g.fillCircle(0, 0, 6.5);
          g.strokeCircle(0, 0, 6.5);

          g.fillStyle(0xffffff, 0.82);
          g.fillCircle(-2, -2, 1.5);
      };
      
      drawValveWheel(handle);
      tapCont.add(handle);
      this.tapHandles.push(handle);

      // 6. LIFE-LIKE PUSH DRIP DROPS
      const drip = this.add.circle(0, 93, 3.5, colorVal).setStrokeStyle(1, 0xffffff, 0.6);
      tapCont.add(drip);
      this.tweens.add({
         targets: drip,
         scaleY: 1.45,
         scaleX: 0.9,
         y: 95.5,
         duration: 600 + Math.random() * 400,
         yoyo: true,
         repeat: -1,
         ease: 'Sine.easeInOut'
      });

      // 7. SLEEK CUSTOM METAL NAMEPLATING BADGE
      const badgeCont = this.add.container(0, -32);
      const chainL = this.add.line(-7, 4, 0, 0, 2, 10, 0x1e272e).setLineWidth(1.5);
      const chainR = this.add.line(7, 4, 0, 0, -2, 10, 0x1e272e).setLineWidth(1.5);

      const badgeBase = this.add.rectangle(0, 14, 52, 21, 0x222f3e).setStrokeStyle(2, badgeBorderCol);
      const badgeText = this.add.text(0, 14, `${colorName}`, {
         fontSize: '8px',
         color: '#ffffff',
         fontStyle: 'bold',
         fontFamily: 'monospace'
      }).setOrigin(0.5);
      
      const badgeSheen = this.add.graphics();
      badgeSheen.fillStyle(0xffffff, 0.1);
      badgeSheen.beginPath();
      badgeSheen.moveTo(-26, 4 + 10);
      badgeSheen.lineTo(26, 4);
      badgeSheen.lineTo(26, 4 + 10);
      badgeSheen.lineTo(-26, 4 + 20);
      badgeSheen.closePath();
      badgeSheen.fillPath();

      badgeCont.add([chainL, chainR, badgeBase, badgeSheen, badgeText]);
      tapCont.add(badgeCont);

      // Droplet stock remaining count text indicator on faucet!
      const stockVal = this.dropletStocks[colorId] !== undefined ? this.dropletStocks[colorId] : 3;
      const stockText = this.add.text(0, 106, `${stockVal} 💧`, {
         fontSize: '11px',
         color: stockVal === 0 ? '#ff4757' : '#00f3ff',
         fontStyle: 'bold',
         fontFamily: 'monospace',
         stroke: '#000000',
         strokeThickness: 3
      }).setOrigin(0.5);
      tapCont.add(stockText);
      (tapCont as any).stockTextObj = stockText;

      // Fully responsive touch hit area
      const hitArea = this.add.rectangle(tx, tapY + 45, 60, 110)
        .setInteractive({ useHandCursor: true })
        .setDepth(23);

      const tapEntry = { color: colorVal, type: colorId, x: idx, cont: tapCont, handle, spout };
      this.tapData.push(tapEntry);

      hitArea.on('pointerover', () => {
         this.tweens.add({ targets: tapCont, scale: 1.08, duration: 120, ease: 'Quad.easeOut' });
      });
      hitArea.on('pointerout', () => {
         this.tweens.add({ targets: tapCont, scale: 1, duration: 120, ease: 'Quad.easeOut' });
      });

      hitArea.on('pointerdown', () => {
         Audio.initAudio();
         this.animateAndDispense(tapEntry);
      });

      this.taps.push(tapCont);

      // Keyboard hint label above each tap
      this.add.text(tx, tapY - 32, `${idx + 1}`, { fontSize: '14px', color: '#ffffaa', fontStyle: 'bold', fontFamily: 'monospace', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5).setDepth(25);

      const glowCol = idx === 0 ? 0xff4757 : idx === 1 ? 0x1e90ff : 0xffa502;
      const glow = this.add.circle(tx, tapY + 45, 38, glowCol, 0.12).setDepth(21);
      this.tweens.add({ targets: glow, alpha: 0.25, scale: 1.12, duration: 1200, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    });
  }

  animateAndDispense(entry: { color: number, type: string, x: number, cont: Phaser.GameObjects.Container, handle: Phaser.GameObjects.Graphics, spout: Phaser.GameObjects.Graphics }) {
    const { cont, handle, spout, color, type, x: idx } = entry;

    this.tweens.add({
       targets: cont,
       scaleY: 1.25, scaleX: 0.8,
       duration: 100, yoyo: true, ease: 'Back.easeIn'
    });

    this.tweens.add({
      targets: handle, angle: '+360',
      duration: 350, ease: 'Back.easeOut'
    });

    this.tweens.add({
      targets: spout, y: { from: 2, to: 0 },
      duration: 80, yoyo: true
    });

    const matchBx = idx === 0 ? Math.round(90 * this.xRatio) : idx === 1 ? Math.round(200 * this.xRatio) : Math.round(310 * this.xRatio);
    this.dispenseDropConfig({ color, dispenseType: type }, matchBx);
  }

  showOutofDropsPrompt(type: string) {
    if (this.isValidating) return;
    this.isShopOpen = true;
    
    // Play buzzer sound
    Audio.initAudio();
    Audio.playBuzzer();

    const w = this.scale.width;
    const h = this.scale.height;

    // Create a container for the custom prompt
    const promptCont = this.add.container(0, 0).setDepth(1000);

    // Full screen semi-transparent overlay
    const overlay = this.add.rectangle(w/2, h/2, w, h, 0x000000, 0.7).setInteractive();
    promptCont.add(overlay);

    const panel = this.add.container(w/2, h/2);
    promptCont.add(panel);

    // Prompt backing wood frame
    const bgFrame = this.add.graphics();
    bgFrame.fillStyle(0x4a2711, 1);
    bgFrame.fillRoundedRect(-140, -110, 280, 220, 16);
    bgFrame.lineStyle(6, 0x1a0b03, 1);
    bgFrame.strokeRoundedRect(-140, -110, 280, 220, 16);

    // Slate background inside frame
    bgFrame.fillStyle(0x1e272e, 1);
    bgFrame.fillRoundedRect(-125, -95, 250, 190, 10);
    bgFrame.lineStyle(2, 0x2f3542, 1);
    bgFrame.strokeRoundedRect(-125, -95, 250, 190, 10);
    panel.add(bgFrame);

    const colorName = type === 'r' ? 'ROUGE / FIRE' : type === 'b' ? 'BLEU / WATER' : 'JAUNE / LIGHT';

    // Title
    const titleTxt = this.add.text(0, -70, 'OUT OF DROPS!', {
      fontSize: '20px',
      color: '#ff4757',
      fontStyle: 'bold',
      fontFamily: 'sans-serif'
    }).setOrigin(0.5);

    // Message
    const msgTxt = this.add.text(0, -35, `Need drops for Tap ${type.toUpperCase()}?\n(${colorName})`, {
      fontSize: '11px',
      color: '#ced6e0',
      align: 'center',
      fontFamily: 'monospace'
    }).setOrigin(0.5);

    // Big visual item icon in center with circle reflecting the color
    const circle = this.add.circle(0, 12, 22, type === 'r' ? 0xff3b30 : type === 'b' ? 0x00a8ff : 0xffea00).setStrokeStyle(3, 0xffffff);
    const dropVisual = this.add.text(0, 12, '💧', { fontSize: '22px' }).setOrigin(0.5);

    panel.add([titleTxt, msgTxt, circle, dropVisual]);

    // BUY BUTTON: 3 Drops for $20
    const buyBtnCont = this.add.container(-60, 65);
    const buyBtnBase = this.add.rectangle(0, 3, 105, 34, 0x10ac84).setStrokeStyle(3, 0x000000);
    const buyBtnBody = this.add.rectangle(0, 0, 105, 34, 0x1dd1a1).setStrokeStyle(3, 0x000000);
    const buyTxt = this.add.text(0, 0, 'BUY +3 ($20)', {
      fontSize: '11px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'sans-serif'
    }).setOrigin(0.5);
    buyBtnCont.add([buyBtnBase, buyBtnBody, buyTxt]);
    panel.add(buyBtnCont);

    const buyHit = this.add.rectangle(0, 0, 105, 34).setInteractive({ useHandCursor: true });
    buyBtnCont.add(buyHit);

    // WATCH AD BUTTON
    const adBtnCont = this.add.container(60, 65);
    const adBtnBase = this.add.rectangle(0, 3, 105, 34, 0x0984e3).setStrokeStyle(3, 0x000000);
    const adBtnBody = this.add.rectangle(0, 0, 105, 34, 0x74b9ff).setStrokeStyle(3, 0x000000);
    const adTxt = this.add.text(0, 0, '🎬 FREE AD', {
      fontSize: '11px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'sans-serif'
    }).setOrigin(0.5);
    adBtnCont.add([adBtnBase, adBtnBody, adTxt]);
    panel.add(adBtnCont);

    const adHit = this.add.rectangle(0, 0, 105, 34).setInteractive({ useHandCursor: true });
    adBtnCont.add(adHit);

    // CLOSE / NO THANKS BUTTON (top right X)
    const closeBtn = this.add.circle(115, -85, 12, 0xd00000).setStrokeStyle(1.5, 0xffffff);
    const closeTxt = this.add.text(115, -85, '✕', {
      fontSize: '11px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    panel.add([closeBtn, closeTxt]);
    
    closeBtn.setInteractive({ useHandCursor: true });

    // Interactive events
    buyHit.on('pointerdown', () => {
      buyBtnBody.y = 3;
      buyTxt.y = 3;
      
      if (this.coins >= 20) {
        this.coins -= 20;
        this.dropletStocks[type] = (this.dropletStocks[type] || 0) + 3;
        this.updateScoreHUD();
        this.updateTapStockLabel(type);
        this.generatePanelButtons(); // redraw panel buttons representing stock dots!
        Audio.playCashRegister();
        this.saveGameState();
        this.isShopOpen = false;
        promptCont.destroy();
      } else {
        Audio.playHit();
        // Shake title to indicate insufficient budget
        this.tweens.add({
          targets: titleTxt,
          x: { from: -6, to: 6 },
          duration: 40,
          yoyo: true,
          repeat: 3,
          onComplete: () => { titleTxt.x = 0; }
        });
        titleTxt.setText('NEED COINS!');
        this.time.delayedCall(1200, () => {
          titleTxt.setText('OUT OF DROPS!');
        });
      }
    });

    buyHit.on('pointerup', () => {
      buyBtnBody.y = 0;
      buyTxt.y = 0;
    });

    adHit.on('pointerdown', () => {
      adBtnBody.y = 3;
      adTxt.y = 3;
      
      // Play brief rewarding ad and refill drops!
      this.isShopOpen = false;
      promptCont.destroy();
      this.triggerSimulatedDropsAd(type);
    });

    adHit.on('pointerup', () => {
      adBtnBody.y = 0;
      adTxt.y = 0;
    });

    closeBtn.on('pointerdown', () => {
      this.isShopOpen = false;
      promptCont.destroy();
    });
  }

  triggerSimulatedDropsAd(type: string) {
       const label = type === 'r' ? 'RED' : type === 'b' ? 'BLUE' : 'YELLOW';
        this.showCrazyRewardedAd(`REFILL ${label}`, 3, () => {
            this.isValidating = false;
            this.dropletStocks[type] = (this.dropletStocks[type] || 0) + 3;
            this.updateTapStockLabel(type);
           this.generatePanelButtons();
           this.saveGameState();
           Audio.playWin();
           
           const w = this.scale.width;
           const h = this.scale.height;
            const feedback = this.add.text(w/2, h/2, `+3 Free ${label} Drops!`, {
               fontSize: '22px', 
               color: '#00ffcc', 
               fontStyle: 'bold',
               stroke: '#000000',
               strokeThickness: 5,
               fontFamily: 'sans-serif'
           }).setOrigin(0.5).setDepth(1500).setScale(0.1);
           
           this.tweens.add({
               targets: feedback,
               scale: 1.1,
               alpha: 1,
               duration: 400,
               ease: 'Back.easeOut',
               yoyo: true,
               hold: 1200,
               onComplete: () => { feedback.destroy(); }
           });
       });
  }

  openColorShop(tapIndex: number) {
    if (this.isValidating) return;
    this.isShopOpen = true;
    this.activeShopTapIndex = tapIndex;

    if (this.shopLayer) {
      this.shopLayer.destroy();
    }

    const w = this.scale.width;
    const h = this.scale.height;

    this.shopLayer = this.add.container(w / 2, h / 2).setDepth(300);

    // Dim background overlay
    const overlay = this.add.rectangle(0, 0, w * 2, h * 2, 0x000000, 0.78).setInteractive();
    // Prevent clicking elements behind the shop
    overlay.on('pointerdown', (pointer: any) => pointer.event.stopPropagation());

    // Classic heavy wooden-framed blackboard panel
    const board = this.add.graphics();
    // Drop shadow under panel
    board.fillStyle(0x130a05, 0.96);
    board.fillRoundedRect(-185, -255, 370, 510, 16);
    // Real mahogany wood frame
    board.fillStyle(0x4a2711, 1);
    board.fillRoundedRect(-180, -250, 360, 500, 16);
    board.lineStyle(6, 0x1a0b03, 1);
    board.strokeRoundedRect(-180, -250, 360, 500, 16);
    
    // In-game steel rivets at corners
    board.fillStyle(0xa4b0be, 1);
    board.fillCircle(-168, -238, 5);
    board.fillCircle(168, -238, 5);
    board.fillCircle(-168, 238, 5);
    board.fillCircle(168, 238, 5);

    // Slate blackboard/dark frame background
    board.fillStyle(0x1e272e, 1);
    board.fillRoundedRect(-165, -130, 330, 380, 10);
    board.lineStyle(2.5, 0x2f3542, 1);
    board.strokeRoundedRect(-165, -130, 330, 380, 10);

    this.shopLayer.add([overlay, board]);

    // Title text (Centered at top)
    const titleText = this.add.text(0, -220, '🧪 THE ALCHEMIST MARKET 🧪', {
      fontSize: '19px',
      color: '#ffd700',
      fontStyle: 'bold',
      fontFamily: 'monospace',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    this.shopLayer.add(titleText);

    // TAB NAVIGATION HEADERS (COLORS / SKINS / THEMES)
    const tabs = [
      { id: 'colors', label: '💧 LIQUIDS' },
      { id: 'skins', label: '🧪 SKINS' },
      { id: 'themes', label: '🎨 THEMES' }
    ];

    const tabWidth = 106;
    const tabHeight = 34;
    const totalTabsWidth = tabs.length * tabWidth;
    const startTabX = -totalTabsWidth / 2 + tabWidth / 2;

    tabs.forEach((tab, tIdx) => {
      const tabX = startTabX + tIdx * tabWidth;
      const tCont = this.add.container(tabX, -160);

      const isActive = this.activeShopTab === tab.id;
      const bColor = isActive ? 0x2ed573 : 0x2f3542;
      const tColor = isActive ? '#ffffff' : '#a4b0be';
      
      const tBg = this.add.rectangle(0, 0, tabWidth - 6, tabHeight, bColor).setStrokeStyle(isActive ? 3 : 1.5, isActive ? 0xffffff : 0x1e272e);
      const tTxt = this.add.text(0, 0, tab.label, {
         fontSize: '12px',
         color: tColor,
         fontStyle: 'bold',
         fontFamily: 'monospace'
      }).setOrigin(0.5);

      tCont.add([tBg, tTxt]);

      const tHit = this.add.rectangle(0, 0, tabWidth - 6, tabHeight).setInteractive({ useHandCursor: true });
      tHit.on('pointerdown', () => {
         Audio.initAudio();
         Audio.playHit();
         this.activeShopTab = tab.id;
         this.openColorShop(tapIndex); // Refresh layout
      });
      tCont.add(tHit);
      this.shopLayer!.add(tCont);
    });

    // Budget balance indicator
    const balanceText = this.add.text(0, -140, `BUDGET: $${this.coins}`, {
      fontSize: '12px',
      color: '#ffcc00',
      fontStyle: 'bold',
      fontFamily: 'monospace'
    }).setOrigin(0.5);
    this.shopLayer.add(balanceText);

    // Dynamic items loader based on selected active tab
    if (this.activeShopTab === 'colors') {
      const labelText = this.add.text(0, -118, 'REFILL DROP STOCKS FOR PRIMARY LIQUIDS', {
        fontSize: '9.3px',
        color: '#ced6e0',
        fontStyle: 'bold',
        fontFamily: 'monospace'
      }).setOrigin(0.5);
      this.shopLayer.add(labelText);

      // Grid of chemical items from SHOP_ITEMS
      const cols = 3;
      const startX = -105;
      const startY = -15; // Centered nicely for a single row of 3 items
      const spaceX = 105;
      const spaceY = 74;

      const dropsList = [
        { id: 'refill_r', type: 'refill', colorId: 'r', name: 'Refill RED', desc: 'Add +3 Fire Drops', price: 20, color: 0xff3b30 },
        { id: 'refill_b', type: 'refill', colorId: 'b', name: 'Refill BLUE', desc: 'Add +3 Water Drops', price: 20, color: 0x00a8ff },
        { id: 'refill_y', type: 'refill', colorId: 'y', name: 'Refill YELLOW', desc: 'Add +3 Light Drops', price: 20, color: 0xffea00 }
      ];

      dropsList.forEach((item, index) => {
        const col = index % cols;
        const row = Math.floor(index / cols);

        const cellX = startX + col * spaceX;
        const cellY = startY + row * spaceY;

        const itemCont = this.add.container(cellX, cellY);
        // Determine if equipped / owned
        let isEquipped = false;
        let isOwned = false;

        if (item.type === 'skin') {
          isOwned = this.ownedDropSkins[item.id] === true;
          isEquipped = this.activeDropSkins[item.colorId] === item.id;
        }

        const cardBg = this.add.graphics();
        if (isEquipped) {
          cardBg.fillStyle(0x133824, 0.92);
          cardBg.lineStyle(3, 0x2ed573, 1);
        } else if (isOwned) {
          cardBg.fillStyle(0x2c3e50, 0.88);
          cardBg.lineStyle(1.5, 0xa4b0be, 0.5);
        } else {
          cardBg.fillStyle(0x111116, 0.9);
          cardBg.lineStyle(1.5, 0x475569, 0.4);
        }
        cardBg.fillRoundedRect(-48, -32, 96, 62, 6);
        cardBg.strokeRoundedRect(-48, -32, 96, 62, 6);
        itemCont.add(cardBg);

        // Preview drop circle / gemstone
        const previewCircle = this.add.circle(0, -14, 7, item.color);
        itemCont.add(previewCircle);

        // Sparkly reflection/sheen on preview
        const gloss = this.add.circle(-2, -16, 2, 0xffffff, 0.7);
        itemCont.add(gloss);

        // Display Name
        const nameTxt = this.add.text(0, -1, item.name, {
          fontSize: '7.5px',
          color: '#ffffff',
          fontStyle: 'bold',
          fontFamily: 'monospace'
        }).setOrigin(0.5);
        itemCont.add(nameTxt);

        // Description or status text
        let statusLabel = '';
        let statusCol = '#ced6e0';

        if (item.type === 'refill') {
          statusLabel = `Refill: $${item.price}`;
          statusCol = '#ffd700';
        } else {
          if (isEquipped) {
            statusLabel = 'EQUIPPED';
            statusCol = '#2ed573';
          } else if (isOwned) {
            statusLabel = 'EQUIP';
            statusCol = '#00f3ff';
          } else {
            statusLabel = `S_Skin: $${item.price}`;
            statusCol = '#ffd700';
          }
        }

        const actText = this.add.text(0, 16, statusLabel, {
          fontSize: '8.5px',
          color: statusCol,
          fontStyle: 'bold',
          fontFamily: 'sans-serif'
        }).setOrigin(0.5);
        itemCont.add(actText);

        // Interactive hit boundary box
        const hit = this.add.rectangle(0, 0, 96, 62).setInteractive({ useHandCursor: true });
        hit.on('pointerdown', () => {
          Audio.initAudio();
          
          if (item.type === 'refill') {
            // Double check pocket funds
            if (this.coins >= item.price) {
              this.coins -= item.price;
              this.dropletStocks[item.colorId] = (this.dropletStocks[item.colorId] || 0) + 3;
              
              Audio.playCashRegister();
              this.updateScoreHUD();
              this.updateTapStockLabel(item.colorId);
              this.saveGameState();
              
              // Text boost popup
              const upT = this.add.text(cellX, cellY, '+3 DROPS!', {
                fontSize: '11px',
                color: '#2ed573',
                fontStyle: 'bold',
                fontFamily: 'monospace',
                stroke: '#000',
                strokeThickness: 3
              }).setOrigin(0.5).setDepth(310);
              this.tweens.add({ targets: upT, y: upT.y - 30, alpha: 0, duration: 600, onComplete: () => upT.destroy() });
            } else {
              // Shake coins indicator
              Audio.playHit();
              balanceText.setColor('#ff4757');
              this.tweens.add({
                targets: balanceText,
                x: '+=10',
                duration: 50,
                yoyo: true,
                repeat: 3,
                onComplete: () => balanceText.setColor('#ffcc00')
              });
            }
          } else {
            if (isEquipped) {
              this.closeColorShop();
            } else if (isOwned) {
              this.activeDropSkins[item.colorId] = item.id;
              Audio.playDrop('C');
              this.saveGameState();
              this.closeColorShop();
            } else {
              // Buy Skin
              if (this.coins >= item.price) {
                this.coins -= item.price;
                this.ownedDropSkins[item.id] = true;
                this.activeDropSkins[item.colorId] = item.id;
                
                Audio.playCashRegister();
                this.updateScoreHUD();
                this.saveGameState();
                this.closeColorShop();
              } else {
                Audio.playHit();
                balanceText.setColor('#ff4757');
                this.tweens.add({
                  targets: balanceText,
                  x: '+=10',
                  duration: 50,
                  yoyo: true,
                  repeat: 3,
                  onComplete: () => balanceText.setColor('#ffcc00')
                });
              }
            }
          }
        });
        itemCont.add(hit);

        this.shopLayer!.add(itemCont);
      });

      // Dynamic sale vault banner at bottom center
      const mixedKeys = Object.keys(this.mixedColorsCounts).filter(k => this.mixedColorsCounts[k] > 0);
      if (mixedKeys.length > 0) {
        const firstMix = mixedKeys[0];
        const mixCount = this.mixedColorsCounts[firstMix];
        
        const vaultBg = this.add.rectangle(0, 142, 290, 24, 0x1e272e).setStrokeStyle(1.5, 0x00f3ff, 0.4);
        const vaultTxt = this.add.text(0, 142, `🏺 VAULT: Sell 1x ${firstMix.toUpperCase()} (${mixCount} left) for $50`, {
          fontSize: '8.5px',
          color: '#00f3ff',
          fontStyle: 'bold',
          fontFamily: 'monospace'
        }).setOrigin(0.5);
        this.shopLayer.add([vaultBg, vaultTxt]);
        
        const vaultHit = this.add.rectangle(0, 142, 290, 24).setInteractive({ useHandCursor: true });
        vaultHit.on('pointerdown', () => {
          this.mixedColorsCounts[firstMix]--;
          this.coins += 50;
          Audio.initAudio();
          Audio.playCashRegister();
          this.updateScoreHUD();
          this.saveGameState();
          this.openColorShop(tapIndex); // Refresh layout
        });
         this.shopLayer.add(vaultHit);
      } else {
        const vaultTxt = this.add.text(0, 142, '🏺 VAULT IS EMPTY. BUILD WACKY MIXED RECIPES!', {
          fontSize: '8px',
          color: '#57606f',
          fontStyle: 'bold',
          fontFamily: 'monospace'
        }).setOrigin(0.5);
        this.shopLayer.add(vaultTxt);
      }

    } else if (this.activeShopTab === 'skins') {
      const perPage = 6;
      const totalPages = Math.ceil(SKINS.length / perPage);
      const page = this.skinPage;
      const pageItems = SKINS.slice(page * perPage, (page + 1) * perPage);

      const startX = -75;
      const startY = -70;
      const spaceX = 150;
      const spaceY = 85;

      pageItems.forEach((skinData, index) => {
         const col = index % 2;
         const row = Math.floor(index / 2);

         const cellX = startX + col * spaceX;
         const cellY = startY + row * spaceY;

         const sCont = this.add.container(cellX, cellY);

         const isEquipped = this.currentFlaskSkin === skinData.id;
         const isOwned = this.ownedSkins[skinData.id] === true;

         const cardBg = this.add.graphics();
         if (isEquipped) {
            cardBg.fillStyle(0x133824, 0.9);
            cardBg.lineStyle(3, 0x2ed573, 1);
         } else if (isOwned) {
            cardBg.fillStyle(0x2c3e50, 0.85);
            cardBg.lineStyle(1.5, 0xa4b0be, 0.5);
         } else {
            cardBg.fillStyle(0x111116, 0.9);
            cardBg.lineStyle(1.5, 0x475569, 0.4);
         }
         cardBg.fillRoundedRect(-68, -42, 136, 84, 8);
         cardBg.strokeRoundedRect(-68, -42, 136, 84, 8);
         sCont.add(cardBg);

         // Skin shape preview drawn by the skin itself
         const previewG = this.add.graphics().setScale(0.32).setPosition(0, -20);
         skinData.drawBody(previewG, 0x00f3ff, 1);
         sCont.add(previewG);

         const nameTxt = this.add.text(0, 10, skinData.name, {
            fontSize: '9.5px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'monospace'
         }).setOrigin(0.5);

         const descTxt = this.add.text(0, 21, skinData.desc, {
            fontSize: '7.5px',
            color: '#a4b0be',
            fontFamily: 'monospace'
         }).setOrigin(0.5);

         const SKIN_PRICE = 800;

         let lbl = 'EQUIP';
         let c = '#ffcc00';

         if (isEquipped) {
            lbl = 'ACTIVE';
            c = '#2ed573';
         } else if (isOwned) {
            lbl = 'EQUIP';
            c = '#ffcc00';
         } else {
            lbl = `$ ${SKIN_PRICE}`;
            c = '#ffd700';
         }

         const actionTxt = this.add.text(0, 31, lbl, {
            fontSize: '9px',
            color: c,
            fontStyle: 'bold',
            fontFamily: 'sans-serif'
         }).setOrigin(0.5);

         sCont.add([nameTxt, descTxt, actionTxt]);

         const sHit = this.add.rectangle(0, 0, 136, 84).setInteractive({ useHandCursor: true });
         sHit.on('pointerdown', () => {
            Audio.initAudio();
            sCont.setScale(0.9);
            this.tweens.add({
                targets: sCont,
                scaleX: 1,
                scaleY: 1,
                duration: 150,
                ease: 'Back.easeOut',
                onComplete: () => {
                    if (isEquipped) {
                       this.closeColorShop();
                    } else if (isOwned) {
                       this.currentFlaskSkin = skinData.id;
                       Audio.playDrop('C');
                       this.saveGameState();
                       this.drawFlaskGeometry(this.targetUIFlaskLiq, this.currentTargetColor, 1);
                       this.drawFlaskOutlineAndFace(this.targetFlaskCont, this.targetUIOutline);
                       if (this.currentFlask) this.updateFlaskVisuals(this.currentFlask);
                       this.closeColorShop();
                     } else {
                        if (this.coins >= SKIN_PRICE) {
                           this.coins -= SKIN_PRICE;
                           this.ownedSkins[skinData.id] = true;
                           this.currentFlaskSkin = skinData.id;
                           this.totalSpentAcrossSessions += SKIN_PRICE;
                           Audio.playCashRegister();
                           Audio.playSparkle();
                           this.flashScreen(0xffd700, 150);
                           this.spawnSparkleBurst(cellX + this.shopLayer!.x, cellY + this.shopLayer!.y + 140, 12, 0xffd700);
                           this.updateScoreHUD();
                           this.saveGameState();
                           this.saveAchievements();
                           this.checkAchievements();
                           this.drawFlaskGeometry(this.targetUIFlaskLiq, this.currentTargetColor, 1);
                           this.drawFlaskOutlineAndFace(this.targetFlaskCont, this.targetUIOutline);
                           if (this.currentFlask) this.updateFlaskVisuals(this.currentFlask);
                           this.closeColorShop();
                        } else {
                          balanceText.setColor('#ff4757');
                          this.tweens.add({
                             targets: balanceText,
                             x: '+=10',
                             duration: 50,
                             yoyo: true,
                             repeat: 3,
                             onComplete: () => balanceText.setColor('#ffcc00')
                          });
                          Audio.playHit();
                       }
                    }
                }
            });
         });
         sCont.add(sHit);
         this.shopLayer!.add(sCont);
      });

      // Page navigation for skins
      if (totalPages > 1) {
          const pageLabel = this.add.text(0, 195, `Page ${page + 1}/${totalPages}`, {
             fontSize: '9px',
             color: '#ced6e0',
             fontFamily: 'monospace',
             fontStyle: 'bold'
          }).setOrigin(0.5);
          this.shopLayer.add(pageLabel);

          if (page > 0) {
             const prevBg = this.add.rectangle(-85, 195, 65, 22, 0x1a3a4a, 0.8).setStrokeStyle(1, 0x00f3ff, 0.5);
             this.shopLayer.add(prevBg);
             const prevBtn = this.add.text(-85, 195, '< PREV', {
                fontSize: '9px', color: '#00f3ff', fontFamily: 'monospace', fontStyle: 'bold'
             }).setOrigin(0.5).setInteractive({ useHandCursor: true });
             prevBtn.on('pointerdown', () => {
                this.skinPage--;
                this.openColorShop(tapIndex);
             });
             this.shopLayer.add(prevBtn);
          }

          if (page < totalPages - 1) {
             const nextBg = this.add.rectangle(85, 195, 65, 22, 0x1a3a4a, 0.8).setStrokeStyle(1, 0x00f3ff, 0.5);
             this.shopLayer.add(nextBg);
             const nextBtn = this.add.text(85, 195, 'NEXT >', {
                fontSize: '9px', color: '#00f3ff', fontFamily: 'monospace', fontStyle: 'bold'
             }).setOrigin(0.5).setInteractive({ useHandCursor: true });
             nextBtn.on('pointerdown', () => {
                this.skinPage++;
                this.openColorShop(tapIndex);
             });
             this.shopLayer.add(nextBtn);
          }
      }

    } else if (this.activeShopTab === 'themes') {
      const themesList = [
        { id: 'classic', name: 'Industrial Lab', desc: 'Slate steel chambers', price: 0 },
        { id: 'neon', name: 'Neon Grid', desc: 'Vaporwave synthwave laser', price: 1200 },
        { id: 'toxic', name: 'Toxic Sewer', desc: 'Glow nuclear acid bubbles', price: 1200 },
        { id: 'treasury', name: 'Royal Vault', desc: 'Gold vaults & crimson drapes', price: 1500 },
        { id: 'candy', name: 'Candyland', desc: 'Sweet pink cotton candy clouds', price: 1500 },
        { id: 'ocean', name: 'Deep Ocean', desc: 'Underwater coral reef depths', price: 1800 },
        { id: 'sunset', name: 'Sunset Boulevard', desc: 'Warm orange purple twilight', price: 1800 },
        { id: 'forest', name: 'Enchanted Forest', desc: 'Mystical green woods & fireflies', price: 2000 },
        { id: 'space', name: 'Cosmic Void', desc: 'Stars nebulae deep space', price: 2000 },
        { id: 'lavender', name: 'Lavender Dream', desc: 'Soft purple fields at dusk', price: 2200 },
        { id: 'volcano', name: 'Volcanic Forge', desc: 'Lava flows & molten rock', price: 2500 },
        { id: 'arctic', name: 'Arctic Aurora', desc: 'Ice aurora polar night', price: 2500 },
        { id: 'pixel', name: 'Pixel Dungeon', desc: 'Retro 8-bit dungeon crawl', price: 2800 },
        { id: 'japan', name: 'Sakura Garden', desc: 'Cherry blossoms zen bamboo', price: 2800 },
        { id: 'egypt', name: 'Ancient Egypt', desc: 'Pyramids golden hieroglyphs', price: 3000 },
        { id: 'cyberpunk', name: 'Neon City', desc: 'Rain soaked cyberpunk streets', price: 3000 }
      ];

      const perPage = 6;
      const totalPages = Math.ceil(themesList.length / perPage);
      const page = this.themePage;
      const pageItems = themesList.slice(page * perPage, (page + 1) * perPage);

      const startX = -75;
      const startY = -70;
      const spaceX = 150;
      const spaceY = 85;

      pageItems.forEach((theme, index) => {
         const col = index % 2;
         const row = Math.floor(index / 2);

         const cellX = startX + col * spaceX;
         const cellY = startY + row * spaceY;

         const tCont = this.add.container(cellX, cellY);

         const isEquipped = this.currentTheme === theme.id;
         const isOwned = this.ownedThemes[theme.id] === true;

         const cardBg = this.add.graphics();
         if (isEquipped) {
            cardBg.fillStyle(0x133824, 0.9);
            cardBg.lineStyle(3, 0x2ed573, 1);
         } else if (isOwned) {
            cardBg.fillStyle(0x2c3e50, 0.85);
            cardBg.lineStyle(1.5, 0xa4b0be, 0.5);
         } else {
            cardBg.fillStyle(0x111116, 0.9);
            cardBg.lineStyle(1.5, 0x475569, 0.4);
         }
         cardBg.fillRoundedRect(-68, -42, 136, 84, 8);
         cardBg.strokeRoundedRect(-68, -42, 136, 84, 8);
         tCont.add(cardBg);

         // Theme Icon preview
         const previewBox = this.add.rectangle(0, -18, 54, 30, isEquipped ? 0x221105 : 0x2c3e50).setStrokeStyle(1.5, 0xffffff, 0.5);
         tCont.add(previewBox);

         const nameTxt = this.add.text(0, 10, theme.name, {
            fontSize: '9.5px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'monospace'
         }).setOrigin(0.5);

         const descTxt = this.add.text(0, 21, theme.desc, {
            fontSize: '7px',
            color: '#a4b0be',
            fontFamily: 'monospace'
         }).setOrigin(0.5);

         let lbl = '';
         let c = '#999999';

         if (isEquipped) {
            lbl = 'ACTIVE';
            c = '#2ed573';
         } else if (isOwned) {
            lbl = 'EQUIP';
            c = '#ffcc00';
         } else {
            lbl = `$ ${theme.price}`;
            c = '#ffd700';
         }

         const actionTxt = this.add.text(0, 31, lbl, {
            fontSize: '9px',
            color: c,
            fontStyle: 'bold',
            fontFamily: 'sans-serif'
         }).setOrigin(0.5);

         tCont.add([nameTxt, descTxt, actionTxt]);

         // Click events switching background themes on the fly!
         const tHit = this.add.rectangle(0, 0, 136, 84).setInteractive({ useHandCursor: true });
         tHit.on('pointerdown', () => {
            Audio.initAudio();
            tCont.setScale(0.9);
            this.tweens.add({
                targets: tCont,
                scaleX: 1,
                scaleY: 1,
                duration: 150,
                ease: 'Back.easeOut',
                onComplete: () => {
                    if (isEquipped) {
                       this.closeColorShop();
                    } else if (isOwned) {
                       this.currentTheme = theme.id;
                       Audio.playDrop('M');
                       this.saveGameState();
                       this.drawBackgroundAndTheme(); // Redraw background on the fly!
                       this.closeColorShop();
                     } else {
                        if (this.coins >= theme.price) {
                           this.coins -= theme.price;
                           this.ownedThemes[theme.id] = true;
                           this.currentTheme = theme.id;
                           this.totalSpentAcrossSessions += theme.price;
                           Audio.playCashRegister();
                           Audio.playSparkle();
                           this.flashScreen(0xffd700, 150);
                           this.spawnSparkleBurst(cellX + this.shopLayer!.x, cellY + this.shopLayer!.y + 140, 12, 0xffd700);
                           this.cameras.main.shake(200, 0.008);
                           this.updateScoreHUD();
                           this.saveGameState();
                           this.saveAchievements();
                           this.checkAchievements();
                           this.drawBackgroundAndTheme();
                           this.closeColorShop();
                        } else {
                          balanceText.setColor('#ff4757');
                          this.tweens.add({
                             targets: balanceText,
                             x: '+=10',
                             duration: 50,
                             yoyo: true,
                             repeat: 3,
                             onComplete: () => balanceText.setColor('#ffcc00')
                          });
                          Audio.playHit();
                       }
                    }
                }
            });
         });
          tCont.add(tHit);
          this.shopLayer!.add(tCont);
      });

      // Page navigation for themes
      if (totalPages > 1) {
          const pageLabel = this.add.text(0, 195, `Page ${page + 1}/${totalPages}`, {
             fontSize: '9px',
             color: '#ced6e0',
             fontFamily: 'monospace',
             fontStyle: 'bold'
          }).setOrigin(0.5);
          this.shopLayer.add(pageLabel);

          if (page > 0) {
             const prevBg = this.add.rectangle(-85, 195, 65, 22, 0x1a3a4a, 0.8).setStrokeStyle(1, 0x00f3ff, 0.5);
             this.shopLayer.add(prevBg);
             const prevBtn = this.add.text(-85, 195, '< PREV', {
                fontSize: '9px', color: '#00f3ff', fontFamily: 'monospace', fontStyle: 'bold'
             }).setOrigin(0.5).setInteractive({ useHandCursor: true });
             prevBtn.on('pointerdown', () => {
                this.themePage--;
                this.openColorShop(tapIndex);
             });
             this.shopLayer.add(prevBtn);
          }

          if (page < totalPages - 1) {
             const nextBg = this.add.rectangle(85, 195, 65, 22, 0x1a3a4a, 0.8).setStrokeStyle(1, 0x00f3ff, 0.5);
             this.shopLayer.add(nextBg);
             const nextBtn = this.add.text(85, 195, 'NEXT >', {
                fontSize: '9px', color: '#00f3ff', fontFamily: 'monospace', fontStyle: 'bold'
             }).setOrigin(0.5).setInteractive({ useHandCursor: true });
             nextBtn.on('pointerdown', () => {
                this.themePage++;
                this.openColorShop(tapIndex);
             });
             this.shopLayer.add(nextBtn);
          }
      }
    }

    // Close button at base
    const closeBtn = this.add.container(0, 230);
    const closeBase = this.add.rectangle(0, 3, 160, 36, 0x8c1c24).setStrokeStyle(4, 0x1a0604);
    const closeBody = this.add.rectangle(0, 0, 160, 36, 0xd63031).setStrokeStyle(4, 0x1a0604);
    const closeText = this.add.text(0, 0, 'CLOSE THE MARKET', {
      fontSize: '13px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'monospace'
    }).setOrigin(0.5);
    closeBtn.add([closeBase, closeBody, closeText]);

    const closeHit = this.add.rectangle(0, 230, 160, 36).setInteractive({ useHandCursor: true });
    closeHit.on('pointerdown', () => {
      closeBody.y = 3;
      closeText.y = 3;
      this.closeColorShop();
    });
    closeHit.on('pointerup', () => { closeBody.y = 0; closeText.y = 0; });
    closeHit.on('pointerout', () => { closeBody.y = 0; closeText.y = 0; });

    this.shopLayer.add([closeBtn, closeHit]);

    this.shopLayer.setScale(0.9).setAlpha(0);
    this.tweens.add({
       targets: this.shopLayer,
       scale: 1,
       alpha: 1,
       duration: 300,
       ease: 'Back.easeOut'
    });
  }

  closeColorShop() {
    this.isShopOpen = false;
    if (this.shopLayer) {
       this.shopLayer.destroy();
       this.shopLayer = null;
    }
  }

  createPanel() {
    const w = this.scale.width;
    const panelY = 480; 
    
    const panel = this.add.graphics().setDepth(50);
    const rp = this.xRatio;
    // Darker wooden shadow
    panel.fillStyle(0x3d2314, 1);
    panel.fillRoundedRect(Math.round(10 * rp), panelY + 10, w - Math.round(20 * rp), 300, 16);
    // Rich mahogany wood plate
    panel.fillStyle(0x784421, 1);
    panel.fillRoundedRect(Math.round(10 * rp), panelY, w - Math.round(20 * rp), 300, 16);
    panel.lineStyle(6, 0x221208, 1);
    panel.strokeRoundedRect(Math.round(10 * rp), panelY, w - Math.round(20 * rp), 300, 16);

    // Render wood grains for rustic gaming look
    const r = this.xRatio;
    panel.lineStyle(4, 0x5a3014, 0.4);
    panel.beginPath();
    panel.moveTo(Math.round(15 * r), panelY + 50);
    panel.lineTo(w - Math.round(15 * r), panelY + 50);
    panel.moveTo(Math.round(15 * r), panelY + 120);
    panel.lineTo(w - Math.round(15 * r), panelY + 120);
    panel.moveTo(Math.round(15 * r), panelY + 190);
    panel.lineTo(w - Math.round(15 * r), panelY + 190);
    panel.strokePath();

    // Metallic corner rivets
    panel.fillStyle(0x8da2ac, 1);
    panel.fillCircle(Math.round(25 * r), panelY + 25, Math.round(6 * r));
    panel.fillCircle(w - Math.round(25 * r), panelY + 25, Math.round(6 * r));
    panel.fillCircle(Math.round(25 * r), panelY + 275, Math.round(6 * r));
    panel.fillCircle(w - Math.round(25 * r), panelY + 275, Math.round(6 * r));

    // UNDO Button (limited to 3 per level)
    const uBtnX = Math.round(75 * r);
    const uBtn = this.add.container(uBtnX, panelY + 230).setDepth(53);
    const uBtnBase = this.add.rectangle(0, 4, 85, 50, 0x8b1a1a).setStrokeStyle(4, 0x4a0e0e);
    const uBtnBody = this.add.rectangle(0, 0, 85, 50, 0xdc3545).setStrokeStyle(4, 0x4a0e0e);
    const uBtnGlow = this.add.rectangle(0, -18, 70, 8, 0xdc3545, 0.4).setBlendMode(Phaser.BlendModes.ADD);
    const uBtnIcon = this.add.text(0, -5, '⏪', { fontSize: '22px' }).setOrigin(0.5);
    this.undoIndicatorText = this.add.text(0, 15, `${this.undosRemaining}`, { fontSize: '11px', color: '#ffdddd', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
    uBtn.add([uBtnBase, uBtnBody, uBtnGlow, uBtnIcon, this.undoIndicatorText]);

    const uHit = this.add.rectangle(uBtnX, panelY + 230, 85, 50).setInteractive({ useHandCursor: true }).setDepth(55);
    uHit.on('pointerdown', () => {
        Audio.initAudio();
        Audio.playClick();
        Audio.haptic(15);
        uBtn.setScale(0.92);
        if (this.undosRemaining <= 0) {
            Audio.playLaser();
            this.promptRefillUndosPopup();
            return;
        }

        uBtnBody.y = 4;
        uBtnIcon.y = -1;
        this.undoIndicatorText.y = 19;
        
        const success = this.undoDrop();
        if (success) {
            this.undosRemaining--;
            this.undoIndicatorText.setText(`${this.undosRemaining}`);
            Audio.playHit();
        } else {
            Audio.playBuzzer();
        }
    });
    uHit.on('pointerup', () => { 
        uBtn.setScale(1);
        uBtnBody.y = 0; 
        uBtnIcon.y = -5; 
        this.undoIndicatorText.y = 15;
    });
    uHit.on('pointerout', () => { 
        uBtn.setScale(1);
        uBtnBody.y = 0; 
        uBtnIcon.y = -5; 
        this.undoIndicatorText.y = 15;
    });

    // HINT Button (💡 Helps players decode complex proportions like Warm Amber)
    const hBtnX = Math.round(185 * r);
    const hBtn = this.add.container(hBtnX, panelY + 230).setDepth(53);
    const hBtnBase = this.add.rectangle(0, 4, 100, 50, 0x0a5f8a).setStrokeStyle(4, 0x052e44);
    const hBtnBody = this.add.rectangle(0, 0, 100, 50, 0x0b8fd6).setStrokeStyle(4, 0x052e44);
    const hBtnGlow = this.add.rectangle(0, -18, 85, 8, 0x0b8fd6, 0.4).setBlendMode(Phaser.BlendModes.ADD);
    const hBtnIcon = this.add.text(0, -4, '💡', { fontSize: '24px' }).setOrigin(0.5);
    const hBtnLabel = this.add.text(0, 14, 'RECIPE', { fontSize: '9px', color: '#c8ffff', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
    hBtn.add([hBtnBase, hBtnBody, hBtnGlow, hBtnIcon, hBtnLabel]);

    const hHit = this.add.rectangle(hBtnX, panelY + 230, 100, 50).setInteractive({ useHandCursor: true }).setDepth(55);
    hHit.on('pointerdown', () => {
        Audio.initAudio();
        Audio.playClick();
        Audio.haptic(15);
        hBtn.setScale(0.92);
        hBtnBody.y = 4;
        hBtnIcon.y = 0;
        hBtnLabel.y = 18;
        this.showHintAdPrompt();
    });
    hHit.on('pointerup', () => {
        hBtn.setScale(1);
        hBtnBody.y = 0;
        hBtnIcon.y = -4;
        hBtnLabel.y = 14;
    });
    hHit.on('pointerout', () => {
        hBtn.setScale(1);
        hBtnBody.y = 0;
        hBtnIcon.y = -4;
        hBtnLabel.y = 14;
    });

    // SHOP / MARKET Button (Where VALIDATE was previously)
    const sBtnX = Math.round(295 * r);
    const sBtn = this.add.container(sBtnX, panelY + 230).setDepth(53);
    const sBtnBase = this.add.rectangle(0, 4, 85, 50, 0x8b5800).setStrokeStyle(4, 0x4a2e00);
    const sBtnBody = this.add.rectangle(0, 0, 85, 50, 0xf59e0b).setStrokeStyle(4, 0x4a2e00);
    const sBtnGlow = this.add.rectangle(0, -18, 70, 8, 0xf59e0b, 0.4).setBlendMode(Phaser.BlendModes.ADD);
    const sBtnIcon = this.add.text(0, -5, '🛒', { fontSize: '22px' }).setOrigin(0.5);
    const sBtnLabel = this.add.text(0, 15, 'SHOP', { fontSize: '9px', color: '#fff9e6', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
    sBtn.add([sBtnBase, sBtnBody, sBtnGlow, sBtnIcon, sBtnLabel]);

    const sHit = this.add.rectangle(sBtnX, panelY + 230, 85, 50).setInteractive({ useHandCursor: true }).setDepth(55);
    sHit.on('pointerdown', () => {
        Audio.initAudio();
        Audio.playClick();
        Audio.haptic(20);
        sBtn.setScale(0.92);
        sBtnBody.y = 4;
        sBtnIcon.y = -1;
        sBtnLabel.y = 19;
        this.openColorShop(0);
    });
    sHit.on('pointerup', () => {
        sBtn.setScale(1);
        sBtnBody.y = 0;
        sBtnIcon.y = -5;
        sBtnLabel.y = 15;
    });
    sHit.on('pointerout', () => {
        sBtn.setScale(1);
        sBtnBody.y = 0;
        sBtnIcon.y = -5;
        sBtnLabel.y = 15;
    });



  }

  showHintAdPrompt() {
     Audio.initAudio();
     Audio.playBuzzer();
     const w = this.scale.width;
     const h = this.scale.height;
     const popup = this.add.container(w / 2, h / 2).setDepth(500);
     const veil = this.add.rectangle(0, 0, w, h, 0x000000, 0.75).setInteractive();
     veil.on('pointerdown', (p: any) => p.event.stopPropagation());
     const board = this.add.graphics();
     board.fillStyle(0x4a2711, 1);
     board.fillRoundedRect(-140, -90, 280, 180, 16);
     board.lineStyle(5, 0x1a0b03, 1);
     board.strokeRoundedRect(-140, -90, 280, 180, 16);
     board.fillStyle(0x1e272e, 1);
     board.fillRoundedRect(-125, -75, 250, 150, 10);
     const title = this.add.text(0, -45, '💡 RECIPE COST 💡', { fontSize: '16px', color: '#ffd700', fontStyle: 'bold', fontFamily: 'monospace', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5);
      const msg = this.add.text(0, -10, 'Pay $100 or watch an ad\n  to reveal the recipe.', { fontSize: '11px', color: '#ced6e0', align: 'center', fontFamily: 'monospace' }).setOrigin(0.5);
     const payBtnCont = this.add.container(-65, 45);
     const payBase = this.add.rectangle(0, 3, 100, 36, 0x10ac84).setStrokeStyle(3, 0x000);
     const payBody = this.add.rectangle(0, 0, 100, 36, 0x1dd1a1).setStrokeStyle(3, 0x000);
     const payTxt = this.add.text(0, 0, 'PAY $100', { fontSize: '11px', color: '#fff', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
     payBtnCont.add([payBase, payBody, payTxt]);
     const payHit = this.add.rectangle(0, 0, 100, 36).setInteractive({ useHandCursor: true });
     payHit.on('pointerdown', () => { payBody.y = 3; payTxt.y = 3; });
      payHit.on('pointerup', () => {
          if (this.coins >= 100) {
              this.coins -= 100;
              this.updateScoreHUD();
              Audio.playCashRegister();
              popup.destroy();
              this.openRecipeHintPopup();
          } else {
              Audio.playBuzzer();
              const flash = this.add.text(0, -65, 'NOT ENOUGH', { fontSize: '10px', color: '#ff6b6b', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
              popup.add(flash);
              this.tweens.add({ targets: flash, alpha: 0, duration: 1200, onComplete: () => flash.destroy() });
          }
      });
     payBtnCont.add(payHit);

     const adBtnCont = this.add.container(65, 45);
     const adBase = this.add.rectangle(0, 3, 100, 36, 0x0984e3).setStrokeStyle(3, 0x000);
     const adBody = this.add.rectangle(0, 0, 100, 36, 0x74b9ff).setStrokeStyle(3, 0x000);
     const adTxt = this.add.text(0, 0, '🎬 FREE AD', { fontSize: '11px', color: '#fff', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
     adBtnCont.add([adBase, adBody, adTxt]);
     const adHit = this.add.rectangle(0, 0, 100, 36).setInteractive({ useHandCursor: true });
      adHit.on('pointerdown', () => { adBody.y = 3; adTxt.y = 3; });
      adHit.on('pointerup', () => {
          this.showCrazyRewardedAd("REVEAL RECIPE", 3, () => {
              popup.destroy();
              this.openRecipeHintPopup();
          });
      });
     adBtnCont.add(adHit);

     const closeBtn = this.add.circle(125, -70, 12, 0xd00000).setStrokeStyle(1.5, 0xffffff);
     const closeTxt = this.add.text(125, -70, '\u2715', { fontSize: '11px', color: '#fff', fontStyle: 'bold' }).setOrigin(0.5);
     closeBtn.setInteractive({ useHandCursor: true });
     closeBtn.on('pointerdown', () => popup.destroy());

     popup.add([veil, board, title, msg, payBtnCont, adBtnCont, closeBtn, closeTxt]);
  }

  openRecipeHintPopup() {
    if (this.isValidating || !this.currentFlask) return;
    this.isHintOpen = true;

    if (this.hintLayer) {
      this.hintLayer.destroy();
    }

    const w = this.scale.width;
    const h = this.scale.height;

    this.hintLayer = this.add.container(w / 2, h / 2).setDepth(400);

    // Dark blocking backdrop overlay
    const overlay = this.add.rectangle(0, 0, w * 2, h * 2, 0x000000, 0.8).setInteractive();
    overlay.on('pointerdown', (p: any) => p.event.stopPropagation());
    overlay.on('pointerup', (p: any) => p.event.stopPropagation());

    // Main scroll board representation
    const board = this.add.graphics();
    // Drop shadow
    board.fillStyle(0x130a05, 0.95);
    board.fillRoundedRect(-175, -185, 350, 330, 16);
    // Real walnut frame
    board.fillStyle(0x5c3d25, 1);
    board.fillRoundedRect(-170, -180, 340, 320, 16);
    board.lineStyle(6, 0x221208, 1);
    board.strokeRoundedRect(-170, -180, 340, 320, 16);

    // Inner blackboard
    board.fillStyle(0x1e272e, 1);
    board.fillRoundedRect(-155, -115, 310, 230, 10);
    board.lineStyle(2.5, 0x2f3542, 1);
    board.strokeRoundedRect(-155, -115, 310, 230, 10);

    // Corner rivets
    board.fillStyle(0xa4b0be, 1);
    board.fillCircle(-158, -168, 4);
    board.fillCircle(158, -168, 4);
    board.fillCircle(-158, 128, 4);
    board.fillCircle(158, 128, 4);

    this.hintLayer.add([overlay, board]);

    // Header Title
    const title = this.add.text(0, -155, '💡 ALCHEMIST FORMULA 💡', {
      fontSize: '17px',
      color: '#ffd700',
      fontStyle: 'bold',
      fontFamily: 'monospace',
      stroke: '#000000',
      strokeThickness: 3
    }).setOrigin(0.5);
    this.hintLayer.add(title);

    const targetDose = (this.currentFlask as any).targetDose as Dose;
    const tColor = Colors.mixRYB(targetDose);
    const tName = Colors.getTargetName(tColor);

    // Target name representation
    const recipeNameTxt = this.add.text(0, -90, `RECIPE FOR: ${tName}`, {
      fontSize: '14px',
      color: '#fff',
      fontStyle: 'bold',
      fontFamily: 'sans-serif'
    }).setOrigin(0.5);
    recipeNameTxt.setColor('#' + tColor.toString(16).padStart(6, '0'));
    // stroke text so it is visible against any color
    recipeNameTxt.setStroke('#000000', 3);
    this.hintLayer.add(recipeNameTxt);

    // Display the liquid preview flask
    const previewG = this.add.graphics().setScale(0.7).setPosition(0, -25);
    this.drawFlaskGeometry(previewG, tColor, 1);
    
    const previewOutline = this.add.graphics().setScale(0.7).setPosition(0, -25);
    this.drawFlaskOutlineAndFace(previewOutline as any, previewOutline);
    
    this.hintLayer.add([previewG, previewOutline]);

    // Let's create beautiful descriptive list of required drops!
    const rDrops = targetDose.r;
    const bDrops = targetDose.b;
    const yDrops = targetDose.y;

    const recipeLabel = this.add.text(0, 50, `🔴 RED : ${rDrops} drop(s)\n🔵 BLUE : ${bDrops} drop(s)\n🟡 YELLOW : ${yDrops} drop(s)`, {
      fontSize: '14px',
      color: '#ffffff',
      fontStyle: 'bold',
      fontFamily: 'monospace',
      lineSpacing: 10,
      align: 'left'
    }).setOrigin(0.5);
    this.hintLayer.add(recipeLabel);

    // Let's explain specific recipes like WARM AMBER as requested by user!
    if (tName === 'WARM AMBER') {
      const amberInfo = this.add.text(0, -50, '💡 Tip: Amber is mostly Red with Yellow context!', {
         fontSize: '9px',
         color: '#ffb300',
         fontStyle: 'italic',
         fontFamily: 'sans-serif'
      }).setOrigin(0.5);
      this.hintLayer.add(amberInfo);
    }

    // CLOSE Button at the bottom
    const cBtnCont = this.add.container(0, 155).setDepth(410);
    const cBtnBase = this.add.rectangle(0, 4, 130, 42, 0xbd2130).setStrokeStyle(3, 0x2f3542);
    const cBtnBody = this.add.rectangle(0, 0, 130, 42, 0xff4757).setStrokeStyle(3, 0x2f3542);
    const cBtnTxt = this.add.text(0, 0, 'CLOSE', { fontSize: '14px', color: '#fff', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
    cBtnCont.add([cBtnBase, cBtnBody, cBtnTxt]);

    const cHit = this.add.rectangle(0, 155, 130, 42).setInteractive({ useHandCursor: true }).setDepth(420);
    cHit.on('pointerdown', () => {
        cBtnCont.setScale(0.92);
        cBtnBody.y = 4;
        cBtnTxt.y = 4;
    });
    cHit.on('pointerup', () => {
        Audio.initAudio();
        Audio.playHit();
        this.hintLayer?.destroy();
        this.hintLayer = null;
        this.isHintOpen = false;
    });
    cHit.on('pointerout', () => {
        cBtnCont.setScale(1);
        cBtnBody.y = 0;
        cBtnTxt.y = 0;
    });
    this.hintLayer.add([cBtnCont, cHit]);
  }

  drawBeltPattern() {
     if (!this.beltGraphics) return;
     const bg = this.beltGraphics;
     bg.clear();
    const beltH = 80;
     const segmentWidth = 60;
     const w = this.scale.width;
     
     // Normalize the scroll offset to repeat seamlessly
     const offset = this.beltScrollX % segmentWidth;
     
     bg.fillStyle(0x474f5f, 1);
     bg.fillRect(0, this.beltY, w, beltH);
     
     bg.lineStyle(4, 0x2f3542, 1);
     for (let x = -segmentWidth * 2; x < w + segmentWidth * 2; x += segmentWidth) {
         const bx = x + offset;
         bg.strokeRect(bx, this.beltY, segmentWidth, beltH);
         // Draw high-quality stylish interior ribbed shadows
         bg.lineStyle(2, 0x3a414e, 1);
         bg.lineBetween(bx + 12, this.beltY + 4, bx + 12, this.beltY + beltH - 4);
         bg.lineBetween(bx + 24, this.beltY + 4, bx + 24, this.beltY + beltH - 4);
         bg.lineBetween(bx + 36, this.beltY + 4, bx + 36, this.beltY + beltH - 4);
         bg.lineBetween(bx + 48, this.beltY + 4, bx + 48, this.beltY + beltH - 4);
         bg.lineStyle(4, 0x2f3542, 1);
     }
     
     // Add border lines to highlight structural strength
     bg.lineStyle(6, 0x2f3542, 1);
     bg.lineBetween(0, this.beltY, w, this.beltY);
     bg.lineBetween(0, this.beltY + beltH, w, this.beltY + beltH);
  }

  rewardExtraTime() {
    Audio.initAudio();
    Audio.playWin();
    this.health = Math.min(100, this.health + 40);
    this.updateHealthBar();

    const floatTxt = this.add.text(Math.round(185 * this.xRatio), 480 + 180, '+40% LAB STABILITY!', {
        fontSize: '18px',
        color: '#2ed573',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 5,
        fontFamily: 'monospace'
    }).setOrigin(0.5).setDepth(120);

    this.tweens.add({
        targets: floatTxt,
        y: floatTxt.y - 120,
        scale: 1.3,
        alpha: 0,
        duration: 1200,
        ease: 'Cubic.out',
        onComplete: () => floatTxt.destroy()
    });

    for(let i=0; i<15; i++) {
        const p = this.add.circle(Math.round(185 * this.xRatio), 480 + 230, Phaser.Math.Between(4, 8), 0xff9f43).setDepth(150);
        this.physics.world.enable(p);
        const body = p.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(Phaser.Math.Between(-150, 150), Phaser.Math.Between(-250, -50));
        body.setGravityY(500);

        this.tweens.add({
            targets: p,
            scale: 0,
            duration: 800,
            ease: 'Power2',
            onComplete: () => p.destroy()
        });
    }
  }

  drawFlaskPath(g: any) {
    g.beginPath();
    g.moveTo(-18, -45);
    g.lineTo(18, -45);
    g.lineTo(18, -15);
    g.lineTo(40, 25);
    g.arc(0, 25, 40, 0, Math.PI, false);
    g.lineTo(-18, -15);
    g.closePath();
  }

  drawFlaskFace(outline: Phaser.GameObjects.Graphics) {
    outline.fillStyle(0x2f3542, 1);
    outline.fillCircle(-10, 15, 5); 
    outline.fillCircle(10, 15, 5);  
    outline.fillStyle(0xffffff, 1);
    outline.fillCircle(-11, 13, 2);
    outline.fillCircle(9, 13, 2);
    outline.fillStyle(0xff88aa, 1);
    outline.fillCircle(-18, 20, 5);
    outline.fillCircle(18, 20, 5);
    outline.lineStyle(3, 0x2f3542, 1);
    outline.beginPath();
    outline.arc(0, 18, 5, 0, Math.PI, false); 
    outline.strokePath();
  }

  drawFlaskGeometry(g: Phaser.GameObjects.Graphics, fillColor: number, alpha: number = 1, skinId?: string) {
    g.clear();
    const skinId2 = skinId !== undefined ? skinId : this.currentFlaskSkin;
    const skin = SKINS.find(s => s.id === skinId2);
    if (skin) {
      skin.drawBody(g, fillColor, alpha);
    } else {
      g.fillStyle(fillColor, alpha);
      g.fillRoundedRect(-22, -10, 44, 60, 10);
    }
  }

  drawFlaskOutlineAndFace(flask: Phaser.GameObjects.Container, outlineG: Phaser.GameObjects.Graphics) {
     outlineG.clear();
     const skinData = SKINS.find(s => s.id === this.currentFlaskSkin);
     if (skinData) {
       skinData.drawFace(outlineG);
     } else {
       outlineG.lineStyle(4, 0x2f3542, 1);
       outlineG.strokeRoundedRect(-24, -12, 48, 64, 12);
     }
  }

  drawBackgroundAndTheme() {
    if (this.backgroundGraphics) {
        this.backgroundGraphics.destroy();
    }
    const w = this.scale.width;
    const h = this.scale.height;
    
    this.backgroundGraphics = this.add.graphics().setDepth(0);
    const bg = this.backgroundGraphics;
    
    // Draw the main background sky/wall above the conveyor system
    const wallHeight = this.beltY + 40;
    
    if (this.currentTheme === 'classic') {
        // Classic gorgeous Sky Blue background ("bleu ciel")
        bg.fillStyle(0xa0e0ff, 1);
        bg.fillRect(0, 0, w, wallHeight);
        
        // Puffy cheerful alchemist background clouds
        bg.fillStyle(0xffffff, 0.72);
        // Cloud cluster 1 (left)
        bg.fillCircle(80, 80, 24);
        bg.fillCircle(110, 75, 32);
        bg.fillCircle(135, 80, 22);
        bg.fillRect(70, 78, 75, 24);
        
        // Cloud cluster 2 (right)
        bg.fillCircle(270, 110, 18);
        bg.fillCircle(292, 105, 25);
        bg.fillCircle(312, 110, 16);
        bg.fillRect(260, 108, 62, 20);

        // Vertical sleek architectural columns
        bg.fillStyle(0xbbe7ff, 0.5);
        const girders = [45, 145, 245, 345];
        girders.forEach(gx => {
            bg.fillRect(gx - 8, 0, 16, wallHeight);
            // Column structural rivet details
            bg.fillStyle(0xffffff, 0.85);
            for (let ry = 25; ry < wallHeight; ry += 65) {
                bg.fillCircle(gx, ry, 2.5);
            }
            bg.fillStyle(0xbbe7ff, 0.5);
        });
        
        // Symmetrical floor line border stripe
        bg.fillStyle(0x7ed6df, 1);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'neon') {
        // Vaporwave retro-cyber neon style
        bg.fillStyle(0x0a0512, 1);
        bg.fillRect(0, 0, w, wallHeight);
        
        // Brilliant magenta neon grids
        bg.lineStyle(1.5, 0xff00cc, 0.22);
        for (let gx = 0; gx < w; gx += 25) {
            bg.lineBetween(gx, 0, gx, wallHeight);
        }
        for (let gy = 0; gy < wallHeight; gy += 25) {
            bg.lineBetween(0, gy, w, gy);
        }
        
        // Glowing cyan pipelines running in the background
        bg.lineStyle(10, 0x00f3ff, 0.3);
        bg.beginPath();
        bg.moveTo(-10, 95);
        bg.lineTo(w + 10, 95);
        bg.strokePath();
    } else if (this.currentTheme === 'toxic') {
        // Radioactive wasteland sewer
        bg.fillStyle(0x111612, 1);
        bg.fillRect(0, 0, w, wallHeight);
        
        bg.fillStyle(0x2ed573, 0.15);
        bg.fillCircle(60, 100, 35);
        bg.fillCircle(140, 220, 20);
        bg.fillCircle(240, 120, 42);
        bg.fillCircle(310, 240, 25);
        
        for (let bx = -20; bx < w + 20; bx += 40) {
            bg.fillStyle(0xffcc00, 0.7);
            bg.beginPath();
            bg.moveTo(bx, 0);
            bg.lineTo(bx + 20, 0);
            bg.lineTo(bx + 35, 30);
            bg.lineTo(bx + 15, 30);
            bg.closePath();
            bg.fillPath();
        }
        bg.fillStyle(0x111111, 0.6);
        bg.fillRect(0, 0, w, 30);
    } else if (this.currentTheme === 'treasury') {
        // Vault filled with wealth
        bg.fillStyle(0x211409, 1);
        bg.fillRect(0, 0, w, wallHeight);
        
        bg.fillStyle(0x961a25, 0.9);
        bg.beginPath();
        bg.moveTo(0, 0);
        bg.lineTo(45, 0);
        bg.lineTo(25, wallHeight);
        bg.lineTo(0, wallHeight);
        bg.closePath();
        bg.fillPath();
        
        bg.beginPath();
        bg.moveTo(w, 0);
        bg.lineTo(w - 45, 0);
        bg.lineTo(w - 25, wallHeight);
        bg.lineTo(w, wallHeight);
        bg.closePath();
        bg.fillPath();

        bg.fillStyle(0xffd700, 0.85);
        bg.fillRect(43, 0, 3, wallHeight);
        bg.fillRect(w - 46, 0, 3, wallHeight);

        bg.lineStyle(5, 0xb2bec3, 0.35);
        bg.strokeCircle(w / 2, 90, 48);
        bg.lineStyle(3, 0xb2bec3, 0.35);
        bg.lineBetween(w / 2 - 60, 90, w / 2 + 60, 90);
        bg.lineBetween(w / 2, 30, w / 2, 150);
    } else if (this.currentTheme === 'candy') {
        bg.fillStyle(0xffb8c6, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0xffd6e0, 0.5);
        for (let i = 0; i < 30; i++) {
            bg.fillCircle(Math.random() * w, Math.random() * wallHeight, 4 + Math.random() * 12);
        }
        bg.fillStyle(0xff69b4, 0.2);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'ocean') {
        bg.fillStyle(0x0077b6, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0x00b4d8, 0.3);
        for (let i = 0; i < 8; i++) {
            bg.fillEllipse(20 + i * 45, 60 + Math.sin(i) * 20, 40, 12);
        }
        bg.fillStyle(0x90e0ef, 0.15);
        for (let i = 0; i < 5; i++) {
            bg.fillCircle(50 + i * 70, 140 + i * 15, 18);
        }
        bg.fillStyle(0x023e8a, 0.3);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'sunset') {
        bg.fillStyle(0xff6b35, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0xf7c59f, 0.8);
        bg.fillRect(0, 0, w, wallHeight * 0.5);
        bg.fillStyle(0xef476f, 0.4);
        bg.fillCircle(w / 2, wallHeight * 0.6, 50);
        bg.fillStyle(0xffd166, 0.6);
        bg.fillCircle(w / 2 - 20, wallHeight * 0.55, 30);
        bg.fillStyle(0x26547c, 0.2);
        for (let i = 0; i < 10; i++) {
            bg.fillCircle(i * 40, 80 + Math.sin(i) * 12, 6);
        }
        bg.fillStyle(0xef476f, 0.3);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'forest') {
        bg.fillStyle(0x1b4332, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0x2d6a4f, 0.7);
        for (let i = 0; i < 12; i++) {
            const tx = i * 30 + 10;
            bg.fillTriangle(tx, wallHeight, tx - 12, wallHeight * 0.4, tx + 12, wallHeight * 0.4);
        }
        bg.fillStyle(0x52b788, 0.15);
        for (let i = 0; i < 15; i++) {
            bg.fillCircle(Math.random() * w, Math.random() * wallHeight, 2);
        }
        bg.fillStyle(0x40916c, 0.3);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'space') {
        bg.fillStyle(0x0b0b1a, 1);
        bg.fillRect(0, 0, w, wallHeight);
        for (let i = 0; i < 50; i++) {
            bg.fillStyle(0xffffff, 0.3 + Math.random() * 0.7);
            bg.fillCircle(Math.random() * w, Math.random() * wallHeight, 0.5 + Math.random() * 2);
        }
        bg.fillStyle(0x4a4aff, 0.08);
        bg.fillCircle(w * 0.2, wallHeight * 0.3, 40);
        bg.fillCircle(w * 0.8, wallHeight * 0.7, 55);
        bg.lineStyle(1, 0xffffff, 0.03);
        for (let i = 0; i < 8; i++) {
            const sx = Math.random() * w;
            const sy = Math.random() * wallHeight;
            bg.lineBetween(sx, sy, sx + (Math.random() - 0.5) * 40, sy + (Math.random() - 0.5) * 40);
        }
        bg.fillStyle(0x1a1a4e, 0.3);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'lavender') {
        bg.fillStyle(0x9b72cf, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0xc9b1ff, 0.5);
        for (let i = 0; i < 20; i++) {
            bg.fillCircle(Math.random() * w, Math.random() * wallHeight, 6 + Math.random() * 10);
        }
        bg.fillStyle(0xe5d9f2, 0.2);
        for (let i = 0; i < 6; i++) {
            bg.fillEllipse(30 + i * 55, 120 + (i % 2) * 30, 40, 8);
        }
        bg.fillStyle(0x7c3e9e, 0.3);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'volcano') {
        bg.fillStyle(0x1a0a00, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0xff4500, 0.25);
        for (let i = 0; i < 5; i++) {
            bg.fillCircle(60 + i * 70, wallHeight - 30, 25 + Math.sin(i) * 10);
        }
        bg.fillStyle(0xff6600, 0.15);
        for (let i = 0; i < 12; i++) {
            bg.fillCircle(Math.random() * w, wallHeight - Math.random() * 60, 3 + Math.random() * 8);
        }
        bg.fillStyle(0xffcc00, 0.08);
        bg.fillCircle(w / 2, 30, 35);
        bg.fillStyle(0x2d1300, 0.6);
        bg.fillTriangle(0, 0, 20, wallHeight, -20, wallHeight);
        bg.fillTriangle(w, 0, w + 20, wallHeight, w - 20, wallHeight);
        bg.fillStyle(0xff4500, 0.08);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'arctic') {
        bg.fillStyle(0x0a1628, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0x00ff88, 0.08);
        for (let i = 0; i < 6; i++) {
            bg.fillEllipse(30 + i * 60, 40 + i * 20, 50, 8);
        }
        bg.fillStyle(0x00ccff, 0.06);
        for (let i = 0; i < 6; i++) {
            bg.fillEllipse(50 + i * 55, 60 + i * 18, 45, 6);
        }
        bg.fillStyle(0x8844ff, 0.05);
        for (let i = 0; i < 6; i++) {
            bg.fillEllipse(20 + i * 65, 80 + i * 15, 40, 5);
        }
        bg.fillStyle(0xffffff, 0.4);
        for (let i = 0; i < 40; i++) {
            bg.fillCircle(Math.random() * w, Math.random() * wallHeight, 0.5 + Math.random() * 2);
        }
        bg.fillStyle(0x1a3a5c, 0.6);
        bg.fillRect(0, wallHeight - 30, w, 30);
        bg.fillStyle(0xd0e8f0, 0.2);
        for (let i = 0; i < 6; i++) {
            bg.fillTriangle(20 + i * 60, wallHeight - 30, 28 + i * 60, wallHeight - 55, 36 + i * 60, wallHeight - 30);
        }
        bg.fillStyle(0x00ccff, 0.15);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'pixel') {
        bg.fillStyle(0x0d0d2b, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0x3b1f6e, 0.5);
        bg.fillRect(0, wallHeight - 40, w, 40);
        for (let x = 0; x < w; x += 16) {
            for (let y = 0; y < wallHeight - 40; y += 16) {
                if (Math.random() < 0.03) {
                    bg.fillStyle(0xffffff, 0.3 + Math.random() * 0.5);
                    bg.fillRect(x, y, 4, 4);
                }
            }
        }
        bg.fillStyle(0x44aa22, 0.3);
        for (let i = 0; i < 6; i++) {
            bg.fillRect(20 + i * 55, wallHeight - 44, 12, 16);
        }
        bg.fillStyle(0x8866ff, 0.5);
        bg.fillRect(30, 90, 12, 20);
        bg.fillRect(50, 70, 12, 40);
        bg.fillRect(70, 100, 12, 10);
        bg.fillStyle(0x44aaff, 0.5);
        bg.fillRect(170, 60, 12, 50);
        bg.fillRect(190, 80, 12, 30);
        bg.fillRect(210, 50, 12, 60);
        bg.fillStyle(0x221144, 0.3);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'japan') {
        bg.fillStyle(0xfef0e0, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0xffb7c5, 0.4);
        for (let i = 0; i < 15; i++) {
            const cx = 30 + Math.random() * (w - 60);
            const cy = 30 + Math.random() * (wallHeight - 80);
            for (let p = 0; p < 5; p++) {
                const a = (p / 5) * Math.PI * 2;
                bg.fillEllipse(cx + Math.cos(a) * 5, cy + Math.sin(a) * 5, 8, 6);
            }
        }
        bg.fillStyle(0xd4a373, 0.5);
        for (let i = 0; i < 4; i++) {
            bg.fillRect(30 + i * 90, wallHeight - 40, 5, 35);
        }
        bg.fillStyle(0x6b8e23, 0.25);
        for (let i = 0; i < 4; i++) {
            bg.fillTriangle(20 + i * 90, wallHeight - 45, 32 + i * 90, wallHeight - 70, 44 + i * 90, wallHeight - 45);
        }
        bg.fillStyle(0xff8c94, 0.15);
        bg.fillCircle(w / 2, 30, 28);
        bg.fillStyle(0xccaacc, 0.2);
        for (let i = 0; i < 5; i++) {
            bg.fillEllipse(20 + i * 80, 180 + (i % 2) * 25, 30, 6);
        }
        bg.fillStyle(0xd4a373, 0.2);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'egypt') {
        bg.fillStyle(0x1a1208, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0xc8a84b, 0.7);
        bg.fillTriangle(60, wallHeight - 20, 120, 50, 180, wallHeight - 20);
        bg.fillTriangle(220, wallHeight - 20, 260, 80, 300, wallHeight - 20);
        bg.fillStyle(0x8b6914, 0.5);
        bg.fillTriangle(65, wallHeight - 20, 120, 60, 175, wallHeight - 20);
        bg.fillTriangle(225, wallHeight - 20, 260, 90, 295, wallHeight - 20);
        bg.fillStyle(0xc8a84b, 0.3);
        for (let i = 0; i < 20; i++) {
            const cx = Math.random() * w;
            const cy = Math.random() * (wallHeight - 40);
            bg.fillRect(cx, cy, 2, 2);
        }
        bg.fillStyle(0x8b6914, 0.15);
        bg.strokeCircle(w / 2, 45, 22);
        bg.strokeCircle(w / 2 - 30, 70, 15);
        bg.strokeCircle(w / 2 + 30, 70, 15);
        bg.fillStyle(0x2a1f0d, 0.4);
        bg.fillRect(0, wallHeight - 15, w, 15);
        bg.fillStyle(0xc8a84b, 0.08);
        for (let i = 0; i < 8; i++) {
            bg.fillRect(10 + i * 45, wallHeight - 15, 3, 8);
        }
        bg.fillStyle(0x8b6914, 0.2);
        bg.fillRect(0, this.beltY - 4, w, 4);
    } else if (this.currentTheme === 'cyberpunk') {
        bg.fillStyle(0x0a0e1a, 1);
        bg.fillRect(0, 0, w, wallHeight);
        bg.fillStyle(0x220044, 0.4);
        for (let i = 0; i < 8; i++) {
            bg.fillRect(15 + i * 42, wallHeight - 80 - Math.random() * 60, 20, 80 + Math.random() * 60);
        }
        bg.fillStyle(0xff00ff, 0.12);
        for (let i = 0; i < 8; i++) {
            const rx = 15 + i * 42;
            const ry = wallHeight - 80 - Math.random() * 60;
            bg.fillRect(rx, ry + 10, 20, 3);
        }
        bg.fillStyle(0x00ffff, 0.1);
        for (let i = 0; i < 6; i++) {
            bg.fillRect(20 + i * 55, 30 + i * 25, 2, 60);
        }
        bg.fillStyle(0xffff00, 0.04);
        for (let i = 0; i < 20; i++) {
            bg.fillCircle(Math.random() * w, Math.random() * wallHeight * 0.5, 1 + Math.random() * 2);
        }
        bg.fillStyle(0x220033, 0.3);
        bg.fillRect(0, this.beltY - 4, w, 4);
    }
  }

    spawnNextFlask() {
     if (this.completedFlasksInLevel === 0) {
        this.showLevelIntro(this.level);
     }
     // Assign challenge modifier on levels 3+ (25% chance)
     if (this.level >= 3 && Math.random() < 0.25) {
       this.currentChallengeModifier = this.challengeModifiers[Phaser.Math.Between(0, this.challengeModifiers.length - 1)].id;
     } else {
       this.currentChallengeModifier = null;
     }
     const target = Colors.generateTarget(this.level * 10 + this.completedFlasksInLevel);
     const x = -100;
    const y = this.beltY - 45; 

    const flask = this.add.container(x, y);
    flask.setDepth(20);

    const bg = this.add.graphics();
    // 100% OPAQUE - No Translucency (colors stand out vividly)
    this.drawFlaskGeometry(bg, 0xffffff, 1);

    const outline = this.add.graphics();
    this.drawFlaskOutlineAndFace(flask, outline);

    // Progress Bar background
    const progressBarBg = this.add.graphics();
    progressBarBg.fillStyle(0x1e272c, 0.5);
    progressBarBg.fillRoundedRect(-18, 28, 36, 8, 4);
    const progressBarFill = this.add.graphics();
    progressBarFill.fillStyle(0x2ed573, 1);
    progressBarFill.fillRoundedRect(-18, 28, 0, 8, 4);

    // Progress Text
    const progressTxt = this.add.text(0, -65, '0%', { fontSize: '20px', color: '#2f3542', fontStyle: 'bold', stroke: '#fff', strokeThickness: 4 }).setOrigin(0.5);

    // Challenge modifier badge
    let modBadge: Phaser.GameObjects.Container | null = null;
    const badgeFlaskMod = this.getFlaskModifier();
    if (badgeFlaskMod) {
      modBadge = this.add.container(0, -85);
      const badgeBg = this.add.rectangle(0, 0, 80, 16, 0x000000, 0.6).setStrokeStyle(1, parseInt(badgeFlaskMod.color.replace('#', '0x')));
      const badgeTxt = this.add.text(0, 0, badgeFlaskMod.name, { fontSize: '9px', color: badgeFlaskMod.color, fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
      modBadge.add([badgeBg, badgeTxt]);
    }

    flask.add([bg, outline, progressBarBg, progressBarFill, progressTxt]);
    if (modBadge) flask.add(modBadge);

    (flask as any).bg = bg;
    (flask as any).outlineGraphics = outline;
    (flask as any).progressTxt = progressTxt;
    (flask as any).progressBarFill = progressBarFill;
    (flask as any).targetDose = target;
    (flask as any).currentDose = { r: 0, b: 0, y: 0 };
    (flask as any).history = [];

    this.physics.world.enable(flask);
    this.flasksGroup.add(flask);

    const body = flask.body as Phaser.Physics.Arcade.Body;
    body.setAllowGravity(false);
    body.setImmovable(true);
    body.setSize(80, 20);
    body.setOffset(-40, -45); 

    // Update the Target UI element
    const tColor = Colors.mixRYB(target);
    this.currentTargetColor = tColor;
    const tName = Colors.getTargetName(tColor);
    const tRecipe = this.getRecipeString(tColor);
    
    // Draw wood chalkboard target board with gorgeous nested layers!
    this.targetMonitorBg.clear();
    const r = this.xRatio;
    // Walnut wood shadow frame
    this.targetMonitorBg.fillStyle(0x27140a, 0.85);
    this.targetMonitorBg.fillRoundedRect(Math.round(18 * r), 41, this.scale.width - Math.round(30 * r), 88, 12);
    // Rich cedar frame
    this.targetMonitorBg.fillStyle(0x5c2e16, 1);
    this.targetMonitorBg.fillRoundedRect(Math.round(15 * r), 38, this.scale.width - Math.round(30 * r), 88, 12);
    this.targetMonitorBg.lineStyle(4, 0x3d1c0b, 1);
    this.targetMonitorBg.strokeRoundedRect(Math.round(15 * r), 38, this.scale.width - Math.round(30 * r), 88, 12);
    // Dark stone-slate pizarra (chalkboard)
    this.targetMonitorBg.fillStyle(0x1f2724, 1);
    this.targetMonitorBg.fillRoundedRect(Math.round(23 * r), 46, this.scale.width - Math.round(46 * r), 72, 8);
    this.targetMonitorBg.lineStyle(2, 0xffeaad, 0.2);
    this.targetMonitorBg.strokeRoundedRect(Math.round(23 * r), 46, this.scale.width - Math.round(46 * r), 72, 8);

    // Set state-aware contextual title labels on chalkboard
    this.targetLabelText.setText(`LEVEL ${this.level} • ORDER ${this.completedFlasksInLevel + 1}/${this.totalFlasksInLevel}`);
    
    this.targetSignText.setText(`${tName}`);
    this.targetSignText.setColor('#' + tColor.toString(16).padStart(6, '0'));
    this.targetRecipeText.setText(`${tRecipe}`);
    
    this.drawFlaskGeometry(this.targetUIFlaskLiq, tColor, 1);
    this.drawFlaskOutlineAndFace(this.targetFlaskCont, this.targetUIOutline);

    // Dynamic reward coins indicator! ("Afficher les coins qu'on va gagner")
    let reward = 50;
    if (tColor === 0xff8800 || tColor === 0x22cc44 || tColor === 0x9933cc) {
        reward = 100;
    } else if (tColor === 0x664422) {
        reward = 150;
    }
    const flaskMod = this.getFlaskModifier();
    if (flaskMod) reward = Math.round(reward * flaskMod.rewardMult);
    this.pendingRewardCoins = reward;
    this.targetCoinsText.setText(`$+${reward}`);

    if (this.completedFlasksInLevel === 0 && this.levelTimerBase === 0) {
        this.levelTimerBase = this.calcLevelTimer(this.level, this.totalFlasksInLevel);
        this.timeLeft = this.levelTimerBase;
        this.timerText.setColor('#ffd700');
        this.timerText.setText(`⏱️ ${this.timeLeft}s`);
    }

    this.currentFlask = flask;

    // Generate faucet-matching buttons on the bottom panel
    this.generatePanelButtons();
  }

  generatePanelButtons() {
    this.activePanelElements.forEach((el) => el.destroy());
    this.activePanelElements = [];

    const w = this.scale.width;
    const panelY = 480;

    // The 3 colors/taps are always available (unlocked)
    const enabledIndices = [0, 1, 2];

    // Position the buttons horizontally matching faucet columns
    this.tapColors.forEach((colorId, idx) => {
      let bx = Math.round(80 * this.xRatio);
      if (idx === 0) bx = Math.round(90 * this.xRatio);
      else if (idx === 1) bx = Math.round(200 * this.xRatio);
      else bx = Math.round(310 * this.xRatio);

      const by = panelY + 95;

      // Find the details of this faucet's color
      const shopItem = SHOP_ITEMS.find(item => item.id === colorId);
      const colorName = shopItem ? shopItem.name : 'Unknown';
      const colorVal = shopItem ? shopItem.color : 0xcccccc;

      const isEnabled = enabledIndices.includes(idx);

      if (!isEnabled) {
         // Locked command button for this turn
         const btnShadow = this.add.circle(bx, by + 4, 30, 0x110803).setDepth(51);
         const bcont = this.add.container(bx, by).setDepth(52);
         const bbody = this.add.circle(0, 0, 30, 0x4d3222).setStrokeStyle(4, 0x221105);
         const blockIcon = this.add.text(0, -2, '🔒', { fontSize: '20px' }).setOrigin(0.5);
         bcont.add([bbody, blockIcon]);

         const blabel = this.add.text(bx, by + 42, 'LOCKED', { fontSize: '10px', color: '#ff4c4c', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5).setDepth(52);

         this.activePanelElements.push(btnShadow, bcont, blabel);
      } else {
         // Active command button
         const btnShadow = this.add.circle(bx, by + 4, 30, 0x221105).setDepth(51);
         
         const bcont = this.add.container(bx, by).setDepth(52);
         const bbody = this.add.circle(0, 0, 30, colorVal).setStrokeStyle(4, 0x2f3542);
         const bhl = this.add.circle(-8, -8, 12, 0xffffff, 0.4);
         bcont.add([bbody, bhl]);

          // Draw 3 mini stock dots above the button to show depletion
          const stockCount = this.dropletStocks[colorId] !== undefined ? this.dropletStocks[colorId] : 3;
         const dotY = by - 38;
         const dotSpacing = 8;
         const startDotX = bx - (1 * dotSpacing);
         for (let dotIdx = 0; dotIdx < 3; dotIdx++) {
            const dotX = startDotX + dotIdx * dotSpacing;
            const outerDot = this.add.circle(dotX, dotY, 3, 0x110803).setDepth(51);
            this.activePanelElements.push(outerDot);
            
            if (dotIdx < stockCount) {
               const innerDot = this.add.circle(dotX, dotY, 2, 0x00ffcc).setDepth(52);
               this.activePanelElements.push(innerDot);
            } else {
               const innerDot = this.add.circle(dotX, dotY, 1.8, 0x4b5563).setDepth(52);
               this.activePanelElements.push(innerDot);
            }
         }

        // Active tap label ("TAP 1", "TAP 2", "TAP 3")
        const tapLabelName = `TAP ${idx + 1}`;
         const blabel = this.add.text(bx, by + 42, `${tapLabelName}\n(${colorName})`, { 
           fontSize: '10px', 
           color: '#ffd3a3', 
           fontStyle: 'bold', 
           fontFamily: 'monospace',
           align: 'center'
         }).setOrigin(0.5).setDepth(52);

         const hit = this.add.circle(bx, by, 38).setInteractive({ useHandCursor: true }).setDepth(53);

         hit.on('pointerdown', () => {
             bcont.y = by + 4;
             blabel.y = by + 46;
             const dispenseCfg = {
                color: colorVal,
                dispenseType: colorId
             };
             this.dispenseDropConfig(dispenseCfg, bx);
             const associatedHandle = this.tapHandles[idx];
             if (associatedHandle) {
                 this.tweens.add({
                     targets: associatedHandle,
                     angle: '+360',
                     duration: 350,
                     ease: 'Back.easeOut'
                 });
             }
         });
         
         hit.on('pointerup', () => { bcont.y = by; blabel.y = by + 42; });
         hit.on('pointerout', () => { bcont.y = by; blabel.y = by + 42; });

         this.activePanelElements.push(btnShadow, bcont, blabel, hit);
      }
    });
  }

  dispenseDropConfig(cfg: any, xPos: number) {
    if (this.isValidating || !this.currentFlask || this.timeLeft <= 0 || this.isShopOpen || this.isAdRunning || this.isHintOpen) return;

    // Set target alignment station for the current flask to match the dispensed drop X position
    (this.currentFlask as any).targetXStation = xPos;

    Audio.initAudio();
    const type = cfg.dispenseType; // 'r', 'b', or 'y'
    if (this.dropletStocks[type] !== undefined) {
         if (this.dropletStocks[type] <= 0) {
              Audio.playBuzzer();
              // Shake faucet to indicate empty
              const tapIdx = (type === 'r') ? 0 : (type === 'b') ? 1 : 2;
              const tap = this.taps[tapIdx];
              if (tap) {
                  this.tweens.add({
                      targets: tap,
                      x: { from: this.tapXList[tapIdx] - 6, to: this.tapXList[tapIdx] + 6 },
                      duration: 40,
                      yoyo: true,
                      repeat: 2
                  });
              }
              // Open quick out-of-drops $10 prompt!
              this.showOutofDropsPrompt(type);
              return;
         }
         this.dropletStocks[type]--;
         this.updateTapStockLabel(type);
         this.generatePanelButtons(); // Update mini stock dots live!
    }

    const soundType = cfg.dispenseType === 'r' ? 'R' : cfg.dispenseType === 'b' ? 'B' : 'Y';
    Audio.playDrop(soundType as any);
    
    const tx = xPos;
    const ty = 240;

    const dropG = this.add.graphics();
    const skin = this.activeDropSkins[type] || 'classic';

    if (skin === 'ruby_r' || skin === 'sapphire_b' || skin === 'topaz_y') {
       // Gem skin! Beautiful glossy diamond crystal droplet
       dropG.fillStyle(cfg.color, 1);
       dropG.lineStyle(2, 0xffffff, 0.95);
       dropG.beginPath();
       dropG.moveTo(0, -14);
       dropG.lineTo(8, -2);
       dropG.lineTo(5, 8);
       dropG.lineTo(-5, 8);
       dropG.lineTo(-8, -2);
       dropG.closePath();
       dropG.fillPath();
       dropG.strokePath();
       
       // Shine glint
       dropG.fillStyle(0xffffff, 0.95);
       dropG.fillCircle(-2, -3, 2.5);
    } else if (skin === 'magma_r') {
       // Magma Lava skin: hot glowing fire with dynamic dark outline
       dropG.fillStyle(0x1a0505, 1);
       dropG.lineStyle(2, 0xff3b30, 1);
       dropG.beginPath();
       dropG.arc(0, 6, 9, 0, Math.PI, false);
       dropG.lineTo(0, -13);
       dropG.closePath();
       dropG.fillPath();
       dropG.strokePath();

       // Luminous core
       dropG.fillStyle(0xff3f3f, 1);
       dropG.beginPath();
       dropG.arc(0, 5, 5.5, 0, Math.PI, false);
       dropG.lineTo(0, -8);
       dropG.closePath();
       dropG.fillPath();

       // Core fire highlight
       dropG.fillStyle(0xffcc00, 1);
       dropG.fillCircle(0, 3, 2);
    } else if (skin === 'plasma_b') {
       // Plasma Bolt skin: glowing lightning blue orb
       dropG.fillStyle(0x0a192f, 0.9);
       dropG.lineStyle(2.8, 0x00f3ff, 1);
       dropG.beginPath();
       dropG.arc(0, 6, 8, 0, Math.PI, false);
       dropG.lineTo(0, -12);
       dropG.closePath();
       dropG.fillPath();
       dropG.strokePath();

       // Glowing core
       dropG.fillStyle(0xffffff, 1);
       dropG.fillCircle(0, 3, 3);
    } else if (skin === 'solar_y') {
       // Solar flare yellow skin
       dropG.fillStyle(0xff9f43, 1);
       dropG.lineStyle(2, 0xffea00, 1);
       dropG.beginPath();
       dropG.arc(0, 6, 8, 0, Math.PI, false);
       dropG.lineTo(0, -12);
       dropG.closePath();
       dropG.fillPath();
       dropG.strokePath();

       // Glowing starry spark core
       dropG.fillStyle(0xffea00, 1);
       dropG.fillCircle(0, 4, 4);
       dropG.fillStyle(0xffffff, 0.95);
       dropG.fillRect(-1, 0, 2, 8);
       dropG.fillRect(-3, 3, 6, 2);
    } else {
       // Classic teardrop
       dropG.fillStyle(cfg.color, 1);
       dropG.lineStyle(2.5, 0x2f3542, 1);
       dropG.beginPath();
       dropG.arc(0, 6, 8, 0, Math.PI, false);
       dropG.lineTo(0, -12);
       dropG.closePath();
       dropG.fillPath();
       dropG.strokePath();
    }

    // Drop skin particle effects
    const dropParticleColor = skin.includes('magma') ? 0xff3b30 : skin.includes('plasma') ? 0x00f3ff : skin.includes('solar') ? 0xffea00 : skin.includes('ruby') ? 0xff0044 : skin.includes('sapphire') ? 0x0044ff : skin.includes('topaz') ? 0xff8800 : cfg.color;
    for (let ip = 0; ip < 4; ip++) {
      const p = this.add.circle(tx + Phaser.Math.Between(-6, 6), ty + Phaser.Math.Between(-6, 6), Phaser.Math.Between(1.5, 3), dropParticleColor, 0.8).setDepth(26);
      this.tweens.add({
        targets: p,
        x: p.x + Phaser.Math.Between(-20, 20),
        y: p.y + Phaser.Math.Between(-30, 0),
        alpha: 0,
        scale: 0.2,
        duration: Phaser.Math.Between(200, 400),
        onComplete: () => p.destroy()
      });
    }

    const d = this.add.container(tx, ty, [dropG]);
    d.setDepth(25);
    (d as any).colorType = cfg.dispenseType;
    (d as any).colorValue = cfg.color;
    this.physics.world.enable(d);
    
    const body = d.body as Phaser.Physics.Arcade.Body;
     body.setCircle(10, -10, -5); 
     body.setVelocity(0, 280);
     body.setGravityY(800);

    this.dropsGroup.add(d);
  }

  getRecipeString(color: number): string {
    if (color === Colors.RYB.R) return 'PURE RED';
    if (color === Colors.RYB.B) return 'PURE BLUE';
    if (color === Colors.RYB.Y) return 'PURE YELLOW';
    if (color === 0xff8800) return 'RED + YELLOW';
    if (color === 0x22cc44) return 'BLUE + YELLOW';
    if (color === 0x9933cc) return 'RED + BLUE';
    if (color === 0x664422) return 'RED + BLUE + YELLOW';
    return '';
  }

  handleDropFlask(obj1: any, obj2: any) {
    if (this.isValidating) return;

    let drop = obj1 as any;
    let flask = obj2 as any;
    if (obj2.colorType !== undefined) {
        drop = obj2;
        flask = obj1;
    }

    const type = drop.colorType;
    if (!type || !flask.currentDose) return;

    const f = flask;
    const size = (type === 'orange' || type === 'green' || type === 'purple') ? 2 : 1;

    if (f.history.length + size > 99) {
        this.createSplashParticles(flask.x, flask.y - 45, drop.colorValue);
        drop.destroy();
        Audio.playHit();
        return; 
    }

    if (type === 'orange') {
        f.history.push('orange');
        f.currentDose.r++;
        f.currentDose.y++;
    } else if (type === 'green' || type === 'cyan') {
        f.history.push(type);
        f.currentDose.b++;
        f.currentDose.y++;
    } else if (type === 'purple' || type === 'magenta') {
        f.history.push(type);
        f.currentDose.r++;
        f.currentDose.b++;
    } else if (type === 'brown') {
        f.history.push('brown');
        f.currentDose.r++;
        f.currentDose.b++;
        f.currentDose.y++;
    } else if (type === 'white') {
        f.history.push('white');
        // Subtract 1 of the largest excess dose element if any, acting as a neutralizer or detergent!
        if (f.currentDose.r > f.targetDose.r) f.currentDose.r = Math.max(0, f.currentDose.r - 1);
        else if (f.currentDose.b > f.targetDose.b) f.currentDose.b = Math.max(0, f.currentDose.b - 1);
        else if (f.currentDose.y > f.targetDose.y) f.currentDose.y = Math.max(0, f.currentDose.y - 1);
        else {
           // Otherwise, default subtraction
           f.currentDose.r = Math.max(0, f.currentDose.r - 1);
        }
    } else {
        f.history.push(type);
        if (f.currentDose[type] !== undefined) {
            f.currentDose[type]++;
        }
    }

    drop.destroy();
    Audio.playHit();

    this.updateFlaskVisuals(f);

    this.tweens.add({
        targets: flask,
        scaleY: 0.85,
        scaleX: 1.15,
        y: flask.y + 8,
        duration: 80,
        yoyo: true
    });

    this.createBubbleEffect(flask);
    this.createImpactRing(flask.x, flask.y - 40, drop.colorValue || 0xffffff);
   }

   updateFlaskVisuals(f: any) {
    const currentTotal = f.currentDose.r + f.currentDose.b + f.currentDose.y;
    
    if (currentTotal > 0) {
        const curColor = Colors.mixRYB(f.currentDose);
        this.drawFlaskGeometry(f.bg, curColor, 1);
    } else {
        this.drawFlaskGeometry(f.bg, 0xffffff, 1);
    }

    if (f.outlineGraphics) {
        this.drawFlaskOutlineAndFace(f, f.outlineGraphics);
    }

    const matchPercent = Colors.getSimilarityPercentage(f.currentDose, f.targetDose);
    f.progressTxt.setText(`${matchPercent}%`);
    f.progressTxt.setColor(matchPercent === 100 ? '#2ed573' : '#2f3542');
    if (f.progressBarFill) {
      f.progressBarFill.clear();
      const barColor = matchPercent === 100 ? 0x2ed573 : matchPercent > 70 ? 0xf39c12 : 0xff4757;
      f.progressBarFill.fillStyle(barColor, 1);
      const fillW = (matchPercent / 100) * 36;
      f.progressBarFill.fillRoundedRect(-18, 28, fillW, 8, 4);
      if (matchPercent >= 99.5) {
        f.progressBarFill.fillStyle(0xffffff, 0.3);
        f.progressBarFill.fillRoundedRect(-18, 28, fillW, 8, 4);
      }
    }
  }

  undoDrop(): boolean {
      if (!this.currentFlask || this.isValidating || this.timeLeft <= 0) return false;
      
      const f = this.currentFlask as any;
      if (f.history && f.history.length > 0) {
          const type = f.history.pop();
          if (type === 'orange') {
              f.currentDose.r = Math.max(0, f.currentDose.r - 1);
              f.currentDose.y = Math.max(0, f.currentDose.y - 1);
          } else if (type === 'green' || type === 'cyan') {
              f.currentDose.b = Math.max(0, f.currentDose.b - 1);
              f.currentDose.y = Math.max(0, f.currentDose.y - 1);
          } else if (type === 'purple' || type === 'magenta') {
              f.currentDose.r = Math.max(0, f.currentDose.r - 1);
              f.currentDose.b = Math.max(0, f.currentDose.b - 1);
          } else if (type === 'brown') {
              f.currentDose.r = Math.max(0, f.currentDose.r - 1);
              f.currentDose.b = Math.max(0, f.currentDose.b - 1);
              f.currentDose.y = Math.max(0, f.currentDose.y - 1);
          } else if (type === 'white') {
              // White detergent has no inverse dose state, simply update visuals
          } else {
              if (f.currentDose[type] !== undefined) {
                  f.currentDose[type] = Math.max(0, f.currentDose[type] - 1);
              }
          }
          this.updateFlaskVisuals(f);
          return true;
      }
      return false;
  }

  validateFlask() {
    if (!this.currentFlask || this.isValidating || this.timeLeft <= 0) return;
    
    this.isValidating = true;
    const flask = this.currentFlask;
    const f = flask as any;

    this.scannerGroup.x = flask.x;
    this.scannerGroup.y = -200;
    
     this.tweens.add({
         targets: this.scannerGroup,
         y: flask.y - 120,
         duration: 200,
         ease: 'Power2',
        onComplete: () => {
            const matchPercent = Colors.getSimilarityPercentage(f.currentDose, f.targetDose);
            const isMatch = matchPercent === 100;

            Audio.playLaser();

            if (isMatch) {
                Audio.playWin();

                this.flashScreen(0x2ed573, 500);
                this.cameras.main.shake(120, 0.008);

                // Burst satisfying colorful confetti on winning mix!
                this.spawnConfettiRain(45);

                try {
                    const mixedHex = Colors.mixRYB(f.currentDose);
                    const nameKey = Colors.getTargetName(mixedHex).toLowerCase();
                    if (this.mixedColorsCounts[nameKey] !== undefined) {
                        this.mixedColorsCounts[nameKey]++;
                    } else {
                        this.mixedColorsCounts[nameKey] = 1;
                    }
                } catch (e) {
                    console.error("Mixed colors increment", e);
                }
                this.streak++;
                const pts = 100 * this.streak;
                this.score += pts;
                this.coins += this.pendingRewardCoins;
                this.levelCoinsEarnedInSession += this.pendingRewardCoins;
                this.saveGameState();

                this.scannerLight.setFillStyle(0x2ed573);
                f.progressTxt.setText('PERFECT!');
                f.progressTxt.setColor('#2ed573');
                
                const ptTxt = this.add.text(flask.x, flask.y - 140, `+${pts} PTS\n$+${this.pendingRewardCoins}`, { 
                    fontSize:'24px', 
                    color:'#2ed573', 
                    fontStyle:'bold', 
                    stroke:'#000', 
                    strokeThickness: 5,
                    align: 'center',
                    fontFamily: 'sans-serif'
                }).setOrigin(0.5).setDepth(100);
                this.tweens.add({ targets: ptTxt, y: ptTxt.y - 60, alpha: 0, duration: 800, onComplete:()=>ptTxt.destroy()});

                setTimeout(() => {
                    this.scannerLight.setFillStyle(0x747d8c);
                    this.tweens.add({ targets: this.scannerGroup, y: -200, duration: 200 });
                    
                    // Spawn package container exactly at the flask's current position
                    const boxCont = this.add.container(flask.x, flask.y).setDepth(21);
                    const boxG = this.add.graphics();
                    this.drawParcelBox(boxG, 70, 70);
                    boxCont.add(boxG);
                    boxCont.scale = 0;

                    // Play packaging seal audio chime!
                    Audio.playPackSound();

                    // Box packaging wrap animation (bounces into view over flask)
                    this.tweens.add({
                        targets: boxCont,
                        scale: 1,
                        angle: 360,
                        duration: 500,
                        ease: 'Back.easeOut',
                        onStart: () => {
                            // Make the original flask vanish instantly as it is now packaged
                            this.tweens.add({
                                targets: flask,
                                scale: 0,
                                alpha: 0,
                                duration: 250
                            });
                        },
                        onComplete: () => {
                            // Parabolic fly animation to stack platform
                            const targetX = Math.round(355 * this.xRatio);
                            const targetY = 332 - 12 - (this.completedCount * 22);

                             this.tweens.add({
                                 targets: boxCont,
                                 x: targetX,
                                 y: targetY,
                                 angle: -15,
                                 duration: 400,
                                 ease: 'Quad.easeInOut',
                                onComplete: () => {
                                    // Land with robust squash and impact audio
                                    Audio.playHit();
                                    boxCont.setAngle(0);
                                    
                                    this.tweens.add({
                                        targets: boxCont,
                                        scaleY: 0.8,
                                        scaleX: 1.25,
                                        y: targetY + 6,
                                        duration: 100,
                                        yoyo: true,
                                        onComplete: () => {
                                            // Register box reference
                                            this.stackedBoxes.push(boxCont);
                                            this.completedCount++;
                                            this.completedFlasksInLevel++;

                                            // Trigger realistic high-performance gold coins fountain burst
                                            this.sprayGoldCoins(targetX, targetY);

                                            // Ship stack out if 3 or more boxes are compiled
                                            if (this.completedCount >= 3) {
                                                setTimeout(() => {
                                                    this.deliverProductStack();
                                                }, 600);
                                            }

                                            // Destroy old flask and spawn new order
                                            flask.destroy();
                                            this.currentFlask = null;

                                             if (this.completedFlasksInLevel >= this.totalFlasksInLevel) {
                                                 if (!this.wasRevivedThisLevel) {
                                                     const pct = this.levelTimerBase > 0 ? this.timeLeft / this.levelTimerBase : 0;
                                                     MainScene.levelResults.push({ won: true, timeLeftPct: pct });
                                                     if (MainScene.levelResults.length > 5) MainScene.levelResults.shift();
                                                     MainScene.consecutiveWins++;
                                                     MainScene.consecutiveLosses = 0;
                                                 }
                                                 this.completeLevelSuccessFlow();
                                            } else {
                                                if (this.timeLeft > 0) {
                                                    this.isValidating = false;
                                                    this.spawnNextFlask();
                                                }
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }, 400);
 
            } else {
                Audio.playLose();
                this.streak = 0;
                this.scannerLight.setFillStyle(0xff4757);
                this.cameras.main.shake(150, 0.010);
                f.progressTxt.setText('FAIL!');
                f.progressTxt.setColor('#ff4757');

                setTimeout(() => {
                    this.scannerLight.setFillStyle(0x747d8c);
                    this.tweens.add({
                        targets: this.scannerGroup,
                        y: -200,
                        duration: 400,
                        onComplete: () => {
                            this.isValidating = false;
                            f.progressTxt.setText(`${Colors.getSimilarityPercentage(f.currentDose, f.targetDose)}%`);
                            f.progressTxt.setColor('#2f3542');
                        }
                    });
                }, 400);
            }
            
            this.updateScoreHUD();
        }
    });
  }

  updateHealthBar() {
     this.health = Math.max(0, Math.min(100, this.health));
     if (this.healthBarFill) {
        this.healthBarFill.width = 160 * (this.health / 100);
     }
     if (this.healthBarText) {
        this.healthBarText.setText(`🧪 STABILITY: ${Math.round(this.health)}%`);
     }
     if (this.timerText) {
        this.timerText.setText(`⏱️ ${this.timeLeft}s`);
        // Color-code the timer text for alerts!
        if (this.timeLeft <= 5) {
           this.timerText.setColor('#ff4757');
        } else if (this.timeLeft <= 10) {
           this.timerText.setColor('#ffa502');
        } else {
           this.timerText.setColor('#ffd700');
        }
     }
     
     if (this.healthBarFill) {
        if (this.health > 50) {
           this.healthBarFill.setFillStyle(0x2ed573);
        } else if (this.health > 25) {
           this.healthBarFill.setFillStyle(0xffa502);
        } else {
           this.healthBarFill.setFillStyle(0xff4757);
        }
     }
  }

  updateScoreHUD() {
     if (this.scoreText) {
        this.scoreText.setText(`💵 $ ${this.coins}`);
     }
  }

  showSimulatedVideoAd(adTitle: string, durationSeconds: number, onCompleteCallback: () => void) {
      if (this.isAdRunning) return;
      this.isAdRunning = true;

     const w = this.scale.width;
     const h = this.scale.height;
     const adContainer = this.add.container(w / 2, h / 2).setDepth(2500);

     // Dark background overlay (blocks interactions)
     const overlay = this.add.rectangle(0, 0, w, h, 0x05070c, 0.95).setInteractive();
     overlay.on('pointerdown', (p: any) => p.event.stopPropagation());
     overlay.on('pointerup', (p: any) => p.event.stopPropagation());
     adContainer.add(overlay);

     // Ad frame box
     const box = this.add.graphics();
     box.fillStyle(0x131924, 1);
     box.lineStyle(4, 0x00ffcc, 1);
     box.fillRoundedRect(-150, -170, 300, 340, 16);
     box.strokeRoundedRect(-150, -170, 300, 340, 16);
     adContainer.add(box);

     // Simulated Ad Video Banner (cute game console graphics)
     const innerAdDisplay = this.add.graphics();
     innerAdDisplay.fillStyle(0x0e1118, 1);
     innerAdDisplay.fillRoundedRect(-130, -148, 260, 170, 8);
     adContainer.add(innerAdDisplay);

     // Ad title & description
     const sponsorText = this.add.text(0, -162, "SPONSORED AD", {
         fontSize: '12px',
         color: '#00ffcc',
         fontStyle: 'bold',
         fontFamily: 'monospace'
     }).setOrigin(0.5);

     const gameText = this.add.text(0, -90, `🧪 ${adTitle.toUpperCase()} 🧪\nHIPNOTIC SORT GAME!`, {
         fontSize: '14px',
         color: '#ffffff',
         fontStyle: 'bold',
         fontFamily: 'sans-serif',
         align: 'center'
     }).setOrigin(0.5);

     const adSloganText = this.add.text(0, -40, "Play now for ultimate feedback!", {
         fontSize: '11px',
         color: '#a4b0be',
         fontStyle: 'italic',
         fontFamily: 'sans-serif'
     }).setOrigin(0.5);

     // Loading visual indicators
     const loadingText = this.add.text(0, 50, "Simulating Ad stream...", {
         fontSize: '12px',
         color: '#ffffff',
         fontFamily: 'monospace'
     }).setOrigin(0.5);

     const timerCountdownText = this.add.text(0, 80, `REWARD UNLOCKS IN ${durationSeconds}s`, {
         fontSize: '14px',
         color: '#ffd700',
         fontStyle: 'bold',
         fontFamily: 'monospace'
     }).setOrigin(0.5);

       // Progress bar behind text
      const progressBarBg = this.add.rectangle(0, 115, 200, 16, 0x1e272c).setStrokeStyle(1.5, 0x51636d);
      const progressBarFill = this.add.rectangle(-100, 115, 0, 16, 0x2ecc71).setOrigin(0, 0.5);
      
      adContainer.add([sponsorText, gameText, adSloganText, loadingText, timerCountdownText, progressBarBg, progressBarFill]);

      const adStartTime = Date.now();
      let lastDisplayedSec = durationSeconds;
      let completed = false;

      const finishAd = () => {
          if (completed) return;
          completed = true;
          Audio.playCashRegister();
          adContainer.destroy();
          this.isAdRunning = false;
          onCompleteCallback();
      };

      // UI update timer
      this.time.addEvent({
          delay: 100,
          repeat: Math.round(durationSeconds * 10) - 1,
          callback: () => {
              if (completed) return;
              const elapsed = Date.now() - adStartTime;
              const progress = Math.min(1, elapsed / (durationSeconds * 1000));
              if (progressBarFill.active) progressBarFill.width = 200 * progress;
              if (progress >= 1) { finishAd(); return; }
              const remainingSec = Math.ceil(durationSeconds - progress * durationSeconds);
              if (remainingSec !== lastDisplayedSec && remainingSec >= 0) {
                  lastDisplayedSec = remainingSec;
                  if (remainingSec > 0) {
                      if (timerCountdownText.active) timerCountdownText.setText(`REWARD UNLOCKS IN ${remainingSec}s`);
                      Audio.playCoinChime();
                  } else {
                      if (timerCountdownText.active) { timerCountdownText.setText("REWARD UNLOCKED! 🎁"); timerCountdownText.setColor("#2ecc71"); }
                  }
              }
          }
      });

      // Completion safeties (multiple layers to avoid blocking)
      this.time.delayedCall(durationSeconds * 1000, finishAd);
      setTimeout(finishAd, (durationSeconds * 1000) + 500);
   }

     showCrazyRewardedAd(adTitle: string, _durationSeconds: number, onCompleteCallback: () => void) {
        if (this.isAdRunning) return;

        const isCrazyEnv = window.location.hostname === 'crazygames.com' ||
                           window.location.hostname.endsWith('.crazygames.com');
        const sdk = (window as any).CrazyGames?.SDK;

        if (!isCrazyEnv || !sdk) {
           this.showAdUnavailableMessage(adTitle);
           return;
        }

        this.isAdRunning = true;

        sdk.ad.requestAd("rewarded")
           .then(() => {
              this.isAdRunning = false;
              onCompleteCallback();
           })
           .catch((error: any) => {
               console.warn("CrazyGames rewarded ad failed:", error);
               this.isAdRunning = false;
               this.showAdUnavailableMessage(adTitle);
             });
     }

     showAdUnavailableMessage(adTitle: string) {
        const w = this.scale.width;
        const h = this.scale.height;
        const cont = this.add.container(w / 2, h / 2).setDepth(2600);
        const veil = this.add.rectangle(0, 0, w, h, 0x000000, 0.75).setInteractive();
        veil.on('pointerdown', () => cont.destroy());
        const board = this.add.graphics();
        board.fillStyle(0x1e272e, 1);
        board.fillRoundedRect(-140, -60, 280, 120, 14);
        board.lineStyle(3, 0xffa502, 1);
        board.strokeRoundedRect(-140, -60, 280, 120, 14);
        const icon = this.add.text(0, -30, '📺', { fontSize: '28px' }).setOrigin(0.5);
        const title = this.add.text(0, 5, 'Ads unavailable', { fontSize: '16px', color: '#ffa502', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
        const sub = this.add.text(0, 25, 'Try again later', { fontSize: '11px', color: '#a4b0be', fontFamily: 'monospace' }).setOrigin(0.5);
        cont.add([veil, board, icon, title, sub]);
        this.time.delayedCall(2000, () => { if (cont.active) cont.destroy(); });
     }

   saveHighScore() {
      const sdk = (window as any).CrazyGames?.SDK;
      const canUseCrazy = sdk && (sdk.environment === 'local' || sdk.environment === 'crazygames');
      if (canUseCrazy && sdk.leaderboard) {
         sdk.leaderboard.setScore({ score: this.coins, data: JSON.stringify({ level: this.level }) })
            .then(() => {})
            .catch(() => {});
      }
   }

   showLeaderboardPopup() {
      if (this.isValidating || this.isAdRunning) return;

      const w = this.scale.width;
      const h = this.scale.height;
      const popup = this.add.container(w / 2, h / 2).setDepth(500);

      const veil = this.add.rectangle(0, 0, w * 2, h * 2, 0x000000, 0.8).setInteractive();
      veil.on('pointerdown', (p: any) => p.event.stopPropagation());

      const board = this.add.graphics();
      board.fillStyle(0x0c0d14, 0.95);
      board.fillRoundedRect(-155, -145, 310, 290, 16);
      board.fillStyle(0x131528, 0.98);
      board.fillRoundedRect(-150, -140, 300, 280, 16);
      board.lineStyle(4, 0xffd700, 1);
      board.strokeRoundedRect(-150, -140, 300, 280, 16);

      const title = this.add.text(0, -115, '🏆 LEADERBOARD 🏆', { fontSize: '16px', color: '#ffd700', fontStyle: 'bold', fontFamily: 'monospace', stroke: '#000', strokeThickness: 3 }).setOrigin(0.5);

      const sdk = (window as any).CrazyGames?.SDK;
      const canUseCrazy = sdk && (sdk.environment === 'local' || sdk.environment === 'crazygames');
      let yOff = -75;

      if (canUseCrazy && sdk.leaderboard) {
         const listCont = this.add.container(0, 0);
         const loadingText = this.add.text(0, yOff, 'Loading...', { fontSize: '12px', color: '#a4b0be', fontFamily: 'monospace' }).setOrigin(0.5);
         listCont.add(loadingText);

         sdk.leaderboard.getScores()
            .then((entries: any[]) => {
               listCont.removeAll(true);
               entries.slice(0, 20).forEach((entry, i) => {
                  const rank = entry.rank ?? (i + 1);
                  const name = entry.playerName || `Player${rank}`;
                  const score = entry.score ?? 0;
                  const medal = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : `${rank}.`;
                  const row = this.add.text(0, yOff + i * 18, `${medal} ${name.padEnd(16, ' ')} $${score}`, { fontSize: '10px', color: rank <= 3 ? '#ffd700' : '#ced6e0', fontFamily: 'monospace' }).setOrigin(0.5);
                  listCont.add(row);
               });
            })
            .catch(() => {
               listCont.removeAll(true);
               const err = this.add.text(0, yOff, 'Leaderboard unavailable', { fontSize: '12px', color: '#ff4757', fontFamily: 'monospace' }).setOrigin(0.5);
               listCont.add(err);
            });
         popup.add(listCont);
      } else {
         const mockEntries = [
            { rank: 1, name: '🧪 Alchemist', score: 9999 },
            { rank: 2, name: '🔥 ChemMaster', score: 7500 },
            { rank: 3, name: '💧 PotionPro', score: 5200 },
            { rank: 4, name: '— You —', score: this.coins },
            { rank: 5, name: '🌟 MixWizard', score: 3100 },
         ];
         mockEntries.forEach((entry, i) => {
            const medal = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `${entry.rank}.`;
            const row = this.add.text(0, yOff + i * 22, `${medal} ${entry.name.padEnd(16, ' ')} $${entry.score}`, { fontSize: '11px', color: entry.rank === 4 ? '#00f3ff' : entry.rank <= 3 ? '#ffd700' : '#ced6e0', fontFamily: 'monospace', fontStyle: entry.rank === 4 ? 'bold' : 'normal' }).setOrigin(0.5);
            popup.add(row);
         });
      }

      const closeCont = this.add.container(0, 120);
      const closeBase = this.add.rectangle(0, 3, 120, 34, 0x8c1c24).setStrokeStyle(3, 0x000);
      const closeBody = this.add.rectangle(0, 0, 120, 34, 0xd63031).setStrokeStyle(3, 0x000);
      const closeText = this.add.text(0, 0, 'CLOSE', { fontSize: '13px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
      closeCont.add([closeBase, closeBody, closeText]);

      const closeHit = this.add.rectangle(0, 120, 120, 34).setInteractive({ useHandCursor: true });
      closeHit.on('pointerdown', () => { closeBody.y = 3; closeText.y = 3; });
      closeHit.on('pointerup', () => { closeBody.y = 0; closeText.y = 0; popup.destroy(); });
      closeHit.on('pointerout', () => { closeBody.y = 0; closeText.y = 0; });

      popup.add([veil, board, title, closeCont, closeHit]);
      popup.setScale(0.9).setAlpha(0);
      this.tweens.add({ targets: popup, scale: 1, alpha: 1, duration: 300, ease: 'Back.easeOut' });
   }

   promptRefillUndosPopup() {
     if (this.isValidating || this.isAdRunning) return;
     
     const w = this.scale.width;
     const h = this.scale.height;

     // Create a blocker container to house the popup elements
     const popup = this.add.container(w / 2, h / 2).setDepth(450);

     // Blocker overlay to prevent accidental underlying clicks
     const veil = this.add.rectangle(0, 0, w * 2, h * 2, 0x000000, 0.8).setInteractive();
     veil.on('pointerdown', (p: any) => p.event.stopPropagation());
     veil.on('pointerup', (p: any) => p.event.stopPropagation());

     // Decorative graphics board
     const board = this.add.graphics();
     // Drop Shadow
     board.fillStyle(0x0c0d14, 0.95);
     board.fillRoundedRect(-155, -125, 310, 250, 16);
     // Main Panel Frame
     board.fillStyle(0xff4757, 1); // Stylish red matching the Undo Button theme
     board.fillRoundedRect(-150, -120, 300, 240, 16);
     board.lineStyle(5, 0x2f3542, 1);
     board.strokeRoundedRect(-150, -120, 300, 240, 16);

     // Inner chalkboard blackboard for details
     board.fillStyle(0x1e272e, 1);
     board.fillRoundedRect(-135, -60, 270, 110, 12);
     board.lineStyle(2.5, 0x2f3542, 1);
     board.strokeRoundedRect(-135, -60, 270, 110, 12);

     // Corner gold details
     board.fillStyle(0xffd700, 1);
     board.fillCircle(-138, -108, 4.5);
     board.fillCircle(138, -108, 4.5);
     board.fillCircle(-138, 108, 4.5);
     board.fillCircle(138, 108, 4.5);

     popup.add([veil, board]);

     // Title header text
     const titleText = this.add.text(0, -92, '🔄 OUT OF UNDOS! 🔄', {
         fontSize: '18px',
         color: '#ffffff',
         fontStyle: 'bold',
         fontFamily: 'sans-serif',
         stroke: '#000000',
         strokeThickness: 3
     }).setOrigin(0.5);
     popup.add(titleText);

     // Prompt clarification text
     const promptText = this.add.text(0, -5, 'Watch a quick video sponsor\nto unlock +3 FREE UNDOS?', {
         fontSize: '12px',
         color: '#f1f2f6',
         align: 'center',
         fontStyle: 'bold',
         fontFamily: 'sans-serif',
         lineSpacing: 5
     }).setOrigin(0.5);
     popup.add(promptText);

     // YES/WATCH Button (Claim/Watch Ad)
     const yesBtn = this.add.container(-60, 75);
     const yesBase = this.add.rectangle(0, 3, 100, 40, 0x10ac84).setStrokeStyle(3, 0x2f3542);
     const yesBody = this.add.rectangle(0, 0, 100, 40, 0x2ed573).setStrokeStyle(3, 0x2f3542);
     const yesText = this.add.text(0, 0, '🎬 WATCH', { fontSize: '12px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
     yesBtn.add([yesBase, yesBody, yesText]);

     const yesHit = this.add.rectangle(0, 0, 100, 40).setInteractive({ useHandCursor: true });
     yesHit.on('pointerdown', () => {
         yesBtn.setScale(0.92);
         yesBody.y = 3;
         yesText.y = 3;
     });
     yesHit.on('pointerup', () => {
         Audio.initAudio();
         Audio.playWin();
         popup.destroy();
         this.showVideoAdForUndos();
     });
     yesHit.on('pointerout', () => {
         yesBtn.setScale(1);
         yesBody.y = 0;
         yesText.y = 0;
     });
     yesBtn.add(yesHit);

     // NO/CANCEL Button
     const noBtn = this.add.container(60, 75);
     const noBase = this.add.rectangle(0, 3, 100, 40, 0xbd2130).setStrokeStyle(3, 0x2f3542);
     const noBody = this.add.rectangle(0, 0, 100, 40, 0xff4757).setStrokeStyle(3, 0x2f3542);
     const noText = this.add.text(0, 0, '❌ CANCEL', { fontSize: '12px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
     noBtn.add([noBase, noBody, noText]);

     const noHit = this.add.rectangle(0, 0, 100, 40).setInteractive({ useHandCursor: true });
     noHit.on('pointerdown', () => {
         noBtn.setScale(0.92);
         noBody.y = 3;
         noText.y = 3;
     });
     noHit.on('pointerup', () => {
         Audio.initAudio();
         Audio.playHit();
         popup.destroy();
     });
     noHit.on('pointerout', () => {
         noBtn.setScale(1);
         noBody.y = 0;
         noText.y = 0;
     });
     noBtn.add(noHit);

     popup.add([yesBtn, noBtn]);
  }

  showVideoAdForUndos() {
     this.showCrazyRewardedAd("REFRESH UNDOS", 3, () => {
         this.undosRemaining = 3;
         if (this.undoIndicatorText) {
              this.undoIndicatorText.setText(`${this.undosRemaining}`);

  
         }
         this.saveGameState();
     });
  }

  updateTapStockLabel(type: string) {
     const idx = (type === 'r') ? 0 : (type === 'b') ? 1 : 2;
     const tap = this.taps[idx];
     if (tap && (tap as any).stockTextObj) {
        const textObj = (tap as any).stockTextObj as Phaser.GameObjects.Text;
        const currentStock = this.dropletStocks[type] !== undefined ? this.dropletStocks[type] : 3;
        textObj.setText(`${currentStock} 💧`);
        if (currentStock === 0) {
           textObj.setColor('#ff4757');
        } else if (currentStock <= 2) {
           textObj.setColor('#ffa502');
        } else {
           textObj.setColor('#00f3ff');
        }
     }
  }

  gameOver() {
      this.isValidating = true;
      Audio.initAudio();
      Audio.playBuzzer();
      Audio.haptic(50);
      this.cameras.main.shake(400, 0.02);
      this.flashScreen(0xff4757, 300);

      const w = this.scale.width;
      const h = this.scale.height;

      // Overlay container
      const goCont = this.add.container(0, 0).setDepth(1500);

      const backgroundMask = this.add.rectangle(w/2, h/2, w, h, 0x050714, 0).setInteractive();
      goCont.add(backgroundMask);
      this.tweens.add({
         targets: backgroundMask,
         fillAlpha: 0.88,
         duration: 350
      });

      const r = this.xRatio;
      // Panel graphics containing the main board
      const panel = this.add.graphics();
      const panelW = Math.round(290 * r);
      const innerW = Math.round(260 * r);
      // Outer subtle neon pulse glowing line
      panel.fillStyle(0x0e0f1d, 0.95);
      panel.lineStyle(4, 0xff4757, 1); // Vivid red alert border
      panel.fillRoundedRect(w/2 - Math.round(145 * r), h/2 - 200, panelW, 400, 18);
      panel.strokeRoundedRect(w/2 - Math.round(145 * r), h/2 - 200, panelW, 400, 18);

      // Inner chalkboard/monitor background
      panel.fillStyle(0x181a30, 1);
      panel.lineStyle(2, 0x222544, 1);
      panel.fillRoundedRect(w/2 - Math.round(130 * r), h/2 - 185, innerW, 370, 12);
      panel.strokeRoundedRect(w/2 - Math.round(130 * r), h/2 - 185, innerW, 370, 12);

      // Cute metallic corner bolts for a laboratory vibe
      const boltOff = Math.round(135 * r);
      const bolts = [
         {x: w/2 - boltOff, y: h/2 - 190},
         {x: w/2 + boltOff, y: h/2 - 190},
         {x: w/2 - boltOff, y: h/2 + 190},
         {x: w/2 + boltOff, y: h/2 + 190}
      ];
      bolts.forEach(b => {
         panel.fillStyle(0x747d8c, 1);
         panel.fillCircle(b.x, b.y, 4);
         panel.lineStyle(1.5, 0x2f3542, 1);
         panel.strokeCircle(b.x, b.y, 4);
      });

      goCont.add(panel);

      // Giant animated digital clock emoji or skull
      const goEmoji = this.add.text(w/2, h/2 - 158, '⏱️💥', {
         fontSize: '28px'
      }).setOrigin(0.5);
      goCont.add(goEmoji);
      
      this.tweens.add({
         targets: goEmoji,
         scaleX: 1.2,
         scaleY: 1.2,
         yoyo: true,
         repeat: -1,
         duration: 600,
         ease: 'Sine.easeInOut'
      });

      // Game Over Title
      const goTitle = this.add.text(w/2, h/2 - 110, 'TIME OUT!', { 
         fontSize: '34px', 
         color: '#ff4757', 
         fontStyle: 'bold', 
         fontFamily: 'sans-serif',
         stroke: '#000000',
         strokeThickness: 5
      }).setOrigin(0.5);
      
      const goSub = this.add.text(w/2, h/2 - 68, 'The timer has fully run down!', { 
         fontSize: '11px', 
         color: '#a4b0be', 
         fontFamily: 'monospace' 
      }).setOrigin(0.5);

      // Enhanced stats panel
      const statPanel = this.add.graphics();
      statPanel.fillStyle(0xd97706, 0.1);
      statPanel.lineStyle(2, 0xf59e0b, 1);
      statPanel.fillRoundedRect(w/2 - Math.round(110 * r), h/2 - 60, Math.round(220 * r), 75, 8);
      statPanel.strokeRoundedRect(w/2 - Math.round(110 * r), h/2 - 60, Math.round(220 * r), 75, 8);
      goCont.add(statPanel);

      const levelReached = this.add.text(w/2, h/2 - 48, `🏰 Level ${this.level}`, {
         fontSize: '10px', color: '#ced6e0', fontFamily: 'monospace', fontStyle: 'bold'
      }).setOrigin(0.5);
      const flasksDone = this.add.text(w/2, h/2 - 32, `⚗️ ${this.achievementStats.totalFlasksPlayed} flasks mixed`, {
         fontSize: '10px', color: '#ced6e0', fontFamily: 'monospace'
      }).setOrigin(0.5);
      const earningsTxt = this.add.text(w/2, h/2 - 16, `💰 $${this.coins} earned`, {
         fontSize: '14px', color: '#ffd700', fontFamily: 'monospace', fontStyle: 'bold'
      }).setOrigin(0.5);

      goCont.add([goTitle, goSub, levelReached, flasksDone, earningsTxt]);
      
      // Floating coins around the panel
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        const dist = Phaser.Math.Between(100, 160);
        const coin = this.add.text(w/2 + Math.cos(angle) * dist, h/2 + Math.sin(angle) * dist, '🪙', { fontSize: '16px' }).setOrigin(0.5).setAlpha(0.3);
        goCont.add(coin);
        this.tweens.add({
          targets: coin,
          y: coin.y - 20,
          alpha: 0.6,
          duration: 1500 + i * 300,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
      }

      // BUTTON 1: WATCH AD FOR +25s TIME (Revive!) - GORGEOUS 3D ARCADE STYLING
      const reviveBtn = this.add.container(w/2, h/2 + 45);
      const reviveBase = this.add.rectangle(0, 4, 210, 50, 0x0984e3).setStrokeStyle(3, 0x111111);
      const reviveBody = this.add.rectangle(0, 0, 210, 50, 0x74b9ff).setStrokeStyle(3, 0x111111);
      const reviveT1 = this.add.text(0, -9, '🎬 AD : +25 SECONDS', { fontSize: '13px', color: '#fff', fontStyle: 'bold', fontFamily: 'sans-serif' }).setOrigin(0.5);
      const reviveT2 = this.add.text(0, 11, 'EMERGENCY REVIVAL!', { fontSize: '9px', color: '#e8f4ff', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
      reviveBtn.add([reviveBase, reviveBody, reviveT1, reviveT2]);
      goCont.add(reviveBtn);

      const reviveHit = this.add.rectangle(w/2, h/2 + 45, 210, 50).setInteractive({ useHandCursor: true });
      goCont.add(reviveHit); // Add to container so it destroys perfectly!

      reviveHit.on('pointerdown', () => {
         reviveBody.y = 4;
         reviveT1.y = -5;
         reviveT2.y = 15;
         
         this.wasRevivedThisLevel = true;
         goCont.destroy();
         this.triggerSimulatedGameOverAd();
      });

      reviveHit.on('pointerup', () => {
         reviveBody.y = 0;
         reviveT1.y = -9;
         reviveT2.y = 11;
      });
      reviveHit.on('pointerout', () => {
         reviveBody.y = 0;
         reviveT1.y = -9;
         reviveT2.y = 11;
      });

      // BUTTON 2: RETRY RESTART (Standard Retry) - STUNNING ORANGE OR GREY RETRY BUTTON
      const restartBtn = this.add.container(w/2, h/2 + 115);
      const restartBase = this.add.rectangle(0, 4, 210, 50, 0xd97706).setStrokeStyle(3, 0x111111);
      const restartBody = this.add.rectangle(0, 0, 210, 50, 0xf59e0b).setStrokeStyle(3, 0x111111);
      const restartText = this.add.text(0, 0, 'RETRY LEVEL 🔁', { fontSize: '14px', color: '#ffffff', fontStyle: 'bold', fontFamily: 'sans-serif' }).setOrigin(0.5);
      restartBtn.add([restartBase, restartBody, restartText]);
      goCont.add(restartBtn);

      const restartHit = this.add.rectangle(w/2, h/2 + 115, 210, 50).setInteractive({ useHandCursor: true });
      goCont.add(restartHit); // Add to container so it destroys perfectly!

      restartHit.on('pointerdown', () => {
         restartBody.y = 4;
         restartText.y = 4;
         MainScene.levelResults.push({ won: false, timeLeftPct: 0 });
         if (MainScene.levelResults.length > 5) MainScene.levelResults.shift();
         MainScene.consecutiveLosses++;
         MainScene.consecutiveWins = 0;
         this.scene.restart();
      });
      restartHit.on('pointerup', () => {
         restartBody.y = 0;
         restartText.y = 0;
      });
      restartHit.on('pointerout', () => {
         restartBody.y = 0;
         restartText.y = 0;
      });

      // Intro animation for the entire gameover panel popup overlay
      goCont.setScale(0.8);
      goCont.setAlpha(0);
      this.tweens.add({
         targets: goCont,
         scaleX: 1,
         scaleY: 1,
         alpha: 1,
         duration: 450,
         ease: 'Back.out'
      });
  }

  triggerSimulatedGameOverAd() {
      this.showCrazyRewardedAd("EMERGENCY REVIVE", 3, () => {
          this.isValidating = false;
          
          // Revive reward!
          this.health = 100;
          this.timeLeft = 35; // Grant +35 seconds of play!
          this.updateHealthBar();
          this.saveGameState();
          
          Audio.playWin();
          
          const w = this.scale.width;
          const h = this.scale.height;
          // Text overlay notification
          const feedback = this.add.text(w/2, h/2 - 100, `ACTIVATED! +35s ⏱️`, {
              fontSize: '24px', 
              color: '#00ffcc', 
              fontStyle: 'bold',
              stroke: '#000000',
              strokeThickness: 5,
              fontFamily: 'sans-serif'
          }).setOrigin(0.5).setDepth(1500).setScale(0.1);
          
          this.tweens.add({
              targets: feedback,
              scale: 1.15,
              alpha: 1,
              duration: 400,
              ease: 'Back.easeOut',
              yoyo: true,
              hold: 1400,
              onComplete: () => { feedback.destroy(); }
          });
      });
  }

   createSplashParticles(x: number, y: number, color: number) {
     const lightColors = [0xffffff, 0xffe0e0, 0xe0ffe0, 0xe0e0ff, 0xffe0ff, 0xe0ffff, 0xffffe0, 0xfff0e0];
     for(let i=0; i<14; i++) {
         const r = Phaser.Math.Between(2, 7);
         const c = i < 8 ? color : lightColors[Phaser.Math.Between(0, lightColors.length - 1)];
         const p = this.add.circle(x + Phaser.Math.Between(-4, 4), y + Phaser.Math.Between(-4, 4), r, c).setDepth(35);
         this.physics.world.enable(p);
         const body = p.body as Phaser.Physics.Arcade.Body;
         body.setVelocity(Phaser.Math.Between(-120, 120), Phaser.Math.Between(-280, -60));
         body.setGravityY(500);

         this.tweens.add({
             targets: p,
             scale: 0,
             alpha: 0,
             duration: 500 + Math.random() * 300,
             ease: 'Power2',
             delay: Math.random() * 50,
             onComplete: () => p.destroy()
         });
     }
   }

   createBubbleEffect(flask: any) {
      const fx = flask.x;
      const fy = flask.y - 40;
      for (let i = 0; i < 5; i++) {
         const br = Phaser.Math.Between(2, 5);
         const bubble = this.add.circle(
            fx + Phaser.Math.Between(-12, 12),
            fy + Phaser.Math.Between(-8, 8),
            br, 0xffffff, 0.4 + Math.random() * 0.3
         ).setDepth(21);
         this.tweens.add({
            targets: bubble,
            y: fy - 30 - Math.random() * 30,
            x: fx + Phaser.Math.Between(-15, 15),
            alpha: 0,
            scale: 0.5 + Math.random() * 1.5,
            duration: 400 + Math.random() * 300,
            ease: 'Quad.easeOut',
            delay: i * 30,
            onComplete: () => bubble.destroy()
         });
      }
   }

   createImpactRing(x: number, y: number, color: number) {
      const ring = this.add.circle(x, y, 4, color, 0.6).setDepth(30).setScale(1);
      this.tweens.add({
         targets: ring,
         scale: 5,
         alpha: 0,
         duration: 350,
         ease: 'Quad.easeOut',
         onComplete: () => ring.destroy()
      });
   }

   animatePopupIn(container: Phaser.GameObjects.Container, content: Phaser.GameObjects.GameObject[], overlay?: Phaser.GameObjects.GameObject) {
      container.setScale(0.85).setAlpha(0);
      content.forEach(c => c.setAlpha(0));
      this.tweens.add({
         targets: container,
         scale: 1,
         alpha: 1,
         duration: 350,
         ease: 'Back.easeOut'
      });
      content.forEach((c, i) => {
         this.tweens.add({
            targets: c,
            alpha: 1,
            duration: 250,
            delay: 50 + i * 20,
            ease: 'Sine.easeIn'
         });
      });
   }

   animatePopupOut(container: Phaser.GameObjects.Container, onComplete?: () => void) {
      this.tweens.add({
         targets: container,
         scale: 0.9,
         alpha: 0,
         duration: 180,
         ease: 'Quad.easeIn',
         onComplete: () => {
            container.destroy();
            if (onComplete) onComplete();
         }
      });
   }

   addPulseGlow(x: number, y: number, color: number, radius: number, depth: number, parent?: Phaser.GameObjects.Container) {
      const glow = this.add.circle(x, y, radius, color, 0.15).setDepth(depth);
      this.tweens.add({
         targets: glow,
         alpha: 0.3,
         scale: 1.15,
         duration: 1200,
         yoyo: true,
         repeat: -1,
         ease: 'Sine.easeInOut'
      });
      if (parent) parent.add(glow);
      return glow;
   }

    getFlaskModifier() {
      return this.challengeModifiers.find(m => m.id === this.currentChallengeModifier) || null;
    }

    calcLevelTimer(level: number, totalFlasks: number): number {
        let t = totalFlasks === 1 ? 10 : totalFlasks === 2 ? 18 : 27;
        const modifier = this.getFlaskModifier();
        if (modifier && modifier.timeMult) {
            t = Math.round(t * modifier.timeMult);
        }
        const isBoss = level >= 35 && level % 10 === 5;
        if (isBoss) {
            t = totalFlasks === 1 ? 7 : totalFlasks === 2 ? 12 : 18;
        } else {
            // Initiation: levels 1-5 get more time
            if (level <= 5) {
                const multipliers = [3.0, 2.5, 2.0, 1.6, 1.3];
                t = Math.round(t * multipliers[level - 1]);
            }
            // Adaptive adjustments based on recent performance
            const results = MainScene.levelResults;
            const cWins = MainScene.consecutiveWins;
            const cLosses = MainScene.consecutiveLosses;
            if (results.length >= 3) {
                const wonResults = results.filter(r => r.won);
                if (wonResults.length > 0) {
                    const avgLeft = wonResults.reduce((s, r) => s + r.timeLeftPct, 0) / wonResults.length;
                    if (avgLeft > 0.40) {
                        t = Math.round(t * 0.85); // too easy, tighten
                    } else if (avgLeft < 0.05 && cLosses === 0) {
                        t = Math.round(t * 1.15); // too hard, loosen
                    }
                }
            }
            if (cWins >= 4) {
                t = Math.round(t * 0.92);
            }
            if (cLosses >= 2) {
                t = Math.round(t * 2);
            }
            if (level >= 30) {
                t += Phaser.Math.Between(-1, 1);
            }
        }
        t += totalFlasks === 3 ? 10 : totalFlasks === 2 ? 5 : 3;
        return Phaser.Math.Clamp(t, 4, 45);
    }

    showLevelIntro(level: number) {
       Audio.playWhoosh();
      const w = this.scale.width;
      const h = this.scale.height;
      const cont = this.add.container(w / 2, h / 2).setDepth(2000);
      const glow = this.add.rectangle(0, 0, w, h, 0x00f3ff, 0.08).setScale(0);
      const bg = this.add.rectangle(0, 0, 260, 100, 0x0a0a1a, 0.95).setStrokeStyle(2, 0x00f3ff);
      const lvlText = this.add.text(0, -10, `LEVEL ${level}`, {
         fontSize: '36px', color: '#00f3ff', fontStyle: 'bold', fontFamily: 'sans-serif',
         stroke: '#000', strokeThickness: 5
      }).setOrigin(0.5);
      const subText = this.add.text(0, 28, 'GET READY...', {
         fontSize: '13px', color: '#a4b0be', fontFamily: 'monospace'
      }).setOrigin(0.5);
      cont.add([glow, bg, lvlText, subText]);

      cont.setScale(0.5).setAlpha(0);
      this.tweens.add({
         targets: cont, scale: 1, alpha: 1,
         duration: 400, ease: 'Back.easeOut'
      });
      this.tweens.add({
         targets: glow, scale: 3, alpha: 0,
         duration: 600, ease: 'Quad.easeOut'
      });
      this.time.delayedCall(300, () => {
         this.tweens.add({
            targets: cont, scale: 1.2, alpha: 0,
            duration: 200, ease: 'Quad.easeIn',
            onComplete: () => cont.destroy()
         });
      });
   }

   showFloatingText(x: number, y: number, text: string, color: string = '#ffffff', size: string = '18px') {
      const t = this.add.text(x, y, text, {
         fontSize: size, color, fontStyle: 'bold', fontFamily: 'sans-serif',
         stroke: '#000000', strokeThickness: 4
      }).setOrigin(0.5).setDepth(1000).setScale(0.5);
      this.tweens.add({
         targets: t,
         y: y - 80,
         scale: 1.2,
         alpha: 0,
         duration: 900,
         ease: 'Quad.easeOut',
         onComplete: () => t.destroy()
      });
   }

   flashScreen(color: number, duration: number = 400) {
      const w = this.scale.width;
      const h = this.scale.height;
      const flash = this.add.rectangle(w / 2, h / 2, w, h, color, 0.4).setDepth(1999);
      this.tweens.add({
         targets: flash,
         alpha: 0,
         duration,
         ease: 'Quad.easeOut',
         onComplete: () => flash.destroy()
      });
   }

   update(time: number, delta: number) {
    if (this.beltGraphics && !this.isValidating && this.timeLeft > 0 && !this.isLevelSuccessPopupOpen && !this.isShopOpen && !this.isAdRunning && !this.isHintOpen) {
      this.beltScrollX -= 280 * (delta / 1000); 
      this.drawBeltPattern();
    }

     if (this.currentFlask && !this.isValidating && this.timeLeft > 0 && !this.isLevelSuccessPopupOpen && !this.isShopOpen && !this.isAdRunning && !this.isHintOpen) {
        let speed = 240;
        const mod = this.getFlaskModifier();
        if (mod && mod.speedMult) speed *= mod.speedMult;
        this.currentFlask.x += speed * (delta / 1000);
        
        const f = this.currentFlask as any;
        const matchPercent = Colors.getSimilarityPercentage(f.currentDose, f.targetDose);
        
        // Auto-validate perfect mixtures instantly!
        if (matchPercent === 100) {
            this.validateFlask();
        }
        
        // If the flask reaches the right side incomplete, it loops back to the left without spilling or resetting colors!
        if (this.currentFlask && this.currentFlask.x > this.scale.width + 80) {
            this.currentFlask.x = -100;
            (this.currentFlask as any).targetXStation = undefined;
        }
        
        if (this.currentFlask) {
            this.physics.overlap(this.dropsGroup, this.currentFlask, this.handleDropFlask, undefined, this);
        }
    }

    // Recurrent confetti memory sweep
    if (this.activeConfettiGroup) {
        this.activeConfettiGroup.getChildren().forEach((conf: any) => {
            if (conf && conf.y > this.scale.height + 30) {
                conf.destroy();
            }
        });
    }

    this.dropsGroup.getChildren().forEach((child: any) => {
      if (child) {
        if (child.y > this.beltY + 20) {
            this.createSplashParticles(child.x, this.beltY + 20, child.colorValue);
            child.destroy();
        } else if (child.y > this.scale.height) { 
            child.destroy();
        } else if (child.body && child.body.velocity.y > 200 && Math.random() < 0.2) {
            const trail = this.add.circle(child.x, child.y, 2, child.colorValue, 0.4).setDepth(24);
            this.tweens.add({ targets: trail, alpha: 0, scale: 0, duration: 200, onComplete: () => trail.destroy() });
        }
      }
    });

    if (this.coinsGroup) {
        this.coinsGroup.getChildren().forEach((coin: any) => {
           if (coin) {
              const floorY = this.beltY + 45;
              if (coin.y >= floorY && coin.body.velocity.y > 0) {
                 coin.y = floorY - 2;
                 coin.body.setVelocityY(-coin.body.velocity.y * 0.55);
                 coin.body.setVelocityX(coin.body.velocity.x * 0.82);
                 
                 // Play metallic chiming coin sound!
                 Audio.playCoinChime();
                 
                 coin.bounces = (coin.bounces || 0) + 1;
                 if (coin.bounces >= 3) {
                    this.tweens.add({
                       targets: coin,
                       alpha: 0,
                       scaleY: 0,
                       scaleX: 0,
                       duration: 150,
                       onComplete: () => coin.destroy()
                    });
                 }
              }
           }
        });
    }
  }

  drawMarketHouseLogo(g: Phaser.GameObjects.Graphics, x: number, y: number, size: number) {
    g.lineStyle(2, 0x221105, 1);
    
    // Front wall / Pillars base
    g.fillStyle(0xfff3e0, 1); // warm white
    g.fillRect(x - size/2 + 2, y - size/4, size - 4, size * 0.7);
    g.strokeRect(x - size/2 + 2, y - size/4, size - 4, size * 0.7);
    
    // Door/Gate
    g.fillStyle(0x784421, 1);
    g.fillRect(x - 4, y + size/10, 8, size * 0.35);
    g.strokeRect(x - 4, y + size/10, 8, size * 0.35);

    // Columns
    g.fillStyle(0xb7791f, 1);
    g.fillRect(x - size/2 + 3, y - size/4, 4, size * 0.7);
    g.strokeRect(x - size/2 + 3, y - size/4, 4, size * 0.7);
    g.fillRect(x + size/2 - 7, y - size/4, 4, size * 0.7);
    g.strokeRect(x + size/2 - 7, y - size/4, 4, size * 0.7);

    // Pediment/Roof Triangle
    g.fillStyle(0xbd2130, 1); // red roof
    g.beginPath();
    g.moveTo(x - size/2 - 2, y - size/4);
    g.lineTo(x, y - size/2 - 6);
    g.lineTo(x + size/2 + 2, y - size/4);
    g.closePath();
    g.fillPath();
    g.strokePath();

    // Steps
    g.fillStyle(0x718096, 1);
    g.fillRect(x - size/2, y + size/2 - 2, size, 3);
    g.strokeRect(x - size/2, y + size/2 - 2, size, 3);
  }

  drawParcelBox(g: Phaser.GameObjects.Graphics, width: number, height: number) {
    g.clear();
    // Cardboard Box body
    g.fillStyle(0xcd853f, 1);
    g.fillRect(-width/2, -height/2, width, height);
    g.lineStyle(3.5, 0x4a2c11, 1);
    g.strokeRect(-width/2, -height/2, width, height);

    // Box vertical ribbon stripe
    g.fillStyle(0xff4757, 1);
    g.fillRect(-5, -height/2, 10, height);
    g.strokeRect(-5, -height/2, 10, height);

    // Box horizontal ribbon stripe
    g.fillStyle(0xff4757, 1);
    g.fillRect(-width/2, -5, width, 10);
    g.strokeRect(-width/2, -5, width, 10);

    // Golden Ribbon Ring/Knot on top!
    g.fillStyle(0xffd700, 1);
    g.lineStyle(2, 0x4a2c11, 1);
    // Draw two sweet loops for the ribbon bow on top
    g.beginPath();
    g.arc(-8, -height/2, 6, 0, Math.PI * 2);
    g.arc(8, -height/2, 6, 0, Math.PI * 2);
    g.fillPath();
    g.strokePath();
    
    g.fillStyle(0xffd700, 1);
    g.fillCircle(0, -height/2, 4.5);
    g.strokeCircle(0, -height/2, 4.5);
  }

  drawGoldCoin(g: Phaser.GameObjects.Graphics, size: number) {
    g.clear();
    const w = 22;
    const h = 12;
    
    // Solid shadow border
    g.fillStyle(0x0a2f1d, 1);
    g.fillRect(-w/2 - 1, -h/2 - 1, w + 2, h + 2);
    
    // Outer green body of the bill (emerald green)
    g.fillStyle(0x2ecc71, 1);
    g.fillRect(-w/2, -h/2, w, h);
    
    // Inner frame border (light pastel green line)
    g.lineStyle(1, 0xa3e4d7, 0.85);
    g.strokeRect(-w/2 + 2, -h/2 + 1.5, w - 4, h - 3);
    
    // Center white/light-green seal circle (emulating currency)
    g.fillStyle(0xe8f8f5, 1);
    g.fillCircle(0, 0, 2.5);
  }

   sprayGoldCoins(x: number, y: number) {
      const coinAmount = 35;
      for (let i = 0; i < coinAmount; i++) {
         const coinCont = this.add.container(x + Phaser.Math.Between(-8, 8), y + Phaser.Math.Between(-8, 8)).setDepth(60);
         const coinG = this.add.graphics();
         this.drawGoldCoin(coinG, Phaser.Math.Between(6, 10));
         coinCont.add(coinG);

         const spinSpeed = 80 + Math.random() * 120;
         this.tweens.add({
            targets: coinCont,
            scaleX: 0,
            duration: spinSpeed,
            yoyo: true,
            repeat: -1
         });

         this.physics.world.enable(coinCont);
         this.coinsGroup.add(coinCont);

         const body = coinCont.body as Phaser.Physics.Arcade.Body;
         body.setCircle(8, -8, -8);

         const angle = Math.random() * Math.PI - Math.PI / 2;
         const speed = Phaser.Math.Between(160, 480);
         const vx = Math.cos(angle) * speed * Phaser.Math.FloatBetween(0.7, 1.3);
         const vy = Math.sin(angle) * speed * Phaser.Math.FloatBetween(0.7, 1.0);
         body.setVelocity(vx, vy);
         body.setGravityY(1000);

         (coinCont as any).bounces = 0;
         (coinCont as any).colorValue = 0xffd700;
      }
   }

  deliverProductStack() {
     // Play cute delivery truck trumpets
     Audio.playDeliveryShip();
     
     const boxesToShip = [...this.stackedBoxes];
     this.stackedBoxes = [];
     this.completedCount = 0;
     
     boxesToShip.forEach((box, index) => {
        this.tweens.add({
           targets: box,
           x: this.scale.width + 120,
           duration: 750 + index * 120,
           ease: 'Back.easeIn',
           onComplete: () => {
              box.destroy();
           }
        });
     });
     
     const floatShipTxt = this.add.text(Math.round(355 * this.xRatio), 230, "SHIPPED! \uD83D\uDCE6", {
        fontSize: '18px',
        color: '#2ed573',
        fontStyle: 'bold',
        stroke: '#000000',
        strokeThickness: 5,
        fontFamily: 'sans-serif'
     }).setOrigin(0.5).setDepth(120);
     
     this.tweens.add({
        targets: floatShipTxt,
        y: 150,
        alpha: 0,
        scale: 1.25,
        duration: 1200,
        ease: 'Cubic.out',
        onComplete: () => floatShipTxt.destroy()
     });
  }

  completeLevelSuccessFlow() {
     this.isLevelSuccessPopupOpen = true;
     
     // Freeze the conveyor's active motion
     if (this.currentFlask) {
         const body = this.currentFlask.body as Phaser.Physics.Arcade.Body;
         if (body) {
             body.setVelocity(0, 0);
         }
     }
     
      Audio.initAudio();
       Audio.playLevelUpSound();
       Audio.playCelebration();

      this.saveHighScore();

      // Big coin win animation!
      this.flashScreen(0xffd700, 300);
      this.cameras.main.shake(500, 0.015);
      this.spawnCoinRain(45);
      this.spawnConfettiRain(100);
      setTimeout(() => {
        const w = this.scale.width;
        this.spawnSparkleBurst(w/2, this.scale.height/2, 20, 0xffd700);
        Audio.playCashRegister();
        Audio.playSparkle();
      }, 300);
      setTimeout(() => {
        Audio.playCashRegister();
      }, 800);
     
     const w = this.scale.width;
     const h = this.scale.height;
     
     // Create a dedicated container for overlay
     const popup = this.add.container(0, 0).setDepth(200);
     this.victoryPopupContainer = popup;
     
     // Dim overlay background
     const veil = this.add.rectangle(w/2, h/2, w, h, 0x070913, 0.88);
     
      const r = this.xRatio;
      // Core gold-framed container panel
      const card = this.add.graphics();
      // Plate dropshadow
      card.fillStyle(0x04030a, 0.96);
      card.fillRoundedRect(Math.round(35 * r), h/2 - 195, w - Math.round(70 * r), 410, 18);
      // Front metal panel steel texture
      card.fillStyle(0x131528, 0.98);
      card.fillRoundedRect(Math.round(30 * r), h/2 - 200, w - Math.round(60 * r), 410, 18);
      card.lineStyle(5, 0xffd700, 1); // Gold stroke border
      card.strokeRoundedRect(Math.round(30 * r), h/2 - 200, w - Math.round(60 * r), 410, 18);
      
      // Steel rivets
      card.fillStyle(0xffd700, 1);
      card.fillCircle(Math.round(45 * r), h/2 - 185, 4.5);
      card.fillCircle(w - Math.round(45 * r), h/2 - 185, 4.5);
     card.fillCircle(45, h/2 + 195, 4.5);
     card.fillCircle(w - 45, h/2 + 195, 4.5);
     
     popup.add([veil, card]);
     
     // Animated trophy header text
     const crownText = this.add.text(w/2, h/2 - 152, '🏆 STAGE COMPLETE! 🏆', { 
         fontSize: '30px', 
         color: '#ffd700', 
         fontStyle: 'bold', 
         fontFamily: 'sans-serif',
         stroke: '#000000',
         strokeThickness: 5
     }).setOrigin(0.5);
     popup.add(crownText);
     
     this.tweens.add({
         targets: crownText,
         scale: 1.15,
         duration: 700,
         yoyo: true,
         repeat: -1,
         ease: 'Sine.easeInOut'
      });
     
     // Statistics labels
     const lvlLabel = this.add.text(w/2, h/2 - 82, `LEVEL ${this.level} PASSED`, { 
         fontSize: '20px', 
         color: '#ffffff', 
         fontStyle: 'bold', 
         fontFamily: 'monospace'
     }).setOrigin(0.5);
     
     const ordersLabel = this.add.text(w/2, h/2 - 47, `Flasks Shipped: ${this.totalFlasksInLevel}/${this.totalFlasksInLevel} 🧪`, {
         fontSize: '16px',
         color: '#54a0ff',
         fontFamily: 'sans-serif',
         fontStyle: 'bold'
     }).setOrigin(0.5);
     
      const coinsLabel = this.add.text(w/2, h/2 - 15, `Session Earnings: $${this.levelCoinsEarnedInSession}`, {
          fontSize: '24px',
          color: '#1dd1a1',
          fontStyle: 'bold',
          fontFamily: 'monospace'
      }).setOrigin(0.5);
      
      // Star rating
      const starCount = this.levelTimerBase > 0
        ? this.timeLeft >= this.levelTimerBase ? 3 : this.timeLeft >= Math.round(this.levelTimerBase * 0.5) ? 2 : 1
        : 1;
      const starStr = '★'.repeat(starCount) + '☆'.repeat(3 - starCount);
      const starColor = starCount === 3 ? '#ffd700' : starCount === 2 ? '#c0c0c0' : '#cd7f32';
      const starLabel = this.add.text(w/2, h/2 + 15, starStr, {
          fontSize: '28px', color: starColor, fontFamily: 'sans-serif'
      }).setOrigin(0.5);

      popup.add([lvlLabel, ordersLabel, coinsLabel, starLabel]);
      
      // BUTTON 1: MULTIPLY AD REWARD! (Watch simulated ad for 3x Coins & refill undos)
     const adBtnCont = this.add.container(w/2, h/2 + 50);
     const adBtnBase = this.add.rectangle(0, 4, 280, 60, 0x10ac84).setStrokeStyle(4, 0x000);
     const adBtnBody = this.add.rectangle(0, 0, 280, 60, 0x1dd1a1).setStrokeStyle(4, 0x000);
     const adBtnLab1 = this.add.text(0, -10, '🎬 CLAIM x3 REWARD!', { fontSize: '17px', color: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
     const adBtnLab2 = this.add.text(0, 14, `GET $${this.levelCoinsEarnedInSession * 3} & 3 UNDOS`, { fontSize: '10px', color: '#e8fff5', fontStyle: 'bold', fontFamily: 'monospace' }).setOrigin(0.5);
     adBtnCont.add([adBtnBase, adBtnBody, adBtnLab1, adBtnLab2]);
     
     const adHit = this.add.rectangle(w/2, h/2 + 50, 280, 60).setInteractive({ useHandCursor: true });
     adHit.on('pointerdown', () => {
         adBtnBody.y = 4;
         adBtnLab1.y = -6;
         adBtnLab2.y = 16;
         this.triggerSimulatedCommercialAd();
     });
     adHit.on('pointerup', () => { adBtnBody.y = 0; adBtnLab1.y = -10; adBtnLab2.y = 12; });
     adHit.on('pointerout', () => { adBtnBody.y = 0; adBtnLab1.y = -10; adBtnLab2.y = 12; });
     
     this.tweens.add({
         targets: adBtnCont,
         scaleX: 1.05,
         scaleY: 1.05,
         duration: 650,
         yoyo: true,
         repeat: -1,
         ease: 'Quad.easeInOut'
     });
     
     // BUTTON 2: STANDARD PROGRESS CONTINUE
     const nextBtnCont = this.add.container(w/2, h/2 + 130);
     const nextBtnBase = this.add.rectangle(0, 3, 200, 44, 0x222f3e).setStrokeStyle(3, 0x000);
     const nextBtnBody = this.add.rectangle(0, 0, 200, 44, 0x57606f).setStrokeStyle(3, 0x000);
     const nextBtnText = this.add.text(0, 0, 'CONTINUE', { fontSize: '15px', color: '#c8d6e5', fontStyle: 'bold' }).setOrigin(0.5);
     nextBtnCont.add([nextBtnBase, nextBtnBody, nextBtnText]);
     
     const nextHit = this.add.rectangle(w/2, h/2 + 130, 200, 44).setInteractive({ useHandCursor: true });
     nextHit.on('pointerdown', () => {
         nextBtnBody.y = 3;
         nextBtnText.y = 3;
         
         Audio.initAudio();
         Audio.playHit();
         this.startNextLevel(false);
     });
     nextHit.on('pointerup', () => { nextBtnBody.y = 0; nextBtnText.y = 0; });
     nextHit.on('pointerout', () => { nextBtnBody.y = 0; nextBtnText.y = 0; });
     
       popup.add([adBtnCont, adHit, nextBtnCont, nextHit]);
       popup.setScale(0.92).setAlpha(0);
       this.tweens.add({ targets: popup, scale: 1, alpha: 1, duration: 400, ease: 'Back.easeOut' });

       this.achievementStats.totalFlasksPlayed += this.totalFlasksInLevel;
       this.achievementStats.perfectMatches += this.totalFlasksInLevel;
       this.saveAchievements();
       this.checkAchievements();
    }

    spawnConfettiRain(amount: number) {
      const colors = [0xff4757, 0x2ed573, 0x1e90ff, 0xffa502, 0xff6b81, 0x70a1ff, 0xff00cc, 0xffff00, 0xffd700, 0xff9ff3];
      for (let i = 0; i < amount; i++) {
          const cx = Phaser.Math.Between(10, this.scale.width - 10);
          const cy = Phaser.Math.Between(-200, -20);
          const col = colors[i % colors.length];
          const shape = Math.random();

          let piece: Phaser.GameObjects.Rectangle | Phaser.GameObjects.Circle;
          let w: number, h: number;
          if (shape < 0.5) {
            w = Phaser.Math.Between(5, 10);
            h = w * Phaser.Math.FloatBetween(1.2, 2.0);
            piece = this.add.rectangle(cx, cy, w, h, col).setDepth(205);
          } else if (shape < 0.8) {
            const r = Phaser.Math.Between(3, 6);
            piece = this.add.circle(cx, cy, r, col).setDepth(205);
          } else {
            w = Phaser.Math.Between(6, 10);
            piece = this.add.rectangle(cx, cy, w, w, col).setDepth(205).setAngle(45);
          }

          this.physics.world.enable(piece);

          const body = piece.body as Phaser.Physics.Arcade.Body;
          body.setAllowGravity(true);
          body.setGravityY(Phaser.Math.Between(180, 320));
          body.setVelocityY(Phaser.Math.Between(60, 200));
          body.setVelocityX(Phaser.Math.Between(-100, 100));
          body.setDragX(20);

          const rotSpeed = Phaser.Math.Between(600, 2000);
          const rotDir = Math.random() < 0.5 ? 360 : -360;
          this.tweens.add({
              targets: piece,
              angle: rotDir,
              duration: rotSpeed,
              repeat: -1,
              ease: 'Linear'
          });

          if (i % 3 === 0) {
            const sparkle = this.add.circle(cx, cy, 1.5, 0xffffff).setDepth(206).setAlpha(0.9);
            this.physics.world.enable(sparkle);
            const sBody = sparkle.body as Phaser.Physics.Arcade.Body;
            sBody.setGravityY(200);
            sBody.setVelocityY(Phaser.Math.Between(40, 120));
            sBody.setVelocityX(Phaser.Math.Between(-50, 50));
            this.tweens.add({
              targets: sparkle,
              alpha: 0,
              scale: 2,
              duration: 400 + Math.random() * 400,
              yoyo: true,
              repeat: -1,
              ease: 'Sine.easeInOut'
            });
            this.activeConfettiGroup.add(sparkle);
          }

          this.activeConfettiGroup.add(piece);
      }
   }

   spawnCoinRain(amount: number) {
      const w = this.scale.width;
      const h = this.scale.height;
      for (let i = 0; i < amount; i++) {
        const cx = Phaser.Math.Between(20, w - 20);
        const cy = Phaser.Math.Between(-100, -20);
        const coin = this.add.circle(cx, cy, Phaser.Math.Between(4, 7), 0xffd700).setDepth(210).setStrokeStyle(1.5, 0xd4a017);
        const inner = this.add.circle(cx, cy, Phaser.Math.Between(2, 4), 0xffea8c).setDepth(211);
        this.physics.world.enable(coin);
        this.physics.world.enable(inner);
        const cb = coin.body as Phaser.Physics.Arcade.Body;
        cb.setAllowGravity(true);
        cb.setGravityY(Phaser.Math.Between(120, 250));
        cb.setVelocityY(Phaser.Math.Between(50, 150));
        cb.setVelocityX(Phaser.Math.Between(-60, 60));
        cb.setDragX(15);
        cb.setBounce(0.4);
        const ib = inner.body as Phaser.Physics.Arcade.Body;
        ib.setAllowGravity(true);
        ib.setGravityY(Phaser.Math.Between(120, 250));
        ib.setVelocityY(Phaser.Math.Between(50, 150));
        ib.setVelocityX(Phaser.Math.Between(-60, 60));
        ib.setDragX(15);
        ib.setBounce(0.4);
        const rotSpeed = Phaser.Math.Between(400, 1200);
        this.tweens.add({
          targets: [coin, inner],
          y: h + 50,
          duration: Phaser.Math.Between(2000, 4000),
          ease: 'Quad.easeIn',
          onComplete: () => { coin.destroy(); inner.destroy(); }
        });
        this.tweens.add({
          targets: coin,
          scaleY: 0.3,
          duration: rotSpeed,
          yoyo: true,
          repeat: -1,
          ease: 'Sine.easeInOut'
        });
        this.activeConfettiGroup.add(coin);
        this.activeConfettiGroup.add(inner);
      }
   }

   spawnSparkleBurst(cx: number, cy: number, count: number, color: number = 0xffffff) {
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const dist = Phaser.Math.Between(40, 100);
        const spark = this.add.circle(cx, cy, Phaser.Math.Between(1.5, 3), color).setDepth(210).setAlpha(1);
        this.tweens.add({
          targets: spark,
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          alpha: 0,
          scale: 0.3,
          duration: Phaser.Math.Between(300, 600),
          ease: 'Cubic.easeOut',
          onComplete: () => spark.destroy()
        });
      }
   }

   triggerSimulatedCommercialAd() {
      this.showCrazyRewardedAd("CLAIM EXTRA COINS", 3, () => {
          this.startNextLevel(true);
      });
   }

  startNextLevel(multiplyRewards: boolean) {
     this.isLevelSuccessPopupOpen = false;
     this.wasRevivedThisLevel = false;
     
      // Reset droplet stocks to 3 at each level!
      this.dropletStocks = { r: 3, b: 3, y: 3 };
      this.updateTapStockLabel('r');
      this.updateTapStockLabel('b');
      this.updateTapStockLabel('y');
     this.generatePanelButtons();
     
     // Destroy physical stacked boxes / gifts from previous levels so they do not accumulate
     this.stackedBoxes.forEach(box => {
         if (box && box.destroy) {
             box.destroy();
         }
     });
     this.stackedBoxes = [];
     this.completedCount = 0;
     
     if (multiplyRewards) {
         // Multiply the coins earned during this level block by 3
         // Add 2x more since 1x has already been paid out on validation!
         const extraRewardBonus = this.levelCoinsEarnedInSession * 2;
         this.coins += extraRewardBonus;
         Audio.playCashRegister();
     }
     
     // Advance level stats
     this.level++;
     if (this.headerLevelText) {
         this.headerLevelText.setText(`LVL ${this.level}`);
     }
     this.completedFlasksInLevel = 0;
     this.levelCoinsEarnedInSession = 0;
     this.undosRemaining = 3; // Refilled
     
      // Determine dynamic flasks sequence size for this level
      // Randomly sets sequence sizes (1 to 3 blocks) for levels, keeping things diverse!
      if (this.level <= 1) {
          this.totalFlasksInLevel = 1;
      } else if (this.level <= 4) {
          // 40% probability for 2 flasks
          this.totalFlasksInLevel = (Math.random() < 0.6) ? 1 : 2;
      } else {
          // 25% single, 50% double, 25% triple
          const dVal = Math.random();
          this.totalFlasksInLevel = (dVal < 0.25) ? 1 : (dVal < 0.75) ? 2 : 3;
      }
      
      // Reset timer so spawnNextFlask recalculates it for the new level
      this.levelTimerBase = 0;
     
     if (this.undoIndicatorText) {
         this.undoIndicatorText.setText(`${this.undosRemaining} LFT`);
     }
     
     this.updateScoreHUD();
     
     // Destroy overlays
     if (this.victoryPopupContainer) {
         this.victoryPopupContainer.destroy();
         this.victoryPopupContainer = null;
     }
     
     this.activeConfettiGroup.clear(true, true);
     
     this.saveGameState(); // Auto-save game state before releasing the block!
     
     // Release scanner blocks
     this.isValidating = false;
     this.spawnNextFlask();
  }
}
