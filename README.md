# 🛍️ Heymarket - 중고거래 플랫폼

![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue)
![Expo](https://img.shields.io/badge/Expo-53.0.20-000000)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6)
![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android%20%7C%20Web-9CF)

## 📱 프로젝트 소개

Heymarket는 React Native와 Expo를 기반으로 개발된 중고거래 모바일 애플리케이션입니다. 사용자들이 쉽게 상품을 등록하고, 검색하고, 거래할 수 있는 직관적인 인터페이스를 제공합니다.

## ✨ 주요 기능

### 🏷️ 상품 관리
- **상품 등록**: 이미지, 제목, 설명, 가격, 카테고리, 상태, 위치 정보 입력
- **상품 수정**: 기존 상품 정보 업데이트
- **상품 삭제**: 등록된 상품 제거
- **이미지 관리**: 최대 5장까지 상품 이미지 업로드 및 관리

### 🗂️ 카테고리 시스템
- **다양한 카테고리**: 가구, 의류, 도서, 스포츠, 뷰티, 유아용품, 자동차용품, 취미, 음악, 기타
- **상품 상태**: 새상품, 거의새것, 사용감많음

### 💬 채팅 시스템
- **실시간 채팅**: 판매자와 구매자 간 1:1 채팅
- **메시지 히스토리**: 대화 내용 저장 및 확인

### 🔍 상품 검색 및 탐색
- **상품 목록**: 등록된 모든 상품을 카드 형태로 표시
- **상품 상세**: 상품의 자세한 정보 및 이미지 확인
- **좋아요 기능**: 관심 상품에 대한 좋아요 표시

## 🛠️ 기술 스택

### Frontend
- **React Native 0.79.5**: 크로스 플랫폼 모바일 앱 개발
- **Expo 53.0.20**: React Native 개발 환경 및 도구
- **TypeScript 5.8.3**: 타입 안전성과 개발 생산성 향상

### UI/UX
- **React Native Components**: 기본 UI 컴포넌트
- **Custom Components**: 재사용 가능한 공통 컴포넌트
  - `Button`: 다양한 스타일과 크기의 버튼
  - `Input`: 텍스트 입력 필드
  - `ImagePicker`: 이미지 선택 및 업로드

### 상태 관리
- **React Hooks**: `useState`, `useEffect`를 활용한 컴포넌트 상태 관리

### 이미지 처리
- **expo-image-picker**: 카메라 및 갤러리에서 이미지 선택

## 📁 프로젝트 구조

```
Heymarket/
├── src/
│   ├── components/
│   │   ├── common/           # 재사용 가능한 공통 컴포넌트
│   │   │   ├── Button.tsx    # 버튼 컴포넌트
│   │   │   ├── Input.tsx     # 입력 필드 컴포넌트
│   │   │   └── ImagePicker.tsx # 이미지 선택 컴포넌트
│   │   ├── AddProductForm.tsx # 상품 등록 폼
│   │   ├── ChatScreen.tsx    # 채팅 화면
│   │   ├── EditProduct.tsx   # 상품 수정 화면
│   │   ├── ProductCard.tsx   # 상품 카드 컴포넌트
│   │   └── ProductDetail.tsx # 상품 상세 화면
│   ├── types/
│   │   └── index.ts          # TypeScript 타입 정의
│   └── utils/
│       └── dummyData.ts      # 더미 데이터
├── assets/                    # 이미지 및 아이콘
├── App.tsx                   # 메인 앱 컴포넌트
└── package.json              # 프로젝트 의존성
```

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn
- Expo CLI
- iOS Simulator (macOS) 또는 Android Emulator

### 설치 방법

1. **저장소 클론**
```bash
git clone [repository-url]
cd Heymarket
```

2. **의존성 설치**
```bash
npm install
```

3. **개발 서버 실행**
```bash
# iOS 시뮬레이터
npm run ios

# Android 에뮬레이터
npm run android

# 웹 브라우저
npm run web

# Expo 개발 서버
npm start
```

## 📱 사용 방법

### 상품 등록
1. 메인 화면에서 "상품 등록" 버튼 클릭
2. 상품 이미지 업로드 (최대 5장)
3. 상품명, 설명, 가격 입력
4. 카테고리 및 상품 상태 선택
5. 거래 희망 지역 입력
6. "저장" 버튼으로 등록 완료

### 상품 검색 및 구매
1. 메인 화면에서 관심 있는 상품 카드 클릭
2. 상품 상세 정보 확인
3. "💬 채팅하기" 버튼으로 판매자와 연락
4. "❤️ 좋아요" 버튼으로 관심 상품 표시

### 채팅
1. 상품 상세 화면에서 "💬 채팅하기" 클릭
2. 채팅 화면에서 메시지 입력 및 전송
3. 실시간으로 대화 내용 확인

## 🔧 개발 가이드

### 새로운 컴포넌트 추가
```typescript
// src/components/NewComponent.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface NewComponentProps {
  title: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
```

### 공통 컴포넌트 사용
```typescript
import { Button, Input, ImagePickerComponent } from './common';

// 버튼 사용
<Button 
  title="클릭하세요" 
  onPress={() => {}} 
  variant="primary" 
  size="medium" 
/>

// 입력 필드 사용
<Input 
  value={text} 
  onChangeText={setText} 
  placeholder="텍스트를 입력하세요" 
/>

// 이미지 선택기 사용
<ImagePickerComponent 
  images={images} 
  onImagesChange={setImages} 
  maxImages={5} 
/>
```

## 🎨 UI/UX 특징

### 디자인 시스템
- **색상**: 주황색(#ff6b35)을 메인 컬러로 사용
- **타이포그래피**: 가독성 높은 폰트 크기와 굵기
- **간격**: 일관된 패딩과 마진으로 깔끔한 레이아웃
- **그림자**: 카드와 버튼에 적절한 그림자 효과

### 반응형 디자인
- 다양한 화면 크기에 대응
- 터치 친화적인 버튼 크기
- 스크롤 가능한 긴 콘텐츠

## 📊 성능 최적화

- **이미지 최적화**: 적절한 이미지 크기와 압축
- **컴포넌트 분리**: 재사용 가능한 컴포넌트로 코드 중복 최소화
- **메모리 관리**: 이미지 업로드 시 메모리 효율적 처리

## 🚀 배포

### 웹 버전 빌드
```bash
npx expo export --platform web
```

### Vercel 배포 (포트폴리오용)
```bash
npm install -g vercel
vercel
```

## 🤝 기여 방법

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 👨‍💻 개발자

- **개발자**: [Your Name]
- **이메일**: [your.email@example.com]
- **GitHub**: [@yourusername]

## 🙏 감사의 말

- React Native 커뮤니티
- Expo 팀
- 모든 기여자들

---

⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!
