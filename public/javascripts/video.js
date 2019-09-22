const cld = cloudinary.Cloudinary.new({ cloud_name: "kiwilin", secure: true });

const  vplayer = cld.videoPlayer('user-video')
const videoTitle = document.getElementById("user-video").getAttribute("alt");

vplayer.source(videoTitle, { info: { title: videoTitle, description: 'User movements on the tested site.' } });

vplayer.width(600);

