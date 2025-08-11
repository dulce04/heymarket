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

export default function App() {
  const [items, setItems] = useState<Item[]>(dummyItems);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

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

  const deleteItem = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
    setShowDetail(false);
    setSelectedItem(null);
  };

  const updateItem = (itemId: string, updatedData: Partial<Item>) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, ...updatedData } : item
    ));
    setShowEdit(false);
    setShowDetail(false);
    setSelectedItem(null);
  };

  const handleItemPress = (item: Item) => {
    setSelectedItem(item);
    setShowDetail(true);
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setShowDetail(false);
    setShowEdit(true);  
  };

  const handleChat = (item: Item) => {
    setSelectedItem(item);
    setShowDetail(false);
    setShowEdit(false);
    setShowChat(true);
  };

  const handleBack = () => {
    setShowDetail(false);
    setShowEdit(false);
    setShowChat(false);
    setSelectedItem(null);
  };

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



  if (showAddForm) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <AddProductForm
          onSubmit={addItem}
          onCancel={() => setShowAddForm(false)}
        />
      </SafeAreaView>
    );
  }

  if (showDetail && selectedItem) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
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

  if (showEdit && selectedItem) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <EditProduct
          item={selectedItem}
          onSave={updateItem}
          onCancel={handleBack}
        />
      </SafeAreaView>
    );
  }

  if (showChat && selectedItem) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <ChatScreen
          item={selectedItem}
          onBack={handleBack}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>헤이마켓</Text>
        <Text style={styles.headerSubtitle}>당신 근처의 중고마켓</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Button
          title="상품 등록"
          onPress={() => setShowAddForm(true)}
          variant="primary"
          size="large"
          style={styles.addButton}
        />
      </View>

      {/* Product List */}
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
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff6b35',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  addButton: {
    flex: 1,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },

  filterButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  filterButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  productList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#6b7280',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
});
