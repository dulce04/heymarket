import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { Item, Category, Condition } from '../types';
import { categories, conditions } from '../utils/dummyData';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { ImagePickerComponent } from './common/ImagePicker';

interface AddProductFormProps {
  onSubmit: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt' | 'seller' | 'likes' | 'views'>) => void;
  onCancel: () => void;
}

const { width } = Dimensions.get('window');

export const AddProductForm: React.FC<AddProductFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    originalPrice: '',
    description: '',
    category: '' as Category,
    condition: '' as Condition,
    location: '',
    tags: '',
  });

  const [images, setImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | ''>('');
  const [selectedCondition, setSelectedCondition] = useState<Condition | ''>('');

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.price || !formData.description || !selectedCategory || !selectedCondition || !formData.location) {
      Alert.alert('입력 오류', '필수 항목을 모두 입력해주세요.');
      return;
    }

    if (images.length === 0) {
      Alert.alert('이미지 오류', '최소 1개의 이미지를 추가해주세요.');
      return;
    }

    const price = parseInt(formData.price.replace(/[^0-9]/g, ''));
    const originalPrice = formData.originalPrice ? parseInt(formData.originalPrice.replace(/[^0-9]/g, '')) : undefined;

    if (isNaN(price) || price <= 0) {
      Alert.alert('가격 오류', '올바른 가격을 입력해주세요.');
      return;
    }

    const tags = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

    onSubmit({
      title: formData.title,
      price,
      originalPrice,
      description: formData.description,
      images,
      category: selectedCategory,
      condition: selectedCondition,
      location: formData.location,
      isSold: false,
      isReserved: false,
      tags,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>새 상품 등록</Text>
      
      {/* 이미지 업로드 */}
      <View style={styles.imageSection}>
        <Text style={styles.sectionTitle}>상품 이미지 *</Text>
        <ImagePickerComponent
          images={images}
          onImagesChange={handleImagesChange}
          maxImages={5}
        />
        <Text style={styles.imageHint}>최대 5개까지 추가 가능</Text>
      </View>

      {/* 기본 정보 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>기본 정보</Text>
        
        <Input
          placeholder="상품명을 입력하세요 *"
          value={formData.title}
          onChangeText={(text: string) => setFormData({ ...formData, title: text })}
        />
        
        <View style={styles.row}>
          <Input
            style={styles.halfInput}
            placeholder="판매가 *"
            value={formData.price}
            onChangeText={(text: string) => setFormData({ ...formData, price: text })}
            keyboardType="numeric"
          />
          <Input
            style={styles.halfInput}
            placeholder="원래가 (선택)"
            value={formData.originalPrice}
            onChangeText={(text: string) => setFormData({ ...formData, originalPrice: text })}
            keyboardType="numeric"
          />
        </View>
      </View>

      {/* 카테고리 및 상태 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>카테고리 및 상태</Text>
        
        <Text style={styles.label}>카테고리 *</Text>
        <View style={styles.categoryGrid}>
          {categories.map((category: Category) => (
            <Button
              key={category}
              title={category}
              onPress={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              size="small"
              style={styles.categoryButton}
            />
          ))}
        </View>

        <Text style={styles.label}>상품 상태 *</Text>
        <View style={styles.conditionGrid}>
          {conditions.map((condition: Condition) => (
            <Button
              key={condition}
              title={condition}
              onPress={() => setSelectedCondition(condition)}
              variant={selectedCondition === condition ? 'primary' : 'outline'}
              size="small"
              style={styles.conditionButton}
            />
          ))}
        </View>
      </View>

      {/* 위치 및 태그 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>위치 및 태그</Text>
        
        <Input
          placeholder="거래 지역 (예: 서울 강남구) *"
          value={formData.location}
          onChangeText={(text: string) => setFormData({ ...formData, location: text })}
        />
        
        <Input
          placeholder="태그 (쉼표로 구분, 예: 카메라, 빈티지, 아날로그)"
          value={formData.tags}
          onChangeText={(text: string) => setFormData({ ...formData, tags: text })}
        />
      </View>

      {/* 상품 설명 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>상품 설명</Text>
        
        <Input
          style={styles.textArea}
          placeholder="상품에 대한 자세한 설명을 입력하세요 *"
          value={formData.description}
          onChangeText={(text: string) => setFormData({ ...formData, description: text })}
          multiline
          numberOfLines={6}
          textAlignVertical="top"
        />
      </View>

      {/* 버튼 */}
      <View style={styles.buttonContainer}>
        <Button
          title="취소"
          onPress={onCancel}
          variant="outline"
          style={styles.cancelButton}
        />
        <Button
          title="상품 등록"
          onPress={handleSubmit}
          variant="primary"
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginVertical: 20,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  imageSection: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },

  imageHint: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryButton: {
    marginBottom: 8,
  },
  conditionGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  conditionButton: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  cancelButton: {
    flex: 1,
  },
  submitButton: {
    flex: 1,
  },
});
