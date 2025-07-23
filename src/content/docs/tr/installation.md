---
title: 'Kurulum Rehberi'
author: 'arda'
---

## Önkoşullar

Ürün Sağlık Tarayıcısı'nı çalıştırmadan önce sisteminizde aşağıdaki yazılımların yüklü olması gerekir:

1. **Node.js** (16 veya üzeri sürüm)
2. **npm** (genellikle Node.js ile birlikte gelir)
3. Sürüm kontrolü için **Git**
4. Mobil geliştirme için **Android Studio** veya **Xcode** (hedef platformunuza bağlı olarak)
5. **React Native CLI** (global olarak yüklü)

Android geliştirme için:
- Android SDK
- Test için Android Sanal Cihazı (AVD)

iOS geliştirme için (sadece macOS):
- Xcode
- CocoaPods

## Kaynak Kodunu Alma

Depoyu yerel makinenize klonlayın:

```bash
git clone <depo-url>
cd product_health_analysis/ProductScanner
```

## Bağımlılıkların Kurulumu

npm kullanarak proje bağımlılıklarını yükleyin:

```bash
npm install
```

Bu işlem `package.json` dosyasında listelenen tüm gerekli paketleri yükleyecektir.

## Ortam Değişkenleri

Uygulama, özellikle AI servisleri için belirli ortam değişkenlerinin ayarlanmasını gerektirir:

1. `ProductScanner` dizininin kökünde bir `.env` dosyası oluşturun
2. Aşağıdaki değişkenleri ekleyin:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Not: Üretim ortamı için Google Vision API gibi diğer servisler için de API anahtarlarına ihtiyacınız olacaktır.

## Uygulamayı Çalıştırma

### Geliştirme Sunucusu

Geliştirme sunucusunu başlatmak için:

```bash
npm start
```

Bu işlem React Native paketleyicisini başlatacaktır.

### Android Üzerinde Çalıştırma

Uygulamayı bir Android emülatör veya cihaz üzerinde çalıştırmak için:

```bash
npm run android
```

Bir Android emülatörün çalıştığından veya USB aracılığıyla hata ayıklama etkinleştirilmiş bir Android cihazın bağlı olduğundan emin olun.

### iOS Üzerinde Çalıştırma (sadece macOS)

Uygulamayı bir iOS simülatör veya cihaz üzerinde çalıştırmak için:

```bash
npm run ios
```

Bu işlem iOS simülatörünü açacak ve uygulamayı başlatacaktır.

### Web Tarayıcısında Çalıştırma

Uygulama ayrıca bir web tarayıcısında çalışmayı da destekler:

```bash
npm run web
```

Bu işlem bir geliştirme sunucusu başlatacak ve uygulamayı varsayılan tarayıcınızda açacaktır.

## Üretim İçin Derleme

### Android

Bir Android APK oluşturmak için:

```bash
cd android
./gradlew assembleRelease
```

APK dosyası `android/app/build/outputs/apk/release/` dizininde bulunacaktır.

### iOS (sadece macOS)

Bir iOS uygulaması oluşturmak için:

```bash
cd ios
xcodebuild -workspace TempProject.xcworkspace -scheme TempProject -configuration Release -destination 'generic/platform=iOS' -archivePath TempProject.xcarchive archive
```

### Web

Web sürümünü oluşturmak için:

```bash
npm run web:build
```

Oluşturulan dosyalar `dist` dizininde olacaktır.

## Sorun Giderme

### Yaygın Sorunlar

1. **Metro Bundler Sorunları**
   - Önbelleği temizleyin: `npm start -- --reset-cache`
   - Geliştirme sunucusunu yeniden başlatın

2. **Android Derleme Sorunları**
   - Android Studio ve SDK'nın doğru şekilde yüklendiğinden emin olun
   - `ANDROID_HOME` gibi ortam değişkenlerinin doğru ayarlandığını kontrol edin

3. **iOS Derleme Sorunları (sadece macOS)**
   - CocoaPods bağımlılıklarını yüklemek/güncellemek için `cd ios && pod install` komutunu çalıştırın
   - Xcode'un güncel olduğundan emin olun

4. **Bağımlılık Sorunları**
   - `node_modules` ve `package-lock.json` dosyalarını silin
   - `npm install` komutunu tekrar çalıştırın

### Kullanışlı Komutlar

- `npm run lint` - Kod tarzı sorunlarını kontrol etmek için ESLint'i çalıştırın
- `npm run lint:fix` - Bazı kod tarzı sorunlarını otomatik olarak düzeltin
- `npm run format` - Kodu Prettier ile biçimlendirin
- `npm run type-check` - TypeScript tip kontrolünü çalıştırın
- `npm test` - Test paketini çalıştırın

## Sonraki Adımlar

Uygulamayı başarıyla kurup çalıştırdıktan sonra şunları yapmak isteyebilirsiniz:

1. Projeye nasıl katkıda bulunacağınızı anlamak için [Geliştirme Rehberi](../development.md)'ni inceleyin
2. Testleri nasıl çalıştıracağınızı ve yazacağınızı öğrenmek için [Test Rehberi](../testing.md)'ni gözden geçirin
3. Mevcut servisler ve bileşenleri anlamak için [API Referansı](../api.md)'na göz atın