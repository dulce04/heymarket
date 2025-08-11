export interface User {
  id: string;
  name: string;
  avatar?: string;
  location: string;
  rating: number;
  joinDate: Date;
}

export interface Item {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  category: Category;
  condition: Condition;
  location: string;
  seller: User;
  createdAt: Date;
  updatedAt: Date;
  likes: number;
  views: number;
  isSold: boolean;
  isReserved: boolean;
  tags: string[];
}

export type Category = 
  | '전자기기' 
  | '가구' 
  | '의류' 
  | '도서' 
  | '스포츠' 
  | '뷰티' 
  | '유아용품' 
  | '자동차용품' 
  | '취미' 
  | '음악'
  | '기타';

export type Condition = 
  | '새상품' 
  | '거의새것' 
  | '사용감있음' 
  | '사용감많음';

export interface ChatRoom {
  id: string;
  itemId: string;
  buyer: User;
  seller: User;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
}

export interface Message {
  id: string;
  chatRoomId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface FilterOptions {
  category?: Category;
  priceRange?: {
    min: number;
    max: number;
  };
  condition?: Condition;
  location?: string;
  sortBy?: 'latest' | 'price_low' | 'price_high' | 'popular';
}
