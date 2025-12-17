import { Clue } from './types';

export const SCENARIO_DETAILS = {
  date: "8월 4일 목요일 오전 10:30분경",
  location: "우리 산업(주) 제3공장",
  incident: "화재 발생 및 인명 사고",
  victim: "박계장 (생산팀, 전치 4주 화상)",
  businessImpact: "코끼리건설(주) 납품 물량 4,000 unit 생산 차질 (납기일 8월 12일)",
  powerLimit: 16000 // Watts
};

// Raw Image URLs provided
const IMAGE_URLS = [
  // 1-1 to 1-18 (Photos/JPG)
  "https://i.ibb.co/xtVbbr1r/1-1.jpg", "https://i.ibb.co/ymRNcvbh/1-2.jpg", "https://i.ibb.co/TBrSLsZq/1-3.jpg",
  "https://i.ibb.co/4RFt7W5g/1-4.jpg", "https://i.ibb.co/wFWGqbKr/1-5.jpg", "https://i.ibb.co/rRz8PcLZ/1-6.jpg",
  "https://i.ibb.co/yBKkH1xt/1-7.jpg", "https://i.ibb.co/3yNDjQZh/1-8.jpg", "https://i.ibb.co/Z6FCK3nM/1-9.jpg",
  "https://i.ibb.co/fVW1frCN/1-10.jpg", "https://i.ibb.co/vxK6HQrT/1-11.jpg", "https://i.ibb.co/7xK7vWsT/1-12.jpg",
  "https://i.ibb.co/LXmKvDNh/1-13.jpg", "https://i.ibb.co/bMJnZC3S/1-14.jpg", "https://i.ibb.co/5gQqKKDZ/1-15.jpg",
  "https://i.ibb.co/JWknnX40/1-16.jpg", "https://i.ibb.co/KzyMWypP/1-17.jpg", "https://i.ibb.co/VWN42Sqc/1-18.jpg",
  
  // 2-1 to 2-18 (Documents/PNG)
  "https://i.ibb.co/Xxr8kGFz/2-1.png", "https://i.ibb.co/vvKLbsDW/2-2.png", "https://i.ibb.co/GfbKDQ9N/2-3.png",
  "https://i.ibb.co/TxvZBWTh/2-4.png", "https://i.ibb.co/C3y6SZyD/2-5.png", "https://i.ibb.co/tPptp82F/2-6.png",
  "https://i.ibb.co/4qdvzfw/2-7.png", "https://i.ibb.co/3mJY6wDj/2-8.png", "https://i.ibb.co/vvr2wcWs/2-9.png",
  "https://i.ibb.co/Y7h5T8B2/2-10.png", "https://i.ibb.co/YGQysZD/2-11.png", "https://i.ibb.co/4R33TmnV/2-12.png",
  "https://i.ibb.co/8DsgjyH9/2-13.png", "https://i.ibb.co/gMpb2zWx/2-14.png", "https://i.ibb.co/PsdHMz44/2-15.png",
  "https://i.ibb.co/3yJMM93h/2-16.png", "https://i.ibb.co/bT7wGnW/2-17.png", "https://i.ibb.co/B5ZzGNdn/2-18.png",

  // 3-1 to 3-18 (Photos/JPG)
  "https://i.ibb.co/FLzgXBDc/3-1.jpg", "https://i.ibb.co/ZbXwMkX/3-2.jpg", "https://i.ibb.co/gb8TdqCz/3-3.jpg",
  "https://i.ibb.co/Mywkm26H/3-4.jpg", "https://i.ibb.co/spgPX41z/3-5.jpg", "https://i.ibb.co/cSpnsmqg/3-6.jpg",
  "https://i.ibb.co/Z6GL6h7T/3-7.jpg", "https://i.ibb.co/VYQt245P/3-8.jpg", "https://i.ibb.co/n88f9dQf/3-9.jpg",
  "https://i.ibb.co/zTR4Kv0s/3-10.jpg", "https://i.ibb.co/ZR22RyXg/3-11.jpg", "https://i.ibb.co/PGKrNv0v/3-12.jpg",
  "https://i.ibb.co/MyfK6MNn/3-13.jpg", "https://i.ibb.co/BKVQYRVS/3-14.jpg", "https://i.ibb.co/Y7wSGbrS/3-15.jpg",
  "https://i.ibb.co/Tx31BJWq/3-16.jpg", "https://i.ibb.co/NgCm4Bbv/3-17.jpg", "https://i.ibb.co/Y7BnGjtK/3-18.jpg",

  // 4-1 to 4-18 (Documents/PNG)
  "https://i.ibb.co/6501PHF/4-1.png", "https://i.ibb.co/Kp8sbZYF/4-2.png", "https://i.ibb.co/XZcsc8qc/4-3.png",
  "https://i.ibb.co/KxkwCwb0/4-4.png", "https://i.ibb.co/yFF8Zmbz/4-5.png", "https://i.ibb.co/nqDYc1GN/4-6.png",
  "https://i.ibb.co/R4NhQ7Gs/4-7.png", "https://i.ibb.co/nMsJy9TS/4-8.png", "https://i.ibb.co/YTJVNVVc/4-9.png",
  "https://i.ibb.co/S4zdtsKX/4-10.png", "https://i.ibb.co/23fCDk7s/4-11.png", "https://i.ibb.co/hP316DK/4-12.png",
  "https://i.ibb.co/TxM4784Y/4-13.png", "https://i.ibb.co/N5QhsZT/4-14.png", "https://i.ibb.co/20KVXQWr/4-15.png",
  "https://i.ibb.co/wN1KftHY/4-16.png", "https://i.ibb.co/ccBGmLSY/4-17.png", "https://i.ibb.co/pg1x953/4-18.png"
];

const DOC_CONTENTS = [
  "비상구 적재 금지 경고문이 붙어 있으나 심하게 훼손되어 식별이 어려움.",
  "작업 일지 (8/4): '생산 목표 4,000개 달성을 위해 점심시간 설비 가동 유지'",
  "이메일 출력물: [긴급] 코끼리건설 납품 지연 시 위약금 관련 건 (영업팀장 발송)",
  "설비 점검표: 냉각 팬 소음 발생 항목에 '조치 보류 - 부품 수급 지연' 체크됨.",
  "사내 메신저 캡처: '야, 안전관리자 오면 비상구 쪽 박스 좀 치우는 척 해.'",
  "공문(한전): 하계 전력 피크 시간대(10:00~11:00) 사용 자제 협조 요청.",
  "화재 보험 증권: 특약 사항에 '인화성 물질 관리 소홀 시 보상 제외' 문구 형광펜 표시.",
  "거래명세서: 규격 미달의 저가형 전선(1.5sq) 대량 입고 확인.",
  "시말서: 지난 달 과부하로 인한 정전 사고 관련 생산팀 담당자 시말서.",
  "비상 연락망 및 조직도: 안전관리자가 공장장 직속이 아닌 생산팀 하위로 배치됨.",
  "병원 진료 의뢰서: 박계장, 평소 호흡기 질환 및 두통 호소 기록.",
  "게시판 공지: '무재해 300일 달성 목표 - 안전사고 발생 시 부서장 인사고과 반영'",
  "소방 시설 점검표: 소화기 압력 미달 3건, 호스 노후화 지적 사항 (조치 안됨).",
  "납품 계약서: 납기일(8/12) 위반 시 지체상금 조항이 매우 불리하게 작성됨.",
  "주간 회의록: '생산성 향상을 위해 불필요한 안전 절차 간소화' 공장장 지시.",
  "수리 견적서: 노후 배전반 교체 비용(5,000만원) 과다로 결재 반려됨.",
  "근로 계약서 부속 합의서: 연장 근로 거부 시 불이익 감수 조항 포함.",
  "작업자 문자 메시지: '오늘까지 물량 못 맞추면 다 집에 못 갈 줄 알아.'"
];

const PHOTO_CONTENTS = [
  "현장 사진: 불에 타서 녹아내린 배전반과 그 주변에 얽혀있는 문어발식 배선.",
  "현장 사진: 비상구를 가로막고 있는 높게 쌓인 완제품 박스들 (사람 통행 불가).",
  "현장 사진: 검게 그을린 벽면과 천장, 스프링클러 헤드가 보이지 않음.",
  "현장 사진: 바닥에 널브러진 인화성 자재(스티로폼, 포장 비닐) 잔해.",
  "현장 사진: 화재 발생 지점 근처에서 발견된 다량의 담배꽁초.",
  "현장 사진: 먼지가 수북하게 쌓여 공기 순환이 막힌 환풍구 모터 (과열 원인).",
  "현장 사진: 피복이 벗겨진 채 방치된 노후 전선들.",
  "현장 사진: 유효기간이 2년 지난 소화기가 구석에 방치되어 있음.",
  "현장 사진: 화재 당시 정전으로 인해 비상 조명등이 작동하지 않은 어두운 복도.",
  "현장 사진: 창문이 도난 방지용 방범창으로 막혀 있어 외부 탈출이 불가능한 구조.",
  "현장 사진: A Pro 기계 뒤쪽에서 발견된 불법 전력 증설(개조) 흔적.",
  "현장 사진: 옥내 소화전 앞에 자재가 쌓여 있어 문을 열 수 없는 상태.",
  "현장 사진: 고열로 인해 녹아내린 플라스틱 용기들이 바닥에 눌러붙어 있음.",
  "현장 사진: 화재 경보기 전선이 고의로 절단된 흔적 (오작동 민원 때문으로 추정).",
  "현장 사진: 대피로 유도등이 높게 쌓인 자재에 가려져 보이지 않음.",
  "현장 사진: 휴게실 내부에 설치된 문어발식 콘센트와 개인 전열기구.",
  "현장 사진: 공장 외벽 샌드위치 패널(가연성)이 심하게 연소된 모습.",
  "현장 사진: 허가받지 않고 불법으로 증축된 가설 건축물(창고) 내부 전경."
];

// Generate Clues from Images with simulated text content
export const CLUES: Clue[] = IMAGE_URLS.map((url, index) => {
  // Determine if it's likely a document (PNGs in 2nd and 4th groups) or photo (JPGs in 1st and 3rd)
  // Indices 0-17: JPG, 18-35: PNG, 36-53: JPG, 54-71: PNG
  const isDoc = (index >= 18 && index < 36) || (index >= 54 && index < 72);
  
  // Distribute the 18 specific texts across the items
  const contentIndex = index % 18;
  
  let content = "";
  if (isDoc) {
    content = DOC_CONTENTS[contentIndex] || "문서 내용 식별 필요";
  } else {
    content = PHOTO_CONTENTS[contentIndex] || "현장 사진 식별 필요";
  }

  return {
    id: `c${index + 1}`,
    title: `증거 자료 #${index + 1}`,
    content: content,
    type: isDoc ? 'document' : 'photo',
    source: '현장 감식반',
    image: url,
    isKeyClue: false
  };
});

export const UPSTREAM_SOLUTION = {
  rootCause: "생산 일정 압박으로 인한 무리한 설비 가동(과부하)과 자재 적재 공간 부족으로 인한 비상구 폐쇄가 복합적으로 작용함. 근본적으로는 안전보다 납기를 우선시하는 조직 문화와 시스템 부재.",
  prevention: "1) 실시간 전력 모니터링 시스템 도입 (자동 차단), 2) 자재 적재 구역 명확화 및 비상구 센서 설치, 3) 생산 일정과 안전 점검의 연동 시스템 구축 (Safety First Process)."
};