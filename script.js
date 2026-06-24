// =================================================================
// 🔥 FIREBASE VERİTABANI BAĞLANTISI (Ücretsiz Canlı Taslak)
// =================================================================
const firebaseConfig = {
    databaseURL: "https://dugun-davetiye-lcv-default-rtdb.firebaseio.com/" 
};

// Firebase'i başlatıyoruz
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// =================================================================
// 📤 FORM GÖNDERİLİNCE AKICI GEÇİŞLE KAYDEDEN KOD
// =================================================================
document.addEventListener("DOMContentLoaded", function() {
    const formElement = document.getElementById('wedding-rsvp-form');
    
    if (formElement) {
        formElement.addEventListener('submit', function(e) {
            e.preventDefault(); // Sayfa yenilenmesini engelle

            const name = document.getElementById('guest-name').value;
            const count = parseInt(document.getElementById('guest-count').value);
            const attendance = document.querySelector('input[name="attendance"]:checked').value;

            // 1. Arka planda veriyi panelden görebilmen için Firebase'e gönderiyoruz
            database.ref('katilanlar').push({
                isim: name,
                kisi: attendance === 'yes' ? count : 0,
                durum: attendance === 'yes' ? "Katılıyor" : "Katılamıyor"
            });

            // 2. Form alanını yakala ve kibar çıkış animasyonunu başlat
            const rsvpArea = document.getElementById('rsvp-form-area');
            const rsvpContainer = document.getElementById('rsvp-container');
            
            if (rsvpArea && rsvpContainer) {
                rsvpArea.classList.add('fade-out-luxury');

                // Özel şık teşekkür mesajı metni
                let tebrikMesaji = "";
                if (attendance === 'yes') {
                    tebrikMesaji = `Sayın <strong>${name}</strong>, davetimize ${count} kişi olarak katılacağınız bildirilmiştir. <br>Bu mutlu günümüzde onur verdiniz.`;
                } else {
                    tebrikMesaji = `Sayın <strong>${name}</strong>, katılamayacağınızla ilgili bildiriminiz iletilmiştir. <br>Gıyaben aramızda hissedeceğiz, teşekkür ederiz.`;
                }

                // 3. 600ms sonra formu tamamen sil ve onay kutusunu fade-in ile getir
                setTimeout(() => {
                    rsvpContainer.innerHTML = `
                        <div class="luxury-success-message fade-in-luxury" style="text-align: center; padding: 25px 0;">
                            <h3 style="font-family: 'Great Vibes', cursive; font-size: 38px; color: #f3e5ab; margin-bottom: 12px; text-shadow: 0 0 10px rgba(243, 229, 171, 0.3);">Yanıtınız Alındı!</h3>
                            <p style="font-size: 14px; color: #e0dbd1; line-height: 1.8; font-family: 'Montserrat', sans-serif;">
                                ${tebrikMesaji}
                            </p>
                            <div class="gold-line" style="width:40%; margin:25px auto 0 auto;"></div>
                        </div>
                    `;
                }, 600);
            }
        });
    }
});
