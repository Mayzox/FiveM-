let audio = new Audio();
var request = new XMLHttpRequest();
var count = 0;
function Main(){
    
    return{
        DiscordGuildId: '1263164289296892066', // Also know as Discord server ID
        DiscordInviteLink: 'https://discord.gg/dXZXvUUfBN',
        memberCount: 75,
        musicAutoplay: true, // Set this to true if you want the music to autoplay
        musicVolume: 0.4, // Set the volume that you like (0 = 0% ; 0.5 = 50% ; 1 = 100%)
        buttons:[
            {label: 'Acceuil', selected: true},
            {label: 'Équipe', selected: false},
        ],
        musicList: [
            {label: 'GLK 93%', author: '💚', src: 'audio/loading1.mp3'},
            {label: 'Zee Rebelle', author: '💚', src: 'audio/loading2.mp3'},
            {label: 'Di Caprio', author: '💚', src: 'audio/loading3.mp3'},
        ],
        team:[
            {discord: 'SAMSAM', role: 'Fondateur', img: 'img/member.png'},
            {discord: 'Lorenzo.W', role: 'Créateur', img: 'img/member2.png'},
            {discord: 'Romhel', role: 'Créateur', img: 'img/member.png'},
            {discord: 'Le B', role: 'Co Fondateur', img: 'img/member4.png'},
            {discord: 'Mayzox', role: 'Développeur', img: 'img/member3.png'},
        ],
        // No touching here!!!!
        isMusicPlaying: false,
        musicOpen: false,
        currentSong: 0,
        listen(){
            if(this.musicAutoplay){
                setTimeout(() => { this.play();}, 100);
            }
            request.open('GET', 'https://discord.com/api/guilds/1226962135439900703/widget.json'+this.DiscordGuildId+'/widget.json', true);
            request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                var data = JSON.parse(request.responseText);
                count = data.presence_count;
            }
            };    
            request.onerror = function() {
            };
            request.send();   
            setTimeout(() => { this.memberCount = count; }, 1000);
        },
        selectBtn(select){
            this.buttons.forEach(function(button){
                button.selected = false;
            });
            return true;
        },
        play(){
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            audio.volume = this.musicVolume;
            this.isMusicPlaying = true;
        },
        pause(){
            audio.pause()
            this.isMusicPlaying = false;
        },
        next(){
            if(this.isMusicPlaying){
                audio.pause()
            }
            if(this.currentSong < this.musicList.length-1){
                this.currentSong++;
            }else{
                this.currentSong = 0;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        },
        prev(){
            if(this.isMusicPlaying){
                audio.pause()
            }
            if(this.currentSong != 0){
                this.currentSong = this.currentSong-1;
            }else{
                this.currentSong = this.musicList.length-1;
            }
            audio.src = this.musicList[this.currentSong].src;
            audio.load();
            audio.play();
            this.isMusicPlaying = true;
        },
    }
}
