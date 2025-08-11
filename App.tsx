import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { ProductCard } from './src/components/ProductCard';
import { AddProductForm } from './src/components/AddProductForm';
import { ProductDetail } from './src/components/ProductDetail';
import { EditProduct } from './src/components/EditProduct';
import { ChatScreen } from './src/components/ChatScreen';
import { Button } from './src/components/common/Button';
import { Item } from './src/types';
import { dummyItems, dummyUser } from './src/utils/dummyData';
import { colors } from './src/utils/colors';
import { commonStyles } from './src/utils/styles';

export default function App() {
  const [items, setItems] = useState<Item[]>(dummyItems);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  // 새 상품 추가 처리
  const addItem = (itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt' | 'seller' | 'likes' | 'views'>) => {
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: dummyUser,
      likes: 0,
      views: 0,
    };
    setItems([newItem, ...items]);
    setShowAddForm(false);
  };

  // 상품 삭제 처리
  const deleteItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
    setShowDetail(false);
    setSelectedItem(null);
  };

  // 상품 수정 처리
  const updateItem = (itemId: string, updatedData: Partial<Item>) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, ...updatedData } : item
    ));
    setShowEdit(false);
    setShowDetail(false);
    setSelectedItem(null);
  };

  // 상품 선택 처리
  const handleItemPress = (item: Item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  // 상품 수정 화면 표시
  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setShowDetail(false);
    setShowEdit(true);  
  };

  // 채팅 화면 표시
  const handleChat = (item: Item) => {
    setSelectedItem(item);
    setShowDetail(false);
    setShowEdit(false);
    setShowChat(true);
  };

  // 뒤로가기 처리
  const handleBack = () => {
    setShowDetail(false);
    setShowEdit(false);
    setShowChat(false);
    setSelectedItem(null);
  };

  // 좋아요 토글 처리
  const toggleLike = (itemId: string) => {
    const newLikedItems = new Set(likedItems);
    if (newLikedItems.has(itemId)) {
      newLikedItems.delete(itemId);
      setItems(items.map(item => 
        item.id === itemId ? { ...item, likes: Math.max(0, item.likes - 1) } : item
      ));
    } else {
      newLikedItems.add(itemId);
      setItems(items.map(item => 
        item.id === itemId ? { ...item, likes: item.likes + 1 } : item
      ));
    }
    setLikedItems(newLikedItems);
  };

  // 상품 등록 폼 화면
  if (showAddForm) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background.primary} />
        <AddProductForm
          onSubmit={addItem}
          onCancel={() => setShowAddForm(false)}
        />
      </SafeAreaView>
    );
  }

  // 상품 상세 화면
  if (showDetail && selectedItem) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background.primary} />
        <ProductDetail
          item={selectedItem}
          onBack={handleBack}
          onEdit={handleEdit}
          onDelete={deleteItem}
          onLike={toggleLike}
          onChat={handleChat}
        />
      </SafeAreaView>
    );
  }

  // 상품 수정 화면
  if (showEdit && selectedItem) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background.primary} />
        <EditProduct
          item={selectedItem}
          onSave={updateItem}
          onCancel={handleBack}
        />
      </SafeAreaView>
    );
  }

  // 채팅 화면
  if (showChat && selectedItem) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background.primary} />
        <ChatScreen
          item={selectedItem}
          onBack={handleBack}
        />
      </SafeAreaView>
    );
  }

  // 메인 화면
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background.primary} />
      
      {/* 헤더 섹션 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>헤이마켓</Text>
        <Text style={styles.headerSubtitle}>당신 근처의 중고마켓</Text>
      </View>

      {/* 액션 버튼 섹션 */}
      <View style={styles.actionContainer}>
        <Button
          title="상품 등록"
          onPress={() => setShowAddForm(true)}
          variant="primary"
          size="large"
          style={styles.addButton}
        />
      </View>

      {/* 상품 목록 섹션 */}
      <ScrollView style={styles.productList} showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>등록된 상품이 없습니다</Text>
            <Text style={styles.emptyStateSubtext}>첫 번째 상품을 등록해보세요!</Text>
          </View>
        ) : (
          items.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              onPress={handleItemPress}
              onLike={toggleLike}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    backgroundColor: colors.background.primary,
    paddingTop: commonStyles.padding.medium,
    paddingBottom: commonStyles.padding.medium,
    paddingHorizontal: commonStyles.padding.large,
    ...commonStyles.border.light,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.text.tertiary,
    textAlign: 'center',
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: commonStyles.padding.large,
    gap: commonStyles.gap.medium,
  },
  addButton: {
    flex: 1,
    ...commonStyles.shadow.primary,
  },
  productList: {
    flex: 1,
    paddingHorizontal: commonStyles.padding.large,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: colors.text.tertiary,
    marginBottom: commonStyles.margin.small,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: colors.text.disabled,
  },
});
