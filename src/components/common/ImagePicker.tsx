import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ViewStyle,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../utils/colors';
import { commonStyles } from '../../utils/styles';

interface ImagePickerProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
  style?: ViewStyle;
  aspect?: [number, number];
  quality?: number;
}

const { width } = Dimensions.get('window');

export const ImagePickerComponent: React.FC<ImagePickerProps> = ({
  images,
  onImagesChange,
  maxImages = 5,
  style,
  aspect = [1, 1],
  quality = 0.8,
}) => {
  // 갤러리 접근 권한 요청
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('갤러리 접근 권한이 필요합니다.');
      return false;
    }
    return true;
  };

  // 이미지 선택 처리
  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect,
      quality,
    });

    if (!result.canceled && result.assets[0]) {
      if (images.length < maxImages) {
        onImagesChange([...images, result.assets[0].uri]);
      } else {
        alert(`이미지는 최대 ${maxImages}개까지 추가할 수 있습니다.`);
      }
    }
  };

  // 이미지 제거 처리
  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <View style={[styles.container, style]}>
      {/* 이미지 그리드 */}
      <View style={styles.imageGrid}>
        {/* 기존 이미지들 */}
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            {/* 이미지 제거 버튼 */}
            <TouchableOpacity
              style={styles.removeImageButton}
              onPress={() => removeImage(index)}
            >
              <Text style={styles.removeImageText}>×</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        {/* 이미지 추가 버튼 */}
        {images.length < maxImages && (
          <TouchableOpacity style={styles.addImageButton} onPress={pickImage}>
            <Text style={styles.addImageText}>📷</Text>
            <Text style={styles.addImageLabel}>갤러리</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // 컨테이너 스타일
  container: {
    width: '100%',
  },
  
  // 이미지 그리드 스타일
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: commonStyles.gap.medium,
  },
  
  // 이미지 컨테이너 스타일
  imageContainer: {
    position: 'relative',
  },
  
  // 이미지 스타일
  image: {
    width: 80,
    height: 80,
    borderRadius: commonStyles.borderRadius.medium,
  },
  
  // 이미지 제거 버튼 스타일
  removeImageButton: {
    position: 'absolute',
    top: -commonStyles.margin.small,
    right: -commonStyles.margin.small,
    backgroundColor: colors.danger,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // 이미지 제거 버튼 텍스트 스타일
  removeImageText: {
    color: colors.text.inverse,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // 이미지 추가 버튼 스타일
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: commonStyles.borderRadius.medium,
    ...commonStyles.border.medium,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.tertiary,
  },
  
  // 이미지 추가 버튼 텍스트 스타일
  addImageText: {
    fontSize: 24,
    marginBottom: 4,
  },
  
  // 이미지 추가 버튼 라벨 스타일
  addImageLabel: {
    fontSize: 12,
    color: colors.text.tertiary,
  },
});
