document.addEventListener('DOMContentLoaded', function() {
    // Ambil semua elemen yang diperlukan
    const welcome = document.getElementById('welcome');
    const birthdayText = document.getElementById('birthday-text');
    const songText = document.getElementById('song-text');
    const playerContainer = document.getElementById('player-container');
    const finalMessage = document.getElementById('final-message');
    const playBtn = document.getElementById('play-btn');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const audio = document.getElementById('birthday-song');
    
    // Pastikan lagu hanya diputar sekali
    audio.loop = false;

    // Format waktu menjadi menit:detik
    function formatWaktu(detik) {
        const menit = Math.floor(detik / 60);
        const detikSisa = Math.floor(detik % 60);
        return `${menit}:${detikSisa < 10 ? '0' : ''}${detikSisa}`;
    }

    // Update progress bar
    function updateProgress() {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = `${progressPercent}%`;
        currentTimeEl.textContent = formatWaktu(audio.currentTime);
        
        if (!isNaN(audio.duration)) {
            durationEl.textContent = formatWaktu(audio.duration);
        }
    }

    // Fungsi play/pause
    function togglePlay() {
        if (audio.paused) {
            audio.play()
                .then(() => {
                    playBtn.textContent = '❚❚';
                    document.querySelector('.vinyl').style.animationPlayState = 'running';
                })
                .catch(error => {
                    console.log("Gagal memutar:", error);
                });
        } else {
            audio.pause();
            playBtn.textContent = '▶';
            document.querySelector('.vinyl').style.animationPlayState = 'paused';
        }
    }

    // Atur progress manual saat diklik
    function aturProgress(e) {
        const lebar = this.clientWidth;
        const posisiKlik = e.offsetX;
        audio.currentTime = (posisiKlik / lebar) * audio.duration;
    }

    // Fungsi ketika lagu selesai
    function ketikaLaguSelesai() {
        playerContainer.classList.add('animate__fadeOut');
        
        setTimeout(() => {
            playerContainer.classList.add('hidden');
            finalMessage.classList.remove('hidden');
            finalMessage.classList.add('animate__zoomIn');
            
            // Hentikan animasi vinyl
            document.querySelector('.vinyl').style.animationPlayState = 'paused';
        }, 500);
    }

    // Pasang event listener
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', ketikaLaguSelesai);
    document.querySelector('.progress-container').addEventListener('click', aturProgress);
    playBtn.addEventListener('click', togglePlay);

    // Urutan animasi
    setTimeout(() => {
        welcome.classList.add('animate__fadeOut');
        
        setTimeout(() => {
            welcome.classList.add('hidden');
            birthdayText.classList.remove('hidden');
            birthdayText.classList.add('animate__bounceIn');
            
            setTimeout(() => {
                birthdayText.classList.add('animate__fadeOut');
                
                setTimeout(() => {
                    birthdayText.classList.add('hidden');
                    songText.classList.remove('hidden');
                    songText.classList.add('animate__flipInX');
                    
                    setTimeout(() => {
                        songText.classList.add('animate__fadeOut');
                        
                        setTimeout(() => {
                            songText.classList.add('hidden');
                            playerContainer.classList.remove('hidden');
                            playerContainer.classList.add('animate__zoomIn');
                            
                            // Coba putar otomatis
                            audio.play()
                                .then(() => {
                                    playBtn.textContent = '❚❚';
                                    document.querySelector('.vinyl').style.animationPlayState = 'running';
                                })
                                .catch(error => {
                                    console.log("Putar otomatis diblokir, tampilkan tombol play");
                                    playBtn.style.display = 'block';
                                });
                        }, 1000);
                    }, 5000);
                }, 1000);
            }, 5000);
        }, 1000);
    }, 1000);
});
