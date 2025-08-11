import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Item } from '../types';
import { formatPrice, formatDate, formatLocation } from '../utils/format';

interface ProductCardProps {
  item: Item;
  onPress: (item: Item) => void;
  onLike: (itemId: string) => void;
  isLiked?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  item, 
  onPress, 
  onLike,
  isLiked = false
}) => {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => onPress(item)}
      activeOpacity={0.8}
    >
      {/* 이미지 컨테이너 */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.images[0] }} 
          style={styles.image}
          resizeMode="cover"
        />
        
        {/* 판매 완료 오버레이 */}
        {item.isSold && (
          <View style={styles.soldOverlay}>
            <Text style={styles.soldText}>판매완료</Text>
          </View>
        )}
        
        {/* 예약중 오버레이 */}
        {item.isReserved && !item.isSold && (
          <View style={styles.reservedOverlay}>
            <Text style={styles.reservedText}>예약중</Text>
          </View>
        )}
        
        {/* 좋아요 버튼 */}
        <TouchableOpacity 
          style={[styles.likeButton]}
          onPress={() => onLike(item.id)}
        >
          <Text style={[
            styles.likeIcon,
            isLiked && styles.likeIconActive
          ]}>
            {isLiked ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* 상품 정보 컨테이너 */}
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        
        {/* 가격 정보 */}
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          {item.originalPrice && (
            <Text style={styles.originalPrice}>
              {formatPrice(item.originalPrice)}
            </Text>
          )}
        </View>
        
        {/* 메타 정보 */}
        <View style={styles.metaContainer}>
          <Text style={styles.location}>{formatLocation(item.location)}</Text>
          <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
        </View>
        
        {/* 통계 정보 */}
        <View style={styles.statsContainer}>
          <Text style={styles.views}>조회 {item.views}</Text>
          <Text style={styles.likes}>관심 {item.likes}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  soldOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  soldText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reservedOverlay: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#f59e0b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reservedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  likeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  likeIcon: {
    color: '#9ca3af',
    fontSize: 16,
  },
  likeIconActive: {
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    lineHeight: 22,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f97316',
    marginRight: 8,
  },
  originalPrice: {
    fontSize: 14,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 12,
    color: '#6b7280',
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
  },
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  views: {
    fontSize: 12,
    color: '#9ca3af',
    marginRight: 12,
  },
  likes: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
