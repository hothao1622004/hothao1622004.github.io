$ = document.querySelector.bind(document);
$$ = document.querySelectorAll.bind(document);
var playlist = $('.playlist');
var btnPlay = $('.btn.btn-toggle-play');
var audio = $('#audio')
var player = $('#player');
const NAME_STORE_KEY = 'F8 - PLAYER'
const nameSong = $('.name_content h2');
const singerSong = $('.name_content .name_3');
const cdThumb = $('.cd_thumb');
const btnNext = $('.btn-next');
const btnPrev = $('.btn-prev');
const progress = $('.progress');
const btnRandom = $('.btn-random');
const btnRepeat = $('.btn-repeat');
const currentTimeSong = $('#current-time-song');
const iconProgress = $('.icon-progress');
const song = $('.song');
var songPasted = [];
var cd = $('.cd');
var app = {
    isPlay : false,
    currentIndex : 0,
    isRandom : false,
    isRepeat : false,
    isHoldMusic : false,
    isLike : false,


    config : JSON.parse(localStorage.getItem(NAME_STORE_KEY)) || {},

    setConfig : function(key , value) {
            this.config[key] =value;
            localStorage.setItem(NAME_STORE_KEY , JSON.stringify(this.config));
            console.log(this.config);
    },




     songs : [
        {
            name : 'Until I Found You',
            singer : 'Stephen Sanchez',
            img : 'https://pic-bstarstatic.akamaized.net/ugc/d411a12dc2f6ca287a7beb7e387c7ce56dd4a563.jpg',
            link : './media/Until I Found You - Stephen Sanchez.mp3'
        },
        {
            name : 'Unstoppable',
            singer : 'Sia',
            img : 'https://pic-bstarstatic.akamaized.net/ugc/637abd4a4a5f88fa8f451649b76918e471adfbf8.jpg',
            link : './media/Unstoppable - Sia.mp3'
        },
        {
            name : 'Mother To Daughter',
            singer : 'Yang Hee Eun',
            img : 'https://i.ytimg.com/vi/dtukikvTlG8/maxresdefault.jpg',
            link : './media/Mother-To-Daughter-Yang-Hee-Eun.mp3'
        },
        {
            name : 'Dream It Possible',
            singer : 'Delacey',
            img : 'https://p2.music.126.net/LFKMbWw1jv2TDWilb1dsyA==/109951164059527883.jpg',
            link : './media/DreamItPossible-Delacey-4725646.mp3'
        },
        {
            name : 'Rolling In The Deep',
            singer : 'Adele',
            img : 'https://i1.sndcdn.com/artworks-S5lAyXvYc9AT3oNd-1zRx2g-t500x500.jpg',
            link : './media/Rolling In The Deep - Adele.mp3'
        },
        {
            name : 'If I Was A Boy',
            singer : 'Beyoncé',
            img : 'https://photo-resize-zmp3.zadn.vn/w600_r1x1_jpeg/covers/b/7/b72b3d40402bdd155212e3ea8d638a3c_1292815493.jpg',
            link : './media/If-I-Were-A-Boy-Beyonce.mp3'
        },
        {
            name : 'Hall Of Fame',
            singer : 'The Script; Will.I.Am',
            img : 'https://upload.wikimedia.org/wikipedia/en/6/67/Halloffamethescript.jpg',
            link : './media/Hall Of Fame - The Script_ Will_I_Am.mp3'
        },
        {
            name : 'Thời Không Sai Lệch',
            singer : 'Ngải Thần',
            img : 'https://avatar-ex-swe.nixcdn.com/song/2021/01/17/4/1/0/a/1610872364691_640.jpg',
            link : './media/ThoiKhongSaiLech-NgaiThan-6919123.mp3'
        },
        {
            name : 'Thời gian ơi, đi đâu mất rồi',
            singer : 'Diêu Bối Na',
            img : 'https://i.ytimg.com/vi/QQUHvJ-CsxU/maxresdefault.jpg',
            link : './media/Thoi-Gian-Oi-Di-Dau-Mat-Roi-Dieu-Boi-Na.mp3'
        },
        {
            name : 'Em, Có Ổn Không?',
            singer : 'Eric Chou',
            img : 'https://avatar-nct.nixcdn.com/singer/avatar/2018/05/09/9/5/6/4/1525831262560_600.jpg',
            link : './media/Em-Co-On-Khong-Eric-Chou.mp3'
        },
        {
            name : 'Until You',
            singer : 'Shayne Ward',
            img : 'https://avatar-ex-swe.nixcdn.com/song/2018/01/29/b/d/d/e/1517189710456_640.jpg',
            link : './media/UntilYou-ShayneWard-1979790.mp3'
        },
        {
            name : 'You Raise Me Up',
            singer : 'Westlife',
            img : 'https://i.scdn.co/image/ab67616d0000b273584556b46baa4c60af680161',
            link : './media/YouRaiseMeUp_Westlife_47vg.mp3'
        },
        {
            name : 'Heal The World',
            singer : 'Michael Jackson',
            img : 'https://upload.wikimedia.org/wikipedia/vi/c/ce/Heal_The_World.jpg',
            link : './media/Heal The World - Michael Jackson.mp3'
        },
        {
            name : 'Nothings Gonna Change My Love For You',
            singer : 'Westlife',
            img : 'https://i.ytimg.com/vi/AWKUF7xhuIw/hqdefault.jpg',
            link : './media/NothingsGonnaChangeMyLoveForYou-We_347ax.mp3'
        },
        {
            name : 'Điều Tuyệt Nhất Của Chúng Ta',
            singer : 'Vương Tiếu Văn',
            img : 'https://avatar-ex-swe.nixcdn.com/playlist/2016/05/19/2/9/f/1/1463656344791_500.jpg',
            link : './media/Canh-Canh-Trong-Long-TV-Version-Vuong-Tieu-Van.mp3'
        },
        {
            name : 'Cha Và Con Gái',
            singer : 'Thùy Chi',
            img : 'https://i.ytimg.com/vi/9k9OzfpSBKM/hqdefault.jpg',
            link : './media/1123-Cha-Va-Con-Gai-Thuy-Chi-Nhac-CHuan-Thuy-Chi.mp3'
        },
        {
            name : 'Right Here Waiting For You',
            singer : 'Richard Marx',
            img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5TN6re3_Hd27c6ilMCyzY8l3Ftr_YwSD3uA&usqp=CAU',
            link : './media/Right-Here-Waiting-For-You-Richard-Marx.mp3'
        },
        {
            name : 'My Love',
            singer : 'Westlife',
            img : 'https://img.lovepik.com/fonts/18/12/18/cc60aea27d7067bf7840805d38afaf2f.jpg_wh860.jpg',
            link : './media/My-Love-Westlife.mp3'
        },
        {
            name : 'Tôi Muốn Có Một Mái Nhà',
            singer : 'Khâu Thi Hân',
            img : 'https://bvndtp.org.vn/wp-content/uploads/2020/12/02-1.jpg',
            link : './media/Toi-Muon-Co-Mot-Mai-Nha-Khau-Thi-Han.mp3'
        },
        {
            name : 'Hey Jude',
            singer : 'Yao Si Ting',
            img : 'https://i.ytimg.com/vi/7acVu_C_Rt8/maxresdefault.jpg',
            link : './media/Hey-Jude-Yao-Si-Ting.mp3'
        },
    ],
    updateSong : function(){
          var results = this.songs.map(function(song , index){
                //  console.log(song.id);
                return ` <div class="song ${index === app.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url(${song.img})" ></div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="anthor">${song.singer}</p>
                </div>
                <div class="options">
                    <i class="fas fa-heart"></i>
                </div>
            </div>`
          });
        //   console.log(results);
          playlist.innerHTML = results.join('');
      },
    propertiesDefine : function (){
        Object.defineProperty(this , 'currentSong' , {
            get : function() {
                return this.songs[this.currentIndex];
            },
        })
    },


    loadingCurrentSong : function() {
        nameSong.textContent = `${this.currentSong.name}`;
        singerSong.textContent = `${this.currentSong.singer}`;
        audio.src = `${this.currentSong.link}`;
        cdThumb.style.backgroundImage = `url(${this.currentSong.img})`;
        // var songActive = $(`.song.${this.currentIndex}`);
        // console.log(songActive);
        
    },


    handleEvents : function() {
        const cdWidth = cd.offsetWidth;


        const roteCd = cdThumb.animate([{transform : 'rotate(360deg)'}],{
            duration : 10000,
            iterations : Infinity
        })

        roteCd.pause();


        document.onscroll = function() {
            var htmlLength = window.scrollY || document.documentElement.scrollTop;
            var newCdHight =  cdWidth - htmlLength;
            cd.style.width = newCdHight > 0 ? newCdHight + 'px' : 0;
            cd.style.opacity = newCdHight / cdWidth;
        }



        btnPlay.onclick = function() {
            if(app.isPlay) {
                audio.pause();
            } else audio.play();
            audio.onplay = function() {
                app.isPlay = true;
                player.classList.add('playing');
                roteCd.play();
            }
            audio.onpause = function() {
                app.isPlay = false;
                player.classList.remove('playing');
                roteCd.pause();
            }
        }


        audio.ontimeupdate = function () {
            if(audio.duration) {
                    const time = (audio.currentTime / audio.duration) *100;
                    currentLength = Math.floor(currentTimeSong.clientWidth * time / 100);
                    progress.style.width = currentLength + 'px';
                    

                    // Làm thời gian bài hát chạy

                    $('.duration-time').textContent= app.timeFormatter(audio.duration);
                    $('.current-time').textContent= app.timeFormatter(audio.currentTime);
            }

        }

        // Di Chuyển Chuột


        currentTimeSong.onmouseup = function() {
            app.isHoldMusic = false;
        }

        currentTimeSong.onmousedown = function(e) {
            var phanTram = (e.offsetX / currentTimeSong.clientWidth) *  100;
            var time = (phanTram * audio.duration) / 100;
            progress.style.width = e.offsetX + 'px';
            audio.currentTime = time;
            app.isHoldMusic = true;
        }
        
        currentTimeSong.onmousemove = function(e) {
            if(app.isHoldMusic) {
                var phanTram = (e.offsetX / currentTimeSong.clientWidth) *  100;
                var time = (phanTram * audio.duration) / 100;
                progress.style.width = e.offsetX + 'px';
                audio.currentTime = time;
            }
        }

        ////////////////////////////////////////////////////////////////////////////////////////////////


        // Di chuyển trên màn hình điện thoại


        currentTimeSong.ontouchmove = function(e) {
            var phanTram = (e.touches[0].clientX / currentTimeSong.clientWidth) *  100;
            var time = (phanTram * audio.duration) / 100;
            progress.style.width = e.offsetX + 'px';
            audio.currentTime = time;
            // console.log(e.touches[0].clientX);
        }
        
        ////////////////////////////////////////////////////////////////////////////////////////////////


        btnNext.onclick = function() {
            if(app.isRandom === true) app.randomSong()
            else app.nextSongs();
            audio.play();
            audio.onplay = function() {
                app.isPlay = true;
                player.classList.add('playing');
                roteCd.play();
            }
            app.updateSong();
            app.scrollToSeeSong();
        }

        btnPrev.onclick = function() {
            if(app.isRandom === true) app.randomSong()
            else app.prevSongs();
            audio.play();
            audio.onplay = function() {
                app.isPlay = true;
                player.classList.add('playing');
                roteCd.play();
            }
            app.updateSong();
            app.scrollToSeeSong();
        }


        btnRandom.onclick = function() {
            app.isRandom = !app.isRandom;
            app.setConfig('isRandom' , app.isRandom );
            btnRandom.classList.toggle('active' , app.isRandom);    
            songPasted.push(app.currentIndex);
            // console.log(songPasted);
        }

        btnRepeat.onclick = function() {
            app.isRepeat = !app.isRepeat;
            console.log(app.isRepeat);
            app.setConfig('isRepeat' , app.isRepeat );
            btnRepeat.classList.toggle('active' , app.isRepeat);    
        }



        audio.onended = function() {
            if(app.isRepeat) audio.play();
            else btnNext.onclick();
        }

        playlist.onclick = function(e) {
            var song = null;
        if(!e.target.closest('.options')) {
            song = e.target.closest('.song:not(.active)');
        }
            var options = e.target.closest('.options');
            // console.log(e.target);
            if(song) {
                var idSong = song.getAttribute('data-index');
                app.touchSongs(Number(idSong));
                audio.play();
                audio.onplay =  function() {
                    app.isPlay  = true; 
                    player.classList.add('playing');
                    roteCd.play();
                }
            }
            else if(options) {
                if(options.getAttribute('class') === 'options like') {
                    options.classList.remove('like');
                }
                else options.classList.add('like');
            }
        }

        // options.onclick = function(e) {
        //         app.isLike = !app.isLike;
        //         e.target.classList.toggle('like' , app.isLike);
        //         console.log(1);
        //     }
        

    },

    nextSongs : function () {
        this.currentIndex ++;
        if(this.currentIndex === this.songs.length) this.currentIndex = 0;
        this.loadingCurrentSong();
    },

    prevSongs : function() {
        this.currentIndex --;
        if(this.currentIndex < 0) this.currentIndex = this.songs.length - 1;
        this.loadingCurrentSong();
    },

    randomSong : function() {
        var newIndex;
        var kt =false;
        do {
            if(songPasted.length === this.songs.length) songPasted = [];
            newIndex = Math.floor(Math.random() * this.songs.length);
            if(songPasted.indexOf(newIndex) === -1) 
            {
                kt = true;
                songPasted.push(newIndex);
            }
        }         
        while(kt === false);
        // console.log(songPasted);
        this.currentIndex = newIndex;
        this.loadingCurrentSong();
    },

    scrollToSeeSong : function() {
        setTimeout(() => {
            setTimeout(() => {
               $('.song.active').scrollIntoView({
                    behavior  : 'smooth',
                    block : 'end'
               })
            })
            
        }, 300);
    },



    touchSongs : function(id) {
        this.currentIndex = id;
        this.updateSong();
        this.loadingCurrentSong();
    },


    loadingStoneKeys : function() {
        this.isRepeat = this.config['isRepeat'];
        this.isRandom = this.config['isRandom'];
    },

    timeFormatter : function(time) {
        var results = "";
        var timeFloor = Math.floor(time);
        var seconds = timeFloor % 60;
        var minutes = Math.floor(timeFloor / 60);
        if(minutes < 10 && seconds < 10) results =`0${minutes}:0${seconds}`;
        else if(minutes < 10) results =`0${minutes}:${seconds}`;
        else if(seconds < 10) results =`${minutes}:0${time}`;
        else results =`${minutes}:${seconds}`;
        return results;
    },



    start : function() {

        this.loadingStoneKeys();  

        this.updateSong();


        this.handleEvents();

        this.propertiesDefine();

        this.loadingCurrentSong();

        btnRepeat.classList.toggle('active' , app.isRepeat);   
        btnRandom.classList.toggle('active' , app.isRandom);
    }
}

app.start();
