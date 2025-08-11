import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { Item } from '../types';
import { formatPrice, formatDate, formatLocation } from '../utils/format';
import { Button } from './common/Button';

interface ProductDetailProps {
  item: Item;
  onBack: () => void;
  onEdit: (item: Item) => void;
  onDelete: (itemId: string) => void;
  onLike: (itemId: string) => void;
  onChat: (item: Item) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  item,
  onBack,
  onEdit,
  onDelete,
  onLike,
  onChat,
}) => {
  const handleDelete = () => {
    Alert.alert(
      '상품 삭제',
      '정말로 이 상품을 삭제하시겠습니까?',
      [
        { text: '취소', style: 'cancel' },
        { text: '삭제', style: 'destructive', onPress: () => onDelete(item.id) },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* 헤더 섹션 */}
      <View style={styles.header}>
        <Button
          title="← 뒤로"
          onPress={onBack}
          variant="outline"
          size="small"
          style={styles.backButton}
        />
        <View style={styles.headerActions}>
          <Button
            title="수정"
            onPress={() => onEdit(item)}
            variant="secondary"
            size="small"
            style={styles.editButton}
          />
          <Button
            title="삭제"
            onPress={handleDelete}
            variant="danger"
            size="small"
            style={styles.deleteButton}
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* 이미지 갤러리 */}
        <View style={styles.imageContainer}>
          {item.images && item.images.length > 0 ? (
            <Image
              source={{ uri: item.images[0] }}
              style={styles.mainImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.noImage}>
              <Text style={styles.noImageText}>이미지 없음</Text>
            </View>
          )}
        </View>

        {/* 상품 정보 */}
        <View style={styles.productInfo}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
          
          <View style={styles.metaInfo}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>상태</Text>
              <Text style={styles.metaValue}>{item.condition}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>카테고리</Text>
              <Text style={styles.metaValue}>{item.category}</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>위치</Text>
              <Text style={styles.metaValue}>{formatLocation(item.location)}</Text>
            </View>
          </View>

          <Text style={styles.description}>{item.description}</Text>
        </View>

        {/* 판매자 정보 */}
        <View style={styles.sellerInfo}>
          <Text style={styles.sellerTitle}>판매자 정보</Text>
          <View style={styles.sellerDetails}>
            <Text style={styles.sellerName}>{item.seller.name}</Text>
            <Text style={styles.sellerLocation}>{formatLocation(item.seller.location)}</Text>
          </View>
        </View>

        {/* 통계 정보 */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.views}</Text>
            <Text style={styles.statLabel}>조회수</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.likes}</Text>
            <Text style={styles.statLabel}>좋아요</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatDate(item.createdAt)}</Text>
            <Text style={styles.statLabel}>등록일</Text>
          </View>
        </View>
      </ScrollView>

      {/* 액션 버튼 */}
      <View style={styles.actionContainer}>
        <Button
          title="❤️ 좋아요"
          onPress={() => onLike(item.id)}
          variant="outline"
          size="large"
          style={styles.likeButton}
        />
        <Button
          title="💬 채팅하기"
          onPress={() => onChat(item)}
          variant="primary"
          size="large"
          style={styles.chatButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  editButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
  imageContainer: {
    height: 300,
    backgroundColor: '#fff',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  noImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  noImageText: {
    color: '#9ca3af',
    fontSize: 16,
  },
  productInfo: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6b35',
    marginBottom: 20,
  },
  metaInfo: {
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  metaValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
  },
  sellerInfo: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
  },
  sellerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  sellerDetails: {
    gap: 4,
  },
  sellerName: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  sellerLocation: {
    fontSize: 14,
    color: '#6b7280',
  },
  stats: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  likeButton: {
    flex: 1,
  },
  chatButton: {
    flex: 2,
  },
});
