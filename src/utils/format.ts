export const formatPrice = (price: number): string => {
  if (price >= 10000) {
    const man = Math.floor(price / 10000);
    const rest = price % 10000;
    if (rest === 0) {
      return `${man}만원`;
    }
    return `${man}만 ${rest.toLocaleString()}원`;
  }
  return `${price.toLocaleString()}원`;
};

export const formatDate = (date: Date): string => {
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return '어제';
  } else if (diffDays <= 7) {
    return `${diffDays}일 전`;
  } else if (diffDays <= 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks}주 전`;
  } else {
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric',
    });
  }
};

export const formatLocation = (location: string): string => {
  const parts = location.split(' ');
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[1]}`;
  }
  return location;
};

export const formatCondition = (condition: string): string => {
  const conditionMap: Record<string, string> = {
    '새상품': '새상품',
    '거의새것': '거의새것',
    '사용감있음': '사용감있음',
    '사용감많음': '사용감많음',
  };
  return conditionMap[condition] || condition;
};
