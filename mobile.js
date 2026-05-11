/* FundHuntr — native mobile enhancements (only active when running inside Capacitor).
 * Web users (browser / PWA) get a no-op. Native iOS/Android wrapper gets:
 *   - status bar color + style
 *   - splash screen dismiss
 *   - haptic feedback on swipe actions
 *   - native back-button handling on Android
 */
(async function () {
  const isNative = !!(window.Capacitor && window.Capacitor.isNativePlatform && window.Capacitor.isNativePlatform());
  if (!isNative) return;

  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#15a36b' });
  } catch (e) {}

  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide();
  } catch (e) {}

  // Haptics on swipe action buttons
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    document.addEventListener('click', (e) => {
      const btn = e.target.closest?.('.swipe-action, .btn-primary, .profile-card-compact');
      if (btn) Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
    });
  } catch (e) {}

  // Android hardware back button → previous page
  try {
    const { App } = await import('@capacitor/app');
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) window.history.back();
      else App.exitApp();
    });
  } catch (e) {}
})();
