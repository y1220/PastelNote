import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  const chapters = [
    {
      id: 1,
      title: "たつまき！",
      description: "カンザスの大地に竜巻が現れ、ドロシーとトトの家を巻き上げます。",
      color: "from-slate-700 to-slate-900",
    },
    {
      id: 2,
      title: "オズの国へ",
      description: "家は静かに降り立ち、不思議な世界「オズの国」が広がります。",
      color: "from-sky-300 to-green-300",
    },
    {
      id: 3,
      title: "小人たちと北の魔女",
      description: "家が悪い東の魔女を倒し、北の良い魔女が現れます。",
      color: "from-green-200 to-green-400",
    },
    {
      id: 4,
      title: "黄色いレンガ道",
      description: "ドロシーとトトは黄色いレンガ道を歩き始めます。",
      color: "from-yellow-200 to-yellow-400",
    },
    {
      id: 5,
      title: "かかしと出会う",
      description: "とうもろこし畑で脳がほしいかかしに出会います。",
      color: "from-amber-200 to-orange-300",
    },
    {
      id: 6,
      title: "ブリキのきこり",
      description: "森で錆びた心がほしいブリキの木こりを見つけます。",
      color: "from-gray-300 to-gray-500",
    },
    {
      id: 7,
      title: "ライオンの登場",
      description: "大きいけど臆病で勇気がほしいライオンが仲間になります。",
      color: "from-yellow-300 to-orange-400",
    },
    {
      id: 8,
      title: "エメラルドの都が見えた！",
      description: "緑に輝くエメラルドの都が遠くに見えます。",
      color: "from-emerald-300 to-green-500",
    },
    {
      id: 9,
      title: "オズの門番",
      description: "門番がみんなに緑の眼鏡を渡して都の中へ案内します。",
      color: "from-green-400 to-emerald-600",
    },
    {
      id: 10,
      title: "オズとの対面",
      description: "オズが不思議な姿で現れ、西の魔女を倒すよう命じます。",
      color: "from-red-400 to-pink-600",
    },
    {
      id: 11,
      title: "西の魔女の城へ",
      description: "仲間たちは魔女の城へ向かい、空には魔女の猿が飛んできます。",
      color: "from-slate-600 to-slate-800",
    },
    {
      id: 12,
      title: "ドロシーがつかまる！",
      description: "魔女にドロシーが捕まり、トトと離ればなれになってしまいます。",
      color: "from-slate-700 to-slate-900",
    },
    {
      id: 13,
      title: "魔女を倒す",
      description: "ドロシーが水をかけると魔女が「溶ける〜！」と叫んで消えました。",
      color: "from-blue-400 to-cyan-600",
    },
    {
      id: 14,
      title: "都に戻って",
      description: "みんなはオズの元に戻り、願いを叶えてもらうため再び訪ねます。",
      color: "from-green-300 to-emerald-500",
    },
    {
      id: 15,
      title: "オズの正体",
      description: "カーテンの裏にいたのは普通のおじいさんでした。",
      color: "from-gray-400 to-gray-600",
    },
    {
      id: 16,
      title: "かかしに脳を",
      description: "オズはかかしに知恵をくれるお守りを授けます。",
      color: "from-pink-300 to-rose-400",
    },
    {
      id: 17,
      title: "ブリキに心を",
      description: "ブリキの木こりにはハートの形の時計を授けます。",
      color: "from-red-300 to-pink-500",
    },
    {
      id: 18,
      title: "ライオンに勇気を",
      description: "ライオンには勇気の薬を渡し、誇らしく立ち上がります。",
      color: "from-green-300 to-lime-500",
    },
    {
      id: 19,
      title: "帰る方法",
      description: "北の魔女が再び現れ、銀の靴の使い方を教えます。",
      color: "from-purple-300 to-pink-400",
    },
    {
      id: 20,
      title: "おうちへ",
      description: "ドロシーが目を開けると、おばさんの腕の中でした。",
      color: "from-blue-300 to-sky-400",
    },
  ]

  const renderChapterIllustration = (chapterId: number) => {
    switch (chapterId) {
      case 1:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <defs>
              <linearGradient id="storm-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1f2937" />
                <stop offset="100%" stopColor="#374151" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="300" height="200" fill="url(#storm-sky)" />
            <rect x="0" y="150" width="300" height="50" fill="#92400e" />

            {/* Tornado with animation effect */}
            <g filter="url(#glow)">
              <path
                d="M150 30 L145 60 L140 90 L135 120 L130 150 L125 180"
                stroke="#6b7280"
                strokeWidth="12"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M150 30 L155 60 L160 90 L165 120 L170 150 L175 180"
                stroke="#6b7280"
                strokeWidth="12"
                fill="none"
                opacity="0.8"
              />
              <ellipse cx="150" cy="30" rx="25" ry="12" fill="#4b5563" />
            </g>

            {/* House being lifted */}
            <g transform="translate(110, 70) rotate(-5)">
              <rect x="0" y="20" width="50" height="35" fill="#92400e" />
              <polygon points="0,20 25,0 50,20" fill="#b45309" />
              <rect x="15" y="30" width="10" height="10" fill="#fbbf24" />
              <circle cx="20" cy="35" r="3" fill="#1f2937" />
            </g>

            {/* Lightning */}
            <path d="M80 20 L85 40 L75 45 L80 65" stroke="#fbbf24" strokeWidth="3" fill="none" />
            <path d="M220 25 L225 45 L215 50 L220 70" stroke="#fbbf24" strokeWidth="3" fill="none" />
          </svg>
        )

      case 2:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <defs>
              <linearGradient id="oz-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#86efac" />
              </linearGradient>
            </defs>
            <rect width="300" height="200" fill="url(#oz-sky)" />

            {/* Magical landscape */}
            <ellipse cx="75" cy="180" rx="80" ry="35" fill="#4ade80" />
            <ellipse cx="225" cy="180" rx="75" ry="30" fill="#22c55e" />

            {/* House landed safely */}
            <rect x="120" y="125" width="60" height="50" fill="#92400e" />
            <polygon points="120,125 150,105 180,125" fill="#b45309" />
            <rect x="135" y="140" width="12" height="12" fill="#fbbf24" />
            <rect x="155" y="135" width="8" height="8" fill="#fbbf24" />

            {/* Magical flowers */}
            <g>
              <circle cx="80" cy="165" r="8" fill="#ec4899" />
              <circle cx="220" cy="160" r="6" fill="#f97316" />
              <circle cx="200" cy="170" r="7" fill="#8b5cf6" />
              <circle cx="100" cy="175" r="5" fill="#06b6d4" />
            </g>

            {/* Sparkles */}
            <text x="60" y="50" fill="#fbbf24" fontSize="24" className="animate-pulse">
              ✨
            </text>
            <text x="180" y="40" fill="#fbbf24" fontSize="18" className="animate-pulse">
              ✨
            </text>
            <text x="240" y="60" fill="#fbbf24" fontSize="20" className="animate-pulse">
              ✨
            </text>
          </svg>
        )

      case 3:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#dcfce7" />

            {/* House crushing witch (showing legs) */}
            <rect x="130" y="140" width="40" height="30" fill="#92400e" />
            <rect x="145" y="170" width="4" height="15" fill="#000" />
            <rect x="151" y="170" width="4" height="15" fill="#000" />
            <ellipse cx="147" cy="187" rx="3" ry="2" fill="#dc2626" />
            <ellipse cx="153" cy="187" rx="3" ry="2" fill="#dc2626" />

            {/* Munchkins */}
            <g transform="translate(80, 150)">
              <circle cx="0" cy="0" r="15" fill="#fbbf24" />
              <rect x="-5" y="10" width="10" height="20" fill="#3b82f6" />
              <polygon points="-8,-18 0,-25 8,-18" fill="#92400e" />
            </g>
            <g transform="translate(220, 155)">
              <circle cx="0" cy="0" r="15" fill="#fbbf24" />
              <rect x="-5" y="10" width="10" height="15" fill="#22c55e" />
              <polygon points="-8,-18 0,-25 8,-18" fill="#eab308" />
            </g>

            {/* Good Witch */}
            <g transform="translate(150, 70)">
              <circle cx="0" cy="0" r="20" fill="#fbbf24" />
              <rect x="-10" y="15" width="20" height="40" fill="#ec4899" />
              <polygon points="-10,-15 0,-30 10,-15" fill="#fbbf24" />
              {/* Magic wand */}
              <line x1="20" y1="10" x2="35" y2="-5" stroke="#92400e" strokeWidth="2" />
              <text x="35" y="-5" fill="#fbbf24" fontSize="12">
                ⭐
              </text>
            </g>
          </svg>
        )

      case 4:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#7dd3fc" />

            {/* Yellow brick road with perspective */}
            <path d="M50 190 Q150 120 280 50" stroke="#fbbf24" strokeWidth="25" fill="none" />

            {/* Brick pattern */}
            {Array.from({ length: 15 }).map((_, i) => (
              <rect key={i} x={45 + i * 15} y={185 - i * 8} width={12} height={6} fill="#f59e0b" opacity={0.8} />
            ))}

            {/* Dorothy and Toto */}
            <g transform="translate(90, 140)">
              <circle cx="0" cy="0" r="12" fill="#fbbf24" />
              <rect x="-5" y="10" width="10" height="25" fill="#3b82f6" />
              <polygon points="-8,-15 0,-25 8,-15" fill="#92400e" />
              {/* Toto */}
              <ellipse cx="20" cy="25" rx="8" ry="5" fill="#92400e" />
              <circle cx="25" cy="22" r="3" fill="#92400e" />
            </g>

            {/* Background scenery */}
            <circle cx="200" cy="100" r="35" fill="#22c55e" />
            <rect x="195" y="125" width="10" height="25" fill="#92400e" />

            {/* Clouds */}
            <ellipse cx="100" cy="40" rx="30" ry="15" fill="#ffffff" opacity="0.8" />
            <ellipse cx="220" cy="30" rx="25" ry="12" fill="#ffffff" opacity="0.8" />
          </svg>
        )

      case 5:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#e0f2fe" />

            {/* Corn field */}
            <rect x="0" y="120" width="300" height="80" fill="#16a34a" />
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x={20 + i * 35} y={80 + (i % 2) * 10} width="8" height="60" fill="#eab308" />
            ))}

            {/* Scarecrow on pole */}
            <g transform="translate(150, 60)">
              <rect x="-2" y="0" width="4" height="80" fill="#92400e" />
              <circle cx="0" cy="-10" r="15" fill="#d2b48c" />
              <rect x="-15" y="5" width="30" height="25" fill="#eab308" />
              {/* Arms */}
              <rect x="-35" y="10" width="20" height="4" fill="#92400e" />
              <rect x="15" y="10" width="20" height="4" fill="#92400e" />
              {/* Hat */}
              <rect x="-10" y="-20" width="20" height="8" fill="#78350f" />
              {/* Straw */}
              <line x1="-15" y1="20" x2="-20" y2="35" stroke="#eab308" strokeWidth="2" />
              <line x1="15" y1="20" x2="20" y2="35" stroke="#eab308" strokeWidth="2" />
              {/* Face */}
              <circle cx="-5" cy="-15" r="2" fill="#000" />
              <circle cx="5" cy="-15" r="2" fill="#000" />
              <path d="M-5 -5 Q0 0 5 -5" stroke="#000" strokeWidth="2" fill="none" />
            </g>

            {/* Dorothy nearby */}
            <g transform="translate(200, 130)">
              <circle cx="0" cy="0" r="10" fill="#fbbf24" />
              <rect x="-5" y="10" width="10" height="20" fill="#3b82f6" />
            </g>
          </svg>
        )

      case 6:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#f0f8ff" />

            {/* Forest */}
            <ellipse cx="80" cy="190" rx="40" ry="20" fill="#16a34a" />
            <rect x="75" y="120" width="10" height="70" fill="#92400e" />
            <circle cx="80" cy="120" r="25" fill="#16a34a" />
            <ellipse cx="220" cy="190" rx="45" ry="25" fill="#16a34a" />
            <rect x="215" y="110" width="12" height="80" fill="#92400e" />
            <circle cx="220" cy="110" r="30" fill="#16a34a" />

            {/* Tin Woodman */}
            <g transform="translate(150, 120)">
              <rect x="-10" y="0" width="20" height="40" fill="#9ca3af" />
              <circle cx="0" cy="-10" r="10" fill="#9ca3af" />
              {/* Arms */}
              <rect x="-25" y="5" width="15" height="6" fill="#9ca3af" />
              <rect x="10" y="5" width="15" height="6" fill="#9ca3af" />
              {/* Legs */}
              <rect x="-7" y="40" width="6" height="25" fill="#9ca3af" />
              <rect x="1" y="40" width="6" height="25" fill="#9ca3af" />
              {/* Axe */}
              <rect x="25" y="0" width="3" height="20" fill="#92400e" />
              <rect x="22" y="-3" width="9" height="6" fill="#9ca3af" />
              {/* Rust effects */}
              <circle cx="-5" cy="10" r="2" fill="#b45309" />
              <circle cx="5" cy="20" r="1.5" fill="#b45309" />
              {/* Face */}
              <circle cx="-3" cy="-15" r="1.5" fill="#000" />
              <circle cx="3" cy="-15" r="1.5" fill="#000" />
              <path d="M-3 -5 Q0 -2 3 -5" stroke="#000" strokeWidth="1" fill="none" />
            </g>

            {/* Oil can */}
            <ellipse cx="100" cy="170" rx="8" ry="12" fill="#eab308" />
            <rect x="96" y="165" width="8" height="3" fill="#eab308" />
          </svg>
        )

      case 7:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#fef3c7" />

            {/* Lion */}
            <g transform="translate(150, 120)">
              <ellipse cx="0" cy="10" rx="30" ry="20" fill="#eab308" />
              <circle cx="0" cy="-10" r="25" fill="#eab308" />
              {/* Mane */}
              <circle cx="0" cy="-10" r="35" fill="#d97706" />
              <circle cx="-15" cy="-25" r="15" fill="#d97706" />
              <circle cx="15" cy="-25" r="15" fill="#d97706" />
              <circle cx="-25" cy="-5" r="12" fill="#d97706" />
              <circle cx="25" cy="-5" r="12" fill="#d97706" />
              {/* Face */}
              <circle cx="-5" cy="-15" r="3" fill="#000" />
              <circle cx="5" cy="-15" r="3" fill="#000" />
              <ellipse cx="0" cy="-5" rx="3" ry="5" fill="#000" />
              {/* Legs */}
              <ellipse cx="-20" cy="30" rx="6" ry="15" fill="#eab308" />
              <ellipse cx="20" cy="30" rx="6" ry="15" fill="#eab308" />
              {/* Tail */}
              <path d="M30 10 Q50 0 40 20" stroke="#eab308" strokeWidth="6" fill="none" />
              <circle cx="40" cy="20" r="4" fill="#d97706" />
            </g>

            {/* Scared expression (hiding behind tree) */}
            <rect x="50" y="80" width="15" height="80" fill="#92400e" />
            <circle cx="57" cy="80" r="20" fill="#16a34a" />

            {/* Dorothy, Scarecrow, Tin Man in background */}
            <g transform="translate(220, 140)">
              <circle cx="0" cy="0" r="8" fill="#fbbf24" />
              <circle cx="20" cy="-5" r="8" fill="#d2b48c" />
              <rect x="35" y="-5" width="8" height="15" fill="#9ca3af" />
            </g>
          </svg>
        )

      case 8:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <defs>
              <linearGradient id="emerald-city" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="emerald-glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="300" height="200" fill="#e0f2fe" />

            {/* Emerald City with glow effect */}
            <g filter="url(#emerald-glow)">
              <rect x="180" y="50" width="100" height="80" fill="url(#emerald-city)" />
              <polygon points="180,50 230,20 280,50" fill="#10b981" />
              <rect x="200" y="30" width="10" height="30" fill="#10b981" />
              <rect x="220" y="25" width="12" height="35" fill="#10b981" />
              <rect x="245" y="35" width="8" height="25" fill="#10b981" />
            </g>

            {/* Sparkles around city */}
            <text x="160" y="35" fill="#10b981" fontSize="16" className="animate-pulse">
              ✨
            </text>
            <text x="285" y="45" fill="#10b981" fontSize="12" className="animate-pulse">
              ✨
            </text>
            <text x="190" y="20" fill="#10b981" fontSize="10" className="animate-pulse">
              ✨
            </text>

            {/* Our heroes in silhouette */}
            <g transform="translate(50, 140)">
              <circle cx="0" cy="0" r="10" fill="#1f2937" />
              <circle cx="20" cy="-5" r="10" fill="#1f2937" />
              <rect x="35" y="-5" width="10" height="15" fill="#1f2937" />
              <ellipse cx="55" cy="5" rx="12" ry="8" fill="#1f2937" />
            </g>

            {/* Yellow brick road leading to city */}
            <path d="M40 170 Q120 130 180 80" stroke="#fbbf24" strokeWidth="18" fill="none" opacity="0.8" />
          </svg>
        )

      case 9:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#f0fff0" />

            {/* Large gates */}
            <rect x="120" y="50" width="60" height="100" fill="#22c55e" />
            <rect x="115" y="45" width="70" height="10" fill="#16a34a" />
            <circle cx="135" cy="100" r="3" fill="#eab308" />
            <circle cx="165" cy="100" r="3" fill="#eab308" />
            {/* Gate pattern */}
            <rect x="125" y="60" width="20" height="30" fill="#16a34a" />
            <rect x="155" y="60" width="20" height="30" fill="#16a34a" />
            <rect x="125" y="100" width="20" height="30" fill="#16a34a" />
            <rect x="155" y="100" width="20" height="30" fill="#16a34a" />

            {/* Guardian */}
            <g transform="translate(200, 120)">
              <circle cx="0" cy="0" r="15" fill="#fbbf24" />
              <rect x="-10" y="15" width="20" height="30" fill="#3b82f6" />
              <polygon points="-10,-10 0,-25 10,-10" fill="#22c55e" />
              {/* Green glasses */}
              <rect x="-5" y="-5" width="4" height="4" fill="#10b981" />
              <rect x="1" y="-5" width="4" height="4" fill="#10b981" />
            </g>

            {/* Our heroes */}
            <g transform="translate(80, 140)">
              <circle cx="0" cy="0" r="8" fill="#fbbf24" />
              <circle cx="-15" cy="-5" r="8" fill="#d2b48c" />
              <rect x="-30" y="-5" width="8" height="12" fill="#9ca3af" />
              <ellipse cx="-45" cy="5" rx="10" ry="6" fill="#eab308" />
            </g>

            {/* Green glasses being handed out */}
            <rect x="85" y="130" width="6" height="3" fill="#10b981" />
            <rect x="85" y="135" width="6" height="3" fill="#10b981" />
          </svg>
        )

      case 10:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#1f2937" />

            {/* Throne room */}
            <rect x="50" y="150" width="200" height="50" fill="#059669" />

            {/* Mysterious Oz apparition */}
            <circle cx="150" cy="80" r="40" fill="#ec4899" opacity="0.7" />
            <circle cx="150" cy="80" r="30" fill="#be185d" opacity="0.8" />
            <circle cx="150" cy="80" r="20" fill="#dc2626" opacity="0.9" />
            {/* Eyes */}
            <circle cx="140" cy="75" r="5" fill="#fff" />
            <circle cx="160" cy="75" r="5" fill="#fff" />
            <circle cx="140" cy="75" r="3" fill="#000" />
            <circle cx="160" cy="75" r="3" fill="#000" />

            {/* Flames around Oz */}
            <path d="M120 60 L125 50 L130 60 L125 55 Z" fill="#f97316" />
            <path d="M170 65 L175 55 L180 65 L175 60 Z" fill="#f97316" />
            <path d="M110 90 L115 80 L120 90 L115 85 Z" fill="#f97316" />
            <path d="M180 85 L185 75 L190 85 L185 80 Z" fill="#f97316" />

            {/* Our heroes kneeling */}
            <g transform="translate(80, 160)">
              <circle cx="0" cy="0" r="6" fill="#fbbf24" />
              <circle cx="20" cy="-5" r="6" fill="#d2b48c" />
              <rect x="35" y="-5" width="6" height="10" fill="#9ca3af" />
              <ellipse cx="55" cy="5" rx="8" ry="5" fill="#eab308" />
            </g>

            {/* Smoke effects */}
            <ellipse cx="150" cy="120" rx="25" ry="8" fill="#6b7280" opacity="0.3" />
            <ellipse cx="150" cy="130" rx="35" ry="10" fill="#6b7280" opacity="0.2" />
          </svg>
        )

      case 11:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#374151" />

            {/* Dark castle in distance */}
            <rect x="200" y="80" width="60" height="60" fill="#1f2937" />
            <rect x="215" y="60" width="10" height="30" fill="#1f2937" />
            <rect x="235" y="65" width="8" height="25" fill="#1f2937" />
            <polygon points="200,80 230,50 260,80" fill="#111827" />

            {/* Flying monkeys */}
            <g transform="translate(120, 60)">
              <ellipse cx="0" cy="0" rx="8" ry="4" fill="#78350f" />
              <path d="M-5 -2 L-10 -5 M5 -2 L10 -5" stroke="#78350f" strokeWidth="2" />
            </g>
            <g transform="translate(160, 50)">
              <ellipse cx="0" cy="0" rx="6" ry="3" fill="#78350f" />
              <path d="M-3 -2 L-8 -5 M3 -2 L8 -5" stroke="#78350f" strokeWidth="2" />
            </g>
            <g transform="translate(180, 70)">
              <ellipse cx="0" cy="0" rx="7" ry="3" fill="#78350f" />
              <path d="M-4 -2 L-9 -5 M4 -2 L9 -5" stroke="#78350f" strokeWidth="2" />
            </g>

            {/* Our heroes walking cautiously */}
            <g transform="translate(60, 150)">
              <circle cx="0" cy="0" r="8" fill="#fbbf24" />
              <circle cx="-15" cy="-5" r="8" fill="#d2b48c" />
              <rect x="-30" y="-5" width="8" height="12" fill="#9ca3af" />
              <ellipse cx="-45" cy="5" rx="10" ry="6" fill="#eab308" />
            </g>

            {/* Dark path */}
            <path d="M10 170 Q100 140 200 100" stroke="#4b5563" strokeWidth="12" fill="none" />

            {/* Ominous clouds */}
            <ellipse cx="100" cy="30" rx="40" ry="15" fill="#1f2937" />
            <ellipse cx="180" cy="25" rx="35" ry="12" fill="#1f2937" />
          </svg>
        )

      case 12:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#1f2937" />

            {/* Castle interior */}
            <rect x="0" y="120" width="300" height="80" fill="#374151" />

            {/* Prison bars */}
            <rect x="180" y="100" width="4" height="60" fill="#6b7280" />
            <rect x="190" y="100" width="4" height="60" fill="#6b7280" />
            <rect x="200" y="100" width="4" height="60" fill="#6b7280" />
            <rect x="210" y="100" width="4" height="60" fill="#6b7280" />
            <rect x="175" y="105" width="40" height="4" fill="#6b7280" />
            <rect x="175" y="125" width="40" height="4" fill="#6b7280" />

            {/* Dorothy behind bars */}
            <g transform="translate(195, 130)">
              <circle cx="0" cy="0" r="8" fill="#fbbf24" />
              <rect x="-5" y="10" width="10" height="15" fill="#3b82f6" />
            </g>

            {/* Wicked Witch */}
            <g transform="translate(100, 130)">
              <circle cx="0" cy="0" r="12" fill="#84cc16" />
              <rect x="-10" y="12" width="20" height="25" fill="#000" />
              <polygon points="-10,-12 0,-27 10,-12" fill="#000" />
              {/* Witch's broom */}
              <rect x="-25" y="10" width="3" height="20" fill="#92400e" />
              <rect x="-30" y="27" width="13" height="6" fill="#eab308" />
            </g>

            {/* Toto separated */}
            <ellipse cx="50" cy="155" rx="6" ry="4" fill="#78350f" />

            {/* Friends approaching in background */}
            <g transform="translate(30, 140)">
              <circle cx="0" cy="0" r="5" fill="#d2b48c" />
              <rect x="-10" y="0" width="5" height="8" fill="#9ca3af" />
            </g>
          </svg>
        )

      case 13:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#1f2937" />
            <rect x="0" y="120" width="300" height="80" fill="#374151" />

            {/* Dorothy throwing water */}
            <g transform="translate(80, 120)">
              <circle cx="0" cy="0" r="12" fill="#fbbf24" />
              <rect x="-5" y="10" width="10" height="25" fill="#3b82f6" />
              <ellipse cx="-20" cy="10" rx="10" ry="8" fill="#6b7280" />
            </g>

            {/* Water splash with animation */}
            <g>
              <circle cx="120" cy="115" r="4" fill="#06b6d4" className="animate-ping" />
              <circle cx="125" cy="120" r="3" fill="#06b6d4" />
              <circle cx="115" cy="125" r="3" fill="#06b6d4" />
              <circle cx="130" cy="125" r="4" fill="#06b6d4" />
              <circle cx="110" cy="130" r="2" fill="#06b6d4" />
            </g>

            {/* Melting witch */}
            <g transform="translate(140, 100)">
              <circle cx="0" cy="0" r="12" fill="#84cc16" opacity="0.6" />
              <rect x="-10" y="10" width="20" height="25" fill="#000000" opacity="0.4" />
              <polygon points="-10,-15 0,-25 10,-15" fill="#000000" opacity="0.6" />

              {/* Melting effect */}
              <ellipse cx="0" cy="40" rx="30" ry="10" fill="#1f2937" />
              <path d="M-15 35 Q0 50 15 35" stroke="#000000" strokeWidth="4" opacity="0.5" />
            </g>

            {/* Speech bubble */}
            <ellipse cx="200" cy="80" rx="40" ry="20" fill="#ffffff" />
            <text x="175" y="85" fill="#000000" fontSize="14" fontWeight="bold">
              溶ける〜！
            </text>

            {/* Toto */}
            <ellipse cx="220" cy="155" rx="8" ry="5" fill="#92400e" />
          </svg>
        )

      case 14:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#dcfce7" />

            {/* Emerald City */}
            <rect x="150" y="50" width="100" height="80" fill="#22c55e" />
            <polygon points="150,50 200,20 250,50" fill="#10b981" />
            <rect x="170" y="30" width="8" height="30" fill="#10b981" />
            <rect x="190" y="25" width="10" height="35" fill="#10b981" />
            <rect x="215" y="35" width="6" height="25" fill="#10b981" />

            {/* Gates */}
            <rect x="190" y="130" width="20" height="30" fill="#16a34a" />
            <circle cx="195" cy="145" r="2" fill="#eab308" />
            <circle cx="205" cy="145" r="2" fill="#eab308" />

            {/* Our heroes returning */}
            <g transform="translate(100, 140)">
              <circle cx="0" cy="0" r="8" fill="#fbbf24" />
              <circle cx="-15" cy="-5" r="8" fill="#d2b48c" />
              <rect x="-30" y="-5" width="8" height="12" fill="#9ca3af" />
              <ellipse cx="-45" cy="5" rx="10" ry="6" fill="#eab308" />
            </g>

            {/* Toto */}
            <ellipse cx="115" cy="150" rx="6" ry="4" fill="#78350f" />

            {/* Yellow brick road */}
            <path d="M30 170 Q100 150 190 140" stroke="#fbbf24" strokeWidth="15" fill="none" />

            {/* Victory celebration */}
            <text x="120" y="40" fill="#eab308" fontSize="16">
              🎉
            </text>
            <text x="80" y="50" fill="#eab308" fontSize="14">
              ✨
            </text>
            <text x="260" y="45" fill="#eab308" fontSize="12">
              🎊
            </text>
          </svg>
        )

      case 15:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#1f2937" />

            {/* Throne room */}
            <rect x="50" y="150" width="200" height="50" fill="#059669" />

            {/* Curtain being pulled back */}
            <rect x="180" y="60" width="40" height="80" fill="#92400e" />
            <path d="M180 60 Q200 50 220 60 L220 140 Q200 130 180 140 Z" fill="#dc2626" />

            {/* Old man behind curtain */}
            <g transform="translate(230, 100)">
              <circle cx="0" cy="0" r="15" fill="#fbbf24" />
              <rect x="-10" y="15" width="20" height="30" fill="#374151" />
              {/* Beard */}
              <ellipse cx="0" cy="10" rx="8" ry="12" fill="#f3f4f6" />
              {/* Balding head */}
              <path d="M-8 -10 Q0 -15 8 -10" stroke="#f3f4f6" strokeWidth="3" fill="none" />
            </g>

            {/* Control panel */}
            <rect x="200" y="130" width="20" height="15" fill="#6b7280" />
            <circle cx="205" cy="137" r="2" fill="#dc2626" />
            <circle cx="210" cy="137" r="2" fill="#f59e0b" />
            <circle cx="215" cy="137" r="2" fill="#16a34a" />

            {/* Our heroes looking shocked */}
            <g transform="translate(80, 130)">
              <circle cx="0" cy="0" r="8" fill="#fbbf24" />
              <circle cx="20" cy="-5" r="8" fill="#d2b48c" />
              <rect x="35" y="-5" width="8" height="12" fill="#9ca3af" />
              <ellipse cx="55" cy="5" rx="10" ry="6" fill="#eab308" />
            </g>

            {/* Smoke machines */}
            <ellipse cx="160" cy="120" rx="15" ry="5" fill="#6b7280" opacity="0.3" />
            <ellipse cx="140" cy="110" rx="12" ry="4" fill="#6b7280" opacity="0.3" />
          </svg>
        )

      case 16:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#f0f8ff" />

            {/* Oz giving brain to scarecrow */}
            <g transform="translate(100, 100)">
              <circle cx="0" cy="0" r="15" fill="#fbbf24" />
              <rect x="-10" y="15" width="20" height="30" fill="#374151" />
              {/* Beard */}
              <ellipse cx="0" cy="10" rx="6" ry="10" fill="#f3f4f6" />
            </g>

            {/* Scarecrow */}
            <g transform="translate(180, 110)">
              <circle cx="0" cy="0" r="15" fill="#d2b48c" />
              <rect x="-15" y="15" width="30" height="25" fill="#eab308" />
              <polygon points="-15,-10 0,-25 15,-10" fill="#78350f" />
              {/* Arms */}
              <rect x="-25" y="5" width="15" height="4" fill="#92400e" />
              {/* Hand to head gesture */}
              <circle cx="-25" cy="5" r="3" fill="#d2b48c" />
              {/* Happy expression */}
              <circle cx="-5" cy="-5" r="2" fill="#000" />
              <circle cx="5" cy="-5" r="2" fill="#000" />
              <path d="M-5 5 Q0 10 5 5" stroke="#000" strokeWidth="2" fill="none" />
            </g>

            {/* Brain/wisdom charm */}
            <circle cx="150" cy="90" r="8" fill="#ec4899" />
            <text x="146" y="95" fill="#fff" fontSize="10">
              🧠
            </text>

            {/* Magic sparkles */}
            <text x="130" y="70" fill="#eab308" fontSize="12">
              ✨
            </text>
            <text x="170" y="65" fill="#eab308" fontSize="14">
              ✨
            </text>
            <text x="200" y="80" fill="#eab308" fontSize="10">
              ✨
            </text>
          </svg>
        )

      case 17:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#f0f8ff" />

            {/* Oz giving heart to Tin Man */}
            <g transform="translate(100, 100)">
              <circle cx="0" cy="0" r="15" fill="#fbbf24" />
              <rect x="-10" y="15" width="20" height="30" fill="#374151" />
              {/* Beard */}
              <ellipse cx="0" cy="10" rx="6" ry="10" fill="#f3f4f6" />
            </g>

            {/* Tin Woodman */}
            <g transform="translate(175, 105)">
              <rect x="-10" y="0" width="20" height="40" fill="#9ca3af" />
              <circle cx="0" cy="-10" r="10" fill="#9ca3af" />
              {/* Happy expression */}
              <circle cx="-3" cy="-15" r="1.5" fill="#000" />
              <circle cx="3" cy="-15" r="1.5" fill="#000" />
              <path d="M-3 -5 Q0 0 3 -5" stroke="#000" strokeWidth="2" fill="none" />
              {/* Hands on heart gesture */}
              <rect x="-25" y="10" width="12" height="4" fill="#9ca3af" />
              <rect x="13" y="10" width="12" height="4" fill="#9ca3af" />
            </g>

            {/* Heart-shaped clock */}
            <path
              d="M150 85 C145 80, 135 80, 140 90 C135 80, 125 80, 130 90 C130 95, 140 105, 150 100 C160 105, 170 95, 170 90 C175 80, 165 80, 160 90 C165 80, 155 80, 150 85 Z"
              fill="#dc2626"
            />
            <text x="147" y="92" fill="#fff" fontSize="8">
              ♥
            </text>
            {/* Clock hands */}
            <line x1="150" y1="90" x2="148" y2="87" stroke="#fff" strokeWidth="1" />
            <line x1="150" y1="90" x2="152" y2="85" stroke="#fff" strokeWidth="1" />

            {/* Magic sparkles */}
            <text x="130" y="70" fill="#eab308" fontSize="12">
              ✨
            </text>
            <text x="170" y="65" fill="#eab308" fontSize="14">
              ✨
            </text>
            <text x="190" y="80" fill="#eab308" fontSize="10">
              ✨
            </text>
          </svg>
        )

      case 18:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#f0f8ff" />

            {/* Oz giving courage to Lion */}
            <g transform="translate(100, 100)">
              <circle cx="0" cy="0" r="15" fill="#fbbf24" />
              <rect x="-10" y="15" width="20" height="30" fill="#374151" />
              {/* Beard */}
              <ellipse cx="0" cy="10" rx="6" ry="10" fill="#f3f4f6" />
            </g>

            {/* Lion standing proudly */}
            <g transform="translate(180, 120)">
              <ellipse cx="0" cy="0" rx="25" ry="18" fill="#eab308" />
              <circle cx="0" cy="-25" r="20" fill="#eab308" />
              {/* Mane */}
              <circle cx="0" cy="-25" r="28" fill="#d97706" />
              {/* Proud chest out pose */}
              <ellipse cx="0" cy="0" rx="28" ry="20" fill="#eab308" />
              {/* Confident expression */}
              <circle cx="-5" cy="-30" r="2" fill="#000" />
              <circle cx="5" cy="-30" r="2" fill="#000" />
              <path d="M-5 -20 Q0 -15 5 -20" stroke="#000" strokeWidth="2" fill="none" />
              {/* Standing legs */}
              <ellipse cx="-15" cy="20" rx="6" ry="12" fill="#eab308" />
              <ellipse cx="15" cy="20" rx="6" ry="12" fill="#eab308" />
            </g>

            {/* Courage potion */}
            <rect x="140" y="75" width="8" height="20" fill="#22c55e" />
            <ellipse cx="144" cy="75" rx="4" ry="6" fill="#22c55e" />
            <circle cx="144" cy="70" r="2" fill="#16a34a" />
            {/* Bubbles from potion */}
            <circle cx="145" cy="65" r="1" fill="#16a34a" />
            <circle cx="148" cy="62" r="1.5" fill="#16a34a" />
            <circle cx="142" cy="60" r="1" fill="#16a34a" />

            {/* Magic sparkles */}
            <text x="120" y="60" fill="#eab308" fontSize="12">
              ✨
            </text>
            <text x="160" y="55" fill="#eab308" fontSize="14">
              ✨
            </text>
            <text x="200" y="70" fill="#eab308" fontSize="10">
              ✨
            </text>
          </svg>
        )

      case 19:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#e0f2fe" />

            {/* Good Witch of the North appearing */}
            <g transform="translate(150, 80)">
              <circle cx="0" cy="0" r="20" fill="#fbbf24" />
              <rect x="-10" y="15" width="20" height="40" fill="#ec4899" />
              <polygon points="-10,-20 0,-35 10,-20" fill="#eab308" />
              {/* Magic wand */}
              <line x1="20" y1="5" x2="35" y2="-10" stroke="#92400e" strokeWidth="2" />
              <text x="35" y="-10" fill="#eab308" fontSize="12">
                ⭐
              </text>
              {/* Magic circle around witch */}
              <circle cx="0" cy="10" r="35" stroke="#ec4899" strokeWidth="2" fill="none" opacity="0.5" />
            </g>

            {/* Dorothy listening */}
            <g transform="translate(80, 120)">
              <circle cx="0" cy="0" r="12" fill="#fbbf24" />
              <rect x="-5" y="12" width="10" height="25" fill="#3b82f6" />
              {/* Silver shoes highlighted */}
              <ellipse cx="-3" cy="37" rx="4" ry="3" fill="#9ca3af" />
              <ellipse cx="3" cy="37" rx="4" ry="3" fill="#9ca3af" />
              {/* Sparkles around shoes */}
              <text x="-10" y="45" fill="#9ca3af" fontSize="8">
                ✨
              </text>
              <text x="8" y="45" fill="#9ca3af" fontSize="8">
                ✨
              </text>
            </g>

            {/* Friends watching */}
            <g transform="translate(200, 130)">
              <circle cx="0" cy="0" r="8" fill="#d2b48c" />
              <rect x="15" y="0" width="8" height="12" fill="#9ca3af" />
              <ellipse cx="35" cy="10" rx="10" ry="6" fill="#eab308" />
            </g>

            {/* Speech bubble */}
            <ellipse cx="150" cy="40" rx="45" ry="15" fill="#ffffff" />
            <text x="120" y="37" fill="#000" fontSize="8">
              銀の靴のかかとを
            </text>
            <text x="125" y="45" fill="#000" fontSize="8">
              3回打てば！
            </text>
          </svg>
        )

      case 20:
        return (
          <svg viewBox="0 0 300 200" className="w-full h-48">
            <rect width="300" height="200" fill="#7dd3fc" />
            <rect x="0" y="140" width="300" height="60" fill="#d97706" />

            {/* Kansas farmhouse */}
            <rect x="180" y="95" width="70" height="45" fill="#92400e" />
            <polygon points="180,95 215,75 250,95" fill="#b45309" />
            <rect x="200" y="110" width="12" height="18" fill="#78350f" />
            <rect x="220" y="105" width="10" height="10" fill="#fbbf24" />

            {/* Aunt Em holding Dorothy */}
            <g transform="translate(140, 110)">
              <circle cx="0" cy="0" r="18" fill="#fbbf24" />
              <rect x="-10" y="15" width="20" height="35" fill="#7c3aed" />

              {/* Dorothy in arms */}
              <circle cx="0" cy="25" r="10" fill="#fbbf24" />
              <rect x="-5" y="32" width="10" height="18" fill="#3b82f6" />
            </g>

            {/* Toto */}
            <ellipse cx="120" cy="160" rx="8" ry="5" fill="#92400e" />
            <circle cx="125" cy="157" r="4" fill="#92400e" />

            {/* Home sweet home elements */}
            <text x="100" y="40" fill="#ec4899" fontSize="20">
              💕
            </text>
            <text x="180" y="50" fill="#fbbf24" fontSize="18">
              🏠
            </text>
            <text x="70" y="60" fill="#22c55e" fontSize="16">
              ✨
            </text>

            {/* Wheat field */}
            {Array.from({ length: 8 }).map((_, i) => (
              <rect key={i} x={20 + i * 35} y={120 + (i % 3) * 5} width={4} height={25} fill="#d97706" />
            ))}

            {/* Speech bubble */}
            <ellipse cx="220" cy="60" rx="45" ry="15" fill="#ffffff" />
            <text x="190" y="58" fill="#000000" fontSize="10">
              トト、帰って
            </text>
            <text x="195" y="68" fill="#000000" fontSize="10">
              きたのね！
            </text>
          </svg>
        )

      default:
        return (
          <div className="w-full h-48 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
            <span className="text-4xl">📖</span>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🌪️ オズの魔法使い 📖
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ドロシーとトトの不思議な冒険の物語を美しいイラストと共にお楽しみください
          </p>
        </div>

        {/* Chapter Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {chapters.map((chapter) => (
            <Card
              key={chapter.id}
              className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 bg-white/80 backdrop-blur-sm"
            >
              <div className={`h-2 bg-gradient-to-r ${chapter.color}`} />

              <CardContent className="p-6">
                {/* Chapter Badge */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className="text-sm font-semibold">
                    第{chapter.id}章
                  </Badge>
                  <div className="text-2xl">
                    {chapter.id <= 3
                      ? "🌪️"
                      : chapter.id <= 7
                        ? "🛤️"
                        : chapter.id <= 10
                          ? "🏰"
                          : chapter.id <= 13
                            ? "⚔️"
                            : chapter.id <= 18
                              ? "🎭"
                              : "🏠"}
                  </div>
                </div>

                {/* Chapter Title */}
                <h2 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                  {chapter.title}
                </h2>

                {/* Illustration */}
                <div className="mb-4 rounded-lg overflow-hidden shadow-lg bg-white">
                  {renderChapterIllustration(chapter.id)}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed">{chapter.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 p-8 bg-white/50 backdrop-blur-sm rounded-2xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ 物語の終わり ✨</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            ドロシーの冒険を通して、私たちは友情、勇気、そして家族の大切さを学びました。
            どんなに遠くへ行っても、心の故郷はいつも私たちと共にあるのです。
          </p>
        </div>
      </div>
    </div>
  )
}
