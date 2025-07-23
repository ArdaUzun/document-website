---
title: 'Veri Modelleri'
author: 'arda'
---

## Genel Bakış

Ürün Sağlık Tarayıcısı uygulaması, sistemdeki temel varlıkları temsil etmek için iyi tanımlanmış bir dizi veri modeli kullanır. Bu modeller, hem veri yapısı hem de iş mantığı sağlayan TypeScript sınıfları olarak uygulanmıştır.

## Model Yapısı

```
src/
├── models/
│   ├── HealthAnalysis.ts
│   ├── ProductInfo.ts
│   ├── UserProfile.ts
│   └── index.ts
```

## ProductInfoModel

`ProductInfoModel`, tüm ilgili bilgileriyle birlikte bir gıda ürününü temsil eder.

### Özellikler

```typescript
class ProductInfoModel {
  id: string;
  name: string;
  brand: string;
  barcode?: string;
  ingredients: string[];
  nutritionFacts: NutritionInfo;
  imageUrl?: string;
  lastUpdated: Date;
  dataSource: 'barcode' | 'image' | 'search';
  confidence: number;
}
```

### Yöntemler

- `isValid(): boolean` - Ürünün temel bilgilere sahip olup olmadığını kontrol eder
- `hasNutritionInfo(): boolean` - Besin bilgilerinin mevcut olup olmadığını belirler
- `getConfidenceLevel(): 'low' | 'medium' | 'high'` - İnsan tarafından okunabilir bir güven seviyesi döndürür

### İlgili Türler

```typescript
interface NutritionInfo {
  servingSize: string;
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrates: number;
  dietaryFiber: number;
  totalSugars: number;
  addedSugars: number;
  protein: number;
}
```

## UserProfileModel

`UserProfileModel`, alerjiler, diyet kısıtlamaları ve sağlık durumları dahil olmak üzere bir kullanıcının sağlık profilini temsil eder.

### Özellikler

```typescript
class UserProfileModel {
  id: string;
  allergies: Allergy[];
  dietaryRestrictions: DietaryRestriction[];
  healthConditions: HealthCondition[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}
```

### Yöntemler

- `addAllergy(allergy: Allergy): void` - Bir alerji ekler veya günceller
- `removeAllergy(allergyId: string): void` - Bir alerjiyi ID'sine göre kaldırır
- `addDietaryRestriction(restriction: DietaryRestriction): void` - Bir diyet kısıtlaması ekler veya günceller
- `removeDietaryRestriction(restrictionId: string): void` - Bir diyet kısıtlamasını ID'sine göre kaldırır
- `addHealthCondition(condition: HealthCondition): void` - Bir sağlık durumu ekler veya günceller
- `removeHealthCondition(conditionId: string): void` - Bir sağlık durumunu ID'sine göre kaldırır
- `updatePreferences(preferences: Partial<UserPreferences>): void` - Kullanıcı tercihlerini günceller
- `hasAllergies(): boolean` - Kullanıcının herhangi bir alerjisi olup olmadığını kontrol eder
- `hasDietaryRestrictions(): boolean` - Kullanıcının herhangi bir diyet kısıtlaması olup olmadığını kontrol eder
- `hasHealthConditions(): boolean` - Kullanıcının herhangi bir sağlık durumu olup olmadığını kontrol eder
- `getSevereAllergies(): Allergy[]` - Sadece ciddi alerjileri döndürür

### İlgili Türler

```typescript
interface Allergy {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe' | 'life-threatening';
  triggers: string[];
}

interface DietaryRestriction {
  id: string;
  name: string;
  type: string;
}

interface HealthCondition {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  type: string;
}

interface UserPreferences {
  language: string;
  units: 'metric' | 'imperial';
  notificationSettings: {
    healthWarnings: boolean;
    newRecommendations: boolean;
    productUpdates: boolean;
  };
  privacySettings: {
    shareAnalytics: boolean;
    shareHealthData: boolean;
    allowPersonalization: boolean;
  };
}
```

## HealthAnalysisModel

`HealthAnalysisModel`, bir ürünün içeriklerinin bir kullanıcının sağlık profiline göre analiz edilmesi sonuçlarını temsil eder.

### Özellikler

```typescript
class HealthAnalysisModel {
  productId: string;
  overallSafety: 'safe' | 'caution' | 'warning' | 'danger';
  warnings: HealthWarning[];
  benefits: BeneficialIngredient[];
  recommendations: string[];
  confidence: number;
  analysisDate: Date;
  citations: Citation[];
}
```

### Yöntemler

- `hasWarnings(): boolean` - Herhangi bir uyarı olup olmadığını kontrol eder
- `hasBenefits(): boolean` - Herhangi bir faydalı içerik olup olmadığını kontrol eder
- `getCriticalWarnings(): HealthWarning[]` - Kritik önem derecesindeki uyarıları döndürür
- `getHighWarnings(): HealthWarning[]` - Yüksek önem derecesindeki uyarıları döndürür
- `getMediumWarnings(): HealthWarning[]` - Orta önem derecesindeki uyarıları döndürür
- `getLowWarnings(): HealthWarning[]` - Düşük önem derecesindeki uyarıları döndürür
- `getWarningsByCondition(condition: string): HealthWarning[]` - Belirli bir durumla ilgili uyarıları döndürür
- `getBenefitsByCondition(condition: string): BeneficialIngredient[]` - Belirli bir durumla ilgili faydaları döndürür
- `getOverallRiskLevel(): number` - Ağırlıklı bir risk puanı hesaplar
- `isRecommendedForUser(): boolean` - Ürünün önerilip önerilmediğini belirler
- `getSummary(): string` - İnsan tarafından okunabilir bir özet sağlar
- `addWarning(warning: HealthWarning): void` - Analize bir uyarı ekler
- `addBenefit(benefit: BeneficialIngredient): void` - Analize bir fayda ekler
- `addRecommendation(recommendation: string): void` - Bir öneri ekler

### İlgili Türler

```typescript
interface HealthWarning {
  ingredient: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reason: string;
  affectedConditions: string[];
  recommendation: string;
  sources: Citation[];
}

interface BeneficialIngredient {
  ingredient: string;
  benefits: string[];
  relevantConditions: string[];
  sources: Citation[];
}

interface Citation {
  id: string;
  title: string;
  source: string;
  credibilityScore: number;
}
```

## Model Doğrulama

Tüm modeller, veri bütünlüğünü sağlamak için doğrulama mantığı içerir:
- Gerekli alanlar örneklenme sırasında kontrol edilir
- Veri türleri TypeScript aracılığıyla uygulanır
- İş mantığı doğrulaması model yöntemlerinde uygulanır

## Gelecek Geliştirmeler

Veri modelleri için planlanan geliştirmeler şunlardır:

1. **Ek Doğrulama**:
   - Daha kapsamlı doğrulama kuralları
   - Joi veya Yup gibi doğrulama kütüphaneleriyle entegrasyon

2. **Veri Kalıcılığı**:
   - Daha iyi serileştirme/deserileştirme yöntemleri
   - ORM kütüphaneleriyle entegrasyon

3. **Geliştirilmiş İş Mantığı**:
   - Daha sofistike analiz yöntemleri
   - Kalıp tanıma için makine öğrenimi entegrasyonu

4. **Genişletilebilirlik**:
   - Özel model uzantıları için eklenti sistemi
   - Özel modeller için daha iyi kalıtım kalıpları