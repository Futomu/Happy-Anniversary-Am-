import React, { useRef, useState, useEffect } from "react";
import "./App.css";

const yourName = "คุณ";
const partnerName = "ที่รัก";
const anniversaryDate = "6 กันยายน 2568";
const daysTogether = 458;
const yearMonth = "1 ปี 3 เดือน";
const messages = [
  "ทุกวันที่มีคุณคือของขวัญสำหรับผม",
  "ขอบคุณที่อยู่ข้างกันเสมอ",
  "รักแอมมากๆ นะค้าบบบบ",
];
const musicUrl = process.env.PUBLIC_URL + "/birds-of-feather.mp3";

const galleryImages = [
  process.env.PUBLIC_URL + "/photo1.png",
  process.env.PUBLIC_URL + "/photo2.png",
  process.env.PUBLIC_URL + "/photo3.png",
  process.env.PUBLIC_URL + "/photo4.png",
];

function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hearts, setHearts] = useState<
    {id:number, left:number, size:number, duration:number}[]
  >([]);
  const [particles, setParticles] = useState<
    {id:number, x:number, y:number, emoji:string}[]
  >([]);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // หัวใจลอย
  useEffect(() => {
    const interval = setInterval(() => {
      const newHeart = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        size: 12 + Math.random() * 18,
        duration: 3 + Math.random() * 2,
      };
      setHearts((prev) => [...prev, newHeart]);
      setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== newHeart.id)), newHeart.duration * 1000);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setGalleryIndex((i) => (i + 1) % galleryImages.length);
    }, 3000); // เปลี่ยนรูปทุก 3 วินาที
    return () => clearInterval(timer);
  }, []);

  const handlePlayMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const copyShareLink = () => {
    const text = `เว็บไซต์ครบรอบของเรา: ${window.location.href}`;
    navigator.clipboard?.writeText(text).then(
      () => alert("คัดลอกลิงก์แล้ว"),
      () => alert("ไม่สามารถคัดลอกได้")
    );
  };

  function handleClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const x = e.clientX;
    const y = e.clientY;
    const newParticle = {
      id: Date.now(),
      x,
      y,
      emoji: Math.random() > 0.5 ? "❤️" : "🌸",
    };
    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== newParticle.id)), 2000);
  }

  return (
    <div className="anniversary-bg" onClick={handleClick}>
      {/* หัวใจลอย */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
          }}
        >❤️</span>
      ))}
      {/* คลิกแล้วเกิดหัวใจ/ดอกไม้ */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="click-particle"
          style={{
            left: p.x,
            top: p.y,
          }}
        >
          {p.emoji}
        </span>
      ))}
      <div className="anniversary-card">
        <div className="anniversary-left">
          <div className="photo-gallery">
            <img src={galleryImages[galleryIndex]} alt={`Gallery ${galleryIndex + 1}`} className="gallery-img" />
          </div>
        </div>
        <div className="anniversary-right">
          <h1 className="anniversary-title">
            Happy Anniversary, Am! <span className="heart-icon">❤️</span>
          </h1>
          <p className="anniversary-date">
            ครบรอบวันที่ 6 กันยายน 2568
          </p>
          <p className="anniversary-days">
            เราอยู่ด้วยกันมาแล้ว <b>{daysTogether} วัน</b> ({yearMonth})
          </p>
          <div className="messages-box">
            <h2 className="messages-title">ความในใจของฉัน</h2>
            <div className="messages-list">
              {messages.map((msg, idx) => (
                <div key={idx} className="message-item">{msg}</div>
              ))}
            </div>
          </div>
          <div className="anniversary-actions">
            <audio ref={audioRef} src={musicUrl} loop />
            <button className="music-btn" onClick={handlePlayMusic}>
              {playing ? "หยุดเพลง" : "เปิดเพลง"}
            </button>
            <button className="share-btn" onClick={copyShareLink}>
              คัดลอกลิงก์
            </button>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(`มาดูเว็บไซต์ครบรอบของเรา: ${window.location.href}`)}`}
              target="_blank"
              rel="noreferrer"
              className="wa-share"
            >
              แชร์ให้เพื่อน
            </a>
          </div>
          <footer className="footer">สร้างด้วยรัก 💌</footer>
        </div>
      </div>
      <div className="anniversary-nav">
        <button className="nav-btn">ก่อนหน้า</button>
        <button className="nav-btn">ถัดไป</button>
      </div>
    </div>
  );
}

export default App;