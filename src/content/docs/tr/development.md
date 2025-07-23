---
title: 'Geliştirme'
author: 'arda'
---

## Proje Yapısı

Ürün Sağlık Tarayıcısı, kodu mantıksal olarak organize etmek için modüler bir yapı izler:

```
ProductScanner/
├── src/
│   ├── components/     # React bileşenleri
│   ├── models/         # Veri modelleri
│   ├── screens/        # Ekran bileşenleri
│   ├── services/       # İş mantığı servisleri
│   ├── types/          # TypeScript tip tanımlamaları
│   ├── utils/          # Yardımcı fonksiyonlar
│   ├── __tests__/      # Test dosyaları
│   └── setupTests.ts   # Test kurulumu
├── public/             # Web sürümü için statik varlıklar
├── android/            # Android yerel kod
├── ios/                # iOS yerel kod
├── node_modules/       # Bağımlılıklar
├── scripts/            # Özel betikler
└── docs/               # Dokümantasyon
```

## Kod Stili ve Standartları

### TypeScript

Proje, tip güvenliği için TypeScript kullanır. Tüm yeni kod TypeScript ile yazılmalı ve mevcut JavaScript kodu kademeli olarak taşınmalıdır.

### ESLint ve Prettier

Proje, kod kalitesi kontrolleri için ESLint ve kod biçimlendirme için Prettier kullanır. Yapılandırma dosyaları:

- `.eslintrc.json` - ESLint yapılandırması
- `.prettierrc` - Prettier yapılandırması

Kod tarzı sorunlarını kontrol etmek ve düzeltmek için şu komutları çalıştırın:

```bash
npm run lint       # Lint sorunlarını kontrol et
npm run lint:fix   # Bazı lint sorunlarını otomatik düzelt
npm run format     # Kodu Prettier ile biçimlendir
npm run format:check # Kodun düzgün biçimlendirilip biçimlendirilmediğini kontrol et
```

### İsimlendirme Kuralları

- Bileşen ve sınıf adları için PascalCase kullanın
- Değişkenler ve fonksiyonlar için camelCase kullanın
- Sabitler için UPPER_SNAKE_CASE kullanın
- Kodun amacını açıkça belirten açıklayıcı isimler kullanın

### Bileşen Yapısı

React bileşenleri şu yapıyı izlemelidir:

1. İçe aktarmalar
2. Bileşen tanımı
3. PropTypes (TypeScript arayüzleri kullanılıyorsa)
4. Varsayılan dışa aktarma

### Servis Yapısı

Servisler şu yapıyı izlemelidir:

1. İçe aktarmalar
2. Arayüz tanımı
3. Sınıf uygulaması
4. Varsayılan dışa aktarma

## Git İş Akışı

### Dal Stratejisi

Proje basitleştirilmiş bir Git iş akışını izler:

1. `main` dalı - Üretim hazır kod
2. Özellik dalları - Yeni özellikler veya hata düzeltmeleri için
3. Düzeltme dalları - Acil üretim düzeltmeleri için

### Commit Mesajları

Geleneksel commit mesajlarını izleyin:

- `feat: Yeni özellik ekle`
- `fix: Hata çöz`
- `docs: Dokümantasyon güncelle`
- `refactor: Kodu yeniden yapılandır`
- `test: Test ekle veya güncelle`
- `chore: Bakım görevleri`

### Pull Request'ler

1. `main` dalından bir özellik dalı oluşturun
2. Değişikliklerinizi yapın
3. Yeni işlevsellik için testler yazın
4. Tüm testlerin geçtiğinden emin olun
5. Değişikliklerin açık bir açıklamasıyla bir pull request gönderin

## Yeni Özellikler Ekleme

### 1. Yeni Bir Servis Oluşturma

Yeni işlevsellik eklerken bir servis oluşturarak başlayın:

1. `src/types/index.ts` içinde bir arayüz tanımlayın
2. Servisi `src/services/` içinde uygulayın
3. `src/__tests__/` içinde birim testleri ekleyin

### 2. React Bileşenleri Oluşturma

UI öğeleri için:

1. `src/components/` içinde yeni bileşenler oluşturun
2. Bunları `src/components/index.ts` içinde dışa aktarın
3. Storybook için hikayeler ekleyin (uygulanabilirse)
4. Bileşen testleri yazın

### 3. Modelleri Güncelleme

Veri yapılarını değiştirirken:

1. `src/models/` içinde model sınıflarını güncelleyin
2. `src/types/` içinde karşılık gelen arayüzleri güncelleyin
3. Geriye dönük uyumluluğu sağlayın
4. Gerektiğinde testleri güncelleyin

## Test

Proje test için Jest kullanır. Detaylı bilgi için [Test Rehberi](../testing.md)'ni okuyun.

## Hata Ayıklama

### React Native Debugger

Mobil uygulamada hata ayıklamak için React Native Debugger kullanın:

1. React Native Debugger'ı yükleyin
2. Uygulamada Uzaktan JS Hata Ayıklamayı etkinleştirin
3. Bileşenleri ve durumu incelemek için React Native Debugger'ı açın

### Konsol Günlüğü

Hata ayıklama için `console.log`, `console.warn` ve `console.error` kullanın. Commit yapmadan önce hata ayıklama günlüklerini kaldırmayı veya devre dışı bırakmayı unutmayın.

### Hata Sınırları

Bileşen ağacındaki hataları yakalamak ve işlemek için hata sınırlarını kullanın.

## Performans Hususları

### Bileşen Optimizasyonu

1. Fonksiyonel bileşenler için `React.memo` kullanın
2. Pahalı hesaplamalar için `useMemo` ve `useCallback` kullanın
3. Büyük veri setleri için sanallaştırılmış listeler uygulayın
4. Mümkün olduğunda bileşenleri tembel yükleme yapın

### Ağ Optimizasyonu

1. API yanıtları için önbellekleme uygulayın
2. Büyük veri setleri için sayfalandırma kullanın
3. Ağ taleplerinin sayısını en aza indirin
4. Çevrimdışı senaryoları zarif bir şekilde ele alın

### Bellek Yönetimi

1. Abonelikleri ve olay dinleyicilerini temizleyin
2. Bileşenleri düzgün bir şekilde kaldırın
3. Uygun yerlerde zayıf referanslar kullanın
4. Geliştirme sırasında bellek kullanımını izleyin

## Erişilebilirlik

Tüm bileşenlerin erişilebilir olduğundan emin olun:

1. Anlamlı HTML öğeleri kullanın
2. Görüntüler için uygun alt metinler sağlayın
3. Klavye navigasyonu uygulayın
4. Yeterli renk kontrastı sağlayın
5. Gerektiğinde ARIA özniteliklerini kullanın

## Güvenlik

### Veri Koruma

1. Hassas kullanıcı verilerini asla günlüğe kaydetmeyin
2. API anahtarları için ortam değişkenlerini kullanın
3. Uygun kimlik doğrulama ve yetkilendirme uygulayın
4. Tüm kullanıcı girişlerini doğrulayın

### Güvenli Kodlama Uygulamaları

1. Enjeksiyon saldırılarını önlemek için kullanıcı girişlerini temizleyin
2. Tüm ağ talepleri için HTTPS kullanın
3. Hassas bilgiyi açığa çıkarmadan uygun hata işleme uygulayın
4. Bağımlılıkları güncel tutun

## Uluslararasılaştırma

Uygulamaya yeni metin eklerken:

1. Mümkünse bir yerelleştirme kütüphanesi kullanın
2. Dizeleri ayrı dosyalara çıkarın
3. Başından itibaren çoklu dil desteği sağlayın

## Dokümantasyon

Dokümantasyonu güncel tutun:

1. Önemli değişiklikler yaparken README.md'yi güncelleyin
2. Fonksiyon ve sınıflara JSDoc yorumları ekleyin
3. Gerektiğinde bu geliştirme rehberini güncelleyin
4. Yeni API'leri API referansında belgeleyin

## Dağıtım

Dağıtım yapmadan önce:

1. Tüm testleri çalıştırın
2. Güvenlik açıklarını kontrol edin
3. Paket boyutunu optimize edin
4. Sürüm numaralarını güncelleyin
5. Sürüm notlarını hazırlayın

## Katkıda Bulunma

1. Depoyu fork edin
2. Bir özellik dalı oluşturun
3. Değişikliklerinizi yapın
4. Testler yazın
5. Dokümantasyonu güncelleyin
6. Bir pull request gönderin