
// Declare global GSAP properties attached to window
// This is necessary because the project loads GSAP via CDN in index.html
// but uses it in React components.

export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gsap: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Draggable: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    InertiaPlugin: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    CustomEase: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Flip: any;
  }
}
