---
title: 'Genel Bakış'
author: 'arda'
---

## Giriş

Ürün Sağlık Tarayıcısı, kullanıcıların gıda alışverişleri hakkında bilinçli kararlar almalarını sağlayan, zeki ve kişiselleştirilmiş sağlık analizi sunan bir mobil uygulamadır. Uygulama, barkod tarama, görüntü tanıma veya metin arama yoluyla gıda ürünlerini tanımlamak için çoklu AI teknolojilerinden yararlanır ve ardından içerikleri araştırma destekli sağlık verileri ve devlet onaylı kaynaklara göre analiz eder.

## Temel Özellikler

1. **Çok Yöntemli Ürün Tanımlama**
   - Cihaz kamerasını kullanarak barkod tarama
   - Barkodsuz ürünler için görüntü tanıma
   - Manuel ürün arama için metin arama

2. **Kişiselleştirilmiş Sağlık Analizi**
   - Kullanıcının sağlık profiline dayalı AI destekli içerik analizi
   - Alerjenler, diyet kısıtlamaları ve sağlık durumları için uyarılar
   - Faydalı içeriklerin tanımlanması

3. **Konuşma Arayüzü**
   - Ürünler ve alternatifler hakkında bir AI asistanıyla sohbet
   - Kişiselleştirilmiş ürün önerileri
   - Kullanıcının sağlık profiline dayalı bağlama duyarlı yanıtlar

4. **Tarama Geçmişi ve Takip**
   - Tarama geçmişini kaydetme ve inceleme
   - Tarihe, uyarılara veya ürün kategorilerine göre filtreleme
   - Daha önce taranan ürünlere çevrimdışı erişim

5. **Kullanıcı Profili Yönetimi**
   - Alerjiler, diyet kısıtlamaları ve sağlık durumlarıyla sağlık profilleri oluşturma ve sürdürme
   - Profile dayalı kişiselleştirilmiş öneriler

## Teknoloji Yığını

### Ön Uç (Mobil Uygulama)
- Çapraz platform geliştirme için React Native
- Tip güvenliği için TypeScript
- Barkod tarama ve görüntü yakalama için kamera entegrasyonu

### Arka Uç Servisleri
- API servisleri için Node.js/Express
- Yerel veri depolama için SQLite
- Önbellekleme için Redis (kavramsal uygulama)

### AI/ML Servisleri
- Sağlık analizi ve sohbet için OpenAI GPT-4
- Görüntü tanıma için Google Vision API (kavramsal uygulama)
- Barkod tarama kütüphaneleri

### Harici Veri Kaynakları
- Ürün verileri için Open Food Facts API
- Besin verileri için USDA FoodData Central API
- Sağlık bilgileri için FDA ve WHO veritabanları

## Hedef Kitle

Ürün Sağlık Tarayıcısı şu kullanıcılar için tasarlanmıştır:
- Bilinçli gıda seçimleri yapmak isteyen sağlık bilinci yüksek tüketiciler
- Gıda alerjileri veya diyet kısıtlamaları olan bireyler
- Diyetlerini izlemeleri gereken belirli sağlık durumlarına sahip kişiler
- Gıda ürünlerinin sağlık etkilerini anlamakla ilgilenen herkes

## Proje Durumu

Ürün Sağlık Tarayıcısı şu anda prototip aşamasındadır. Temel mimari ve servisler uygulanmış olsa da, bazı özellikler üretim sürümü için ek geliştirme gerektiren kavramsal yer tutuculardır.

## Sonraki Adımlar

- [x] Temel mimari uygulaması
- [x] Temel UI bileşenleri
- [x] Servis entegrasyonu
- [ ] React Native bileşenleriyle tam UI uygulaması
- [ ] Tam görüntü tanıma entegrasyonu
- [ ] Üretim dağıtımı kurulumu
- [ ] Kapsamlı cihaz testi
- [ ] Uygulama mağazası gönderimi