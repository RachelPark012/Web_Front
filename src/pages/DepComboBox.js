import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function DepComboBox() {
  return (
    <Autocomplete
      disablePortal
      labelId="demo-simple-select-required-label"
      id="demo-simple-select-required"
      options={dep}
      sx={{ width: 300 }}
      //isOptionEqualToValue={(option, value) => option.name === value.name || value === ""}
      renderInput={(params) => <TextField {...params} label="전공 *" size="small" id="fullWidth"/>}
    />
  );
}

const dep = [
  { label: '한국어문학부'},
  { label: '역사문화학과'},
  { label: '프랑스언어·문화학과'},
  { label: '중어중문학부'},
  { label: '독일언어ㆍ문화학과'},
  { label: "일본학과"},
  { label: '문헌정보학과'},
  { label: '문화관광외식학부 문화관광학전공'},
  { label: '문화관광외식학부 르꼬르동블루외식경영전공'},
  { label: '교육학부'},
  { label: '화학과'},
  { label: '생명시스템학부'},
  { label: '수학과'},
  { label: '통계학과'},
  { label: '체육교육과'},
  { label: "무용과"},
  { label: '화공생명공학부'},
  { label: '인공지능공학부'},
  { label: '첨단소재·전자융합공학부 지능형전자시스템전공'},
  { label: '첨단소재·전자융합공학부 신소재물리전공'},
  { label: '소프트웨어학부 컴퓨터과학전공'},
  { label: '소프트웨어학부 데이터사이언스전공'},
  { label: '기계시스템학부'},
  { label: "기초공학부"},
  { label: '가족자원경영학과'},
  { label: '아동복지학부'},
  { label: '의류학과'},
  { label: '식품영양학과'},
  { label: '정치외교학과'},
  { label: '행정학과'},
  { label: '홍보광고학과'},
  { label: '소비자경제학과'},
  { label: '사회심리학과'},
  { label: '법학부'},
  { label: '경제학부'},
  { label: '경영학부'},
  { label: '피아노과'},
  { label: '관현악과'},
  { label: '성악과'},
  { label: '작곡과'},
  { label: '약학부'},
  { label: '시각ㆍ영상 디자인과'},
  { label: '산업디자인과'},
  { label: '환경디자인과'},
  { label: '공예과'},
  { label: '회화과'},
  { label: '기초교양학부'},
  { label: '융합학부/연계전공'},
  { label: '글로벌협력전공'},
  { label: '앙트러프러너십전공'},
  { label: '영어영문학전공'},
  { label: '테슬(TESL)전공'},
  { label: '미디어학부'},
];