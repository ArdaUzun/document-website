---
title: 'Test'
author: 'arda'
---

## Genel Bakış

Ürün Sağlık Tarayıcısı uygulaması, birim testleri, entegrasyon testleri ve uçtan uca testleri içeren kapsamlı bir test stratejisine sahiptir. Test çerçevesi Jest üzerine kurulmuştur ve özel test ihtiyaçları için ek araçlarla genişletilmiştir.

## Test Yığını

- **Jest** - JavaScript test çerçevesi
- **React Test Renderer** - React bileşenlerini test etmek için
- **Mocking kütüphaneleri** - Harici bağımlılıkları simüle etmek için

## Test Yapısı

Testler, kaynak kodu yapısını yansıracak şekilde organize edilmiştir:

```
src/
├── __tests__/
│   ├── ConversationalAIService.test.ts
│   ├── DataEnrichmentService.test.ts
│   ├── ErrorHandlingService.test.ts
│   ├── HealthAnalysisService.test.ts
│   ├── ImageRecognitionService.test.ts
│   ├── integration.test.ts
│   ├── models.test.ts
│   ├── performance.test.ts
│   ├── ProductIdentificationService.test.ts
│   ├── RecommendationService.test.ts
│   ├── ScanHistoryService.test.ts
│   └── UserProfileService.test.ts
```

## Testleri Çalıştırma

### Tek Seferlik Çalıştırma

Tüm testleri bir kez çalıştırmak için:

```bash
npm test
```

### İzleme Modu

Testleri izleme modunda çalıştırmak için (dosyalar değiştiğinde testleri yeniden çalıştırır):

```bash
npm run test:watch
```

### Kapsam Raporu

Bir kapsam raporu oluşturmak için:

```bash
npm run test:coverage
```

Bu işlem `coverage/` dizininde bir HTML kapsam raporu oluşturacaktır.

## Test Türleri

### Birim Testleri

Birim testleri, harici bağımlılıkları taklit ederek bireysel fonksiyonlara ve sınıflara odaklanır. Örnekler şunlardır:

- Model yöntemlerini test etme
- Taklit edilmiş bağımlılıklarla servis yöntemlerini test etme
- Farklı özelliklerle bileşen oluşturma testi

`ProductIdentificationService.test.ts` dosyasından örnek:

```typescript
it('geçerli bir barkod sağlandığında ürün verilerini döndürmelidir', async () => {
  const barcode = '1234567890';
  const mockProductData = {
    code: barcode,
    product_name: 'Test Ürünü',
    brands: 'Test Markası',
    ingredients_text: 'su, şeker, tuz',
    nutriments: { calories: 100 },
    image_url: 'http://example.com/image.jpg',
  };
  mockAxiosInstance.get.mockResolvedValue({ data: { status: 1, product: mockProductData } });

  const result = await productIdentificationService.identifyByBarcode(barcode);

  expect(result).toBeInstanceOf(ProductInfoModel);
  expect(result?.name).toBe('Test Ürünü');
  expect(result?.barcode).toBe(barcode);
  expect(mockAxiosInstance.get).toHaveBeenCalledWith(`/product/${barcode}.json`);
});
```

### Entegrasyon Testleri

Entegrasyon testleri, birden fazla bileşenin doğru şekilde birlikte çalıştığını doğrular. Bu testler genellikle:

- Tam olarak taklit edilmemiş bağımlılıklarla servis etkileşimlerini test eder
- Bileşenler arasındaki veri akışını doğrular
- Kontrollü test verileriyle API entegrasyonlarını test eder

`integration.test.ts` dosyasından kavramsal örnek:

```typescript
it('tam bir ürün tanımlama ve analiz akışını tamamlamalıdır', async () => {
  // Harici API yanıtlarını taklit edin
  // Tam akışı çalıştırın: tanımlama -> zenginleştirme -> analiz
  // Son sonucu doğrulayın
});
```

### Performans Testleri

Performans testleri, uygulamanın performans gereksinimlerini karşıladığından emin olur:

- Yanıt süresi ölçümleri
- Bellek kullanımı takibi
- Eşzamanlı kullanıcı simülasyonu

### Uçtan Uca Testler

Uçtan uca testler, uygulamayla gerçek kullanıcı etkileşimlerini simüle eder. Bu testler:

- Mobil test için Detox gibi araçları kullanır
- Tam kullanıcı akışlarını test eder
- UI öğelerini ve etkileşimleri doğrular

## Test Yazma

### Test Yapısı

Testler Arrange-Act-Assert (Düzenle-Çalıştır-Doğrula) desenini izlemelidir:

```typescript
describe('ServisAdı', () => {
  // Kurulum kodu (Düzenle)
  
  describe('metodAdı', () => {
    it('koşul sağlandığında bir şey yapmalıdır', async () => {
      // Düzenle - test verilerini ve taklitleri ayarla
      
      // Çalıştır - test edilen yöntemi çağır
      
      // Doğrula - sonuçları kontrol et
    });
  });
});
```

### Taklit Etme

Test edilen kodu izole etmek için Jest'in taklit etme yeteneklerini kullanın:

```typescript
const mockAxiosInstance = {
  get: jest.fn(),
};

beforeEach(() => {
  productIdentificationService = new ProductIdentificationService(mockAxiosInstance as any);
});

afterEach(() => {
  mockAxiosInstance.get.mockClear();
});
```

### Test Verisi

Test verisi oluşturmak için fabrika veya inşaatçı kalıpları kullanın:

```typescript
const createTestUserProfile = (overrides = {}) => {
  return new UserProfileModel({
    id: 'test-kullanıcı',
    allergies: [],
    dietaryRestrictions: [],
    healthConditions: [],
    ...overrides
  });
};
```

## Test Kapsamı

Proje kapsamlı test kapsamı hedeflemektedir:

- **Modeller**: İş mantığı yöntemleri için %100 kapsama
- **Servisler**: Temel işlevselliğe odaklanarak %90+ kapsama
- **Bileşenler**: Kritik kullanıcı etkileşimleri için %80+ kapsama
- **Yardımcılar**: Yardımcı fonksiyonlar için %100 kapsama

Mevcut kapsam seviyelerini kontrol etmek için `npm run test:coverage` komutunu çalıştırın.

## Sürekli Entegrasyon

Testler CI (sürekli entegrasyon) hattında otomatik olarak çalıştırılır:

1. Her pull request'te
2. main dalına birleştirme öncesinde
3. Planlanmış yapılarda

CI yapılandırması `.github/workflows/ci.yml` dosyasındadır.

## En İyi Uygulamalar

### Test Tasarımı

1. **Testleri odaklı tutun**: Her test bir davranışı doğrulamalıdır
2. **Tanımlayıcı test isimleri kullanın**: Test edilen şeyi açıkça belirtin
3. **Kenar durumlarını test edin**: Hata koşulları ve sınır değerleri için testler ekleyin
4. **Uygulama detaylarını test etmekten kaçının**: Dahili yapıdan ziyade davranışa odaklanın

### Taklit Etme Stratejisi

1. **Harici bağımlılıkları taklit edin**: API'ler, veritabanları, dosya sistemleri
2. **Değer nesnelerini taklit etmeyin**: Gerçek veri modelleriyle test edin
3. **Gerçekçi taklit veri kullanın**: Gerçek API yanıtlarını temsil edin
4. **Testler arasında taklitleri sıfırlayın**: Test izolasyonunu sağlayın

### Performans

1. **Testleri hızlı tutun**: Gereksiz kurulum veya kaldırma işlemlerinden kaçının
2. **Odaklı testler kullanın**: Geliştirme sırasında sadece ilgili testleri çalıştırın
3. **Mümkünse paralelleştirin**: Jest'in paralel yürütme özelliğinden yararlanın

### Bakım

1. **Testleri kod değişiklikleriyle güncelleyin**: Testleri uygulamayla senkron tutun
2. **Eski testleri kaldırın**: Kaldırılan işlevselliğe ait testleri silin
3. **Test kodunu yeniden düzenleyin**: Test koduna aynı kalite standartlarını uygulayın

## Test Hata Ayıklama

Testler başarısız olduğunda:

1. Belirli başarısız testi çalıştırın: `npm test -- -t "test adı"`
2. Değerleri incelemek için `console.log` ifadeleri kullanın
3. Gerekirse Jest'in hata ayıklama modunu kullanın
4. Taklitlerin düzgün yapılandırıldığını kontrol edin

## Gelecek İyileştirmeler

Test stratejisine yönelik planlanmış geliştirmeler şunlardır:

1. **Geliştirilmiş Uçtan Uca Test**
   - Mobil E2E test için Detox uygulaması
   - Görsel regresyon testi ekleme

2. **Özellik Tabanlı Test**
   - Üretken test için fast-check gibi kütüphaneleri kullanma
   - Daha geniş bir giriş aralığıyla test etme

3. **Sözleşme Testi**
   - API sözleşmelerini sağlayıcılarla doğrulama
   - Harici servislerle uyumluluğu sağlama

4. **Mutasyon Testi**
   - Test kalitesini ölçmek için Stryker gibi araçları kullanma
   - Zayıf test edilmiş kod yollarını tanımlama

5. **Erişilebilirlik Testi**
   - Otomatik erişilebilirlik kontrolleri
   - Ekran okuyucu testi