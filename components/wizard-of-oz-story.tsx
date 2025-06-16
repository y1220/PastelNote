"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Home } from "lucide-react"

export default function Component() {
  const [currentChapter, setCurrentChapter] = useState(1)

  const chapters = [
    {
      id: 1,
      title: "たつまき！",
      description:
        "カンザスの大平原で平穏に暮らしていたドロシーとトト。ある日、空が急に暗くなり、恐ろしい竜巻が現れました。エムおばさんとヘンリーおじさんは地下室に避難しましたが、ドロシーとトトは間に合わず、家ごと空高く舞い上がってしまいます。風の音と共に、見慣れた景色がどんどん遠ざかっていきました。",
      color: "from-slate-700 to-slate-900",
    },
    {
      id: 2,
      title: "オズの国へ",
      description:
        "長い空の旅の後、家は静かに地面に降り立ちました。ドロシーが外に出ると、そこは見たこともない美しい世界でした。色とりどりの花が咲き乱れ、空気は甘い香りに満ちています。川は青く澄み、鳥たちは美しい歌声で迎えてくれました。「ここはどこなの？」ドロシーは不思議な新世界に足を踏み入れました。",
      color: "from-sky-300 to-green-300",
    },
    {
      id: 3,
      title: "小人たちと北の魔女",
      description:
        "突然、小さな人々がドロシーの周りに現れました。彼らはマンチキンと呼ばれる善良な小人たちでした。「ありがとう！東の悪い魔女を倒してくれて！」と感謝されます。家が魔女の上に落ちて倒したのです。そこへ美しい北の魔女が現れ、「あなたは魔法の銀の靴を手に入れました。でも家に帰りたいなら、エメラルドの都の偉大なオズに会いなさい」と教えてくれました。",
      color: "from-green-200 to-green-400",
    },
    {
      id: 4,
      title: "黄色いレンガ道",
      description:
        "北の魔女が指差す方向を見ると、美しい黄色いレンガで作られた道が続いていました。「この道をまっすぐ行けばエメラルドの都に着きます」と教えられたドロシーは、トトと一緒に歩き始めました。レンガは太陽の光を受けて金色に輝き、希望の道しるべとなって遠くまで続いています。新しい冒険の始まりでした。",
      color: "from-yellow-200 to-yellow-400",
    },
    {
      id: 5,
      title: "かかしと出会う",
      description:
        "黄色いレンガ道を歩いていると、とうもろこし畑で棒に吊るされたかかしを見つけました。「助けて！」とかかしが話しかけてきます。驚いたドロシーが棒から降ろしてあげると、かかしは「僕には脳がないんだ。オズに脳をもらいに一緒に行ってもいい？」と頼みました。優しいドロシーは快く仲間に迎え入れ、二人と一匹の旅が始まりました。",
      color: "from-amber-200 to-orange-300",
    },
    {
      id: 6,
      title: "ブリキのきこり",
      description:
        "深い森で、動けなくなったブリキの木こりを発見しました。雨で錆びついて一年間も動けずにいたのです。ドロシーが油をさしてあげると、木こりは感謝して立ち上がりました。「僕には心がないんだ。愛することができない」と悲しそうに話します。「オズなら心をくれるかも」とドロシーが提案すると、木こりも仲間に加わることになりました。",
      color: "from-gray-300 to-gray-500",
    },
    {
      id: 7,
      title: "ライオンの登場",
      description:
        "森の奥で大きなライオンが現れ、みんなを脅かそうとしました。でもトトが勇敢に吠えかかると、ライオンは「怖いよ〜」と泣き出してしまいます。「僕は森の王なのに、勇気がないんだ。みんなに笑われてしまう」と恥ずかしそうに話しました。ドロシーは「オズに勇気をもらいに一緒に行きましょう」と誘い、四人と一匹の仲間が揃いました。",
      color: "from-yellow-300 to-orange-400",
    },
    {
      id: 8,
      title: "エメラルドの都が見えた！",
      description:
        "長い旅路の果てに、ついに遠くに緑に輝く美しい都が見えました。エメラルドでできた建物が太陽の光を受けてキラキラと輝いています。「あれがエメラルドの都よ！」ドロシーは興奮して指差しました。仲間たちも希望に胸を膨らませます。「もうすぐオズに会える！」みんなの願いが叶う場所が、ついに目の前に現れたのです。",
      color: "from-emerald-300 to-green-500",
    },
    {
      id: 9,
      title: "オズの門番",
      description:
        "エメラルドの都の大きな門の前で、緑の制服を着た門番が待っていました。「都に入るには緑の眼鏡をかけなければなりません。エメラルドの輝きで目がくらんでしまいますから」と説明し、みんなに特別な眼鏡をかけさせてくれました。眼鏡をかけると、世界がすべて美しい緑色に見えます。いよいよ魔法の都への入場です。",
      color: "from-green-400 to-emerald-600",
    },
    {
      id: 10,
      title: "オズとの対面",
      description:
        "宮殿の大広間で、ついに偉大なオズとの対面の時が来ました。部屋は暗く、炎に包まれた巨大な頭が現れます。「私は偉大なるオズだ！」恐ろしい声が響きました。震え上がる一行に、オズは「願いを叶えてほしければ、西の悪い魔女を倒してこい！」と命じます。不可能に思える任務でしたが、家に帰るためにドロシーたちは受け入れることにしました。",
      color: "from-red-400 to-pink-600",
    },
    {
      id: 11,
      title: "西の魔女の城へ",
      description:
        "西の国へ向かう道のりは険しく危険でした。空には魔女の手下である翼のある猿たちが飛び回り、一行を見張っています。暗い雲が空を覆い、不吉な風が吹いています。遠くに見える魔女の城は黒く聳え立ち、まるで悪夢のようでした。それでも仲間たちは互いを励まし合いながら、恐ろしい敵との戦いに向かって歩き続けました。",
      color: "from-slate-600 to-slate-800",
    },
    {
      id: 12,
      title: "ドロシーがつかまる！",
      description:
        "翼のある猿たちがドロシーを捕まえ、魔女の城へ連れて行ってしまいました。暗い牢屋に閉じ込められたドロシーは、緑色の肌をした恐ろしい西の魔女と対面します。「その銀の靴をよこしなさい！」魔女は靴の魔法の力を狙っていたのです。トトは別の場所に閉じ込められ、仲間たちとも離ればなれになってしまいました。絶望的な状況でした。",
      color: "from-slate-700 to-slate-900",
    },
    {
      id: 13,
      title: "魔女を倒す",
      description:
        "魔女がドロシーをいじめようとした時、ドロシーは怒りで水の入ったバケツを魔女にかけてしまいました。すると魔女は「水が！溶ける〜！助けて〜！」と叫びながら、みるみる小さくなって消えてしまったのです。実は西の魔女は水に弱かったのでした。「やったね、ドロシー！」トトが駆け寄ってきます。恐ろしい魔女はついに倒されました。",
      color: "from-blue-400 to-cyan-600",
    },
    {
      id: 14,
      title: "都に戻って",
      description:
        "魔女を倒した知らせを聞いて、西の国の人々は大喜びでドロシーたちを歓迎しました。一行は意気揚々とエメラルドの都に戻ります。「オズが約束を守ってくれる！」みんな希望に満ちていました。都の人々も英雄たちの帰還を祝福し、花びらを撒いて迎えてくれます。ついに願いが叶う時が来たのです。",
      color: "from-green-300 to-emerald-500",
    },
    {
      id: 15,
      title: "オズの正体",
      description:
        "宮殿でオズに報告しようとした時、トトが誤ってカーテンを引いてしまいました。すると、そこには小さなおじいさんが機械を操作していたのです！「偉大なるオズ」は普通の人間だったのです。「私はネブラスカから来た気球乗りで、偶然この国に来てしまったんだ」とおじいさんは白状しました。みんなは驚きましたが、がっかりもしました。",
      color: "from-gray-400 to-gray-600",
    },
    {
      id: 16,
      title: "かかしに脳を",
      description:
        "「魔法は使えないが、知恵は授けられる」とオズは言いました。かかしには美しい絹で作った脳みそのお守りを頭に入れてくれました。「これで君は賢くなった！」すると不思議なことに、かかしは急に難しい言葉を話し始めました。「実は君はもともと賢かったんだ。自信がなかっただけなんだよ」とオズは微笑みました。かかしは大喜びでした。",
      color: "from-pink-300 to-rose-400",
    },
    {
      id: 17,
      title: "ブリキに心を",
      description:
        "ブリキの木こりには、美しいハート型の絹のクッションを胸に入れてくれました。「これで君には心がある！」オズが宣言すると、木こりは感動で涙を流しそうになりました。「君はもともと優しい心を持っていた。仲間を思いやる気持ちがその証拠だよ」とオズは説明しました。木こりは幸せで胸がいっぱいになりました。",
      color: "from-red-300 to-pink-500",
    },
    {
      id: 18,
      title: "ライオンに勇気を",
      description:
        "ライオンには勇気の薬だと言って、特別な緑色の液体を飲ませました。「これで君は勇敢になった！」するとライオンは胸を張って堂々と立ち上がりました。「君はもともと勇敢だった。仲間を守るために戦ったじゃないか」とオズは教えました。ライオンは自分の中にあった勇気に気づき、真の森の王となったのです。",
      color: "from-green-300 to-lime-500",
    },
    {
      id: 19,
      title: "帰る方法",
      description:
        "「私も気球でカンザスに帰ろう」とオズは提案しましたが、気球は風に飛ばされてしまいました。途方に暮れるドロシーの前に、美しい南の魔女グリンダが現れます。「あなたの銀の靴には魔法の力があります。かかとを三回打ち鳴らして『家に帰りたい』と唱えなさい」と教えてくれました。ドロシーは希望の光を見つけました。",
      color: "from-purple-300 to-pink-400",
    },
    {
      id: 20,
      title: "おうちへ",
      description:
        "ドロシーは愛する仲間たちに別れを告げ、銀の靴のかかとを三回打ち鳴らしました。「家に帰りたい！家に帰りたい！家に帰りたい！」すると世界がぐるぐる回り始め、気がつくとカンザスの草原にいました。エムおばさんが心配そうに看病してくれています。「ただの夢だったのかしら？」でもドロシーの心には、かけがえのない友情と冒険の思い出が永遠に残りました。",
      color: "from-blue-300 to-sky-400",
    },
  ]

  const currentChapterData = chapters[currentChapter - 1]
  const totalChapters = chapters.length

  const nextChapter = () => {
    if (currentChapter < totalChapters) {
      setCurrentChapter(currentChapter + 1)
    }
  }

  const prevChapter = () => {
    if (currentChapter > 1) {
      setCurrentChapter(currentChapter - 1)
    }
  }

  const goToOverview = () => {
    // This would typically navigate to an overview page
    // For now, we'll just reset to chapter 1
    setCurrentChapter(1)
  }

  const renderChapterIllustration = (chapterId: number) => {
    switch (chapterId) {
      case 1:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
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
            <rect width="400" height="300" fill="url(#storm-sky)" />
            <rect x="0" y="220" width="400" height="80" fill="#92400e" />

            {/* Tornado with animation effect */}
            <g filter="url(#glow)">
              <path
                d="M200 40 L190 80 L180 120 L170 160 L160 200 L150 240"
                stroke="#6b7280"
                strokeWidth="16"
                fill="none"
                opacity="0.8"
              />
              <path
                d="M200 40 L210 80 L220 120 L230 160 L240 200 L250 240"
                stroke="#6b7280"
                strokeWidth="16"
                fill="none"
                opacity="0.8"
              />
              <ellipse cx="200" cy="40" rx="35" ry="18" fill="#4b5563" />
            </g>

            {/* House being lifted */}
            <g transform="translate(150, 100) rotate(-8)">
              <rect x="0" y="30" width="70" height="50" fill="#92400e" />
              <polygon points="0,30 35,0 70,30" fill="#b45309" />
              <rect x="20" y="45" width="15" height="15" fill="#fbbf24" />
              <circle cx="27" cy="52" r="4" fill="#1f2937" />
            </g>

            {/* Lightning */}
            <path d="M100 30 L110 60 L95 70 L105 100" stroke="#fbbf24" strokeWidth="4" fill="none" />
            <path d="M300 35 L310 65 L295 75 L305 105" stroke="#fbbf24" strokeWidth="4" fill="none" />
          </svg>
        )

      case 2:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <defs>
              <linearGradient id="oz-sky" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#86efac" />
              </linearGradient>
            </defs>
            <rect width="400" height="300" fill="url(#oz-sky)" />

            {/* Magical landscape */}
            <ellipse cx="100" cy="270" rx="120" ry="50" fill="#4ade80" />
            <ellipse cx="300" cy="270" rx="100" ry="45" fill="#22c55e" />

            {/* House landed safely */}
            <rect x="160" y="180" width="80" height="70" fill="#92400e" />
            <polygon points="160,180 200,150 240,180" fill="#b45309" />
            <rect x="180" y="200" width="16" height="16" fill="#fbbf24" />
            <rect x="210" y="195" width="12" height="12" fill="#fbbf24" />

            {/* Magical flowers */}
            <g>
              <circle cx="110" cy="240" r="12" fill="#ec4899" />
              <circle cx="290" cy="230" r="10" fill="#f97316" />
              <circle cx="260" cy="250" r="11" fill="#8b5cf6" />
              <circle cx="130" cy="260" r="8" fill="#06b6d4" />
            </g>

            {/* Sparkles */}
            <text x="80" y="70" fill="#fbbf24" fontSize="32" className="animate-pulse">
              ✨
            </text>
            <text x="240" y="60" fill="#fbbf24" fontSize="24" className="animate-pulse">
              ✨
            </text>
            <text x="320" y="90" fill="#fbbf24" fontSize="28" className="animate-pulse">
              ✨
            </text>
          </svg>
        )

      case 3:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#dcfce7" />

            {/* House crushing witch (showing legs) */}
            <rect x="170" y="200" width="60" height="45" fill="#92400e" />
            <rect x="190" y="245" width="6" height="20" fill="#000" />
            <rect x="204" y="245" width="6" height="20" fill="#000" />
            <ellipse cx="193" cy="268" rx="4" ry="3" fill="#dc2626" />
            <ellipse cx="207" cy="268" rx="4" ry="3" fill="#dc2626" />

            {/* Munchkins */}
            <g transform="translate(110, 220)">
              <circle cx="0" cy="0" r="20" fill="#fbbf24" />
              <rect x="-7" y="15" width="14" height="28" fill="#3b82f6" />
              <polygon points="-12,-25 0,-35 12,-25" fill="#92400e" />
            </g>
            <g transform="translate(290, 230)">
              <circle cx="0" cy="0" r="20" fill="#fbbf24" />
              <rect x="-7" y="15" width="14" height="22" fill="#22c55e" />
              <polygon points="-12,-25 0,-35 12,-25" fill="#eab308" />
            </g>

            {/* Good Witch */}
            <g transform="translate(200, 100)">
              <circle cx="0" cy="0" r="28" fill="#fbbf24" />
              <rect x="-14" y="22" width="28" height="55" fill="#ec4899" />
              <polygon points="-14,-22 0,-42 14,-22" fill="#fbbf24" />
              {/* Magic wand */}
              <line x1="28" y1="14" x2="48" y2="-8" stroke="#92400e" strokeWidth="3" />
              <text x="48" y="-8" fill="#fbbf24" fontSize="16">
                ⭐
              </text>
            </g>
          </svg>
        )

      case 4:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#7dd3fc" />

            {/* Yellow brick road with perspective */}
            <path d="M70 280 Q200 180 380 70" stroke="#fbbf24" strokeWidth="35" fill="none" />

            {/* Brick pattern */}
            {Array.from({ length: 20 }).map((_, i) => (
              <rect key={i} x={60 + i * 20} y={275 - i * 12} width={16} height={8} fill="#f59e0b" opacity={0.8} />
            ))}

            {/* Dorothy and Toto */}
            <g transform="translate(120, 200)">
              <circle cx="0" cy="0" r="16" fill="#fbbf24" />
              <rect x="-7" y="14" width="14" height="35" fill="#3b82f6" />
              <polygon points="-12,-20 0,-35 12,-20" fill="#92400e" />
              {/* Toto */}
              <ellipse cx="28" cy="35" rx="12" ry="7" fill="#92400e" />
              <circle cx="35" cy="30" r="4" fill="#92400e" />
            </g>

            {/* Background scenery */}
            <circle cx="270" cy="140" r="50" fill="#22c55e" />
            <rect x="265" y="180" width="14" height="35" fill="#92400e" />

            {/* Clouds */}
            <ellipse cx="130" cy="60" rx="40" ry="20" fill="#ffffff" opacity="0.8" />
            <ellipse cx="290" cy="45" rx="35" ry="16" fill="#ffffff" opacity="0.8" />
          </svg>
        )

      case 5:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#e0f2fe" />

            {/* Corn field */}
            <rect x="0" y="180" width="400" height="120" fill="#16a34a" />
            {Array.from({ length: 10 }).map((_, i) => (
              <rect key={i} x={30 + i * 40} y={120 + (i % 2) * 15} width="12" height="90" fill="#eab308" />
            ))}

            {/* Scarecrow on pole */}
            <g transform="translate(200, 90)">
              <rect x="-3" y="0" width="6" height="120" fill="#92400e" />
              <circle cx="0" cy="-15" r="20" fill="#d2b48c" />
              <rect x="-20" y="7" width="40" height="35" fill="#eab308" />
              {/* Arms */}
              <rect x="-50" y="15" width="30" height="6" fill="#92400e" />
              <rect x="20" y="15" width="30" height="6" fill="#92400e" />
              {/* Hat */}
              <rect x="-15" y="-30" width="30" height="12" fill="#78350f" />
              {/* Straw */}
              <line x1="-20" y1="30" x2="-30" y2="50" stroke="#eab308" strokeWidth="3" />
              <line x1="20" y1="30" x2="30" y2="50" stroke="#eab308" strokeWidth="3" />
              {/* Face */}
              <circle cx="-7" cy="-20" r="3" fill="#000" />
              <circle cx="7" cy="-20" r="3" fill="#000" />
              <path d="M-7 -7 Q0 0 7 -7" stroke="#000" strokeWidth="3" fill="none" />
            </g>

            {/* Dorothy nearby */}
            <g transform="translate(270, 190)">
              <circle cx="0" cy="0" r="14" fill="#fbbf24" />
              <rect x="-7" y="14" width="14" height="28" fill="#3b82f6" />
            </g>
          </svg>
        )

      case 6:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#f0f8ff" />

            {/* Forest */}
            <ellipse cx="110" cy="285" rx="60" ry="30" fill="#16a34a" />
            <rect x="105" y="180" width="15" height="105" fill="#92400e" />
            <circle cx="110" cy="180" r="35" fill="#16a34a" />
            <ellipse cx="290" cy="285" rx="65" ry="35" fill="#16a34a" />
            <rect x="285" y="165" width="18" height="120" fill="#92400e" />
            <circle cx="290" cy="165" r="40" fill="#16a34a" />

            {/* Tin Woodman */}
            <g transform="translate(200, 180)">
              <rect x="-14" y="0" width="28" height="60" fill="#9ca3af" />
              <circle cx="0" cy="-15" r="14" fill="#9ca3af" />
              {/* Arms */}
              <rect x="-35" y="7" width="21" height="8" fill="#9ca3af" />
              <rect x="14" y="7" width="21" height="8" fill="#9ca3af" />
              {/* Legs */}
              <rect x="-10" y="60" width="8" height="35" fill="#9ca3af" />
              <rect x="2" y="60" width="8" height="35" fill="#9ca3af" />
              {/* Axe */}
              <rect x="35" y="0" width="4" height="30" fill="#92400e" />
              <rect x="31" y="-4" width="12" height="8" fill="#9ca3af" />
              {/* Rust effects */}
              <circle cx="-7" cy="15" r="3" fill="#b45309" />
              <circle cx="7" cy="30" r="2" fill="#b45309" />
              {/* Face */}
              <circle cx="-4" cy="-20" r="2" fill="#000" />
              <circle cx="4" cy="-20" r="2" fill="#000" />
              <path d="M-4 -7 Q0 -3 4 -7" stroke="#000" strokeWidth="2" fill="none" />
            </g>

            {/* Oil can */}
            <ellipse cx="130" cy="255" rx="12" ry="18" fill="#eab308" />
            <rect x="124" y="247" width="12" height="4" fill="#eab308" />
          </svg>
        )

      case 7:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#fef3c7" />

            {/* Lion */}
            <g transform="translate(200, 180)">
              <ellipse cx="0" cy="15" rx="40" ry="28" fill="#eab308" />
              <circle cx="0" cy="-15" r="35" fill="#eab308" />
              {/* Mane */}
              <circle cx="0" cy="-15" r="50" fill="#d97706" />
              <circle cx="-20" cy="-35" r="20" fill="#d97706" />
              <circle cx="20" cy="-35" r="20" fill="#d97706" />
              <circle cx="-35" cy="-7" r="16" fill="#d97706" />
              <circle cx="35" cy="-7" r="16" fill="#d97706" />
              {/* Face */}
              <circle cx="-7" cy="-20" r="4" fill="#000" />
              <circle cx="7" cy="-20" r="4" fill="#000" />
              <ellipse cx="0" cy="-7" rx="4" ry="7" fill="#000" />
              {/* Legs */}
              <ellipse cx="-28" cy="45" rx="8" ry="20" fill="#eab308" />
              <ellipse cx="28" cy="45" rx="8" ry="20" fill="#eab308" />
              {/* Tail */}
              <path d="M40 15 Q70 0 55 30" stroke="#eab308" strokeWidth="8" fill="none" />
              <circle cx="55" cy="30" r="6" fill="#d97706" />
            </g>

            {/* Scared expression (hiding behind tree) */}
            <rect x="70" y="120" width="20" height="120" fill="#92400e" />
            <circle cx="80" cy="120" r="28" fill="#16a34a" />

            {/* Dorothy, Scarecrow, Tin Man in background */}
            <g transform="translate(290, 210)">
              <circle cx="0" cy="0" r="12" fill="#fbbf24" />
              <circle cx="30" cy="-7" r="12" fill="#d2b48c" />
              <rect x="50" y="-7" width="12" height="20" fill="#9ca3af" />
            </g>
          </svg>
        )

      case 8:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <defs>
              <linearGradient id="emerald-city" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <filter id="emerald-glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect width="400" height="300" fill="#e0f2fe" />

            {/* Emerald City with glow effect */}
            <g filter="url(#emerald-glow)">
              <rect x="240" y="75" width="140" height="120" fill="url(#emerald-city)" />
              <polygon points="240,75 310,30 380,75" fill="#10b981" />
              <rect x="270" y="45" width="14" height="45" fill="#10b981" />
              <rect x="295" y="37" width="16" height="53" fill="#10b981" />
              <rect x="330" y="52" width="12" height="38" fill="#10b981" />
            </g>

            {/* Sparkles around city */}
            <text x="210" y="50" fill="#10b981" fontSize="22" className="animate-pulse">
              ✨
            </text>
            <text x="385" y="65" fill="#10b981" fontSize="16" className="animate-pulse">
              ✨
            </text>
            <text x="250" y="30" fill="#10b981" fontSize="14" className="animate-pulse">
              ✨
            </text>

            {/* Our heroes in silhouette */}
            <g transform="translate(70, 210)">
              <circle cx="0" cy="0" r="14" fill="#1f2937" />
              <circle cx="28" cy="-7" r="14" fill="#1f2937" />
              <rect x="50" y="-7" width="14" height="21" fill="#1f2937" />
              <ellipse cx="78" cy="7" rx="16" ry="12" fill="#1f2937" />
            </g>

            {/* Yellow brick road leading to city */}
            <path d="M55 255 Q160 195 240 120" stroke="#fbbf24" strokeWidth="25" fill="none" opacity="0.8" />
          </svg>
        )

      case 9:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#f0fff0" />

            {/* Large gates */}
            <rect x="160" y="75" width="80" height="150" fill="#22c55e" />
            <rect x="153" y="67" width="94" height="15" fill="#16a34a" />
            <circle cx="180" cy="150" r="4" fill="#eab308" />
            <circle cx="220" cy="150" r="4" fill="#eab308" />
            {/* Gate pattern */}
            <rect x="167" y="90" width="26" height="45" fill="#16a34a" />
            <rect x="207" y="90" width="26" height="45" fill="#16a34a" />
            <rect x="167" y="150" width="26" height="45" fill="#16a34a" />
            <rect x="207" y="150" width="26" height="45" fill="#16a34a" />

            {/* Guardian */}
            <g transform="translate(270, 180)">
              <circle cx="0" cy="0" r="20" fill="#fbbf24" />
              <rect x="-14" y="20" width="28" height="42" fill="#3b82f6" />
              <polygon points="-14,-14 0,-35 14,-14" fill="#22c55e" />
              {/* Green glasses */}
              <rect x="-7" y="-7" width="6" height="6" fill="#10b981" />
              <rect x="1" y="-7" width="6" height="6" fill="#10b981" />
            </g>

            {/* Our heroes */}
            <g transform="translate(110, 210)">
              <circle cx="0" cy="0" r="12" fill="#fbbf24" />
              <circle cx="-20" cy="-7" r="12" fill="#d2b48c" />
              <rect x="-42" y="-7" width="12" height="18" fill="#9ca3af" />
              <ellipse cx="-63" cy="7" rx="14" ry="9" fill="#eab308" />
            </g>

            {/* Green glasses being handed out */}
            <rect x="115" y="195" width="8" height="4" fill="#10b981" />
            <rect x="115" y="202" width="8" height="4" fill="#10b981" />
          </svg>
        )

      case 10:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#1f2937" />

            {/* Throne room */}
            <rect x="70" y="225" width="260" height="75" fill="#059669" />

            {/* Mysterious Oz apparition */}
            <circle cx="200" cy="120" r="55" fill="#ec4899" opacity="0.7" />
            <circle cx="200" cy="120" r="40" fill="#be185d" opacity="0.8" />
            <circle cx="200" cy="120" r="25" fill="#dc2626" opacity="0.9" />
            {/* Eyes */}
            <circle cx="185" cy="112" r="7" fill="#fff" />
            <circle cx="215" cy="112" r="7" fill="#fff" />
            <circle cx="185" cy="112" r="4" fill="#000" />
            <circle cx="215" cy="112" r="4" fill="#000" />

            {/* Flames around Oz */}
            <path d="M160 90 L167 75 L175 90 L167 82 Z" fill="#f97316" />
            <path d="M225 97 L232 82 L240 97 L232 90 Z" fill="#f97316" />
            <path d="M145 135 L152 120 L160 135 L152 127 Z" fill="#f97316" />
            <path d="M240 127 L247 112 L255 127 L247 120 Z" fill="#f97316" />

            {/* Our heroes kneeling */}
            <g transform="translate(110, 240)">
              <circle cx="0" cy="0" r="8" fill="#fbbf24" />
              <circle cx="28" cy="-7" r="8" fill="#d2b48c" />
              <rect x="50" y="-7" width="8" height="14" fill="#9ca3af" />
              <ellipse cx="75" cy="7" rx="12" ry="7" fill="#eab308" />
            </g>

            {/* Smoke effects */}
            <ellipse cx="200" cy="180" rx="35" ry="12" fill="#6b7280" opacity="0.3" />
            <ellipse cx="200" cy="195" rx="50" ry="15" fill="#6b7280" opacity="0.2" />
          </svg>
        )

      case 11:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#374151" />

            {/* Dark castle in distance */}
            <rect x="270" y="120" width="80" height="90" fill="#1f2937" />
            <rect x="290" y="90" width="14" height="45" fill="#1f2937" />
            <rect x="315" y="97" width="12" height="38" fill="#1f2937" />
            <polygon points="270,120 310,75 350,120" fill="#111827" />

            {/* Flying monkeys */}
            <g transform="translate(160, 90)">
              <ellipse cx="0" cy="0" rx="12" ry="6" fill="#78350f" />
              <path d="M-7 -3 L-14 -7 M7 -3 L14 -7" stroke="#78350f" strokeWidth="3" />
            </g>
            <g transform="translate(215, 75)">
              <ellipse cx="0" cy="0" rx="9" ry="4" fill="#78350f" />
              <path d="M-4 -3 L-12 -7 M4 -3 L12 -7" stroke="#78350f" strokeWidth="3" />
            </g>
            <g transform="translate(240, 105)">
              <ellipse cx="0" cy="0" rx="10" ry="4" fill="#78350f" />
              <path d="M-6 -3 L-13 -7 M6 -3 L13 -7" stroke="#78350f" strokeWidth="3" />
            </g>

            {/* Our heroes walking cautiously */}
            <g transform="translate(80, 225)">
              <circle cx="0" cy="0" r="12" fill="#fbbf24" />
              <circle cx="-20" cy="-7" r="12" fill="#d2b48c" />
              <rect x="-42" y="-7" width="12" height="18" fill="#9ca3af" />
              <ellipse cx="-63" cy="7" rx="14" ry="9" fill="#eab308" />
            </g>

            {/* Dark path */}
            <path d="M15 255 Q135 210 270 150" stroke="#4b5563" strokeWidth="18" fill="none" />

            {/* Ominous clouds */}
            <ellipse cx="135" cy="45" rx="55" ry="20" fill="#1f2937" />
            <ellipse cx="240" cy="37" rx="50" ry="18" fill="#1f2937" />
          </svg>
        )

      case 12:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#1f2937" />

            {/* Castle interior */}
            <rect x="0" y="180" width="400" height="120" fill="#374151" />

            {/* Prison bars */}
            <rect x="240" y="150" width="6" height="90" fill="#6b7280" />
            <rect x="253" y="150" width="6" height="90" fill="#6b7280" />
            <rect x="266" y="150" width="6" height="90" fill="#6b7280" />
            <rect x="279" y="150" width="6" height="90" fill="#6b7280" />
            <rect x="233" y="157" width="53" height="6" fill="#6b7280" />
            <rect x="233" y="187" width="53" height="6" fill="#6b7280" />

            {/* Dorothy behind bars */}
            <g transform="translate(260, 195)">
              <circle cx="0" cy="0" r="12" fill="#fbbf24" />
              <rect x="-7" y="15" width="14" height="22" fill="#3b82f6" />
            </g>

            {/* Wicked Witch */}
            <g transform="translate(135, 195)">
              <circle cx="0" cy="0" r="16" fill="#84cc16" />
              <rect x="-14" y="18" width="28" height="35" fill="#000" />
              <polygon points="-14,-18 0,-38 14,-18" fill="#000" />
              {/* Witch's broom */}
              <rect x="-35" y="15" width="4" height="28" fill="#92400e" />
              <rect x="-42" y="38" width="18" height="8" fill="#eab308" />
            </g>

            {/* Toto separated */}
            <ellipse cx="70" cy="232" rx="9" ry="6" fill="#78350f" />

            {/* Friends approaching in background */}
            <g transform="translate(40, 210)">
              <circle cx="0" cy="0" r="7" fill="#d2b48c" />
              <rect x="-14" y="0" width="7" height="12" fill="#9ca3af" />
            </g>
          </svg>
        )

      case 13:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#1f2937" />
            <rect x="0" y="180" width="400" height="120" fill="#374151" />

            {/* Dorothy throwing water */}
            <g transform="translate(110, 180)">
              <circle cx="0" cy="0" r="16" fill="#fbbf24" />
              <rect x="-7" y="15" width="14" height="35" fill="#3b82f6" />
              <ellipse cx="-28" cy="15" rx="14" ry="12" fill="#6b7280" />
            </g>

            {/* Water splash with animation */}
            <g>
              <circle cx="160" cy="172" r="6" fill="#06b6d4" className="animate-ping" />
              <circle cx="167" cy="180" r="4" fill="#06b6d4" />
              <circle cx="153" cy="187" r="4" fill="#06b6d4" />
              <circle cx="175" cy="187" r="6" fill="#06b6d4" />
              <circle cx="147" cy="195" r="3" fill="#06b6d4" />
            </g>

            {/* Melting witch */}
            <g transform="translate(190, 150)">
              <circle cx="0" cy="0" r="16" fill="#84cc16" opacity="0.6" />
              <rect x="-14" y="15" width="28" height="35" fill="#000000" opacity="0.4" />
              <polygon points="-14,-22 0,-35 14,-22" fill="#000000" opacity="0.6" />

              {/* Melting effect */}
              <ellipse cx="0" cy="60" rx="42" ry="15" fill="#1f2937" />
              <path d="M-21 52 Q0 75 21 52" stroke="#000000" strokeWidth="6" opacity="0.5" />
            </g>

            {/* Speech bubble */}
            <ellipse cx="270" cy="120" rx="55" ry="28" fill="#ffffff" />
            <text x="235" y="127" fill="#000000" fontSize="18" fontWeight="bold">
              溶ける〜！
            </text>

            {/* Toto */}
            <ellipse cx="295" cy="232" rx="12" ry="7" fill="#92400e" />
          </svg>
        )

      case 14:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#dcfce7" />

            {/* Emerald City */}
            <rect x="200" y="75" width="140" height="120" fill="#22c55e" />
            <polygon points="200,75 270,30 340,75" fill="#10b981" />
            <rect x="230" y="45" width="12" height="45" fill="#10b981" />
            <rect x="255" y="37" width="14" height="53" fill="#10b981" />
            <rect x="290" y="52" width="9" height="38" fill="#10b981" />

            {/* Gates */}
            <rect x="255" y="195" width="28" height="45" fill="#16a34a" />
            <circle cx="262" cy="217" r="3" fill="#eab308" />
            <circle cx="276" cy="217" r="3" fill="#eab308" />

            {/* Our heroes returning */}
            <g transform="translate(135, 210)">
              <circle cx="0" cy="0" r="12" fill="#fbbf24" />
              <circle cx="-20" cy="-7" r="12" fill="#d2b48c" />
              <rect x="-42" y="-7" width="12" height="18" fill="#9ca3af" />
              <ellipse cx="-63" cy="7" rx="14" ry="9" fill="#eab308" />
            </g>

            {/* Toto */}
            <ellipse cx="155" cy="225" rx="9" ry="6" fill="#78350f" />

            {/* Yellow brick road */}
            <path d="M40 255 Q135 225 255 202" stroke="#fbbf24" strokeWidth="21" fill="none" />

            {/* Victory celebration */}
            <text x="160" y="60" fill="#eab308" fontSize="22">
              🎉
            </text>
            <text x="110" y="75" fill="#fbbf24" fontSize="25">
              ✨
            </text>
            <text x="350" y="67" fill="#eab308" fontSize="16">
              🎊
            </text>
          </svg>
        )

      case 15:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#1f2937" />

            {/* Throne room */}
            <rect x="70" y="225" width="260" height="75" fill="#059669" />

            {/* Curtain being pulled back */}
            <rect x="240" y="90" width="55" height="120" fill="#92400e" />
            <path d="M240 90 Q270 75 300 90 L300 210 Q270 195 240 210 Z" fill="#dc2626" />

            {/* Old man behind curtain */}
            <g transform="translate(310, 150)">
              <circle cx="0" cy="0" r="20" fill="#fbbf24" />
              <rect x="-14" y="22" width="28" height="42" fill="#374151" />
              {/* Beard */}
              <ellipse cx="0" cy="15" rx="12" ry="18" fill="#f3f4f6" />
              {/* Balding head */}
              <path d="M-12 -15 Q0 -22 12 -15" stroke="#f3f4f6" strokeWidth="4" fill="none" />
            </g>

            {/* Control panel */}
            <rect x="270" y="195" width="28" height="22" fill="#6b7280" />
            <circle cx="277" cy="206" r="3" fill="#dc2626" />
            <circle cx="284" cy="206" r="3" fill="#f59e0b" />
            <circle cx="291" cy="206" r="3" fill="#16a34a" />

            {/* Our heroes looking shocked */}
            <g transform="translate(110, 195)">
              <circle cx="0" cy="0" r="12" fill="#fbbf24" />
              <circle cx="28" cy="-7" r="12" fill="#d2b48c" />
              <rect x="50" y="-7" width="12" height="18" fill="#9ca3af" />
              <ellipse cx="78" cy="7" rx="14" ry="9" fill="#eab308" />
            </g>

            {/* Smoke machines */}
            <ellipse cx="215" cy="180" rx="21" ry="7" fill="#6b7280" opacity="0.3" />
            <ellipse cx="190" cy="165" rx="18" ry="6" fill="#6b7280" opacity="0.3" />
          </svg>
        )

      case 16:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#f0f8ff" />

            {/* Oz giving brain to scarecrow */}
            <g transform="translate(135, 150)">
              <circle cx="0" cy="0" r="20" fill="#fbbf24" />
              <rect x="-14" y="22" width="28" height="42" fill="#374151" />
              {/* Beard */}
              <ellipse cx="0" cy="15" rx="9" ry="15" fill="#f3f4f6" />
            </g>

            {/* Scarecrow */}
            <g transform="translate(240, 165)">
              <circle cx="0" cy="0" r="20" fill="#d2b48c" />
              <rect x="-20" y="22" width="40" height="35" fill="#eab308" />
              <polygon points="-20,-15 0,-35 20,-15" fill="#78350f" />
              {/* Arms */}
              <rect x="-35" y="7" width="21" height="6" fill="#92400e" />
              {/* Hand to head gesture */}
              <circle cx="-35" cy="7" r="4" fill="#d2b48c" />
              {/* Happy expression */}
              <circle cx="-7" cy="-7" r="3" fill="#000" />
              <circle cx="7" cy="-7" r="3" fill="#000" />
              <path d="M-7 7 Q0 15 7 7" stroke="#000" strokeWidth="3" fill="none" />
            </g>

            {/* Brain/wisdom charm */}
            <circle cx="200" cy="135" r="12" fill="#ec4899" />
            <text x="194" y="142" fill="#fff" fontSize="14">
              🧠
            </text>

            {/* Magic sparkles */}
            <text x="175" y="105" fill="#eab308" fontSize="16">
              ✨
            </text>
            <text x="230" y="97" fill="#eab308" fontSize="19">
              ✨
            </text>
            <text x="270" y="120" fill="#eab308" fontSize="14">
              ✨
            </text>
          </svg>
        )

      case 17:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#f0f8ff" />

            {/* Oz giving heart to Tin Man */}
            <g transform="translate(135, 150)">
              <circle cx="0" cy="0" r="20" fill="#fbbf24" />
              <rect x="-14" y="22" width="28" height="42" fill="#374151" />
              {/* Beard */}
              <ellipse cx="0" cy="15" rx="9" ry="15" fill="#f3f4f6" />
            </g>

            {/* Tin Woodman */}
            <g transform="translate(235, 157)">
              <rect x="-14" y="0" width="28" height="60" fill="#9ca3af" />
              <circle cx="0" cy="-15" r="14" fill="#9ca3af" />
              {/* Happy expression */}
              <circle cx="-4" cy="-20" r="2" fill="#000" />
              <circle cx="4" cy="-20" r="2" fill="#000" />
              <path d="M-4 -7 Q0 0 4 -7" stroke="#000" strokeWidth="3" fill="none" />
              {/* Hands on heart gesture */}
              <rect x="-35" y="15" width="18" height="6" fill="#9ca3af" />
              <rect x="17" y="15" width="18" height="6" fill="#9ca3af" />
            </g>

            {/* Heart-shaped clock */}
            <path
              d="M200 127 C193 120, 180 120, 187 135 C180 120, 167 120, 174 135 C174 142, 187 157 200 150 C213 157, 226 142, 226 135 C233 120, 220 120, 213 135 C220 120, 207 120, 200 127 Z"
              fill="#dc2626"
            />
            <text x="196" y="138" fill="#fff" fontSize="12">
              ♥
            </text>
            {/* Clock hands */}
            <line x1="200" y1="135" x2="197" y2="130" stroke="#fff" strokeWidth="2" />
            <line x1="200" y1="135" x2="204" y2="127" stroke="#fff" strokeWidth="2" />

            {/* Magic sparkles */}
            <text x="175" y="105" fill="#eab308" fontSize="16">
              ✨
            </text>
            <text x="230" y="97" fill="#eab308" fontSize="19">
              ✨
            </text>
            <text x="255" y="120" fill="#eab308" fontSize="14">
              ✨
            </text>
          </svg>
        )

      case 18:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#f0f8ff" />

            {/* Oz giving courage to Lion */}
            <g transform="translate(135, 150)">
              <circle cx="0" cy="0" r="20" fill="#fbbf24" />
              <rect x="-14" y="22" width="28" height="42" fill="#374151" />
              {/* Beard */}
              <ellipse cx="0" cy="15" rx="9" ry="15" fill="#f3f4f6" />
            </g>

            {/* Lion standing proudly */}
            <g transform="translate(240, 180)">
              <ellipse cx="0" cy="0" rx="35" ry="25" fill="#eab308" />
              <circle cx="0" cy="-35" r="28" fill="#eab308" />
              {/* Mane */}
              <circle cx="0" cy="-35" r="40" fill="#d97706" />
              {/* Proud chest out pose */}
              <ellipse cx="0" cy="0" rx="40" ry="28" fill="#eab308" />
              {/* Confident expression */}
              <circle cx="-7" cy="-42" r="3" fill="#000" />
              <circle cx="7" cy="-42" r="3" fill="#000" />
              <path d="M-7 -28 Q0 -21 7 -28" stroke="#000" strokeWidth="3" fill="none" />
              {/* Standing legs */}
              <ellipse cx="-21" cy="28" rx="8" ry="18" fill="#eab308" />
              <ellipse cx="21" cy="28" rx="8" ry="18" fill="#eab308" />
            </g>

            {/* Courage potion */}
            <rect x="187" y="112" width="12" height="28" fill="#22c55e" />
            <ellipse cx="193" cy="112" rx="6" ry="9" fill="#22c55e" />
            <circle cx="193" cy="105" r="3" fill="#16a34a" />
            {/* Bubbles from potion */}
            <circle cx="195" cy="97" r="1.5" fill="#16a34a" />
            <circle cx="199" cy="93" r="2" fill="#16a34a" />
            <circle cx="190" cy="90" r="1.5" fill="#16a34a" />

            {/* Magic sparkles */}
            <text x="160" y="90" fill="#eab308" fontSize="16">
              ✨
            </text>
            <text x="215" y="82" fill="#eab308" fontSize="19">
              ✨
            </text>
            <text x="270" y="105" fill="#eab308" fontSize="14">
              ✨
            </text>
          </svg>
        )

      case 19:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#e0f2fe" />

            {/* Good Witch of the North appearing */}
            <g transform="translate(200, 120)">
              <circle cx="0" cy="0" r="28" fill="#fbbf24" />
              <rect x="-14" y="22" width="28" height="56" fill="#ec4899" />
              <polygon points="-14,-28 0,-49 14,-28" fill="#eab308" />
              {/* Magic wand */}
              <line x1="28" y1="7" x2="49" y2="-14" stroke="#92400e" strokeWidth="3" />
              <text x="49" y="-14" fill="#eab308" fontSize="16">
                ⭐
              </text>
              {/* Magic circle around witch */}
              <circle cx="0" cy="14" r="49" stroke="#ec4899" strokeWidth="3" fill="none" opacity="0.5" />
            </g>

            {/* Dorothy listening */}
            <g transform="translate(110, 180)">
              <circle cx="0" cy="0" r="16" fill="#fbbf24" />
              <rect x="-7" y="18" width="14" height="35" fill="#3b82f6" />
              {/* Silver shoes highlighted */}
              <ellipse cx="-4" cy="53" rx="6" ry="4" fill="#9ca3af" />
              <ellipse cx="4" cy="53" rx="6" ry="4" fill="#9ca3af" />
              {/* Sparkles around shoes */}
              <text x="-14" y="67" fill="#9ca3af" fontSize="12">
                ✨
              </text>
              <text x="11" y="67" fill="#9ca3af" fontSize="12">
                ✨
              </text>
            </g>

            {/* Friends watching */}
            <g transform="translate(270, 195)">
              <circle cx="0" cy="0" r="12" fill="#d2b48c" />
              <rect x="21" y="0" width="12" height="18" fill="#9ca3af" />
              <ellipse cx="49" cy="14" rx="14" ry="9" fill="#eab308" />
            </g>

            {/* Speech bubble */}
            <ellipse cx="200" cy="60" rx="63" ry="21" fill="#ffffff" />
            <text x="160" y="55" fill="#000" fontSize="12">
              銀の靴のかかとを
            </text>
            <text x="167" y="67" fill="#000" fontSize="12">
              3回打てば！
            </text>
          </svg>
        )

      case 20:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-64">
            <rect width="400" height="300" fill="#7dd3fc" />
            <rect x="0" y="210" width="400" height="90" fill="#d97706" />

            {/* Kansas farmhouse */}
            <rect x="240" y="142" width="98" height="63" fill="#92400e" />
            <polygon points="240,142 289,112 338,142" fill="#b45309" />
            <rect x="267" y="165" width="16" height="25" fill="#78350f" />
            <rect x="295" y="157" width="14" height="14" fill="#fbbf24" />

            {/* Aunt Em holding Dorothy */}
            <g transform="translate(190, 165)">
              <circle cx="0" cy="0" r="25" fill="#fbbf24" />
              <rect x="-14" y="22" width="28" height="49" fill="#7c3aed" />

              {/* Dorothy in arms */}
              <circle cx="0" cy="35" r="14" fill="#fbbf24" />
              <rect x="-7" y="45" width="14" height="25" fill="#3b82f6" />
            </g>

            {/* Toto */}
            <ellipse cx="160" cy="240" rx="12" ry="7" fill="#92400e" />
            <circle cx="168" cy="235" r="6" fill="#92400e" />

            {/* Home sweet home elements */}
            <text x="135" y="60" fill="#ec4899" fontSize="28">
              💕
            </text>
            <text x="240" y="75" fill="#fbbf24" fontSize="25">
              🏠
            </text>
            <text x="95" y="90" fill="#22c55e" fontSize="22">
              ✨
            </text>

            {/* Wheat field */}
            {Array.from({ length: 12 }).map((_, i) => (
              <rect key={i} x={28 + i * 30} y={180 + (i % 4) * 7} width={6} height={35} fill="#d97706" />
            ))}

            {/* Speech bubble */}
            <ellipse cx="295" cy="90" rx="63" ry="21" fill="#ffffff" />
            <text x="255" y="87" fill="#000000" fontSize="14">
              トト、帰って
            </text>
            <text x="262" y="102" fill="#000000" fontSize="14">
              きたのね！
            </text>
          </svg>
        )

      default:
        return (
          <div className="w-full h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
            <span className="text-6xl">📖</span>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-2">
            🌪️ オズの魔法使い 📖
          </h1>
          <p className="text-gray-600">ドロシーとトトの不思議な冒険の物語</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">進行状況</span>
            <span className="text-sm text-gray-600">
              {currentChapter} / {totalChapters}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentChapter / totalChapters) * 100}%` }}
            />
          </div>
        </div>

        {/* Chapter Card */}
        <div className="flex justify-center items-center w-full my-8">
          <Card className="overflow-hidden border-0 bg-white/90 backdrop-blur-sm shadow-2xl" style={{ width: 880, minHeight: 340, maxHeight: 340, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div className={`h-3 bg-gradient-to-r ${currentChapterData.color}`} />
            <CardContent className="p-8 flex flex-col h-full justify-start" style={{ flex: 1, overflow: 'hidden' }}>
              {/* Chapter Header */}
              <div className="flex items-center justify-between mb-6">
                <Badge variant="secondary" className="text-lg font-semibold px-4 py-2">
                  第{currentChapterData.id}章
                </Badge>
                 {/* Chapter Title */}
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">{currentChapterData.title}</h2>
                <div className="text-4xl">
                  {currentChapterData.id <= 3
                    ? "🌪️"
                    : currentChapterData.id <= 7
                      ? "🛤️"
                      : currentChapterData.id <= 10
                        ? "🏰"
                        : currentChapterData.id <= 13
                          ? "⚔️"
                          : currentChapterData.id <= 18
                            ? "🎭"
                            : "🏠"}
                </div>
              </div>


              {/* Illustration */}
              <div className="mb-4 flex justify-center items-center">
                <div className="rounded-xl overflow-hidden shadow-lg bg-white" style={{ width: 240, height: 160, minWidth: 240, minHeight: 160 }}>
                  {renderChapterIllustration(currentChapterData.id)}
                </div>
              </div>

              {/* Story Text */}
              <div className="prose prose-lg max-w-none" style={{ flex: 1, overflow: 'auto' }}>
                <p className="text-gray-700 leading-relaxed text">{currentChapterData.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8">
          <Button
            onClick={prevChapter}
            disabled={currentChapter === 1}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            前の章
          </Button>

          <div className="flex gap-4">
            <Button onClick={goToOverview} variant="ghost" size="lg" className="flex items-center gap-2">
              <Home className="w-5 h-5" />
              目次
            </Button>
          </div>

          <Button
            onClick={nextChapter}
            disabled={currentChapter === totalChapters}
            size="lg"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            次の章
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Chapter Navigation Dots */}
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => setCurrentChapter(chapter.id)}
              className={`w-3 h-3 rounded-full transition-all duration-200 cursor-pointer`}
              style={{
                backgroundColor: chapter.id === currentChapter ? '#e879f9' : '#cbd5e1', // pastel magenta for active, slate-200 for inactive
                transform: chapter.id === currentChapter ? 'scale(1.25)' : 'scale(1)',
                boxShadow: chapter.id === currentChapter ? '0 4px 6px -1px rgba(0,0,0,0.1)' : 'none',
              }}
              aria-label={`第${chapter.id}章へ移動`}
            />
          ))}
        </div>

        {/* End Message */}
        {currentChapter === totalChapters && (
          <>
            <br/>
            <br/>
            <div className="text-center mt-12 p-8 bg-white/50 backdrop-blur-sm rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">✨ 物語の終わり ✨</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                ドロシーの冒険を通して、私たちは友情、勇気、そして家族の大切さを学びました。
                どんなに遠くへ行っても、心の故郷はいつも私たちと共にあるのです。
              </p>
              <Button
                onClick={() => setCurrentChapter(1)}
                className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                最初から読み直す
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
