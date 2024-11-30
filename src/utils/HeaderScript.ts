/**
 * Sets up scroll-based header visibility behavior
 * 
 * @description
 * Controls header visibility based on scroll position:
 * - Shows header when scrolling up
 * - Hides header when scrolling down (if scroll position > 0)
 * - Always shows header at scroll position 0
 * Uses CSS transitions for smooth animations via the transition-transform class.
 * 
 * @implementation
 * The function tracks scroll position changes and toggles header visibility
 * by adding/removing the -translate-y-full class.
 * 
 * @example
 * ```ts
 * import { setupHeaderScroll } from "@/utils/HeaderScript";
 * setupHeaderScroll();
 * ```
 * 
 * @returns {void}
 */
const setupHeaderScroll = (): void => {
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (!header) return;

    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 0) {
      header.classList.add("-translate-y-full");
      header.classList.add("transition-transform");
    } else {
      header.classList.remove("-translate-y-full");
      header.classList.add("transition-transform");
    }
    lastScrollY = currentScrollY;
  });
};

export { setupHeaderScroll };