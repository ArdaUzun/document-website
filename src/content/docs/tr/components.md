---
title: 'Bileşenler'
author: 'arda'
---

## Genel Bakış

Ürün Sağlık Tarayıcısı uygulaması, kullanıcı arayüzünün farklı yönlerini işleyen birkaç React bileşeninden oluşur. Bu bileşenler, bakım ve genişletmenin kolay olduğu temiz, modüler bir yapı sağlamak için organize edilmiştir.

## Bileşen Yapısı

```
src/
├── components/
│   ├── ErrorDisplay.tsx
│   ├── HealthWarningDisplay.tsx
│   ├── LoadingIndicator.tsx
│   ├── ProductDisplay.tsx
│   └── index.ts
```

## ErrorDisplay Bileşeni

`ErrorDisplay` bileşeni, hata mesajlarını kullanıcıya tutarlı ve kullanıcı dostu bir şekilde göstermekle sorumludur.

### Özellikler

```typescript
interface ErrorDisplayProps {
  error: ErrorResponse;
  onRetry?: () => void;
}
```

### Özellikler

- Önem derecesine göre uygun stil ile hata mesajlarını gösterir
- Uygulanabilir olduğunda yeniden deneme butonunu gösterir
- Mevcut olduğunda geri dönüş eylem önerileri sağlar

## HealthWarningDisplay Bileşeni

`HealthWarningDisplay` bileşeni, uyarılar, faydalar ve öneriler dahil olmak üzere sağlık analiz sonuçlarını kullanıcıya sunar.

### Özellikler

```typescript
interface HealthWarningDisplayProps {
  analysis: HealthAnalysis;
}
```

### Özellikler

- Önem derecesine göre (düşük, orta, yüksek, kritik) renk kodlu uyarı gösterimi
- Uyarılar, faydalar ve öneriler arasında geçiş yapmak için sekme arayüzü
- Detaylı bilgi için daraltılabilir bölümler
- Genel güvenlik derecesi için görsel göstergeler

## LoadingIndicator Bileşeni

`LoadingIndicator` bileşeni, zaman uyumsuz işlemler sırasında kullanıcıya görsel geri bildirim sağlar.

### Özellikler

```typescript
interface LoadingIndicatorProps {
  message?: string;
}
```

### Özellikler

- Yükleme durumunu göstermek için animasyonlu döndürücü
- Yükleme sırasında bağlam sağlamak için isteğe bağlı mesaj
- Uygulama genelinde tutarlı stil

## ProductDisplay Bileşeni

`ProductDisplay` bileşeni, ad, marka, içerikler ve besin değerleri dahil olmak üzere taranan ürün hakkında detaylı bilgi gösterir.

### Özellikler

```typescript
interface ProductDisplayProps {
  product: ProductInfo;
}
```

### Özellikler

- Müsait olduğunda ürün resmini gösterir
- Ürün adı, marka ve barkodu gösterir
- Alerjen vurgulamayla içerikleri listeler
- Besin değerlerini organize bir tabloda sunar
- Veri kaynağını ve güven seviyesini gösterir

## Bileşen Entegrasyonu

Tüm bileşenler, uygulama genelinde kolayca içe aktarılmasını sağlayan components dizinindeki `index.ts` dosyası aracılığıyla dışa aktarılır:

```typescript
export { ErrorDisplay } from './ErrorDisplay';
export { HealthWarningDisplay } from './HealthWarningDisplay';
export { LoadingIndicator } from './LoadingIndicator';
export { ProductDisplay } from './ProductDisplay';
```

## Stil

Bileşenler, tutarlı stil için React Native'in StyleSheet API'sini kullanır. Stil, uygun boşluk, tipografi ve renk şemalarıyla temiz, modern bir tasarımı takip eder.

## Gelecek Geliştirmeler

Bileşen kütüphanesi için planlanan geliştirmeler şunlardır:

1. **Geliştirilmiş UI Bileşenleri**:
   - Daha iyi kullanıcı etkileşimi için daha fazla etkileşimli öğe
   - Geliştirilmiş erişilebilirlik özellikleri
   - Koyu mod desteği

2. **Ek Bileşenler**:
   - Kullanıcı profili yönetimi arayüzü
   - Tarama geçmişi görüntüleyici
   - Konuşma AI için sohbet arayüzü
   - Alternatif ürün öneri ekranı

3. **Bileşen Kütüphaneleri**:
   - React Native Elements veya NativeBase gibi bir UI bileşen kütüphanesinin entegrasyonunu düşünme
   - Tutarsız markalandırma için özel bileşen temaları

4. **Performans Optimizasyonları**:
   - Performans iyileştirmeleri için React.memo uygulaması
   - useCallback ve useMemo ile yeniden oluşturmaların optimize edilmesi
   - Ağır bileşenler için tembel yükleme