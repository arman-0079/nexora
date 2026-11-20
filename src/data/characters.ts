import { BLUE_LOCK_ASSET_REGISTRY } from '../assets/characters/registry';
import { CharacterCard, CharacterAttributes, Rarity } from '../types/game';

interface BlueLockSeed {
  id: string;
  number: string;
  name: string;
  position: string;
  rarity: Rarity;
  power: number;
  attributes: CharacterAttributes;
  signatureWeapon: string;
  description: string;
  specialAbility: string;
}

const BLUE_LOCK_CHARACTER_SEEDS: BlueLockSeed[] = [
  {
    id: 'yoichi-isagi',
    number: '11',
    name: 'Yoichi Isagi',
    position: 'ST / CAM',
    rarity: 'Legendary',
    power: 93,
    attributes: { mind: 96, speed: 83, strength: 77, dribbling: 82, kick: 89 },
    signatureWeapon: 'Direct Shot & Spatial Awareness',
    description:
      'Adaptable tactical forward who reads the entire pitch and finishes seamlessly off the ball.',
    specialAbility:
      'Metavision: Links peripheral field scanning with an instant Two-Gun Volley finish.',
  },
  {
    id: 'rin-itoshi',
    number: '10',
    name: 'Rin Itoshi',
    position: 'CF / ST',
    rarity: 'Legendary',
    power: 95,
    attributes: { mind: 94, speed: 88, strength: 85, dribbling: 92, kick: 96 },
    signatureWeapon: 'Precision Trivela & Puppet Control',
    description:
      'Cold, ruthless prodigy capable of dictating every player on the field or unleashing Destroyer Flow.',
    specialAbility:
      'Destroyer Flow: Curves pinpoint outside-foot strikes past impossible defensive angles.',
  },
  {
    id: 'meguru-bachira',
    number: '08',
    name: 'Meguru Bachira',
    position: 'LW / RW',
    rarity: 'Epic',
    power: 89,
    attributes: { mind: 84, speed: 89, strength: 74, dribbling: 97, kick: 83 },
    signatureWeapon: 'Monster Dribble & Elastic Feints',
    description:
      'Instinctive creative dribbler who dances through tight defensive blocks following his inner monster.',
    specialAbility:
      'Monster Ginga: Chains unpredictable nutmegs and rhythmic cuts to shatter double-teams.',
  },
  {
    id: 'seishiro-nagi',
    number: '07',
    name: 'Seishiro Nagi',
    position: 'CF / SS',
    rarity: 'Epic',
    power: 90,
    attributes: { mind: 82, speed: 84, strength: 83, dribbling: 89, kick: 93 },
    signatureWeapon: 'Zero-Reset Ball Trapping',
    description:
      'Natural-born prodigy whose effortless first touch deadens any high-velocity pass instantly.',
    specialAbility:
      'Five-Stage Fake Volley: Traps aerial passes dead in stride before firing acrobatic volleys.',
  },
  {
    id: 'shoei-barou',
    number: '13',
    name: 'Shoei Barou',
    position: 'CF / ST',
    rarity: 'Epic',
    power: 89,
    attributes: { mind: 79, speed: 85, strength: 94, dribbling: 86, kick: 95 },
    signatureWeapon: 'Chop Dribble & 28m Middle Shot',
    description:
      'Self-proclaimed King of the pitch who devours his own teammates’ plays with overwhelming power.',
    specialAbility:
      'Predator Eye: Cuts sharply inside to unleash lethal high-velocity power drives.',
  },
  {
    id: 'hyoma-chigiri',
    number: '04',
    name: 'Hyoma Chigiri',
    position: 'LW / LWB',
    rarity: 'Epic',
    power: 87,
    attributes: { mind: 81, speed: 98, strength: 76, dribbling: 88, kick: 85 },
    signatureWeapon: 'Top-Speed Breakaway Sprint',
    description:
      'Blazing wide attacker known as the Red Panther who leaves defenders behind over long sprints.',
    specialAbility:
      '44° Panther Snipe: Accelerates down the left flank before curling into the far upper corner.',
  },
  {
    id: 'reo-mikage',
    number: '09',
    name: 'Reo Mikage',
    position: 'CM / CB',
    rarity: 'Epic',
    power: 88,
    attributes: { mind: 91, speed: 84, strength: 84, dribbling: 88, kick: 86 },
    signatureWeapon: '99% Chameleon Technique Copy',
    description:
      'Versatile all-rounder capable of anchoring midfield, defending, or mirroring world-class techniques.',
    specialAbility:
      'Chameleon Meta: Replicates elite passing curves and finishing motions on demand.',
  },
  {
    id: 'rensuke-kunigami',
    number: '50',
    name: 'Rensuke Kunigami',
    position: 'ST / CF',
    rarity: 'Epic',
    power: 87,
    attributes: { mind: 77, speed: 83, strength: 95, dribbling: 76, kick: 94 },
    signatureWeapon: 'Ambidextrous Power Physique',
    description:
      'Wild Card cyborg striker rebuilt with ambidextrous power and relentless physical dominance.',
    specialAbility:
      'Lefty Power Cannon: Smashes knuckleballs and tap-ins through traffic with either foot.',
  },
  {
    id: 'ryusei-shidou',
    number: '99',
    name: 'Ryusei Shidou',
    position: 'CF / ST',
    rarity: 'Legendary',
    power: 92,
    attributes: { mind: 80, speed: 89, strength: 90, dribbling: 83, kick: 96 },
    signatureWeapon: 'Penalty-Box Reflex Instincts',
    description:
      'Feral penalty-box predator who converts passes from any posture inside the eighteen-yard box.',
    specialAbility:
      'Big Bang Drive: Launches mid-air bicycle strikes the instant his instincts sense the goal.',
  },
  {
    id: 'sae-itoshi',
    number: '10',
    name: 'Sae Itoshi',
    position: 'CM / CAM',
    rarity: 'Mythic',
    power: 96,
    attributes: { mind: 97, speed: 89, strength: 82, dribbling: 95, kick: 94 },
    signatureWeapon: 'Counter-Dribble & Pinpoint Passing',
    description:
      'New Generation World XI midfielder who dissects defenses with cold mathematical precision.',
    specialAbility:
      'Beautiful Destruction: Threads counter-intuitive trivela passes that bypass entire back lines.',
  },
  {
    id: 'michael-kaiser',
    number: '10',
    name: 'Michael Kaiser',
    position: 'CF / ST',
    rarity: 'Mythic',
    power: 96,
    attributes: { mind: 93, speed: 91, strength: 86, dribbling: 90, kick: 98 },
    signatureWeapon: 'Kaiser Impact Swing Speed',
    description:
      'Bastard München’s arrogant New Generation World XI ace boasting the fastest shot swing alive.',
    specialAbility:
      'Kaiser Impact Magnus: Fires an unstoppable curving strike in the fraction of a heartbeat.',
  },
  {
    id: 'alexis-ness',
    number: '08',
    name: 'Alexis Ness',
    position: 'CM / CAM',
    rarity: 'Rare',
    power: 84,
    attributes: { mind: 88, speed: 79, strength: 75, dribbling: 89, kick: 82 },
    signatureWeapon: 'Flexible Ankle Ball Control',
    description:
      'Bastard München’s Magician who crafts silky midfield passes with flexible ankle control.',
    specialAbility:
      'Magician’s Curve: Slips threaded passes beneath tight pressing traps into the final third.',
  },
  {
    id: 'oliver-aiku',
    number: '02',
    name: 'Oliver Aiku',
    position: 'CB',
    rarity: 'Epic',
    power: 90,
    attributes: { mind: 92, speed: 86, strength: 93, dribbling: 77, kick: 82 },
    signatureWeapon: 'Spatial Defense & Reflexes',
    description:
      'Former Japan U-20 captain and elite center-back who locks down strikers with spatial analysis.',
    specialAbility:
      'Meta-Snake Intercept: Reads passing lanes early and clears aerial threats on reflex.',
  },
  {
    id: 'yo-hiori',
    number: '23',
    name: 'Yo Hiori',
    position: 'CAM / RB',
    rarity: 'Rare',
    power: 85,
    attributes: { mind: 93, speed: 80, strength: 72, dribbling: 87, kick: 86 },
    signatureWeapon: 'Sae-Tier Left-Footed Touch',
    description:
      'Calm left-footed playmaker whose ultra-soft ball control mirrors elite international midfielders.',
    specialAbility:
      'Reflexive Metavision Pass: Delivers blind no-look lofted passes to match striker timing.',
  },
  {
    id: 'tabito-karasu',
    number: '06',
    name: 'Tabito Karasu',
    position: 'CDM / CM',
    rarity: 'Rare',
    power: 86,
    attributes: { mind: 91, speed: 82, strength: 84, dribbling: 88, kick: 80 },
    signatureWeapon: 'Hand-Check Ball Retention',
    description:
      'Calculating assassin midfielder who shields the ball with sharp hand-checks and targets weak links.',
    specialAbility:
      'Weakness Lock: Uses elite feints and arm spacing to dictate midfield tempo under pressure.',
  },
  {
    id: 'eita-otoya',
    number: '33',
    name: 'Eita Otoya',
    position: 'RW / RWB',
    rarity: 'Rare',
    power: 83,
    attributes: { mind: 82, speed: 91, strength: 74, dribbling: 85, kick: 81 },
    signatureWeapon: 'Stealth Off-Ball Infiltration',
    description:
      'Stealthy shadow winger who slips behind defenders’ blind spots during quick one-two sequences.',
    specialAbility:
      'Shadow Step: Ghosts past high defensive lines into open channels near the touchline.',
  },
  {
    id: 'kenyu-yukimiya',
    number: '15',
    name: 'Kenyu Yukimiya',
    position: 'LW / LB',
    rarity: 'Rare',
    power: 85,
    attributes: { mind: 79, speed: 89, strength: 82, dribbling: 93, kick: 87 },
    signatureWeapon: 'Street-Style 1v1 Dribbling',
    description:
      'Relentless one-on-one street dribbler capable of carving solo paths down the wing.',
    specialAbility:
      'Gyro Shot: Whips dipping, swerving strikes over diving keepers from tight angles.',
  },
  {
    id: 'gin-gagamaru',
    number: '01',
    name: 'Gin Gagamaru',
    position: 'GK',
    rarity: 'Rare',
    power: 84,
    attributes: { mind: 81, speed: 85, strength: 88, dribbling: 71, kick: 80 },
    signatureWeapon: 'Feral Acrobatic Reflexes',
    description:
      'Wild instinctual goalkeeper whose unorthodox flexibility produces impossible reaction saves.',
    specialAbility:
      'Beast Reflex Save: Deflects point-blank shots with handstands and scorpion clearances.',
  },
  {
    id: 'ikki-niko',
    number: '25',
    name: 'Ikki Niko',
    position: 'CB / CDM',
    rarity: 'Rare',
    power: 82,
    attributes: { mind: 92, speed: 78, strength: 73, dribbling: 79, kick: 77 },
    signatureWeapon: 'Defensive Spatial Vision',
    description:
      'Watchtower tactician who surveys counter-attacks early and disrupts playmakers from deep.',
    specialAbility:
      'Watchtower Sweep: Anticipates striker runs and cuts out final balls before they connect.',
  },
  {
    id: 'jyubei-aryu',
    number: '02',
    name: 'Jyubei Aryu',
    position: 'CB',
    rarity: 'Rare',
    power: 83,
    attributes: { mind: 78, speed: 80, strength: 89, dribbling: 74, kick: 81 },
    signatureWeapon: 'Extended Vertical Reach',
    description:
      'Towering aerial specialist whose extraordinary reach dominates crosses and set-piece duels.',
    specialAbility:
      'Glamorous Reach: Claims every high ball and blocks shots at maximum vertical extension.',
  },
  {
    id: 'aoshi-tokimitsu',
    number: '20',
    name: 'Aoshi Tokimitsu',
    position: 'CDM / CB',
    rarity: 'Common',
    power: 78,
    attributes: { mind: 69, speed: 83, strength: 92, dribbling: 75, kick: 76 },
    signatureWeapon: 'Limitless Stamina & Muscle',
    description:
      'Anxious yet explosive physical powerhouse blessed with boundless stamina and rapid recovery.',
    specialAbility:
      'Panic Turbo Press: Overwhelms ball-carriers with relentless quick-step shoulder barges.',
  },
  {
    id: 'zantetsu-tsurugi',
    number: '08',
    name: 'Zantetsu Tsurugi',
    position: 'RW / RWB',
    rarity: 'Common',
    power: 79,
    attributes: { mind: 67, speed: 94, strength: 80, dribbling: 81, kick: 84 },
    signatureWeapon: 'Explosive Initial Acceleration',
    description:
      'Explosive short-burst sprinter with a lethal left-footed curler from the right flank.',
    specialAbility:
      'Zero-Step Acceleration: Reaches top speed in three strides to beat markers cleanly.',
  },
  {
    id: 'jingo-raichi',
    number: '22',
    name: 'Jingo Raichi',
    position: 'CDM',
    rarity: 'Common',
    power: 79,
    attributes: { mind: 75, speed: 79, strength: 88, dribbling: 74, kick: 78 },
    signatureWeapon: 'Relentless Man-Marking Stamina',
    description:
      'Fierce man-marking specialist whose tireless lung capacity suffocates opposing playmakers.',
    specialAbility:
      'Sexy Football Lockdown: Shadows target aces relentlessly across every zone.',
  },
  {
    id: 'ranze-kurona',
    number: '16',
    name: 'Ranze Kurona',
    position: 'RB / RWB',
    rarity: 'Rare',
    power: 82,
    attributes: { mind: 85, speed: 90, strength: 72, dribbling: 86, kick: 78 },
    signatureWeapon: 'High-Speed Short Passing',
    description:
      'Agile fullback and short-pass partner who orbits playmakers in razor-sharp triangles.',
    specialAbility:
      'Planet Hotline: Chains rapid one-touch wall passes at full sprint through congested lanes.',
  },
  {
    id: 'jin-kiyora',
    number: '21',
    name: 'Jin Kiyora',
    position: 'LB / LWB',
    rarity: 'Common',
    power: 79,
    attributes: { mind: 82, speed: 84, strength: 77, dribbling: 85, kick: 81 },
    signatureWeapon: 'Breakdance Core Balance',
    description:
      'Borderline specialist with acrobatic breakdance balance who thrives on razor-thin margins.',
    specialAbility:
      'Borderline Assist: Threads pinpoint low crosses while balancing on the edge of control.',
  },
  {
    id: 'nijiro-nanase',
    number: '17',
    name: 'Nijiro Nanase',
    position: 'LM / LW',
    rarity: 'Common',
    power: 76,
    attributes: { mind: 79, speed: 80, strength: 75, dribbling: 78, kick: 76 },
    signatureWeapon: 'Natural Ambidextrous Passing',
    description:
      'Hardworking ambidextrous support forward who unlocks teammates through honest off-ball runs.',
    specialAbility:
      'Two-Footed Link: Feeds clean short passes with either foot to keep attacks flowing.',
  },
  {
    id: 'marc-snuffy',
    number: '01',
    name: 'Marc Snuffy',
    position: 'CM / ST',
    rarity: 'Mythic',
    power: 97,
    attributes: { mind: 99, speed: 87, strength: 92, dribbling: 93, kick: 94 },
    signatureWeapon: 'Total Football Tactical Jiu-Jitsu',
    description:
      'Ubers’ master tactician and crown-winning veteran regarded as the most complete player alive.',
    specialAbility:
      'Crown Messenger Tactics: Controls every phase of play with world-leading IQ and shielding.',
  },
  {
    id: 'noel-noa',
    number: '09',
    name: 'Noel Noa',
    position: 'CF / ST',
    rarity: 'Mythic',
    power: 99,
    attributes: { mind: 95, speed: 93, strength: 94, dribbling: 94, kick: 99 },
    signatureWeapon: 'True Rational Ambidexterity',
    description:
      'World’s #1 striker and Bastard München master whose rational ambidexterity sets the gold standard.',
    specialAbility:
      'Perfect Ambidextrous Finish: Executes machine-precise dribbles and lethal shots with both feet.',
  },
  {
    id: 'chris-prince',
    number: '01',
    name: 'Chris Prince',
    position: 'CF / ST',
    rarity: 'Mythic',
    power: 96,
    attributes: { mind: 88, speed: 95, strength: 98, dribbling: 90, kick: 96 },
    signatureWeapon: 'Peak Physique & Ball Striking',
    description:
      'Manshine City’s #2 ranked superstar possessing a sculpted physique and ferocious ball striking.',
    specialAbility:
      'Unpredictable Knuckleball: Blasts violent, swerving shots that dip erratically mid-flight.',
  },
  {
    id: 'lavinho',
    number: '09',
    name: 'Lavinho',
    position: 'RW / CF',
    rarity: 'Mythic',
    power: 95,
    attributes: { mind: 87, speed: 94, strength: 81, dribbling: 99, kick: 91 },
    signatureWeapon: 'Freeform Ginga Rhythm',
    description:
      'FC Barcha’s dazzling Brazilian master striker who turns every match into pure improvised art.',
    specialAbility:
      'Butterfly Dance: Glides past entire defensive formations with effortless samba rhythm.',
  },
  {
    id: 'julian-loki',
    number: '11',
    name: 'Julian Loki',
    position: 'CF / RW',
    rarity: 'Mythic',
    power: 95,
    attributes: { mind: 89, speed: 100, strength: 84, dribbling: 94, kick: 90 },
    signatureWeapon: 'Godspeed Sprint Velocity',
    description:
      'P.X.G.’s teenage French prodigy blessed with transcendent acceleration beyond human reaction.',
    specialAbility:
      'Godspeed Distortion: Closes multi-meter gaps instantaneously to intercept or finish solo.',
  },
  {
    id: 'don-lorenzo',
    number: '02',
    name: 'Don Lorenzo',
    position: 'CB / CDM',
    rarity: 'Legendary',
    power: 93,
    attributes: { mind: 91, speed: 87, strength: 88, dribbling: 91, kick: 82 },
    signatureWeapon: 'Ace-Eater Man-Marking',
    description:
      'Ubers’ New Generation World XI Ace Eater who locks down top strikers with erratic movement.',
    specialAbility:
      'Zombie Dribble: Transitions smoothly from shutdown man-marking into unpredictable counter runs.',
  },
  {
    id: 'gurimu-igarashi',
    number: '36',
    name: 'Gurimu Igarashi',
    position: 'WB / CM',
    rarity: 'Common',
    power: 70,
    attributes: { mind: 74, speed: 72, strength: 71, dribbling: 68, kick: 69 },
    signatureWeapon: 'Malicia Contact Baiting',
    description:
      'Scrappy survivor from a temple upbringing who refuses elimination through sheer grit.',
    specialAbility:
      'Malicia Foul Bait: Draws critical fouls under heavy pressure to halt rival momentum.',
  },
  {
    id: 'shuto-sendo',
    number: '11',
    name: 'Shuto Sendo',
    position: 'SS / ST',
    rarity: 'Common',
    power: 80,
    attributes: { mind: 78, speed: 83, strength: 79, dribbling: 79, kick: 83 },
    signatureWeapon: 'Second-Ball Poaching',
    description:
      'Japan U-20’s original ace forward who sharpens his opportunistic finishing under Ubers.',
    specialAbility:
      'Shadow Striker Poach: Reacts first to loose rebounds and deflections inside the six-yard box.',
  },
  {
    id: 'charles-chevalier',
    number: '14',
    name: 'Charles Chevalier',
    position: 'CAM / CM',
    rarity: 'Epic',
    power: 88,
    attributes: { mind: 91, speed: 84, strength: 76, dribbling: 89, kick: 88 },
    signatureWeapon: 'Contrarian High-Spin Passing',
    description:
      'P.X.G.’s capricious fifteen-year-old genius passer who thrives on contrarian high-risk balls.',
    specialAbility:
      'Contrarian Rabona: Delivers wickedly spinning passes into the most dangerous blind zones.',
  },
  {
    id: 'wataru-kuon',
    number: '06',
    name: 'Wataru Kuon',
    position: 'CB / CF',
    rarity: 'Common',
    power: 72,
    attributes: { mind: 76, speed: 74, strength: 75, dribbling: 70, kick: 72 },
    signatureWeapon: 'Explosive Vertical Leap',
    description:
      'Team Z strategist known for his high vertical leap and pragmatic tactical calculation.',
    specialAbility:
      'Sky-High Header: Wins contested aerial clearances and knockdowns in crowded boxes.',
  },
  {
    id: 'asahi-naruhaya',
    number: '38',
    name: 'Asahi Naruhaya',
    position: 'LW / SS',
    rarity: 'Common',
    power: 73,
    attributes: { mind: 75, speed: 84, strength: 68, dribbling: 76, kick: 71 },
    signatureWeapon: 'Blindspot Off-Ball Runs',
    description:
      'Nimble forward who slips into defensive blind spots using sharp off-the-ball movement.',
    specialAbility:
      'Blindspot Slip: Darting runs behind fullbacks to create sudden close-range angles.',
  },
  {
    id: 'jinpachi-ego',
    number: '00',
    name: 'Jinpachi Ego',
    position: 'DIR',
    rarity: 'Epic',
    power: 89,
    attributes: { mind: 99, speed: 70, strength: 72, dribbling: 76, kick: 84 },
    signatureWeapon: 'Egoist Psychological Philosophy',
    description:
      'Architect of the Blue Lock program whose uncompromising philosophy forged Japan’s deadliest strikers.',
    specialAbility:
      'Egoist Formula: Unlocks chemical reactions across mismatched teammates under elimination stakes.',
  },
];

export const CHARACTER_DECK: CharacterCard[] = BLUE_LOCK_CHARACTER_SEEDS.map((seed) => {
  const asset = BLUE_LOCK_ASSET_REGISTRY[seed.id];
  return {
    id: seed.id,
    number: seed.number,
    name: seed.name,
    position: seed.position,
    universe: 'Blue Lock',
    rarity: seed.rarity,
    portrait: null,
    assetPath: asset ? asset.localAssetPath : `/characters/${seed.id}.jpg`,
    power: seed.power,
    attributes: seed.attributes,
    signatureWeapon: seed.signatureWeapon,
    description: seed.description,
    specialAbility: seed.specialAbility,
  };
});

export function shuffleDeck(cards: CharacterCard[]): CharacterCard[] {
  const copy = [...cards];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
