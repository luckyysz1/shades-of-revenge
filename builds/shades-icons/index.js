var plugin = (() => {
  "use strict";

  const ICONS = {"home":"<path d=\"M4.5 10.5 12 4.3l7.5 6.2\"/><path d=\"M6.5 9.7v9.8h11V9.7\"/><path d=\"M9.7 19.5v-5.2h4.6v5.2\"/><path d=\"M9.2 8.7h5.6\"/>","messages":"<path d=\"M5.5 17.7 4 20l3.1-1a7.7 7.7 0 1 0-2.2-2.6\"/><path d=\"M8.5 9.5h7M8.5 12.5h5.5M8.5 15.5h3.5\"/>","friends":"<circle cx=\"9\" cy=\"8\" r=\"3.1\"/><path d=\"M3.8 19a5.4 5.4 0 0 1 10.4 0\"/><circle cx=\"17.1\" cy=\"8.7\" r=\"2.3\"/><path d=\"M15 18.5a4.3 4.3 0 0 1 5.2-2.1\"/>","search":"<circle cx=\"10.5\" cy=\"10.5\" r=\"5.8\"/><path d=\"m15 15 4.5 4.5\"/><path d=\"M8.5 10.5h4\"/>","notifications":"<path d=\"M12 4.7a4.6 4.6 0 0 0-4.6 4.6v2c0 1.3-.4 2.5-1.2 3.5L5 16.5h14l-1.2-1.7a5.9 5.9 0 0 1-1.2-3.5v-2A4.6 4.6 0 0 0 12 4.7Z\"/><path d=\"M10 18.4a2.1 2.1 0 0 0 4 0\"/>","settings":"<circle cx=\"12\" cy=\"12\" r=\"2.7\"/><path d=\"M12 4.5v1.8M12 17.7v1.8M19.5 12h-1.8M6.3 12H4.5M17.3 6.7 16 8M8 16l-1.3 1.3M17.3 17.3 16 16M8 8 6.7 6.7\"/>","profile":"<circle cx=\"12\" cy=\"8.2\" r=\"3.3\"/><path d=\"M5.2 19.4a7.3 7.3 0 0 1 13.6 0\"/><path d=\"M9.8 7.8h4.4\"/>","plus":"<circle cx=\"12\" cy=\"12\" r=\"8.2\"/><path d=\"M12 8v8M8 12h8\"/>","minus":"<circle cx=\"12\" cy=\"12\" r=\"8.2\"/><path d=\"M8 12h8\"/>","emoji":"<circle cx=\"12\" cy=\"12\" r=\"8.2\"/><path d=\"M8.8 14.2c.8 1.2 2 1.8 3.2 1.8s2.4-.6 3.2-1.8\"/><path d=\"M9.4 10h.01M14.6 10h.01\"/>","attach":"<path d=\"m17.5 8.2-6.8 6.8a2.8 2.8 0 1 1-4-4l7.7-7.7a4.1 4.1 0 1 1 5.8 5.8l-8.1 8.1a5.3 5.3 0 0 1-7.5-7.5\"/>","gift":"<path d=\"M4.5 10h15v9.5h-15Z\"/><path d=\"M12 10v9.5M3.8 7h16.4v3H3.8Z\"/><path d=\"M12 7H8.5a2 2 0 1 1 1.8-2.9ZM12 7h3.5a2 2 0 1 0-1.8-2.9Z\"/>","microphone":"<rect x=\"9.2\" y=\"4\" width=\"5.6\" height=\"10.5\" rx=\"2.8\"/><path d=\"M6.2 11.5a5.8 5.8 0 0 0 11.6 0M12 17.3v2.7M8.8 20h6.4\"/>","headphones":"<path d=\"M5 14v-2a7 7 0 0 1 14 0v2\"/><path d=\"M5 14h3v5.5H6.3A1.3 1.3 0 0 1 5 18.2ZM19 14h-3v5.5h1.7a1.3 1.3 0 0 0 1.3-1.3Z\"/>","call":"<path d=\"M7.3 5.8 9.2 9l-1.7 1.4a12.7 12.7 0 0 0 6.1 6.1l1.4-1.7 3.2 1.8-.5 2a1.8 1.8 0 0 1-1.9 1.4A15.4 15.4 0 0 1 4 8.2a1.8 1.8 0 0 1 1.4-1.9Z\"/>","video":"<rect x=\"4.5\" y=\"7\" width=\"10.8\" height=\"10\" rx=\"2.3\"/><path d=\"m15.3 10.2 4.2-2v7.6l-4.2-2.1\"/><path d=\"M8.4 10.4h3\"/>","camera":"<path d=\"M5 8h3l1.4-2h5.2L16 8h3v10.5H5Z\"/><circle cx=\"12\" cy=\"13\" r=\"3.2\"/>","image":"<rect x=\"4.5\" y=\"5.2\" width=\"15\" height=\"13.6\" rx=\"2.2\"/><circle cx=\"9\" cy=\"9.5\" r=\"1.3\"/><path d=\"m5 17 4.6-4.6 2.8 2.8 2.3-2.3 4.8 4.8\"/>","send":"<path d=\"m5.2 12 13.6-6-4.8 12-2.1-4.7Z\"/><path d=\"M18.8 6 11.9 13\"/>","reply":"<path d=\"m9.5 8-4 4 4 4\"/><path d=\"M5.5 12h7a6 6 0 0 1 6 6\"/>","forward":"<path d=\"m14.5 8 4 4-4 4\"/><path d=\"M18.5 12h-7a6 6 0 0 0-6 6\"/>","pin":"<path d=\"m14 4 6 6-2.5.8-4 4 .8 3.2-1 1-4.3-4.3-4.2 4.2-1-1 4.2-4.2-4.3-4.3 1-1 3.2.8 4-4Z\"/>","link":"<path d=\"M10.2 13.8a4 4 0 0 0 5.7 0l2-2a4 4 0 1 0-5.7-5.7l-1 1\"/><path d=\"M13.8 10.2a4 4 0 0 0-5.7 0l-2 2a4 4 0 1 0 5.7 5.7l1-1\"/>","bookmark":"<path d=\"M7.2 5.2h9.6v13.2L12 15.5l-4.8 2.9Z\"/>","heart":"<path d=\"M12 19.4 5.2 13a4 4 0 1 1 5.6-5.6l1.2 1.2 1.2-1.2a4 4 0 1 1 5.6 5.6Z\"/>","star":"<path d=\"m12 4.6 2 4.1 4.5.7-3.2 3.1.8 4.5-4.1-2.2L8 17l.8-4.5-3.2-3.1 4.5-.7Z\"/>","moon":"<path d=\"M18.3 15.5A6.8 6.8 0 1 1 10 5.7a5.4 5.4 0 0 0 8.3 9.8Z\"/>","sun":"<circle cx=\"12\" cy=\"12\" r=\"3.4\"/><path d=\"M12 4v1.5M12 18.5V20M4 12h1.5M18.5 12H20M6.3 6.3l1.1 1.1M16.6 16.6l1.1 1.1M6.3 17.7l1.1-1.1M16.6 7.4l1.1-1.1\"/>","sparkles":"<path d=\"m12 5 1 2.9L16 9l-3 1-1 3-1-3-3-1 3-1ZM18.5 14.5l.6 1.7 1.7.6-1.7.6-.6 1.7-.6-1.7-1.7-.6 1.7-.6ZM6 14l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7Z\"/>","check":"<circle cx=\"12\" cy=\"12\" r=\"8.2\"/><path d=\"m8 12.3 2.7 2.7 5.7-5.8\"/>","close":"<circle cx=\"12\" cy=\"12\" r=\"8.2\"/><path d=\"m8.6 8.6 6.8 6.8M15.4 8.6l-6.8 6.8\"/>","edit":"<path d=\"m6.2 16.8-.7 2.7 2.7-.7L18.5 8.5l-2.7-2.7Z\"/><path d=\"m14.8 6.8 2.7 2.7M5.5 19.5h13\"/>","delete":"<path d=\"M5.5 7.5h13M9 7.5V5h6v2.5M7.2 7.5l.8 12h8l.8-12M10 11v5M14 11v5\"/>","copy":"<rect x=\"8\" y=\"8\" width=\"11\" height=\"11\" rx=\"2\"/><path d=\"M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2\"/>","folder":"<path d=\"M4.5 8.2h5l1.4 1.4h8.6v8.8a1.8 1.8 0 0 1-1.8 1.8H6.3a1.8 1.8 0 0 1-1.8-1.8Z\"/><path d=\"M4.5 8V6.8A1.8 1.8 0 0 1 6.3 5h3.4l1.3 1.5h3.5\"/>","file":"<path d=\"M7.2 4.8h6l3.6 3.6v10.8a1.8 1.8 0 0 1-1.8 1.8H7.2a1.8 1.8 0 0 1-1.8-1.8V6.6a1.8 1.8 0 0 1 1.8-1.8Z\"/><path d=\"M13.2 4.8v3.6h3.6M8.8 12h5.4M8.8 15h4\"/>","shield":"<path d=\"M12 4.2 19 7v5.2c0 4.3-3 7-7 7.9-4-.9-7-3.6-7-7.9V7Z\"/><path d=\"m9.2 12 1.8 1.8 3.8-3.8\"/>","lock":"<rect x=\"5.5\" y=\"10\" width=\"13\" height=\"9.5\" rx=\"2\"/><path d=\"M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10\"/>","info":"<circle cx=\"12\" cy=\"12\" r=\"8.2\"/><path d=\"M12 10.8v5M12 8h.01\"/>","alert":"<path d=\"M12 4.5 3.8 19h16.4Z\"/><path d=\"M12 9.5v4.3M12 16.5h.01\"/>","download":"<path d=\"M12 4.5v10M8.5 11l3.5 3.5 3.5-3.5\"/><path d=\"M5 19.5h14\"/>","upload":"<path d=\"M12 19.5v-10M8.5 13l3.5-3.5 3.5 3.5\"/><path d=\"M5 4.5h14\"/>","refresh":"<path d=\"M18.5 8.5A7 7 0 1 0 19 15\"/><path d=\"M18.5 4.8v3.7h-3.7\"/>","menu":"<path d=\"M5 7.5h14M5 12h14M5 16.5h14\"/>","more":"<circle cx=\"6\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"18\" cy=\"12\" r=\"1\"/>","arrow-left":"<path d=\"m10.2 7.6-4.4 4.4 4.4 4.4\"/><path d=\"M6 12h12\"/>","arrow-right":"<path d=\"m13.8 7.6 4.4 4.4-4.4 4.4\"/><path d=\"M18 12H6\"/>","terminal":"<rect x=\"4.5\" y=\"5.2\" width=\"15\" height=\"13.6\" rx=\"2.2\"/><path d=\"m8.2 9.4 2.6 2.3-2.6 2.3M12.8 14h3.2\"/><path d=\"M7.4 7.2h1.2\"/>","code":"<path d=\"m9.4 8.4-3.2 3.1 3.2 3.1M14.6 8.4l3.2 3.1-3.2 3.1M13.2 6.5l-2.4 10.9\"/>","plugin":"<path d=\"M9 4.8h6v3.6h2.7a1.8 1.8 0 0 1 1.8 1.8v3.6a1.8 1.8 0 0 1-1.8 1.8H15V19H9v-3.4H6.3a1.8 1.8 0 0 1-1.8-1.8v-3.6a1.8 1.8 0 0 1 1.8-1.8H9Z\"/><circle cx=\"12\" cy=\"12\" r=\"1.1\"/>","palette":"<path d=\"M12 4.2a7.8 7.8 0 1 0 0 15.6h1.2a1.7 1.7 0 0 0 0-3.4H12a1.6 1.6 0 0 1 0-3.2h3.4a4.9 4.9 0 0 0 0-9.8Z\"/><path d=\"M8 9.2h.01M10 6.8h.01M14.1 6.8h.01M16.2 9.6h.01\"/>","bot":"<rect x=\"5\" y=\"7.2\" width=\"14\" height=\"10.8\" rx=\"3\"/><path d=\"M12 4.5v2.7M9.4 12h.01M14.6 12h.01M9.2 15.2h5.6\"/>"};
  const ALIASES = {"home":["HomeIcon","Home","GuildHomeIcon","HomeTabIcon"],"messages":["MessageIcon","MessagesIcon","ChatIcon","DmIcon","DMIcon","ChannelIcon"],"friends":["FriendsIcon","PeopleIcon","UsersIcon","PersonWavingIcon"],"search":["SearchIcon","MagnifyingGlassIcon","Search"],"notifications":["BellIcon","NotificationIcon","NotificationsIcon"],"settings":["SettingsIcon","GearIcon","CogIcon"],"profile":["ProfileIcon","UserIcon","PersonIcon","AccountIcon"],"plus":["PlusIcon","AddIcon","CreateIcon","CirclePlusIcon"],"minus":["MinusIcon","CircleMinusIcon"],"emoji":["EmojiIcon","SmileIcon","SmileyIcon","EmoticonIcon"],"attach":["AttachIcon","AttachmentIcon","PaperclipIcon"],"gift":["GiftIcon","NitroGiftIcon"],"microphone":["MicrophoneIcon","MicIcon"],"headphones":["HeadphonesIcon","HeadsetIcon","DeafenIcon"],"call":["CallIcon","PhoneIcon","VoiceCallIcon"],"video":["VideoIcon","VideoCallIcon"],"camera":["CameraIcon"],"image":["ImageIcon","PhotoIcon","GalleryIcon"],"send":["SendIcon","PaperPlaneIcon"],"reply":["ReplyIcon"],"forward":["ForwardIcon","ShareIcon"],"pin":["PinIcon","PinnedIcon","PinFilledIcon"],"link":["LinkIcon","ChainIcon"],"bookmark":["BookmarkIcon","SaveIcon"],"heart":["HeartIcon","FavoriteIcon"],"star":["StarIcon","FavoriteStarIcon"],"moon":["MoonIcon","DarkModeIcon"],"sun":["SunIcon","LightModeIcon"],"sparkles":["SparklesIcon","MagicIcon"],"check":["CheckIcon","CheckmarkIcon","CircleCheckIcon"],"close":["CloseIcon","XIcon","CircleXIcon"],"edit":["EditIcon","PencilIcon"],"delete":["DeleteIcon","TrashIcon","TrashCanIcon"],"copy":["CopyIcon","DuplicateIcon"],"folder":["FolderIcon","FolderOpenIcon"],"file":["FileIcon","DocumentIcon","FileTextIcon"],"shield":["ShieldIcon","ModerationIcon","SafetyIcon"],"lock":["LockIcon","LockedIcon"],"info":["InfoIcon","InformationIcon"],"alert":["AlertIcon","WarningIcon","TriangleAlertIcon"],"download":["DownloadIcon"],"upload":["UploadIcon"],"refresh":["RefreshIcon","ReloadIcon"],"menu":["MenuIcon","HamburgerIcon"],"more":["MoreIcon","MoreHorizontalIcon","DotsIcon"],"arrow-left":["ArrowLeftIcon","BackIcon","ChevronLeftIcon"],"arrow-right":["ArrowRightIcon","NextIcon","ChevronRightIcon"],"terminal":["TerminalIcon","ConsoleIcon"],"code":["CodeIcon","DeveloperIcon"],"plugin":["PluginIcon","PuzzleIcon","PuzzlePieceIcon"],"palette":["PaletteIcon","ThemeIcon","PaintIcon"],"bot":["BotIcon","RobotIcon"]};
  const registered = [];

  function makeSvg(body, color) {
    const safeColor = typeof color === "string" ? color : "#c9c6e4";
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="' +
      safeColor +
      '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      body +
      "</svg>";
  }

  function readSize(props) {
    const style = props?.style;
    const candidates = [
      props?.size,
      props?.width,
      props?.height,
      style?.width,
      style?.height
    ];
    for (const value of candidates) {
      if (typeof value === "number" && Number.isFinite(value)) return value;
    }
    return 24;
  }

  function readColor(props) {
    const style = props?.style;
    return (
      props?.color ||
      props?.tintColor ||
      props?.fill ||
      style?.color ||
      style?.tintColor ||
      "#c9c6e4"
    );
  }

  function start() {
    const React = bunny?.metro?.common?.React;
    const jsxApi = bunny?.api?.react?.jsx;
    const svgModule = bunny?.metro?.findByProps?.("SvgXml");
    const SvgXml = svgModule?.SvgXml;

    if (!React || !jsxApi?.onJsxCreate || !jsxApi?.deleteJsxCreate || !SvgXml) {
      bunny?.plugin?.logger?.warn?.(
        "shades icons ♡: api de svg/jsx não encontrada; o plugin foi desativado sem causar crash."
      );
      return;
    }

    for (const [iconKey, names] of Object.entries(ALIASES)) {
      const body = ICONS[iconKey];
      if (!body) continue;

      for (const componentName of names) {
        const callback = (_Component, element) => {
          try {
            const props = element?.props || {};
            const size = readSize(props);
            const color = readColor(props);

            return React.createElement(SvgXml, {
              xml: makeSvg(body, color),
              width: size,
              height: size,
              color,
              style: props.style,
              accessibilityLabel: props.accessibilityLabel,
              testID: props.testID,
              pointerEvents: props.pointerEvents
            });
          } catch (error) {
            return element;
          }
        };

        jsxApi.onJsxCreate(componentName, callback);
        registered.push([componentName, callback]);
      }
    }

    bunny?.plugin?.logger?.log?.(
      "shades icons ♡ ativo: " + Object.keys(ICONS).length + " desenhos carregados."
    );
  }

  function stop() {
    const jsxApi = bunny?.api?.react?.jsx;
    if (jsxApi?.deleteJsxCreate) {
      for (const [componentName, callback] of registered.splice(0)) {
        try {
          jsxApi.deleteJsxCreate(componentName, callback);
        } catch (_) {}
      }
    }
  }

  return { start, stop };
})();
              
