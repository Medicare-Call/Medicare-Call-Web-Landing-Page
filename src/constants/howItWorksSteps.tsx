import PhoneIcon from "../components/icons/PhoneIcon";
import AnalysisIcon from "../components/icons/AnalysisIcon";
import ReportIcon from "../components/icons/ReportIcon";

export const howItWorksSteps = [
  {
    id: 1,
    title: "AI 안부전화",
    desc1: "매일 정해진 시간에 AI가 자동으로 부모님께",
    desc2: "다정하게 전화를 걸어 대화하며",
    desc3: "그날의 건강과 감정 상태를 확인합니다.",
    icon: <PhoneIcon />,
  },
  {
    id: 2,
    title: "건강 상태 분석",
    desc1: "식사, 복약, 수면, 통증 여부 등",
    desc2: "대화 속 건강 데이터를 분석하고",
    desc3: "'아프다', '외롭다' 같은 위험 신호를 즉시 감지합니다.",
    icon: <AnalysisIcon />,
  },
  {
    id: 3,
    title: "자녀에게 리포트",
    desc1: "분석된 부모님의 일일 건강 상태를",
    desc2: "자녀분의 스마트폰 앱을 통해 간편하고 보기 쉬운",
    desc3: "리포트로 매일 전달해 드립니다.",
    icon: <ReportIcon />,
  },
];
