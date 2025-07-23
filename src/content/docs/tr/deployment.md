---
title: 'Dağıtım'
author: 'arda'
---

## Genel Bakış

Bu belge, Ürün Sağlık Tarayıcısı uygulamasını çeşitli platformlara dağıtmak için talimatlar sağlar. Uygulama mobil uygulama (Android/iOS) veya web uygulaması olarak dağıtılabilir.

## Önkoşullar

Dağıtım yapmadan önce şunlara sahip olduğunuzdan emin olun:

1. Tüm geliştirme ve testler tamamlandı
2. `package.json` dosyasındaki sürüm numaraları güncellendi
3. Sürüm notları hazırlandı
4. Hedef platformlar için gerekli hesaplar ve kimlik bilgileri oluşturuldu
5. Platforma özel araçlar yüklendi (Android Studio, Xcode, vb.)

## Ortam Yapılandırması

### Ortam Değişkenleri

Üretim değerleriyle bir `.env.production` dosyası oluşturun:

```env
OPENAI_API_KEY=your_production_openai_api_key
```

Bu değerlerin güvenli tutulduğundan ve sürüm kontrolüne dahil edilmediğinden emin olun.

### Derleme Yapılandırması

Gerektiğinde derleme yapılandırma dosyalarını gözden geçirin ve güncelleyin:
- Android için `android/app/build.gradle`
- iOS için `ios/TempProject/Info.plist`
- Web için `webpack.config.js`

## Mobil Dağıtım

### Android

#### 1. İmzalama Anahtarı Oluşturma

Yayın derlemeleri için bir imzalama anahtarı oluşturun:

```bash
keytool -genkeypair -v -storetype PKCS12 -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

#### 2. İmzalama Yapılandırması

`android/app/build.gradle` dosyasına imzalama yapılandırması ekleyin:

```gradle
android {
  ...
  signingConfigs {
    release {
      if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
        storeFile file(MYAPP_UPLOAD_STORE_FILE)
        storePassword MYAPP_UPLOAD_STORE_PASSWORD
        keyAlias MYAPP_UPLOAD_KEY_ALIAS
        keyPassword MYAPP_UPLOAD_KEY_PASSWORD
      }
    }
  }
  buildTypes {
    release {
      ...
      signingConfig signingConfigs.release
    }
  }
}
```

#### 3. Gradle Değişkenlerini Ayarlama

Aşağıdakileri içeren `android/gradle.properties` dosyası oluşturun:

```properties
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

#### 4. Yayın APK'sı Oluşturma

```bash
cd android
./gradlew assembleRelease
```

APK dosyası `android/app/build/outputs/apk/release/` dizininde olacaktır.

#### 5. Google Play Store'a Dağıtma

1. Google Play Console'da bir geliştirici hesabı oluşturun
2. Yeni bir uygulama oluşturun
3. APK dosyasını yükleyin
4. Mağaza listeleme bilgilerini doldurun
5. İnceleme için gönderin

### iOS

#### 1. Xcode Projesini Yapılandırma

1. `ios/TempProject.xcworkspace` dosyasını Xcode'da açın
2. Proje hedefini seçin
3. Paket tanımlayıcısını yapılandırın
4. Apple Developer hesabınızla imzalamayı ayarlayın

#### 2. Uygulamayı Arşivleme

1. Xcode'da hedef olarak "Generic iOS Device" seçin
2. "Product" > "Archive" seçeneğini seçin
3. Arşivlemenin tamamlanmasını bekleyin

#### 3. App Store'a Yükleme

1. Organizer penceresinde arşivi seçin
2. "Distribute App" butonuna tıklayın
3. "App Store Connect" seçeneğini seçin
4. Yüklemek için yönergeleri izleyin

#### 4. İnceleme İçin Gönderme

1. App Store Connect'e giriş yapın
2. Uygulama mağazası listelemesini tamamlayın
3. İnceleme için gönderin

## Web Dağıtımı

### Üretim İçin Derleme

```bash
npm run web:build
```

Bu komut, optimize edilmiş üretim dosyalarını `dist/` dizininde oluşturur.

### Dağıtım Seçenekleri

#### GitHub Pages

1. gh-pages'i yükleyin:
   ```bash
   npm install --save-dev gh-pages
   ```

2. `package.json` dosyasına betikleri ekleyin:
   ```json
   "scripts": {
     "predeploy": "npm run web:build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. Dağıtın:
   ```bash
   npm run deploy
   ```

#### Netlify

1. Bir Netlify hesabı oluşturun
2. GitHub deponuzu bağlayın
3. Derleme ayarlarını yapılandırın:
   - Derleme komutu: `npm run web:build`
   - Yayınlama dizini: `dist`
4. Dağıtın

#### Vercel

1. Vercel CLI'yi yükleyin:
   ```bash
   npm install -g vercel
   ```

2. Dağıtın:
   ```bash
   vercel
   ```

## İzleme ve Analiz

### Hata Takibi

Aşağıdaki servislerle hata takibi kurun:
- Sentry
- Bugsnag
- Rollbar

### Performans İzleme

Aşağıdakilerle performans izleme uygulayın:
- New Relic
- Datadog
- Firebase Performance Monitoring

### Kullanıcı Analizi

Analiz platformlarını entegre edin:
- Google Analytics
- Mixpanel
- Amplitude

## CI/CD Hattı

### GitHub Actions

`.github/workflows/deploy.yml` dosyasındaki örnek iş akışı:

```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - run: npm install
    - run: npm test
    - run: npm run web:build
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## Güvenlik Hususları

### API Anahtarları

- API anahtarlarını asla sürüm kontrolüne dahil etmeyin
- Ortam değişkenlerini kullanın
- Anahtarları düzenli olarak döndürün
- Anahtar erişim kısıtlamaları uygulayın

### Veri Koruma

- Hassas kullanıcı verilerini şifreleyin
- Güvenli kimlik doğrulama uygulayın
- Tüm iletişimler için HTTPS kullanın
- Gizlilik düzenlemelerine (GDPR, CCPA) uyun

### Kod Güvenliği

- Bağımlılıkları güncel tutun
- Güvenlik tarama araçları kullanın
- Giriş doğrulama uygulayın
- Güvenli kodlama uygulamalarını izleyin

## Geri Alma Stratejisi

### Sürümleme

Anlamsal sürümleme kullanın:
- Büyük sürüm: Uyumsuzluk yaratan değişiklikler için
- Küçük sürüm: Yeni özellikler için
- Yama sürümü: Hata düzeltmeleri için

### Geri Alma Süreci

1. Sorunu belirleyin
2. Önceki sürüme geri dönün
3. Gerekirse kullanıcıları bilgilendirin
4. Sorunu düzeltin
5. Düzeltildi sürümden dağıtın

## Dağıtım Sonrası Görevler

### Doğrulama

1. Temel işlevselliği test edin
2. API entegrasyonlarını doğrulayın
3. Hata takibini kontrol edin
4. Performans metriklerini doğrulayın

### İzleme Kurulumu

1. Kritik sorunlar için uyarıları yapılandırın
2. Performans panoları oluşturun
3. Kullanıcı geri bildirimi toplamayı uygulayın
4. Düzenli sağlık kontrolleri planlayın

### Dokümantasyon Güncellemeleri

1. Kullanıcı dokümantasyonunu güncelleyin
2. README dosyasına dağıtım notları ekleyin
3. Dağıtıma özel yapılandırmaları belgeleyin

## Gelecek Geliştirmeler

Planlanan dağıtım iyileştirmeleri şunlardır:

1. **Otomatik Dağıtımlar**:
   - Tam otomatik sürüm hatları
   - Blue-green dağıtım stratejisi
   - Hata durumunda otomatik geri alma

2. **Gelişmiş İzleme**:
   - Gerçek zamanlı performans panoları
   - Kullanıcı davranış analizi
   - Tahmine dayalı sorun algılama

3. **Çoklu Ortam Desteği**:
   - Test için hazırlık ortamı
   - Aşamalı dağıtımlar için özellik etiketleme
   - A/B test altyapısı

4. **Gelişmiş Güvenlik**:
   - Uçtan uca şifreleme
   - Gelişmiş tehdit algılama
   - Uyumluluk otomasyonu