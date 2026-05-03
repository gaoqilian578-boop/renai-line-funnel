import { loveCharacters } from "./loveCharacters";

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

const buildLineLoveTypes = (): DiagnosisType[] => loveCharacters.map((item) => ({
  min: 0,
  max: 40,
  name: `${item.code} ${item.name}`,
  code: item.code,
  characterName: item.name,
  title: item.title,
  features: item.description,
  message: item.catchCopy,
  lineTrouble: item.linePattern,
  goodSide: item.strength,
  todo: item.beforeSendCheck,
  roadmap: item.roadmap.join(" / "),
  lessonIds: item.recommendedLessons,
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
    title: "恋愛キャラ診断",
    description: "あなたの恋愛のクセを、キャラで可視化。待ち方・送り方・不安の出方から、今のあなたに出やすい恋愛キャラがわかります。",
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
