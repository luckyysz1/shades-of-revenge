(function(exports,api,metro,common,plugin,lazy){"use strict";

const COLORS = {
  background: "#2d2b55",
  surface: "#262248",
  surfaceAlt: "#211e43",
  input: "#393365",
  border: "#4d457f",
  accent: "#a599e9",
  cyan: "#9effff",
  text: "#f8f8f2",
  secondary: "#c9c6e4",
  muted: "#a599c6",
  green: "#a5ff90",
  yellow: "#fad000",
  red: "#ff628c"
};

const DEFAULTS = {
  version: 1,
  profile: {
    showUsername: true,
    useLocalNames: true,
    showNotes: true,
    showCreatedAt: true,
    showQuickActions: true
  },
  chat: {
    showUsername: true,
    useLocalNames: true,
    fullTimestamp: false,
    compactEdited: true,
    separators: false
  },
  appearance: {
    softAccent: true,
    compactSuffix: true
  },
  users: {}
};

const unpatches = [];
const diagnostics = {
  attempted: [],
  active: [],
  failed: []
};

function deepMerge(target, defaults) {
  if (!target || typeof target !== "object") return JSON.parse(JSON.stringify(defaults));
  for (const [key, value] of Object.entries(defaults)) {
    if (target[key] === undefined) {
      target[key] = value && typeof value === "object" && !Array.isArray(value)
        ? JSON.parse(JSON.stringify(value))
        : value;
    } else if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      target[key] &&
      typeof target[key] === "object"
    ) {
      deepMerge(target[key], value);
    }
  }
  return target;
}

function initStorage() {
  deepMerge(plugin.storage, DEFAULTS);
  return plugin.storage;
}

function getPath(path, fallback) {
  const storage = initStorage();
  let current = storage;
  for (const part of path.split(".")) {
    if (!current || !(part in current)) return fallback;
    current = current[part];
  }
  return current;
}

function setPath(path, value) {
  const storage = initStorage();
  const parts = path.split(".");
  let current = storage;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!current[part] || typeof current[part] !== "object") current[part] = {};
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
}

function getRecord(userId) {
  if (!userId) return null;
  return getPath("users", {})[String(userId)] || null;
}

function setRecord(userId, record) {
  if (!userId) return;
  const users = { ...getPath("users", {}) };
  users[String(userId)] = {
    id: String(userId),
    username: String(record.username || "").replace(/^@/, "").trim(),
    localName: String(record.localName || "").trim(),
    note: String(record.note || "").trim()
  };
  setPath("users", users);
}

function deleteRecord(userId) {
  const users = { ...getPath("users", {}) };
  delete users[String(userId)];
  setPath("users", users);
}

function snowflakeDate(id) {
  try {
    if (!id || !/^\d{15,22}$/.test(String(id))) return null;
    if (typeof BigInt === "function") {
      const milliseconds = Number(BigInt(String(id)) / BigInt(4194304)) + 1420070400000;
      const date = new Date(milliseconds);
      return Number.isNaN(date.getTime()) ? null : date;
    }
    const milliseconds = Math.floor(Number(id) / 4194304) + 1420070400000;
    const date = new Date(milliseconds);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch (_) {
    return null;
  }
}

function formatDate(date, includeTime) {
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", includeTime
      ? { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }
      : { day: "2-digit", month: "2-digit", year: "numeric" }
    ).format(date);
  } catch (_) {
    return date.toLocaleString();
  }
}

function extractUser(props) {
  const candidates = [
    props?.user,
    props?.author,
    props?.message?.author,
    props?.message?.user,
    props?.member?.user,
    props?.profile?.user,
    props?.userProfile?.user,
    props?.displayProfile?.user,
    props?.channel?.recipient,
    props?.recipient
  ];
  return candidates.find(user => user && user.id && (user.username || user.globalName)) || null;
}

function getNameVariants(props, user) {
  const values = [
    props?.displayName,
    props?.nickname,
    props?.nick,
    props?.name,
    props?.message?.member?.nick,
    props?.message?.author?.globalName,
    user?.globalName,
    user?.displayName,
    user?.username
  ];
  return [...new Set(values.filter(value => typeof value === "string" && value.trim()).map(value => value.trim()))];
}

function getUsername(user, record) {
  return String(record?.username || user?.username || "").replace(/^@/, "").trim();
}

function avatarUrl(user) {
  try {
    if (typeof user?.getAvatarURL === "function") {
      const generated = user.getAvatarURL(null, 4096, true);
      if (generated) return generated;
    }
  } catch (_) {}
  if (!user?.id || !user?.avatar) return null;
  const ext = String(user.avatar).startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=4096`;
}

function bannerUrl(user) {
  if (!user?.id || !user?.banner) return null;
  const ext = String(user.banner).startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${ext}?size=4096`;
}

function getClipboard() {
  try {
    if (common.ReactNative?.Clipboard?.setString) return common.ReactNative.Clipboard;
  } catch (_) {}
  try {
    const module = metro.findByProps("setString", "getString");
    if (module?.setString) return module;
  } catch (_) {}
  return null;
}

function copyText(text) {
  if (!text) return false;
  try {
    const clipboard = getClipboard();
    if (clipboard?.setString) {
      clipboard.setString(String(text));
      return true;
    }
  } catch (_) {}
  return false;
}

function openUrl(url) {
  if (!url) return false;
  try {
    common.ReactNative?.Linking?.openURL?.(url);
    return true;
  } catch (_) {
    return false;
  }
}

function hasDecoration(node, depth = 0) {
  if (!node || depth > 18) return false;
  if (Array.isArray(node)) return node.some(child => hasDecoration(child, depth + 1));
  if (typeof node !== "object") return false;
  if (node?.props?.__shadesPlusDecorated) return true;
  return hasDecoration(node?.props?.children, depth + 1);
}

function extractTimestamp(props) {
  const raw =
    props?.message?.timestamp ??
    props?.message?.editedTimestamp ??
    props?.timestamp ??
    props?.date ??
    props?.time;
  if (!raw) return null;
  if (raw instanceof Date) return raw;
  if (typeof raw === "number") {
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof raw === "string") {
    const date = new Date(raw);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  if (typeof raw?.toDate === "function") {
    try { return raw.toDate(); } catch (_) {}
  }
  return null;
}

function makeSuffix(user, record, context) {
  const React = common.React;
  const Text = common.ReactNative.Text;
  const username = getUsername(user, record);
  const children = [];

  if (username) {
    children.push(
      React.createElement(
        Text,
        {
          key: "username",
          __shadesPlusDecorated: true,
          onPress: () => copyText(`@${username}`),
          onLongPress: () => copyText(String(user.id)),
          style: {
            color: getPath("appearance.softAccent", true) ? COLORS.muted : COLORS.accent,
            fontSize: getPath("appearance.compactSuffix", true) ? 12 : 13,
            fontWeight: "500"
          }
        },
        `  @${username}`
      )
    );
  }

  if (context === "profile") {
    const note = getPath("profile.showNotes", true) ? String(record?.note || "").trim() : "";
    const created = getPath("profile.showCreatedAt", true) ? snowflakeDate(user?.id) : null;

    if (note) {
      children.push(
        React.createElement(
          Text,
          {
            key: "note",
            __shadesPlusDecorated: true,
            style: { color: COLORS.secondary, fontSize: 12, fontWeight: "400" }
          },
          `\n♡ ${note}`
        )
      );
    }

    if (created) {
      children.push(
        React.createElement(
          Text,
          {
            key: "created",
            __shadesPlusDecorated: true,
            style: { color: COLORS.muted, fontSize: 11, fontWeight: "400" }
          },
          `\nconta criada em ${formatDate(created, false)}`
        )
      );
    }

    if (getPath("profile.showQuickActions", true)) {
      const avatar = avatarUrl(user);
      const banner = bannerUrl(user);
      children.push(
        React.createElement(
          Text,
          {
            key: "actions-prefix",
            __shadesPlusDecorated: true,
            style: { color: COLORS.border, fontSize: 11 }
          },
          "\n"
        )
      );
      children.push(
        React.createElement(
          Text,
          {
            key: "copy-id",
            __shadesPlusDecorated: true,
            onPress: () => copyText(String(user.id)),
            style: { color: COLORS.cyan, fontSize: 11, fontWeight: "600" }
          },
          "copiar id"
        )
      );
      if (avatar) {
        children.push(
          React.createElement(Text, { key: "dot-a", style: { color: COLORS.muted, fontSize: 11 } }, "  •  "),
          React.createElement(
            Text,
            {
              key: "avatar",
              __shadesPlusDecorated: true,
              onPress: () => openUrl(avatar),
              style: { color: COLORS.cyan, fontSize: 11, fontWeight: "600" }
            },
            "avatar hd"
          )
        );
      }
      if (banner) {
        children.push(
          React.createElement(Text, { key: "dot-b", style: { color: COLORS.muted, fontSize: 11 } }, "  •  "),
          React.createElement(
            Text,
            {
              key: "banner",
              __shadesPlusDecorated: true,
              onPress: () => openUrl(banner),
              style: { color: COLORS.cyan, fontSize: 11, fontWeight: "600" }
            },
            "banner hd"
          )
        );
      }
    }
  }

  return children;
}

function decorateNameTree(node, props, context, state, depth = 0) {
  if (node == null || depth > 22) return node;
  const React = common.React;
  const user = state.user;
  const record = state.record;
  const variants = state.variants;

  if (typeof node === "string") {
    const clean = node.trim();
    if (!state.done && variants.includes(clean) && !clean.includes("@")) {
      state.done = true;
      const localEnabled = context === "chat"
        ? getPath("chat.useLocalNames", true)
        : getPath("profile.useLocalNames", true);
      const localName = localEnabled ? String(record?.localName || "").trim() : "";
      const display = localName || node;
      const showUsername = context === "chat"
        ? getPath("chat.showUsername", true)
        : getPath("profile.showUsername", true);
      return React.createElement(
        React.Fragment,
        { key: `shades-plus-${user.id}`, __shadesPlusDecorated: true },
        display,
        ...(showUsername ? makeSuffix(user, record, context) : [])
      );
    }
    return node;
  }

  if (typeof node === "number" || typeof node === "boolean") return node;

  if (Array.isArray(node)) {
    let changed = false;
    const children = node.map(child => {
      const next = decorateNameTree(child, props, context, state, depth + 1);
      if (next !== child) changed = true;
      return next;
    });
    return changed ? children : node;
  }

  if (!React.isValidElement(node)) return node;
  if (node.props?.__shadesPlusDecorated) return node;

  const oldChildren = node.props?.children;
  if (oldChildren === undefined) return node;

  const nextChildren = decorateNameTree(oldChildren, props, context, state, depth + 1);
  if (nextChildren === oldChildren) return node;

  return React.cloneElement(node, {
    ...node.props,
    children: nextChildren,
    __shadesPlusDecorated: state.done || node.props?.__shadesPlusDecorated
  });
}

function decorateRenderedTree(rendered, props, context) {
  if (!rendered || hasDecoration(rendered)) return rendered;
  const user = extractUser(props);
  if (!user) return rendered;
  const record = getRecord(user.id);
  const variants = getNameVariants(props, user);
  if (!variants.length) return rendered;
  const state = { user, record, variants, done: false };
  return decorateNameTree(rendered, props, context, state);
}

function replaceTextTree(node, predicate, replacer, state, depth = 0) {
  if (node == null || depth > 20) return node;
  const React = common.React;

  if (typeof node === "string") {
    if (!state.done && predicate(node)) {
      state.done = true;
      return replacer(node);
    }
    return node;
  }

  if (Array.isArray(node)) {
    let changed = false;
    const next = node.map(child => {
      const replaced = replaceTextTree(child, predicate, replacer, state, depth + 1);
      if (replaced !== child) changed = true;
      return replaced;
    });
    return changed ? next : node;
  }

  if (!React.isValidElement(node)) return node;
  const oldChildren = node.props?.children;
  if (oldChildren === undefined) return node;
  const nextChildren = replaceTextTree(oldChildren, predicate, replacer, state, depth + 1);
  if (nextChildren === oldChildren) return node;
  return React.cloneElement(node, { ...node.props, children: nextChildren });
}

function decorateTimestamp(rendered, props) {
  if (!getPath("chat.fullTimestamp", false)) return rendered;
  const date = extractTimestamp(props);
  if (!date) return rendered;
  const formatted = formatDate(date, true);
  const timePattern = /(^|\s)(hoje\s+às\s+)?\d{1,2}:\d{2}(\s|$)/i;
  return replaceTextTree(
    rendered,
    value => timePattern.test(String(value)),
    () => formatted,
    { done: false }
  );
}

function compactEdited(rendered) {
  if (!getPath("chat.compactEdited", true)) return rendered;
  return replaceTextTree(
    rendered,
    value => /\b(edited|editado|editada)\b/i.test(String(value)),
    () => "editado",
    { done: false }
  );
}

function applySeparator(rendered) {
  if (!getPath("chat.separators", false)) return rendered;
  const React = common.React;
  if (!React.isValidElement(rendered)) return rendered;
  const oldStyle = rendered.props?.style;
  return React.cloneElement(rendered, {
    ...rendered.props,
    style: [
      oldStyle,
      {
        borderBottomWidth: 0.5,
        borderBottomColor: `${COLORS.border}66`,
        paddingBottom: 4
      }
    ]
  });
}

function findByTypeDisplayNameLazy(displayName) {
  const {
    factories: { createFilterDefinition },
    lazy: { createLazyModule }
  } = metro;

  const definition = createFilterDefinition(
    [displayName],
    module => module?.type?.displayName === displayName,
    ([name]) => `shadesPlus.byTypeDisplayName(${name})`
  );
  return createLazyModule(definition(displayName));
}

function patchDisplayName(displayName, callback) {
  diagnostics.attempted.push(displayName);
  try {
    const module = findByTypeDisplayNameLazy(displayName);
    const type = module?.type;

    if (type?.render && typeof type.render === "function") {
      const unpatch = api.patcher.after("render", type, (args, rendered) => callback(rendered, args?.[0] || {}));
      if (typeof unpatch === "function") {
        unpatches.push(unpatch);
        diagnostics.active.push(`${displayName}.render`);
      }
      return;
    }

    if (typeof type === "function") {
      const unpatch = api.patcher.after("type", module, (args, rendered) => callback(rendered, args?.[0] || {}));
      if (typeof unpatch === "function") {
        unpatches.push(unpatch);
        diagnostics.active.push(`${displayName}.type`);
      }
      return;
    }

    diagnostics.failed.push(displayName);
  } catch (_) {
    diagnostics.failed.push(displayName);
  }
}

function patchMany(names, callback) {
  for (const name of names) patchDisplayName(name, callback);
}

function installPatches() {
  patchMany(
    [
      "MessageHeader",
      "MessageUsername",
      "ChatMessageHeader",
      "MessageAuthor",
      "Username"
    ],
    (rendered, props) => decorateRenderedTree(rendered, props, "chat")
  );

  patchMany(
    [
      "UserProfileHeader",
      "ProfileHeader",
      "UserProfileOverview",
      "ProfileOverview",
      "UserProfileName",
      "ProfileName"
    ],
    (rendered, props) => decorateRenderedTree(rendered, props, "profile")
  );

  patchMany(
    [
      "MessageTimestamp",
      "MessageHeaderTimestamp",
      "Timestamp"
    ],
    (rendered, props) => decorateTimestamp(rendered, props)
  );

  patchMany(
    [
      "EditedMessageIndicator",
      "MessageEditedIndicator",
      "Edited"
    ],
    rendered => compactEdited(rendered)
  );

  patchMany(
    [
      "ChatMessage",
      "MessageContent"
    ],
    rendered => applySeparator(rendered)
  );
}

function stopPatches() {
  for (const unpatch of unpatches.splice(0)) {
    try { unpatch(); } catch (_) {}
  }
  diagnostics.active.length = 0;
}

function uiModules() {
  const React = common.React;
  const RN = common.ReactNative;
  let nativeTables = {};
  try {
    nativeTables = metro.findByPropsLazy("TableRow", "TableRowGroup", "TableSwitchRow");
  } catch (_) {}
  return {
    React,
    RN,
    TableRow: nativeTables.TableRow,
    TableRowGroup: nativeTables.TableRowGroup,
    TableSwitchRow: nativeTables.TableSwitchRow
  };
}

function SwitchRow({ label, subLabel, path, icon, forceUpdate }) {
  const { React, TableRow, TableSwitchRow } = uiModules();
  if (TableSwitchRow && TableRow) {
    let iconElement = null;
    try {
      iconElement = React.createElement(TableRow.Icon, { source: api.assets.findAssetId(icon) });
    } catch (_) {}
    return React.createElement(TableSwitchRow, {
      label,
      subLabel,
      icon: iconElement,
      value: Boolean(getPath(path, false)),
      onValueChange: value => {
        setPath(path, value);
        forceUpdate();
      }
    });
  }

  const { RN } = uiModules();
  return React.createElement(
    RN.View,
    { style: styles.switchFallback },
    React.createElement(
      RN.View,
      { style: { flex: 1, paddingRight: 10 } },
      React.createElement(RN.Text, { style: styles.rowLabel }, label),
      subLabel ? React.createElement(RN.Text, { style: styles.rowSubLabel }, subLabel) : null
    ),
    React.createElement(RN.Switch, {
      value: Boolean(getPath(path, false)),
      trackColor: { false: COLORS.border, true: COLORS.accent },
      thumbColor: COLORS.text,
      onValueChange: value => {
        setPath(path, value);
        forceUpdate();
      }
    })
  );
}

const styles = {
  screen: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  content: {
    paddingHorizontal: 12,
    paddingVertical: 18,
    gap: 14
  },
  hero: {
    borderRadius: 20,
    padding: 18,
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: "800"
  },
  heroSubtitle: {
    color: COLORS.muted,
    marginTop: 6,
    lineHeight: 19
  },
  badge: {
    alignSelf: "flex-start",
    marginTop: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: `${COLORS.accent}33`,
    color: COLORS.accent,
    fontWeight: "700"
  },
  group: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: `${COLORS.border}aa`
  },
  groupTitle: {
    color: COLORS.accent,
    fontSize: 14,
    fontWeight: "800",
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 8
  },
  switchFallback: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 58,
    paddingHorizontal: 14,
    borderTopWidth: 0.5,
    borderTopColor: `${COLO
