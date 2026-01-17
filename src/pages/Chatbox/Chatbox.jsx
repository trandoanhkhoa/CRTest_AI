import LaptopUI from './LaptopUI.jsx';
import MobileUI from './MobileUI.jsx';
export default function chatbox() {
  const isMobile = window.innerWidth <= 768;
  return <>{isMobile ? <MobileUI /> : <LaptopUI />}</>;
}
