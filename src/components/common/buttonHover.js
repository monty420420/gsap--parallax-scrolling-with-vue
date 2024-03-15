import gsap from "gsap";

//버튼 애니메이션 공통js

export function buttonHover(value, target, duration, y) {  //value는 true인지 false인지 target은 클래스명
  const selector = `.${target} img`;
  if (value) {
    gsap.to(selector, { duration: `${duration}`, y: `${y}` });
  } else {
    gsap.to(selector, { duration: `${duration}`, y: `${y}` });
  }
}