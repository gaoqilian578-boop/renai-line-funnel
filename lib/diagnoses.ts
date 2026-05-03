export type DiagnosisChoice = { label: string; point: number };
export type DiagnosisQuestion = { text: string; choices: DiagnosisChoice[] };
export type DiagnosisType = {
  min: number;
  max: number;
  name: string;
  code?: string;
  characterName?: string;
  title?: string;
  features: string;
  message?: string;
  lineTrouble?: string;
  goodSide: string;
  todo: string;
  roadmap: string;
  lessonIds: number[];
};
export type Diagnosis = {
  slug: string;
  title: string;
  description: string;
  questions: DiagnosisQuestion[];
  types: DiagnosisType[];
};

const choices: DiagnosisChoice[] = [
  { label: "ほとんど当てはまらない", point: 1 },
  { label: "少し当てはまる", point: 2 },
  { label: "かなり当てはまる", point: 3 },
  { label: "とても当てはまる", point: 4 },
];

const makeQuestions = (items: string[]) => items.map((text) => ({ text, choices }));

const lineLoveTypes = [
  { code: "WINO", characterName: "Noa", title: "静かに待ちすぎる片思いさん", features: "相手からの返信を待ちながら、ひとりで不安を抱えやすいタイプ。「もう送らない方がいいかな」と思いながら、本当はこのまま終わるのが怖い。", message: "待てる優しさがあるぶん、自分の気持ちを後回しにしすぎないで。", lineTrouble: "返信待ちの時間が長くなるほど、送らない選択と終わりへの不安の間で揺れやすいです。", lessonIds: [1, 2, 8, 13, 15] },
  { code: "WINS", characterName: "Luca", title: "不安を抱えながら整えようとする人", features: "不安にはなるけど、すぐにぶつけずに一度考えられるタイプ。恋愛になると揺れるけど、少しずつ自分を整える力がある。", message: "焦らなくて大丈夫。あなたはちゃんと、崩れない恋愛に近づいてる。", lineTrouble: "不安を抱えたまま考え込む時間はありますが、勢いで送る前に立ち止まりやすいです。", lessonIds: [1, 2, 5, 8, 15] },
  { code: "WIPO", characterName: "Milo", title: "考えすぎて動けなくなる人", features: "何を送るか考えすぎて、結局送れなくなるタイプ。相手にどう思われるかを先に考えて、自分の本音を隠しやすい。", message: "完璧なLINEじゃなくていい。自然に返せる一文からで大丈夫。", lineTrouble: "文面を何度も作り直しているうちに、返すタイミングごと失いやすいです。", lessonIds: [2, 4, 6, 8, 12] },
  { code: "WIPS", characterName: "Sena", title: "ゆっくり距離を縮める慎重派", features: "慎重だけど、ただ待つだけではなく、ちゃんと進め方を考えられるタイプ。急がずに距離を縮めたい人。", message: "あなたの慎重さは弱さじゃなくて、関係を大事にする力。", lineTrouble: "進みたい気持ちはあるのに、相手のペースを読みすぎて一歩が遅くなりやすいです。", lessonIds: [2, 6, 9, 12, 15] },
  { code: "WCNO", characterName: "Ema", title: "確認したいけど我慢する人", features: "本当は「どう思ってる？」と聞きたいけど、重いと思われたくなくて我慢するタイプ。気持ちを飲み込みすぎて、夜に苦しくなりやすい。", message: "確認したくなるのは悪いことじゃない。言葉の形を整えればいいだけ。", lineTrouble: "聞きたいことを飲み込むほど、夜に既読や返信の温度を何度も見返しやすいです。", lessonIds: [1, 3, 4, 8, 13] },
  { code: "WCNS", characterName: "Rito", title: "不安を言葉にする前に整えられる人", features: "不安になるけど、すぐに相手へぶつける前に一度立ち止まれるタイプ。確認欲とやさしさのバランスを取ろうとしている。", message: "その一呼吸が、恋愛を少しラクにしてくれる。", lineTrouble: "確認したい気持ちは出ますが、相手が受け取りやすい形を探してから送れます。", lessonIds: [1, 3, 5, 8, 14] },
  { code: "WCPO", characterName: "Nico", title: "返事で気持ちを測りがちな人", features: "返信速度や文の短さで「脈あり・脈なし」を判断しやすいタイプ。相手のLINEひとつで気分が大きく揺れやすい。", message: "返信の速さだけで、あなたの価値も関係の全部も決まらない。", lineTrouble: "返信の速さ、絵文字、文量を読みすぎて、気分が相手の通知に左右されやすいです。", lessonIds: [1, 3, 8, 10, 13] },
  { code: "WCPS", characterName: "Yura", title: "確認欲を整えながら進める人", features: "不安も確認したい気持ちもあるけど、関係を壊さない言い方を探せるタイプ。ちゃんと進めたい気持ちが強い。", message: "不安があるままでも、整えながら前に進める。", lineTrouble: "確認したい時ほど言い方を選ぶので、関係を壊さず次の会話につなげやすいです。", lessonIds: [3, 5, 8, 10, 14] },
  { code: "AINO", characterName: "Kai", title: "勢いで送ったあと不安になる人", features: "その時の気持ちで送れるけど、送ったあとに「重かったかな」と見返しやすいタイプ。素直さがあるぶん、あとから不安が追いかけてくる。", message: "送れる力はある。あとは、送る前の一呼吸を足すだけ。", lineTrouble: "送信までは早いのに、送った直後から文面を見返して不安が強まりやすいです。", lessonIds: [1, 2, 3, 5, 7] },
  { code: "AINS", characterName: "Moca", title: "自分から動けるけど丁寧な人", features: "自分から動けるけど、相手への負担も考えられるタイプ。自然体で距離を縮めるのが得意になれる人。", message: "あなたの素直さは、ちゃんと整えれば魅力になる。", lineTrouble: "自分から話題を出せるので、軽い一文や自然な誘いに変えられると距離が縮まりやすいです。", lessonIds: [2, 5, 6, 7, 10] },
  { code: "AIPO", characterName: "Leo", title: "追いLINE寸前で迷う人", features: "関係を進めたい気持ちはあるけど、相手の反応が気になって迷いやすいタイプ。送るか待つかで、心が忙しくなりやすい。", message: "動きたい気持ちは悪くない。焦りではなく、会話になる形に変えよう。", lineTrouble: "もう一通送るか待つかで揺れて、会話の目的より不安の解消が前に出やすいです。", lessonIds: [2, 3, 4, 7, 10] },
  { code: "AIPS", characterName: "Rin", title: "動きながら距離感を整える人", features: "自分から動きつつ、相手との距離感も見ようとできるタイプ。恋愛で不安になることはあっても、学びながら進める。", message: "あなたは、追いすぎずに進める力を育てていける。", lineTrouble: "自分から動けるぶん、送る頻度と相手の返しやすさを調整できると安定します。", lessonIds: [4, 6, 7, 10, 12] },
  { code: "ACNO", characterName: "Haru", title: "好きが出すぎて確認したくなる人", features: "好きになると、相手の気持ちをすぐ知りたくなるタイプ。「どう思ってる？」を聞きたいけど、重いと思われるのが怖い。", message: "好きが大きいだけ。責める形じゃなく、伝わる形に整えよう。", lineTrouble: "好きな気持ちが大きいほど、確認したい文が長くなったり重く見えたりしやすいです。", lessonIds: [1, 3, 4, 11, 14] },
  { code: "ACNS", characterName: "Sora", title: "素直だけど重くならない工夫ができる人", features: "気持ちは出せるけど、自分の伝え方も見直せるタイプ。素直さと落ち着きのバランスが取れるようになる人。", message: "素直な気持ちは、言い方を整えるだけでちゃんと届きやすくなる。", lineTrouble: "本音を出しながらも、相手が返しやすい短さや温度に整えられます。", lessonIds: [3, 5, 7, 11, 14] },
  { code: "ACPO", characterName: "Rei", title: "不安で空回りしやすい人", features: "関係を進めたい気持ちが強く、不安になると確認や追いLINEに寄りやすいタイプ。好きだからこそ、焦りが前に出やすい。", message: "空回りしてしまうのは、ちゃんと大切にしたい気持ちがあるから。", lineTrouble: "返信がない時間に焦りが強くなり、確認、長文、追いLINEへ寄りやすいです。", lessonIds: [1, 3, 4, 7, 11] },
  { code: "ACPS", characterName: "Yuto", title: "ちゃんと進めたい恋愛努力家", features: "不安もあるけど、関係をちゃんと育てたい気持ちが強いタイプ。学びながら、送る言葉や距離感を整えていける。", message: "あなたは、恋愛を雑にしない人。だからこそ、整え方を知れば強い。", lineTrouble: "気持ちを進めたい場面でも、言葉と距離感を見直せるので関係を育てる会話にしやすいです。", lessonIds: [5, 7, 10, 11, 14] },
];

const typeSet = {
  lineAnxiety: [
    ["動けない慎重タイプ", "考えすぎて送れなくなりやすい状態です。言葉を選べる丁寧さがある一方、正解探しで疲れやすくなっています。", "相手を雑に扱わない優しさと、関係を大切にしたい誠実さがあります。", "完璧な文より、短く返しやすい一文を作る練習をしましょう。"],
    ["尽くしすぎ我慢タイプ", "相手に合わせて、自分の寂しさを後回しにしやすい状態です。", "思いやりがあり、相手の状況を想像できる力があります。", "自分の希望を小さく言う練習を始めましょう。"],
    ["返信待ち不安タイプ", "返事の速さで気持ちが大きく揺れやすい状態です。", "好きな人とのつながりを丁寧に感じ取れる繊細さがあります。", "返信速度と自分の価値を分けて考える時間を作りましょう。"],
    ["追いLINE寸前タイプ", "不安が高まると、確認したいLINEを送りたくなりやすい状態です。", "関係を諦めたくない強さと素直さがあります。", "送る前に10分置き、責めではなく共有の文へ変えましょう。"],
  ],
  chasing: [
    ["安定タイプ", "不安はあっても、相手のペースを見ながら待てる状態です。", "自分の気持ちと相手の事情を分けて考える力があります。", "今の安定感を保ちながら、会話の入口を増やしましょう。"],
    ["我慢爆発タイプ", "普段は我慢できても、限界を超えると強い文を送りたくなる状態です。", "すぐ責めないように頑張れる優しさがあります。", "限界になる前に、小さく希望を伝える練習が必要です。"],
    ["確認したいタイプ", "相手の気持ちを確かめたくなり、質問が増えやすい状態です。", "曖昧な関係を放置しない真剣さがあります。", "答えを迫る前に、会話が戻る余白を作りましょう。"],
    ["感情先走りタイプ", "寂しさや焦りが高まると、すぐ送信したくなりやすい状態です。", "気持ちに嘘がなく、まっすぐ好きになれる人です。", "衝動のピークを過ぎるまで、文章をメモに逃がしましょう。"],
  ],
  progress: [
    ["まだ様子見段階", "相手との接点が少なく、まずは自然な会話を増やす段階です。", "焦らず相手を見る慎重さがあります。", "軽い共有や短い質問で、会話の回数を増やしましょう。"],
    ["会話づくり段階", "LINEのやりとりはあるものの、まだ関係の温度を育てている途中です。", "会話を大切に積み重ねる力があります。", "相手が返しやすい話題を選び、少しずつ深めましょう。"],
    ["デート接続段階", "会話から会う流れを作れる可能性がある段階です。", "相手との距離を現実で縮める準備ができています。", "重くない誘い方で、小さな予定を提案しましょう。"],
    ["関係進展段階", "好意を伝える前の確認や、次の関係を考える段階です。", "ここまで関係を育ててきた積み重ねがあります。", "LINEだけでなく、会った時の態度も見て進めましょう。"],
  ],
  distance: [
    ["距離が遠い状態", "まだ相手の生活や温度が見えにくい状態です。", "急に踏み込まず、丁寧に距離を測れています。", "まずは負担の少ない接点を作りましょう。"],
    ["会話はあるけど浅い状態", "やりとりはあるものの、話題が表面的になりやすい状態です。", "関係を壊さず続ける安定感があります。", "前に話した内容を拾って、少し具体的な話題にしましょう。"],
    ["好意はありそうだけど不安定な状態", "いい雰囲気はあるのに、返信や態度に波があって不安になりやすい状態です。", "相手の小さな変化に気づける感受性があります。", "一度会う流れを作り、LINE以外の態度も見ましょう。"],
    ["あと一歩で進めそうな状態", "関係を進めるための会話や会う流れが作れそうな状態です。", "これまでの距離の縮め方が丁寧だった証拠です。", "希望を小さく伝えて、次の約束につなげましょう。"],
  ],
  selfEsteem: [
    ["自分下げタイプ", "返事が遅いと、自分に魅力がないからだと考えやすい状態です。", "自分を見つめる力がある人です。", "相手の反応と自分の価値を切り離す練習をしましょう。"],
    ["相手優先タイプ", "相手に嫌われないことを優先し、自分の希望を飲み込みやすい状態です。", "相手を思いやれる優しさがあります。", "小さな希望を一文で伝える練習をしましょう。"],
    ["不安確認タイプ", "愛されているか、嫌われていないかを確認したくなりやすい状態です。", "関係を真剣に考えられる人です。", "確認の前に、事実と想像を分ける時間を作りましょう。"],
    ["自分軸回復タイプ", "不安はあっても、自分を取り戻す準備ができている状態です。", "恋愛に向き合いながら、自分も大切にしようとしています。", "生活の軸を戻しながら、必要な時だけ動きましょう。"],
  ],
};

const buildLineLoveTypes = (): DiagnosisType[] => lineLoveTypes.map((item) => ({
  min: 0,
  max: 40,
  name: `${item.code} ${item.characterName}`,
  code: item.code,
  characterName: item.characterName,
  title: item.title,
  features: item.features,
  message: item.message,
  lineTrouble: item.lineTrouble,
  goodSide: item.message,
  todo: item.lineTrouble,
  roadmap: item.code.endsWith("S") ? "Month 2：距離を整えながら進める" : "Month 1：不安を整える",
  lessonIds: item.lessonIds,
}));

const buildTypes = (items: string[][]): DiagnosisType[] => items.map(([name, features, goodSide, todo], index) => ({
  min: 8 + index * 8,
  max: index === 3 ? 40 : 15 + index * 8,
  name,
  features,
  goodSide,
  todo,
  roadmap: index < 2 ? "Month 1：不安を整える" : index === 2 ? "Month 2：距離を縮める" : "Month 3：関係を進める",
  lessonIds: index < 2 ? [1, 2, 3, 4, 5] : index === 2 ? [6, 7, 8, 9, 10] : [11, 12, 13, 14, 15],
}));

export const diagnoses: Diagnosis[] = [
  {
    slug: "love-line-type",
    title: "恋愛LINEタイプ診断｜16タイプ",
    description: "返信待ちや送信前の不安が、16タイプのどんな形で出やすいかを見ます。",
    questions: makeQuestions(["返信が遅いと、嫌われたのかもと考える", "送る文章を何度も作って消す", "重いと思われないか心配になる", "本当は聞きたいのに我慢する", "相手の既読やオンライン状況が気になる", "返事が来るまで他のことに集中しにくい", "会話が終わると関係も終わる気がする", "追いLINEしたい気持ちを抑えることがある", "相手に合わせすぎて疲れる", "送った後に内容を何度も見返す"]),
    types: buildLineLoveTypes(),
  },
  {
    slug: "chasing-risk",
    title: "追いLINE危険度診断",
    description: "不安が強い時、追いLINEに向かいやすい度合いを見ます。",
    questions: makeQuestions(["返事がないと追加で送りたくなる", "相手の気持ちをはっきり確認したくなる", "我慢した後に急に強い言葉を送りたくなる", "不安な時ほど長文になりやすい", "返事が来るまで通知を何度も見る", "曖昧な態度が続くと責めたくなる", "相手が返しやすいかより自分の不安が先に来る", "送った後に後悔することがある"]),
    types: buildTypes(typeSet.chasing),
  },
  {
    slug: "progress",
    title: "片思い進展度診断",
    description: "今の片思いが、どの段階にいるかを整理します。",
    questions: makeQuestions(["相手と定期的にLINEする", "相手の好きなものを少し知っている", "会話が自然に続くことがある", "相手から話題を出してくれることがある", "二人で会う話が出たことがある", "デート後もやりとりが続いた", "好意を伝える流れを考え始めている", "LINE以外でも態度を見られている"]),
    types: buildTypes(typeSet.progress),
  },
  {
    slug: "distance",
    title: "彼との距離感診断",
    description: "彼との今の距離を、LINEと会う流れから見ます。",
    questions: makeQuestions(["彼の日常を少し知っている", "短いやりとりなら自然にできる", "彼からも質問が来ることがある", "前に話した内容を覚えてくれている", "会う予定を話題にできる", "会った時に話しやすい", "彼の態度に好意を感じる瞬間がある", "次の一歩を提案できそうだと感じる"]),
    types: buildTypes(typeSet.distance),
  },
  {
    slug: "self-esteem",
    title: "恋愛自己肯定感診断",
    description: "恋愛中に自分を下げすぎていないかを見ます。",
    questions: makeQuestions(["返事が遅いと自分に魅力がない気がする", "彼に合わせるために無理をする", "嫌われない返事を優先して本音を隠す", "相手の機嫌を想像して疲れる", "自分から誘うのが怖い", "恋愛中は生活のリズムが崩れやすい", "不安になると確認したくなる", "本当はもっと大切にされたいと思う"]),
    types: buildTypes(typeSet.selfEsteem),
  },
];

export const getDiagnosis = (slug: string) => diagnoses.find((diagnosis) => diagnosis.slug === slug);

export const getLineLoveTypeCode = (answers: number[]) => {
  const waitOrAct = (answers[7] ?? 0) + (answers[9] ?? 0) >= 6 ? "A" : "W";
  const innerOrConfirm = (answers[2] ?? 0) + (answers[3] ?? 0) + (answers[4] ?? 0) >= 8 ? "C" : "I";
  const needOrPace = (answers[0] ?? 0) + (answers[1] ?? 0) + (answers[6] ?? 0) >= 8 ? "P" : "N";
  const overflowOrStable = (answers[5] ?? 0) + (answers[7] ?? 0) + (answers[9] ?? 0) >= 8 ? "O" : "S";
  return `${waitOrAct}${innerOrConfirm}${needOrPace}${overflowOrStable}`;
};

export const getDiagnosisType = (diagnosis: Diagnosis, score: number, answers?: number[]) => {
  if (diagnosis.slug === "love-line-type" && answers?.length) {
    const code = getLineLoveTypeCode(answers);
    return diagnosis.types.find((type) => type.code === code) ?? diagnosis.types[0];
  }
  return diagnosis.types.find((type) => score >= type.min && score <= type.max) ?? diagnosis.types[diagnosis.types.length - 1];
};
