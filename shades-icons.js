/**
 * @name shades icons ♡
 * @description pack de ícones fofinhos e minimalistas para combinar com shades of revenge :3
 * @version 2.0.0
 * @author lucky
 */

const ICONS = {"home": "<path d=\"M4 10.5 12 4l8 6.5\"/><path d=\"M6.5 9.5V20h11V9.5\"/><path d=\"M10 20v-5h4v5\"/><path d=\"M9 8.8h6\"/>", "messages": "<path d=\"M6 18.5 4 20l.8-3.2A7.5 7.5 0 1 1 19.5 14\"/><path d=\"M9 11.5h6M9 8.5h3.5M9 14.5h4.5\"/>", "friends": "<circle cx=\"9\" cy=\"8\" r=\"3.2\"/><path d=\"M3.8 19a5.4 5.4 0 0 1 10.4 0\"/><circle cx=\"17.2\" cy=\"8.8\" r=\"2.4\"/><path d=\"M15.1 18.4a4.4 4.4 0 0 1 5.1-2.2\"/>", "search": "<circle cx=\"10.5\" cy=\"10.5\" r=\"5.8\"/><path d=\"m15.2 15.2 4.3 4.3\"/><path d=\"M8.5 10.5h4\"/>", "notifications": "<path d=\"M12 4.6a4.6 4.6 0 0 0-4.6 4.6v2.1c0 1.2-.4 2.4-1.1 3.4L5 16.5h14l-1.3-1.8a5.9 5.9 0 0 1-1.1-3.4V9.2A4.6 4.6 0 0 0 12 4.6Z\"/><path d=\"M10 18.5a2 2 0 0 0 4 0\"/>", "settings": "<circle cx=\"12\" cy=\"12\" r=\"2.8\"/><path d=\"M12 4.5v1.8M12 17.7v1.8M19.5 12h-1.8M6.3 12H4.5M17.2 6.8 16 8M8 16l-1.2 1.2M17.2 17.2 16 16M8 8 6.8 6.8\"/>", "profile": "<circle cx=\"12\" cy=\"8.2\" r=\"3.4\"/><path d=\"M5.2 19.5a7.3 7.3 0 0 1 13.6 0\"/><path d=\"M9.7 7.8h4.6\"/>", "plus": "<path d=\"M12 6v12M6 12h12\"/><circle cx=\"12\" cy=\"12\" r=\"8.4\"/>", "emoji": "<circle cx=\"12\" cy=\"12\" r=\"8.3\"/><path d=\"M8.8 14.2c.8 1.2 2 1.8 3.2 1.8s2.4-.6 3.2-1.8\"/><path d=\"M9.4 10.1h.01M14.6 10.1h.01\"/>", "attach": "<path d=\"m17.5 8.2-6.8 6.8a2.8 2.8 0 1 1-4-4l7.7-7.7a4.1 4.1 0 1 1 5.8 5.8l-8.1 8.1a5.3 5.3 0 0 1-7.5-7.5\"/>", "call": "<path d=\"M7.4 5.8 9.2 9l-1.7 1.4a12.8 12.8 0 0 0 6.1 6.1l1.4-1.7 3.2 1.8-.5 2a1.8 1.8 0 0 1-1.9 1.4A15.4 15.4 0 0 1 4 8.2a1.8 1.8 0 0 1 1.4-1.9Z\"/>", "video": "<rect x=\"4.5\" y=\"7\" width=\"10.8\" height=\"10\" rx=\"2.4\"/><path d=\"m15.3 10.2 4.2-2v7.6l-4.2-2.1\"/><path d=\"M8.4 10.4h3\"/>", "heart": "<path d=\"M12 19.4 5.2 13a4 4 0 1 1 5.6-5.6l1.2 1.2 1.2-1.2A4 4 0 1 1 18.8 13Z\"/>", "star": "<path d=\"m12 4.6 2 4.1 4.5.7-3.2 3.1.8 4.5-4.1-2.2L8 17l.8-4.5-3.2-3.1 4.5-.7Z\"/>", "moon": "<path d=\"M18.3 15.5A6.8 6.8 0 1 1 10 5.7a5.4 5.4 0 0 0 8.3 9.8Z\"/>", "sparkles": "<path d=\"m12 5 1 2.9L16 9l-3 1-1 3-1-3-3-1 3-1ZM18.5 14.5l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6ZM6 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z\"/>", "bookmark": "<path d=\"M7.2 5.2h9.6v13.2L12 15.5l-4.8 2.9Z\"/>", "folder": "<path d=\"M4.5 8.2h5l1.4 1.4h8.6v8.8a1.8 1.8 0 0 1-1.8 1.8H6.3a1.8 1.8 0 0 1-1.8-1.8Z\"/><path d=\"M4.5 8V6.8A1.8 1.8 0 0 1 6.3 5h3.4l1.3 1.5h3.5\"/>", "file": "<path d=\"M7.2 4.8h6l3.6 3.6v10.8a1.8 1.8 0 0 1-1.8 1.8H7.2a1.8 1.8 0 0 1-1.8-1.8V6.6a1.8 1.8 0 0 1 1.8-1.8Z\"/><path d=\"M13.2 4.8v3.6h3.6M8.8 12h5.4M8.8 15h4\"/>", "terminal": "<rect x=\"4.5\" y=\"5.2\" width=\"15\" height=\"13.6\" rx=\"2.2\"/><path d=\"m8.2 9.4 2.6 2.3-2.6 2.3M12.8 14h3.2\"/><path d=\"M7.4 7.2h1.2\"/>", "code": "<path d=\"m9.4 8.4-3.2 3.1 3.2 3.1M14.6 8.4l3.2 3.1-3.2 3.1M13.2 6.5l-2.4 10.9\"/>", "plugin": "<path d=\"M9 4.8h6v3.6h2.7a1.8 1.8 0 0 1 1.8 1.8v3.6a1.8 1.8 0 0 1-1.8 1.8H15V19H9v-3.4H6.3a1.8 1.8 0 0 1-1.8-1.8v-3.6a1.8 1.8 0 0 1 1.8-1.8H9Z\"/><circle cx=\"12\" cy=\"12\" r=\"1.1\"/>", "bot": "<rect x=\"5\" y=\"7.2\" width=\"14\" height=\"10.8\" rx=\"3\"/><path d=\"M12 4.5v2.7M9.4 12h.01M14.6 12h.01M9.2 15.2h5.6\"/>", "palette": "<path d=\"M12 4.2a7.8 7.8 0 1 0 0 15.6h1.2a1.7 1.7 0 0 0 0-3.4H12a1.6 1.6 0 0 1 0-3.2h3.4a4.9 4.9 0 0 0 0-9.8Z\"/><path d=\"M8 9.2h.01M10 6.8h.01M14.1 6.8h.01M16.2 9.6h.01\"/>", "send": "<path d=\"m5.2 12 13.6-6-4.8 12-2.1-4.7Z\"/><path d=\"M18.8 6 11.9 13\"/>", "check": "<path d=\"m7 12.3 3.2 3.2 6.8-6.9\"/><circle cx=\"12\" cy=\"12\" r=\"8.2\"/>", "close": "<path d=\"m8.2 8.2 7.6 7.6M15.8 8.2l-7.6 7.6\"/><circle cx=\"12\" cy=\"12\" r=\"8.2\"/>", "arrow-left": "<path d=\"m10.2 7.6-4.4 4.4 4.4 4.4\"/><path d=\"M6 12h12\"/>", "arrow-right": "<path d=\"m13.8 7.6 4.4 4.4-4.4 4.4\"/><path d=\"M18 12H6\"/>"};
const COMPONENT_MAP = {"Home": "home", "HomeIcon": "home", "TabBarHomeIcon": "home", "Message": "messages", "MessageIcon": "messages", "ChatIcon": "messages", "Friends": "friends", "FriendsIcon": "friends", "PeopleIcon": "friends", "Search": "search", "SearchIcon": "search", "BellIcon": "notifications", "NotificationIcon": "notifications", "Settings": "settings", "SettingsIcon": "settings", "Profile": "profile", "UserIcon": "profile", "Plus": "plus", "AddIcon": "plus", "EmojiIcon": "emoji", "AttachIcon": "attach", "PhoneIcon": "call", "CallIcon": "call", "VideoIcon": "video", "HeartIcon": "heart", "StarIcon": "star", "MoonIcon": "moon", "SparklesIcon": "sparkles", "BookmarkIcon": "bookmark", "FolderIcon": "folder", "FileIcon": "file", "TerminalIcon": "terminal", "CodeIcon": "code", "PluginIcon": "plugin", "BotIcon": "bot", "PaletteIcon": "palette", "SendIcon": "send", "CheckIcon": "check", "CloseIcon": "close", "ArrowLeftIcon": "arrow-left", "ArrowRightIcon": "arrow-right"};

function normalize(name) {
  return String(name || "").replace(/[^a-z0-9]/gi, "").toLowerCase();
}

function pickIconKey(type) {
  const raw = type?.displayName || type?.name || type?.render?.displayName || type?.render?.name || "";
  if (!raw) return null;
  if (COMPONENT_MAP[raw]) return COMPONENT_MAP[raw];
  const n = normalize(raw);
  for (const [key, value] of Object.entries(COMPONENT_MAP)) {
    if (normalize(key) === n) return value;
  }
  for (const iconKey of Object.keys(ICONS)) {
    const simple = normalize(iconKey);
    if (n.includes(simple)) return iconKey;
  }
  return null;
}

module.exports = {
  onLoad() {
    try {
      const React = bunny?.metro?.common?.React;
      const ReactNative = bunny?.metro?.common?.ReactNative;
      const svgLib = bunny?.metro?.findByProps?.("SvgXml") || bunny?.metro?.findByProps?.("Svg", "Path", "Circle");
      const SvgXml = svgLib?.SvgXml;

      if (!React || !SvgXml) {
        bunny?.plugin?.logger?.warn?.("shades icons: não achei SvgXml, então vou ficar quietinho pra não crashar :3");
        return;
      }

      const flatten = ReactNative?.StyleSheet?.flatten;
      this.unpatch = bunny.api.patcher.instead("createElement", React, (args, original) => {
        const [type, props, ...children] = args;
        if (!type || type === SvgXml || props?.__shadesCuteIcon) return original(...args);

        const iconKey = pickIconKey(type);
        if (!iconKey) return original(...args);

        let flat = props?.style;
        try { if (flatten) flat = flatten(flat); } catch (e) {}

        const size =
          (typeof props?.size === "number" && props.size) ||
          (typeof props?.width === "number" && props.width) ||
          (typeof props?.height === "number" && props.height) ||
          (typeof flat?.width === "number" && flat.width) ||
          (typeof flat?.height === "number" && flat.height) || 24;

        const color =
          props?.color ||
          props?.fill ||
          props?.tintColor ||
          flat?.color ||
          flat?.tintColor ||
          "#c9c6e4";

        return original(SvgXml, {
          __shadesCuteIcon: true,
          xml: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[iconKey]}</svg>`,
          width: size,
          height: size,
          color,
          style: props?.style,
          accessibilityLabel: props?.accessibilityLabel,
          testID: props?.testID,
        });
      });

      bunny?.plugin?.logger?.log?.("shades icons ♡ carregado com sucesso");
    } catch (e) {
      bunny?.plugin?.logger?.error?.("shades icons ♡ falhou ao iniciar", e);
    }
  },

  onUnload() {
    try { this.unpatch?.(); } catch (e) {}
  }
};