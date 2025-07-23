---
title: 'API Referansı'
author: 'arda'
---

## Genel Bakış

Bu belge, Ürün Sağlık Tarayıcısı uygulamasındaki tüm servisler, modeller ve bileşenler için detaylı API dokümantasyonu sağlar. Her bölüm arayüz tanımlarını, yöntem imzalarını ve kullanım örneklerini içerir.

## Veri Modelleri

### ProductInfo

```typescript
interface ProductInfo {
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

### UserProfile

```typescript
interface UserProfile {
  id: string;
  allergies: Allergy[];
  dietaryRestrictions: DietaryRestriction[];
  healthConditions: HealthCondition[];
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

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

### HealthAnalysis

```typescript
interface HealthAnalysis {
  productId: string;
  overallSafety: 'safe' | 'caution' | 'warning' | 'danger';
  warnings: HealthWarning[];
  benefits: BeneficialIngredient[];
  recommendations: string[];
  confidence: number;
  analysisDate: Date;
  citations: Citation[];
}

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

## Servisler

### ProductIdentificationService

```typescript
interface IProductIdentificationService {
  identifyByBarcode(barcode: string): Promise<ProductInfo | null>;
  identifyByImage(imageData: Buffer): Promise<ProductInfo | null>;
  identifyBySearch(searchQuery: string): Promise<ProductInfo[] | null>;
}
```

#### identifyByBarcode

Open Food Facts veritabanını sorgulayarak bir ürünü barkodu kullanarak tanımlar.

**Parametreler:**
- `barcode` (string): Ürün barkodu

**Dönüş Değeri:**
- `Promise<ProductInfo | null>`: Ürün bilgisi veya bulunamazsa null

**Örnek:**
```typescript
const product = await productIdentificationService.identifyByBarcode('0049000006587');
```

#### identifyByImage

Bir ürünü görüntü kullanarak tanımlar (kavramsal uygulama).

**Parametreler:**
- `imageData` (Buffer): Görüntü verisi

**Dönüş Değeri:**
- `Promise<ProductInfo | null>`: Ürün bilgisi veya null

#### identifyBySearch

Metin sorgusuyla ürünleri arar (kavramsal uygulama).

**Parametreler:**
- `searchQuery` (string): Arama sorgusu

**Dönüş Değeri:**
- `Promise<ProductInfo[] | null>`: Eşleşen ürünler dizisi veya null

### HealthAnalysisService

```typescript
interface IHealthAnalysisService {
  analyzeIngredients(ingredients: string[], userProfile: UserProfile): Promise<HealthAnalysis | null>;
  generateWarnings(ingredients: string[], userProfile: UserProfile): Promise<HealthWarning[]>;
  findBeneficialIngredients(ingredients: string[], userProfile: UserProfile): Promise<BeneficialIngredient[]>;
  getCitations(ingredient: string, healthClaim: string): Promise<Citation[]>;
}
```

#### analyzeIngredients

AI kullanarak ürün içeriklerini bir kullanıcının sağlık profiline göre analiz eder.

**Parametreler:**
- `ingredients` (string[]): Ürün içerikleri dizisi
- `userProfile` (UserProfile): Kullanıcının sağlık profili

**Dönüş Değeri:**
- `Promise<HealthAnalysis | null>`: Sağlık analiz sonuçları veya analiz başarısız olursa null

**Örnek:**
```typescript
const analysis = await healthAnalysisService.analyzeIngredients(
  ['water', 'sugar', 'salt'], 
  userProfile
);
```

#### generateWarnings

Kullanıcı profiline göre içerikler için sağlık uyarıları oluşturur.

**Parametreler:**
- `ingredients` (string[]): Ürün içerikleri dizisi
- `userProfile` (UserProfile): Kullanıcının sağlık profili

**Dönüş Değeri:**
- `Promise<HealthWarning[]>`: Sağlık uyarıları dizisi

#### findBeneficialIngredients

Üründe kullanıcı için faydalı içerikleri tanımlar.

**Parametreler:**
- `ingredients` (string[]): Ürün içerikleri dizisi
- `userProfile` (UserProfile): Kullanıcının sağlık profili

**Dönüş Değeri:**
- `Promise<BeneficialIngredient[]>`: Faydalı içerikler dizisi

#### getCitations

İçerikler hakkındaki sağlık iddiaları için alıntıları alır.

**Parametreler:**
- `ingredient` (string): İçerik
- `healthClaim` (string): Sağlık iddiası

**Dönüş Değeri:**
- `Promise<Citation[]>`: Alıntılar dizisi

### ConversationalAIService

```typescript
interface IConversationalAIService {
  startProductDiscussion(productInfo: ProductInfo, userProfile: UserProfile): Promise<ChatSession>;
  suggestAlternatives(currentProduct: ProductInfo, userPreferences: UserPreferences): Promise<ProductRecommendation[]>;
  handleUserQuery(sessionId: string, query: string): Promise<ChatMessage>;
  maintainContext(sessionId: string): Promise<ChatSession>;
}
```

#### startProductDiscussion

Bir ürün hakkında yeni bir sohbet oturumu başlatır.

**Parametreler:**
- `productInfo` (ProductInfo): Tartışılacak ürün
- `userProfile` (UserProfile): Kullanıcının sağlık profili

**Dönüş Değeri:**
- `Promise<ChatSession>`: Yeni sohbet oturumu

#### suggestAlternatives

Kullanıcı tercihlerine göre alternatif ürünler önerir.

**Parametreler:**
- `currentProduct` (ProductInfo): Mevcut ürün
- `userPreferences` (UserPreferences): Kullanıcının tercihleri

**Dönüş Değeri:**
- `Promise<ProductRecommendation[]>`: Ürün önerileri dizisi

#### handleUserQuery

Bir kullanıcının sohbet sorgusunu işler.

**Parametreler:**
- `sessionId` (string): Sohbet oturumu ID'si
- `query` (string): Kullanıcının sorgusu

**Dönüş Değeri:**
- `Promise<ChatMessage>`: AI'nın yanıtı

#### maintainContext

Bir sohbet oturumunun bağlamını korur.

**Parametreler:**
- `sessionId` (string): Sohbet oturumu ID'si

**Dönüş Değeri:**
- `Promise<ChatSession>`: Güncellenmiş sohbet oturumu

### UserProfileService

```typescript
interface IUserProfileService {
  getUserProfile(userId: string): Promise<UserProfile | null>;
  createUserProfile(profile: UserProfile): Promise<UserProfile>;
  updateUserProfile(profile: UserProfile): Promise<UserProfile>;
  deleteUserProfile(userId: string): Promise<void>;
}
```

#### getUserProfile

Bir kullanıcının profilini alır.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si

**Dönüş Değeri:**
- `Promise<UserProfile | null>`: Kullanıcı profili veya bulunamazsa null

#### createUserProfile

Yeni bir kullanıcı profili oluşturur.

**Parametreler:**
- `profile` (UserProfile): Oluşturulacak profil

**Dönüş Değeri:**
- `Promise<UserProfile>`: Oluşturulan profil

#### updateUserProfile

Mevcut bir kullanıcı profilini günceller.

**Parametreler:**
- `profile` (UserProfile): Güncellenmiş profil

**Dönüş Değeri:**
- `Promise<UserProfile>`: Güncellenmiş profil

#### deleteUserProfile

Bir kullanıcı profilini siler.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si

**Dönüş Değeri:**
- `Promise<void>`: Silme tamamlandığında çözümlenir

### ScanHistoryService

```typescript
interface IScanHistoryService {
  getScanHistory(userId: string): Promise<ScanHistoryEntry[]>;
  addScan(product: ProductInfo, analysis: HealthAnalysis): Promise<ScanHistoryEntry>;
  getScanById(scanId: string): Promise<ScanHistoryEntry | null>;
  deleteScan(scanId: string): Promise<void>;
  clearHistory(userId: string): Promise<void>;
}
```

#### getScanHistory

Bir kullanıcının tarama geçmişini alır.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si

**Dönüş Değeri:**
- `Promise<ScanHistoryEntry[]>`: Tarama geçmişi girişleri dizisi

#### addScan

Geçmişe yeni bir tarama ekler.

**Parametreler:**
- `product` (ProductInfo): Taranan ürün
- `analysis` (HealthAnalysis): Sağlık analizi

**Dönüş Değeri:**
- `Promise<ScanHistoryEntry>`: Yeni tarama geçmişi girişi

#### getScanById

Belirli bir taramayı ID'sine göre alır.

**Parametreler:**
- `scanId` (string): Tarama ID'si

**Dönüş Değeri:**
- `Promise<ScanHistoryEntry | null>`: Tarama girişi veya bulunamazsa null

#### deleteScan

Geçmişten bir taramayı siler.

**Parametreler:**
- `scanId` (string): Tarama ID'si

**Dönüş Değeri:**
- `Promise<void>`: Silme tamamlandığında çözümlenir

#### clearHistory

Bir kullanıcı için tüm tarama geçmişini temizler.

**Parametreler:**
- `userId` (string): Kullanıcı ID'si

**Dönüş Değeri:**
- `Promise<void>`: Temizleme tamamlandığında çözümlenir

## Bileşenler

### ErrorDisplay

```typescript
interface ErrorDisplayProps {
  error: ErrorResponse;
  onRetry?: () => void;
}
```

Hatalı mesajları kullanıcıya isteğe bağlı yeniden deneme işlevselliğiyle gösterir.

### HealthWarningDisplay

```typescript
interface HealthWarningDisplayProps {
  analysis: HealthAnalysis;
}
```

Uyarılar, faydalar ve öneriler dahil olmak üzere sağlık analiz sonuçlarını gösterir.

### LoadingIndicator

```typescript
interface LoadingIndicatorProps {
  message?: string;
}
```

İsteğe bağlı bir mesajla birlikte yükleme döndürücüsünü gösterir.

### ProductDisplay

```typescript
interface ProductDisplayProps {
  product: ProductInfo;
}
```

Bir ürün hakkında detaylı bilgi gösterir.

## Yardımcı Programlar

### ErrorHandling

```typescript
interface ErrorResponse {
  code: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'critical';
  fallbackAction?: string;
  retryable: boolean;
}

function retry<T>(fn: () => Promise<T>, maxRetries?: number, delay?: number): Promise<T>;
function createErrorResponse(code: string, message: string, severity: string, fallbackAction?: string, retryable?: boolean): ErrorResponse;
```

## Ortam Değişkenleri

Uygulama aşağıdaki ortam değişkenlerini kullanır:

- `OPENAI_API_KEY`: OpenAI servisleri için API anahtarı

## Harici API'ler

### Open Food Facts API

Barkod ile ürün tanımlama için kullanılır:
- Uç nokta: `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`
- Dokümantasyon: https://world.openfoodfacts.org/data

### OpenAI API

Sağlık analizi ve konuşma AI için kullanılır:
- Modeller: GPT-4
- Dokümantasyon: https://platform.openai.com/docs

## Gelecek API Genişlemeleri

Planlanan API geliştirmeleri şunlardır:

1. **Ek Veri Kaynakları**:
   - Daha fazla ürün veritabanıyla entegrasyon
   - Ek sağlık araştırma veritabanları

2. **Geliştirilmiş AI Yetenekleri**:
   - Görüntü ve metin için çok modlu analiz
   - Gerçek zamanlı kişiselleştirme API'leri

3. **Analiz ve İzleme**:
   - Kullanım analizi API'leri
   - Performans izleme uç noktaları

4. **Kullanıcı Yönetimi**:
   - Kimlik doğrulama API'leri
   - Kullanıcı tercihi senkronizasyonu