import { Item, User, Category, Condition } from '../types';

export const dummyUser: User = {
  id: '1',
  name: '김철수',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
  location: '서울 강남구',
  rating: 4.8,
  joinDate: new Date('2023-01-15'),
};

export const dummyItems: Item[] = [
  {
    id: '1',
    title: '빈티지 카메라 - Canon AE-1',
    price: 150000,
    originalPrice: 200000,
    description: '1960년대 제작된 아날로그 카메라입니다. 상태 매우 양호하고 렌즈도 깨끗합니다. 필름 사진의 아날로그 감성을 느껴보세요.',
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    ],
    category: '전자기기',
    condition: '사용감있음',
    location: '서울 강남구',
    seller: dummyUser,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
    likes: 23,
    views: 156,
    isSold: false,
    isReserved: false,
    tags: ['카메라', '빈티지', '아날로그', '필름'],
  },
  {
    id: '2',
    title: '디자인 의자 - Herman Miller Aeron',
    price: 800000,
    originalPrice: 1200000,
    description: '모던한 디자인의 책상 의자입니다. 편안하고 세련된 느낌입니다. 장시간 앉아도 편안합니다.',
    images: [
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=400&h=400&fit=crop',
    ],
    category: '가구',
    condition: '거의새것',
    location: '서울 서초구',
    seller: dummyUser,
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14'),
    likes: 45,
    views: 234,
    isSold: false,
    isReserved: false,
    tags: ['의자', '디자인', '오피스', '편안함'],
  },
  {
    id: '3',
    title: '나이키 에어맥스 90',
    price: 120000,
    originalPrice: 180000,
    description: '클래식한 디자인의 운동화입니다. 착용감이 좋고 스타일리시합니다.',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    ],
    category: '의류',
    condition: '사용감있음',
    location: '서울 마포구',
    seller: dummyUser,
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13'),
    likes: 67,
    views: 345,
    isSold: false,
    isReserved: true,
    tags: ['운동화', '나이키', '에어맥스', '클래식'],
  },
  {
    id: '4',
    title: '아이패드 프로 12.9인치',
    price: 1200000,
    originalPrice: 1500000,
    description: '2022년 모델 아이패드 프로입니다. 펜슬과 키보드 포함되어 있습니다. 상태 매우 양호합니다.',
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    ],
    category: '전자기기',
    condition: '거의새것',
    location: '서울 송파구',
    seller: dummyUser,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
    likes: 89,
    views: 567,
    isSold: false,
    isReserved: false,
    tags: ['아이패드', '프로', '애플', '태블릿'],
  },
  {
    id: '5',
    title: '빈티지 LP 레코드 플레이어',
    price: 250000,
    description: '1960년대 빈티지 레코드 플레이어입니다. 아날로그 사운드의 진수를 느껴보세요.',
    images: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
    ],
    category: '음악',
    condition: '사용감많음',
    location: '서울 종로구',
    seller: dummyUser,
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-11'),
    likes: 34,
    views: 123,
    isSold: false,
    isReserved: false,
    tags: ['레코드', '빈티지', '아날로그', '음악'],
  },
];

export const categories: Category[] = [
  '전자기기', '가구', '의류', '도서', '스포츠', '뷰티', '유아용품', '자동차용품', '취미', '음악', '기타'
];

export const conditions: Condition[] = [
  '새상품', '거의새것', '사용감있음', '사용감많음'
];
