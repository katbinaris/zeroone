const firstParts = [
  'Cyber',
  'Data',
  'Hacker',
  'Net',
  'Web',
  'System',
  'Code',
  'Crypto',
  'Info',
  'Tech',
  'Haptic',
  'Virtual',
  'Quantum',
  'Zero',
  'Digital',
  'Neural',
  'Space',
  'Binaris',
  'Nano',
  'Micro',
  'Mega',
  'Kosro'
]

const secondParts = [
  'Punk',
  'Ninja',
  'Runner',
  'Hacker',
  'Pirate',
  'Coder',
  'Geek',
  'Ghost',
  'Phreak',
  'Bot',
  'Byte',
  'Link',
  'Logic',
  'Storm',
  'Buster',
  'Byte'
]

export const randomName = () => {
  const first = firstParts[Math.floor(Math.random() * firstParts.length)]
  const second = secondParts[Math.floor(Math.random() * secondParts.length)]
  return `${first} ${second}`
}
