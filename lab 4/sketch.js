let video;
let img;

function setup() {
  noCanvas();

  // Load and show video
  video = createVideo(['thunderbolts-trailer.mp4']);
  video.size(480, 270);
  video.attribute('controls', '');   // Show play/pause
  video.parent(document.body);       // Attach to body
  video.volume(0);                   // Mute to allow autoplay
  video.autoplay(true);              // Try autoplay
  video.loop();                      // Optional loop

  // Load and show image
  img = createImg('thunderbolts poster.jpg', 'Uploaded Image');
  img.size(300, 300);
  img.parent(document.body);
}

