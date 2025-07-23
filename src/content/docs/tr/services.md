---
title: 'Servisler'
author: 'arda'
---

## Genel Bakış

Ürün Sağlık Tarayıcısı uygulaması, uygulamanın farklı yönleri için iş mantığını kapsülleyen bir dizi servis etrafında oluşturulmuştur. Her servis belirli bir alanla sorumludur ve diğer servislerle iyi tanımlanmış arayüzler aracılığıyla etkileşime girer.

## Servis Yapısı

```
src/
├── services/
│   ├── AnalyticsService.ts
│   ├── ConversationalAIService.ts
│   ├── DataEnrichmentService.ts
│   ├── ErrorHandlingService.ts
│   ├── HealthAnalysisService.ts
│   ├── ImageRecognitionService.ts
│   ├── index.ts
│   ├── PerformanceMonitoringService.ts
│   ├── ProductIdentificationService.ts
│   ├── RecommendationService.ts
│   ├── ScanHistoryService.ts
│   └── UserProfileService.ts
```

## ProductIdentificationService

`ProductIdentificationService`, akıllı geri dönüşlerle çoklu ürün tanımlama yöntemlerini düzenler.

### Arayüz

```typescript
interface IProductIdentificationService {
  identifyByBarcode(barcode: string): Promise<ProductInfo | null>;
  identifyByImage(imageData: Buffer): Promise<ProductInfo | null>;
  identifyBySearch(searchQuery: string): Promise<ProductInfo[] | null>;
}
```

### Uygulama Detayları

- Barkod tabanlı tanımlama için Open Food Facts API'sini kullanır
- Görsel ürün tanımlama için görüntü tanıma API'leriyle entegre olur
- Manuel ürün arama için web arama işlevselliğini uygular
- Harici API çağrıları için yeniden deneme mantığı ve hata işleme sağlar
- Farklı tanımlama yöntemleri için güven puanı yönetimi yapar

## HealthAnalysisService

`HealthAnalysisService`, LLM'ler ve araştırma veritabanlarını kullanarak akıllı içerik analizi sağlar.

### Arayüz

```typescript
interface IHealthAnalysisService {
  analyzeIngredients(ingredients: string[], userProfile: UserProfile): Promise<HealthAnalysis | null>;
  generateWarnings(ingredients: string[], userProfile: UserProfile): Promise<HealthWarning[]>;
  findBeneficialIngredients(ingredients: string[], userProfile: UserProfile): Promise<BeneficialIngredient[]>;
  getCitations(ingredient: string, healthClaim: string): Promise<Citation[]>;
}
```

### Uygulama Detayları

- Doğal dil analizi için OpenAI GPT-4 ile entegre olur
- Tutarlı sağlık analizi için yapılandırılmış istemler sağlar
- Yetkili bilgi için FDA, USDA ve WHO veritabanlarını referans alır
- Güven puanı ve belirsizlik işleme uygular
- AI servisleri kullanılamadığında temel alerjen algılamaya geri döner

## ConversationalAIService

`ConversationalAIService`, ürün alternatifleri ve sağlık tartışmaları için bir sohbet arayüzü sağlar.

### Arayüz

```typescript
interface IConversationalAIService {
  startProductDiscussion(productInfo: ProductInfo, userProfile: UserProfile): Promise<ChatSession>;
  suggestAlternatives(currentProduct: ProductInfo, userPreferences: UserPreferences): Promise<ProductRecommendation[]>;
  handleUserQuery(sessionId: string, query: string): Promise<ChatMessage>;
  maintainContext(sessionId: string): Promise<ChatSession>;
}
```

### Uygulama Detayları

- Konuşma belleği ve bağlam yönetimiyle LLM kullanır
- Ürün öneri motoruyla entegre olur
- Kullanıcı sohbet geçmişi ve tercihlerini yönetir
- İşlem yapılabilir önerilerle yapılandırılmış yanıtlar sağlar
- Çoklu eşzamanlı konuşmalar için oturum yönetimi uygular

## UserProfileService

`UserProfileService`, alerjileri, diyet kısıtlamalarını ve sağlık durumlarını içeren kullanıcı profillerini yönetir.

### Arayüz

```typescript
interface IUserProfileService {
  getUserProfile(userId: string): Promise<UserProfile | null>;
  createUserProfile(profile: UserProfile): Promise<UserProfile>;
  updateUserProfile(profile: UserProfile): Promise<UserProfile>;
  deleteUserProfile(userId: string): Promise<void>;
}
```

### Uygulama Detayları

- Kullanıcı profillerini depolamak için yerel SQLite veritabanını yönetir
- Kullanıcı profilleri için CRUD işlemlerini uygular
- Profil verileri için doğrulama sağlar
- Profil içe/dışa aktarma işlevselliğini destekler

## ScanHistoryService

`ScanHistoryService`, taranan ürünlerin ve analizlerinin geçmişini yönetir.

### Arayüz

```typescript
interface IScanHistoryService {
  getScanHistory(userId: string): Promise<ScanHistoryEntry[]>;
  addScan(product: ProductInfo, analysis: HealthAnalysis): Promise<ScanHistoryEntry>;
  getScanById(scanId: string): Promise<ScanHistoryEntry | null>;
  deleteScan(scanId: string): Promise<void>;
  clearHistory(userId: string): Promise<void>;
}
```

### Uygulama Detayları

- Tarama geçmişini yerel SQLite veritabanında saklar
- Filtreleme ve sıralama yeteneklerini uygular
- Tarama geçmişine çevrimdışı erişimi destekler
- Otomatik arşivleme ile depolama sınırlarını yönetir

## DataEnrichmentService

`DataEnrichmentService`, kapsamlı ürün profilleri oluşturmak için birden fazla kaynaktan veri birleştirir.

### Arayüz

```typescript
interface IDataEnrichmentService {
  enrichProductData(basicInfo: ProductInfo): Promise<EnrichedProductInfo>;
  validateIngredientList(ingredients: string[]): Promise<ValidatedIngredient[]>;
  findProductAlternatives(product: ProductInfo, criteria: SearchCriteria): Promise<ProductInfo[]>;
}
```

### Uygulama Detayları

- Birden fazla besin veritabanıyla entegre olur
- Akıllı önbellekleme stratejisi uygular
- Veri doğrulama ve temizleme sağlar
- Daha önce taranan ürünler için çevrimdışı işlevselliği destekler

## ErrorHandlingService

`ErrorHandlingService`, merkezi hata işleme ve günlükleme sağlar.

### Arayüz

```typescript
interface IErrorHandlingService {
  handleError(error: Error, context: string): ErrorResponse;
  createErrorResponse(code: string, message: string, severity: string, fallbackAction?: string, retryable?: boolean): ErrorResponse;
  logError(error: Error, context: string): void;
}
```

### Uygulama Detayları

- Uygulama genelinde standartlaştırılmış hata yanıt formatı sağlar
- Hata ayıklama ve izleme için günlükleme uygular
- Geçici hatalar için yeniden deneme mantığı sağlar
- Hata bağlamı ve meta verileri yönetir

## AnalyticsService

`AnalyticsService`, kullanıcı davranışı ve uygulama performansını izler.

### Arayüz

```typescript
interface IAnalyticsService {
  trackEvent(eventName: string, properties?: Record<string, any>): void;
  trackPageView(pageName: string, properties?: Record<string, any>): void;
  setUserId(userId: string): void;
  setUserProperties(properties: Record<string, any>): void;
}
```

### Uygulama Detayları

- Kullanıcı etkileşimlerini ve özellik kullanımını izler
- Verimlilik için olay toplu işleme uygular
- Kullanıcı kimliklendirme ve segmentasyonu destekler
- Kullanıcı verileri için gizlilik kontrolleri sağlar

## PerformanceMonitoringService

`PerformanceMonitoringService`, uygulama performansını ve kaynak kullanımını izler.

### Arayüz

```typescript
interface IPerformanceMonitoringService {
  startTrace(name: string): void;
  stopTrace(name: string, attributes?: Record<string, any>): void;
  recordMetric(name: string, value: number, attributes?: Record<string, any>): void;
}
```

### Uygulama Detayları

- API yanıt sürelerini ve uygulama yanıt verdiğini ölçer
- Kaynak kullanımını izler (CPU, bellek, ağ)
- Performans panoları uygular
- Performans kıyaslamayı destekler

## Servis Entegrasyonu

Servisler bağımlılık enjeksiyonu aracılığıyla birlikte çalışacak şekilde tasarlanmıştır:

```typescript
// App.tsx'de servis entegrasyonu örneği
const productIdentificationService = new ProductIdentificationService();
const healthAnalysisService = new HealthAnalysisService();
const scanHistoryService = new ScanHistoryService();
const userProfileService = new UserProfileService();
```

## Gelecek Geliştirmeler

Servisler için planlanan geliştirmeler şunlardır:

1. **Geliştirilmiş AI Entegrasyonu**:
   - Daha sofistike istem mühendisliği
   - AI servisleri için daha iyi geri dönüş mekanizmaları
   - Ek LLM sağlayıcılarıyla entegrasyon

2. **Geliştirilmiş Önbellekleme**:
   - Daha iyi ölçeklenebilirlik için dağıtılmış önbellekleme
   - Daha akıllı önbellek geçersiz kılma stratejileri
   - Çatışma çözümüyle daha iyi çevrimdışı destek

3. **Gelişmiş Analiz**:
   - Kullanıcı davranışı tahmini için makine öğrenimi
   - Özellik deneyleri için A/B test çerçevesi
   - Gerçek zamanlı analiz panosu

4. **Güvenlik Geliştirmeleri**:
   - Hassas veriler için uçtan uca şifreleme
   - Gelişmiş kimlik doğrulama mekanizmaları
   - Ek gizlilik düzenlemelerine uyumluluk