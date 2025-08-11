import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Item } from '../types';
import { categories, conditions } from '../utils/dummyData';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { ImagePickerComponent } from './common/ImagePicker';

interface EditProductProps {
  item: Item;
  onSave: (itemId: string, updatedData: Partial<Item>) => void;
  onCancel: () => void;
}

export const EditProduct: React.FC<EditProductProps> = ({
  item,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price.toString());
  const [category, setCategory] = useState(item.category);
  const [condition, setCondition] = useState(item.condition);
  const [location, setLocation] = useState(item.location);
  const [images, setImages] = useState<string[]>(item.images || []);

  const handleImagesChange = (newImages: string[]) => {
    setImages(newImages);
  };

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('오류', '상품명을 입력해주세요.');
      return;
    }

    if (!description.trim()) {
      Alert.alert('오류', '상품 설명을 입력해주세요.');
      return;
    }

    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      Alert.alert('오류', '올바른 가격을 입력해주세요.');
      return;
    }

    const updatedData: Partial<Item> = {
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      condition,
      location: location.trim(),
      images,
      updatedAt: new Date(),
    };

    onSave(item.id, updatedData);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
                   {/* Header */}
             <View style={styles.header}>
               <Button
                 title="취소"
                 onPress={onCancel}
                 variant="outline"
                 size="small"
                 style={styles.cancelButton}
               />
               <Text style={styles.headerTitle}>상품 수정</Text>
               <Button
                 title="저장"
                 onPress={handleSave}
                 variant="primary"
                 size="small"
                 style={styles.saveButton}
               />
             </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>상품 이미지</Text>
          <ImagePickerComponent
            images={images}
            onImagesChange={handleImagesChange}
            maxImages={5}
          />
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>기본 정보</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>상품명 *</Text>
            <Input
              value={title}
              onChangeText={setTitle}
              placeholder="상품명을 입력하세요"
              maxLength={100}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>상품 설명 *</Text>
            <Input
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="상품에 대한 자세한 설명을 입력하세요"
              multiline
              numberOfLines={4}
              maxLength={1000}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>가격 *</Text>
            <Input
              value={price}
              onChangeText={setPrice}
              placeholder="가격을 입력하세요"
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Category & Condition */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>카테고리 및 상태</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>카테고리</Text>
            <View style={styles.pickerContainer}>
              {categories.map((cat) => (
                <Button
                  key={cat}
                  title={cat}
                  onPress={() => setCategory(cat)}
                  variant={category === cat ? 'primary' : 'outline'}
                  size="small"
                />
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>상품 상태</Text>
            <View style={styles.pickerContainer}>
              {conditions.map((cond) => (
                <Button
                  key={cond}
                  title={cond}
                  onPress={() => setCondition(cond)}
                  variant={condition === cond ? 'primary' : 'outline'}
                  size="small"
                />
              ))}
            </View>
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>위치</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>거래 희망 지역</Text>
            <Input
              value={location}
              onChangeText={setLocation}
              placeholder="거래 희망 지역을 입력하세요"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  cancelButton: {
    padding: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#6b7280',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  saveButton: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
  },
  pickerOptionSelected: {
    backgroundColor: '#ff6b35',
    borderColor: '#ff6b35',
  },
  pickerOptionText: {
    fontSize: 14,
    color: '#374151',
  },
  pickerOptionTextSelected: {
    color: '#fff',
  },
  imageSection: {
    backgroundColor: '#fff',
    marginBottom: 12,
    padding: 20,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ef4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeImageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addImageContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  addImageText: {
    fontSize: 24,
    marginBottom: 4,
  },
  addImageLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
});
