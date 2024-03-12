import gsap from "gsap";

//버튼 애니메이션 공통js

export function buttonHover(value, target) {  //value는 true인지 false인지 target은 클래스명
  const selector = `.${target} img`;
  if (value) {
    gsap.to(selector, { duration: 0.1, y: "-120%" });
  } else {
    gsap.to(selector, { duration: 0.1, y: "0%" });
  }
}